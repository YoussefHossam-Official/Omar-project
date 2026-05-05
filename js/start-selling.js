/* ==========================================================
   start-selling.js
   Logic specific to the Start Selling onboarding page.
   Depends on: main.js (loaded first in HTML)
   ========================================================== */

/**
 * Navigates to profile-data page when "I'm Ready" is clicked.
 * Button only becomes active after checkbox is checked.
 */
function goToProfileData() {
  window.location.href = 'profile-data.html';
}

/**
 * Enables or disables the "I'm Ready" button
 * based on whether the terms checkbox is checked.
 */
function toggleReady() {
  const checkbox = document.getElementById('terms-checkbox');
  const btn      = document.getElementById('ready-btn');
  if (!checkbox || !btn) return;

  btn.disabled = !checkbox.checked;
}

/**
 * Opens the Terms & Conditions modal popup.
 */
function openTerms() {
  const modal = document.getElementById('terms-modal');
  if (modal) modal.classList.add('active');
}

/**
 * Closes the Terms modal.
 */
function closeTerms() {
  const modal = document.getElementById('terms-modal');
  if (modal) modal.classList.remove('active');
}

/**
 * Closes the modal when the user clicks on the dark overlay
 * (outside the modal box), but not when clicking inside it.
 */
function closeTermsOnOverlay(event) {
  if (event.target.id === 'terms-modal') closeTerms();
}

/**
 * Called by the "I Agree" button inside the modal.
 * Checks the terms checkbox, enables the CTA button, and closes the modal.
 */
function agreeAndClose() {
  const checkbox = document.getElementById('terms-checkbox');
  if (checkbox) {
    checkbox.checked = true;
    toggleReady();
  }
  closeTerms();
}