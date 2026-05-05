/* ==========================================================
   profile-data.js
   Logic specific to the Profile Data form page.
   Depends on: main.js (loaded first in HTML)
   ========================================================== */

/**
 * Shows thumbnail previews after the user selects National ID photos.
 * Renders small preview images inside #id-preview container.
 */
function handleIDUpload(event) {
  const preview = document.getElementById('id-preview');
  if (!preview) return;

  preview.innerHTML = '';

  Array.from(event.target.files).forEach(file => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.alt = 'ID photo preview';
    img.style.cssText = 'width:80px; height:60px; object-fit:cover; border-radius:8px;';
    preview.appendChild(img);
  });
}

/**
 * Validates the profile form then navigates to Shop Setup.
 * Checks: full name field is not empty.
 */
function submitProfile() {
  const nameInput = document.getElementById('full-name');
  if (!nameInput) return;

  if (!nameInput.value.trim()) {
    showError(nameInput, 'Please enter your full name.');
    return;
  }

  window.location.href = 'shop-setup.html';
}
