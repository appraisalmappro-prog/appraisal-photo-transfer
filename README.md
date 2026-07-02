# Appraisal Photo Transfer Tool

Private photo upload and download tool for appraisal field photos.

## Render Settings

If using the Render dashboard manually:

- Build Command: `pip install -r requirements.txt`
- Start Command: `python app.py`

Environment variables:

- `PHOTO_TOOL_ADMIN_PASSWORD`: your private login password
- `PHOTO_TOOL_SECRET_KEY`: any long random string

This fresh version does not use Gunicorn, so Render should not show `gunicorn: command not found`.

## Workbench Embed

The app is configured with `SameSite=None` and secure session cookies so it can be signed into from the Appraisal Workbench Field Photos iframe over HTTPS.

If browser privacy settings block third-party cookies, open the Photo Transfer app in a new tab and sign in there:

```text
https://appraisal-photo-transfer.onrender.com
```

## Use

1. Open the web app on your phone.
2. Log in.
3. Enter a property folder, such as `123 Main St`.
4. Tap `Upload Photos`.
5. Open the same app on desktop.
6. Select the folder and click `Download All`.

Uploaded photos are stored in `instance/uploads`.
