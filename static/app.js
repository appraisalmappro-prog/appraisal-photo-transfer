const csrfToken = window.PHOTO_TRANSFER_CSRF;
const folderInput = document.querySelector("#folderInput");
const createFolderButton = document.querySelector("#createFolderButton");
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
const photoLightbox = document.querySelector("#photoLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const lightboxCloseButton = document.querySelector("#lightboxCloseButton");

init();

function init() {
  refreshButton.addEventListener("click", loadFolders);
  folderSelect.addEventListener("change", renderSelectedFolder);
  createFolderButton.addEventListener("click", createFolder);
  uploadButton.addEventListener("click", uploadPhotos);
  deleteFolderButton.addEventListener("click", deleteSelectedFolder);
  lightboxCloseButton.addEventListener("click", closePhotoPreview);
  photoLightbox.addEventListener("click", (event) => {
    if (event.target === photoLightbox) {
      closePhotoPreview();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !photoLightbox.hidden) {
      closePhotoPreview();
    }
  });
  loadFolders();
}

function setStatus(message, isError = false) {
  statusText.textContent = message || "";
  statusText.classList.toggle("error", isError);
}

function currentFolderName() {
  return folderInput.value.trim() || folderSelect.value.trim();
}

async function createFolder() {
  const folder = currentFolderName();
  if (!folder) {
    setStatus("Enter a property folder or address first.", true);
    folderInput.focus();
    return;
  }
  const response = await fetch("/api/folders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify({ folder }),
  });
  if (!response.ok) {
    setStatus("Unable to create folder. Please sign in again and try once more.", true);
    return;
  }
  const data = await response.json();
  folderInput.value = data.folder;
  setStatus(`Folder ready: ${data.folder}`);
  await loadFolders(data.folder);
}

async function loadFolders(preferredFolder = "") {
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
  if (preferredFolder) {
    folderSelect.value = preferredFolder;
  }
  renderSelectedFolder();
}

async function renderSelectedFolder() {
  const folder = folderSelect.value;
  if (!folder) {
    return;
  }
  if (!folderInput.value.trim()) {
    folderInput.value = folder;
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
      <button type="button" class="photo-preview-button" aria-label="Open ${photo.filename}">
        <img src="${photo.url}" alt="">
      </button>
      <div>
        <span>${photo.filename}</span>
        <button type="button" class="danger small photo-delete-button">Delete</button>
      </div>
    `;
    card.querySelector(".photo-preview-button").addEventListener("click", () => {
      openPhotoPreview(photo.url, photo.filename);
    });
    card.querySelector(".photo-delete-button").addEventListener("click", () => deletePhoto(folder, photo.filename));
    photoGrid.append(card);
  });
}

function openPhotoPreview(url, filename) {
  lightboxImage.src = url;
  lightboxImage.alt = filename;
  lightboxCaption.textContent = filename;
  photoLightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  lightboxCloseButton.focus();
}

function closePhotoPreview() {
  photoLightbox.hidden = true;
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";
  document.body.classList.remove("lightbox-open");
}

function uploadPhotos() {
  const folder = currentFolderName();
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
      const payload = JSON.parse(xhr.responseText || "{}");
      const savedFolder = payload.folder || folder;
      folderInput.value = savedFolder;
      await loadFolders(savedFolder);
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
