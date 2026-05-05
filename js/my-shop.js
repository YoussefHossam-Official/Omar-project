/* ==========================================================
   my-shop.js
   Logic specific to the My Shop dashboard page.
   Depends on: main.js (loaded first in HTML)
   ========================================================== */

/**
 * Replaces the PFP image with the newly selected file.
 * Targets the element with class "pfp-img".
 */
function updatePFP(event) {
  const file = event.target.files[0];
  if (!file) return;

  const img = document.querySelector('.pfp-img');
  if (img) img.src = URL.createObjectURL(file);
}

/**
 * Replaces the cover photo with the newly selected file.
 * Targets the element with id="cover-img".
 */
function updateCover(event) {
  const file = event.target.files[0];
  if (!file) return;

  const img = document.getElementById('cover-img');
  if (img) img.src = URL.createObjectURL(file);
}

/**
 * Converts the Bio text div into an editable textarea.
 * Saves changes and reverts back to plain text on blur.
 */
function editBio() {
  const bioEl = document.getElementById('bio-text');
  if (!bioEl) return;

  const currentText = bioEl.textContent.trim();

  const textarea = document.createElement('textarea');
  textarea.className = 'input-field';
  textarea.value = currentText;
  textarea.rows = 3;
  textarea.style.marginBottom = '32px';

  bioEl.replaceWith(textarea);
  textarea.focus();

  /* Revert to text div when user clicks away */
  textarea.addEventListener('blur', () => {
    const newBio = document.createElement('div');
    newBio.className = 'bio-text';
    newBio.id = 'bio-text';
    newBio.textContent = textarea.value;
    textarea.replaceWith(newBio);
  });
}
