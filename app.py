import os
import re
import secrets
import zipfile
from datetime import timedelta
from io import BytesIO
from pathlib import Path
from uuid import uuid4

from flask import (
    Flask,
    abort,
    jsonify,
    redirect,
    render_template,
    request,
    send_file,
    session,
    url_for,
)
from werkzeug.utils import secure_filename


ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"}


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config["SECRET_KEY"] = os.environ.get("PHOTO_TOOL_SECRET_KEY") or secrets.token_hex(32)
    app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=12)
    app.config["MAX_CONTENT_LENGTH"] = 800 * 1024 * 1024
    app.config["SESSION_COOKIE_SAMESITE"] = "None"
    app.config["SESSION_COOKIE_SECURE"] = True

    upload_root = Path(app.instance_path) / "uploads"
    upload_root.mkdir(parents=True, exist_ok=True)

    def admin_password():
        return os.environ.get("PHOTO_TOOL_ADMIN_PASSWORD", "change-me-now")

    def logged_in():
        return bool(session.get("authenticated"))

    def require_login():
        if not logged_in():
            abort(401)

    def csrf_token():
        token = session.get("csrf_token")
        if not token:
            token = secrets.token_urlsafe(32)
            session["csrf_token"] = token
        return token

    def require_csrf():
        token = request.headers.get("X-CSRF-Token", "")
        if not token or token != session.get("csrf_token"):
            abort(403)

    def safe_folder_name(raw_name):
        cleaned = re.sub(r"[^A-Za-z0-9._ -]+", "", str(raw_name or "")).strip()
        cleaned = re.sub(r"\s+", " ", cleaned)
        return cleaned[:80] or "Unsorted Photos"

    def folder_path(folder):
        name = safe_folder_name(folder)
        path = upload_root / name
        path.mkdir(parents=True, exist_ok=True)
        return path

    def allowed_file(filename):
        return Path(filename or "").suffix.lower() in ALLOWED_EXTENSIONS

    def photo_url(folder, filename):
        return url_for("photo_file", folder=folder, filename=filename)

    @app.get("/")
    def index():
        if not logged_in():
            return redirect(url_for("login"))
        return render_template("index.html", csrf_token=csrf_token())

    @app.route("/login", methods=["GET", "POST"])
    def login():
        error = ""
        if request.method == "POST":
            password = request.form.get("password", "").strip()
            expected_password = admin_password().strip()
            if secrets.compare_digest(password, expected_password):
                session.clear()
                session.permanent = True
                session["authenticated"] = True
                csrf_token()
                return redirect(url_for("index"))
            error = "Incorrect password."
        return render_template("login.html", error=error)

    @app.post("/logout")
    def logout():
        session.clear()
        return redirect(url_for("login"))

    @app.get("/api/folders")
    def list_folders():
        require_login()
        folders = []
        for path in sorted(upload_root.iterdir(), key=lambda item: item.name.lower()):
            if path.is_dir():
                photos = [item for item in path.iterdir() if item.is_file()]
                folders.append({"name": path.name, "count": len(photos)})
        return jsonify({"folders": folders})

    @app.post("/api/folders")
    def create_folder():
        require_login()
        require_csrf()
        payload = request.get_json(silent=True) or {}
        folder = safe_folder_name(payload.get("folder"))
        path = folder_path(folder)
        return jsonify({"folder": path.name})

    @app.get("/api/photos/<folder>")
    def list_photos(folder):
        require_login()
        path = folder_path(folder)
        photos = []
        for item in sorted(path.iterdir(), key=lambda file: file.stat().st_mtime, reverse=True):
            if item.is_file():
                photos.append(
                    {
                        "filename": item.name,
                        "url": photo_url(path.name, item.name),
                        "size": item.stat().st_size,
                    }
                )
        return jsonify({"folder": path.name, "photos": photos})

    @app.post("/api/upload")
    def upload_photos():
        require_login()
        require_csrf()
        folder = safe_folder_name(request.form.get("folder"))
        path = folder_path(folder)
        files = request.files.getlist("photos")
        saved = []
        for file in files:
            if not file or not file.filename or not allowed_file(file.filename):
                continue
            original = secure_filename(file.filename)
            unique = f"{uuid4().hex[:8]}-{original}"
            file.save(path / unique)
            saved.append(unique)
        return jsonify({"folder": path.name, "saved": saved})

    @app.get("/photos/<folder>/<filename>")
    def photo_file(folder, filename):
        require_login()
        path = folder_path(folder) / secure_filename(filename)
        if not path.exists() or not path.is_file():
            abort(404)
        return send_file(path)

    @app.get("/api/download/<folder>")
    def download_folder(folder):
        require_login()
        path = folder_path(folder)
        memory = BytesIO()
        with zipfile.ZipFile(memory, "w", zipfile.ZIP_DEFLATED) as archive:
            for item in sorted(path.iterdir(), key=lambda file: file.name.lower()):
                if item.is_file():
                    archive.write(item, arcname=item.name)
        memory.seek(0)
        return send_file(
            memory,
            mimetype="application/zip",
            as_attachment=True,
            download_name=f"{path.name}-photos.zip",
        )

    @app.delete("/api/photos/<folder>/<filename>")
    def delete_photo(folder, filename):
        require_login()
        require_csrf()
        path = folder_path(folder) / secure_filename(filename)
        if path.exists() and path.is_file():
            path.unlink()
        return jsonify({"ok": True})

    @app.delete("/api/folders/<folder>")
    def delete_folder(folder):
        require_login()
        require_csrf()
        path = folder_path(folder)
        if path.exists() and path.is_dir():
            for item in path.iterdir():
                if item.is_file():
                    item.unlink()
            path.rmdir()
        return jsonify({"ok": True})

    return app


app = create_app()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5050"))
    app.run(host="0.0.0.0", port=port, debug=False)
