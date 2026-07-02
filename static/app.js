const csrfToken = window.PHOTO_TRANSFER_CSRF;
const folderInput = document.querySelector("#folderInput");
const photoInput = document.querySelector("#photoInput");
const uploadButton = document.querySelector("#uploadButton");
const progressWrap = document.querySelector(".progress-wrap");
const progressBar = document.querySelector("#progressBar");
const statusText = document.querySelector("#statusText");
const refreshButton = document.querySelector("#refreshButton");
const folderSelect = document.querySelector("#folderSelect");
const downloadAllButton = document.querySelector("#downloadAllButton");
const deleteFolderButton = document.querySelector("#deleteFolderButton");
const photoGrid = document.querySelector("#photoGrid");

init();

function init() {
  refreshButton.addEventListener("click", loadFolders);
  folderSelect.addEventListener("change", renderSelectedFolder);
  uploadButton.addEventListener("click", uploadPhotos);
  deleteFolderButton.addEventListener("click", deleteSelectedFolder);
  loadFolders();
}

function setStatus(message, isError = false) {
  statusText.textContent = message || "";
  statusText.classList.toggle("error", isError);
}

async function loadFolders() {
  const response = await fetch("/api/folders");
  if (!response.ok) {
    setStatus("Unable to load folders.", true);
    return;
  }
  const data = await response.json();
  folderSelect.innerHTML = "";
  if (!data.folders.length) {
    folderSelect.innerHTML = '<option value="">No folders yet</option>';
    photoGrid.innerHTML = '<p class="empty">Upload photos to create a folder.</p>';
    downloadAllButton.removeAttribute("href");
    return;
  }
  data.folders.forEach((folder) => {
    const option = document.createElement("option");
    option.value = folder.name;
    option.textContent = `${folder.name} (${folder.count})`;
    folderSelect.append(option);
  });
  renderSelectedFolder();
}

async function renderSelectedFolder() {
  const folder = folderSelect.value;
  if (!folder) {
    return;
  }
  downloadAllButton.href = `/api/download/${encodeURIComponent(folder)}`;
  const response = await fetch(`/api/photos/${encodeURIComponent(folder)}`);
  if (!response.ok) {
    setStatus("Unable to load photos.", true);
    return;
  }
  const data = await response.json();
  photoGrid.innerHTML = "";
  if (!data.photos.length) {
    photoGrid.innerHTML = '<p class="empty">No photos in this folder.</p>';
    return;
  }
  data.photos.forEach((photo) => {
    const card = document.createElement("article");
    card.className = "photo-card";
    card.innerHTML = `
      <img src="${photo.url}" alt="">
      <div>
        <span>${photo.filename}</span>
        <button type="button" class="danger small">Delete</button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => deletePhoto(folder, photo.filename));
    photoGrid.append(card);
  });
}

function uploadPhotos() {
  const folder = folderInput.value.trim();
  const files = Array.from(photoInput.files || []);
  if (!folder) {
    setStatus("Enter a property folder or address first.", true);
    folderInput.focus();
    return;
  }
  if (!files.length) {
    setStatus("Choose one or more photos first.", true);
    return;
  }

  const formData = new FormData();
  formData.append("folder", folder);
  files.forEach((file) => formData.append("photos", file));

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/upload");
  xhr.setRequestHeader("X-CSRF-Token", csrfToken);
  progressWrap.hidden = false;
  progressBar.style.width = "0%";
  setStatus("Uploading photos...");

  xhr.upload.addEventListener("progress", (event) => {
    if (event.lengthComputable) {
      progressBar.style.width = `${Math.round((event.loaded / event.total) * 100)}%`;
    }
  });

  xhr.addEventListener("load", async () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      progressBar.style.width = "100%";
      setStatus("Upload complete.");
      photoInput.value = "";
      await loadFolders();
      folderSelect.value = folder;
      await renderSelectedFolder();
      return;
    }
    setStatus("Upload failed. Please try again.", true);
  });

  xhr.addEventListener("error", () => setStatus("Upload failed. Please try again.", true));
  xhr.send(formData);
}

async function deletePhoto(folder, filename) {
  if (!confirm("Delete this photo?")) {
    return;
  }
  const response = await fetch(`/api/photos/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`, {
    method: "DELETE",
    headers: { "X-CSRF-Token": csrfToken },
  });
  if (!response.ok) {
    setStatus("Unable to delete photo.", true);
    return;
  }
  setStatus("Photo deleted.");
  renderSelectedFolder();
}

async function deleteSelectedFolder() {
  const folder = folderSelect.value;
  if (!folder || !confirm(`Delete all photos in "${folder}"?`)) {
    return;
  }
  const response = await fetch(`/api/folders/${encodeURIComponent(folder)}`, {
    method: "DELETE",
    headers: { "X-CSRF-Token": csrfToken },
  });
  if (!response.ok) {
    setStatus("Unable to delete folder.", true);
    return;
  }
  setStatus("Folder deleted.");
  loadFolders();
}
