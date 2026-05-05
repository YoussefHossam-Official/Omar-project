/* ==========================================================
   shop-setup.js
   Logic specific to the Shop Set Up form page.
   Depends on: main.js (loaded first in HTML)
   ========================================================== */

/**
 * Updates live character counter for the Shop Name input.
 * Reads from #shop-name and writes count to #char-count.
 */
function updateCharCount() {
  const input   = document.getElementById('shop-name');
  const counter = document.getElementById('char-count');
  if (!input || !counter) return;

  counter.textContent = input.value.length;
}

/**
 * Toggles selected/unselected state on a category pill button.
 * Adds or removes the "selected" CSS class.
 * @param {HTMLElement} btn - the pill button that was clicked
 */
function toggleCategory(btn) {
  btn.classList.toggle('selected');
}

/**
 * Validates the Shop Setup form and navigates to My Shop.
 * Checks: shop name must not be empty.
 */
function submitShopSetup() {
  const shopName = document.getElementById('shop-name');
  if (!shopName) return;

  if (!shopName.value.trim()) {
    showError(shopName, 'Please enter your shop name.');
    return;
  }

  window.location.href = 'my-shop.html';
}

/* Attach live listener for character counter on page load */
document.addEventListener('DOMContentLoaded', () => {
  const shopNameInput = document.getElementById('shop-name');
  if (shopNameInput) {
    shopNameInput.addEventListener('input', updateCharCount);
  }
});
