/* ==========================================================
   seller-profile.js
   Logic specific to the public Seller Profile page.
   Depends on: main.js (loaded first in HTML)
   ========================================================== */

/**
 * Toggles the Follow button between "Follow" and "Following".
 * Updates button background color to reflect current state.
 */
function toggleFollow() {
  const btn = document.getElementById('follow-btn');
  if (!btn) return;

  const isFollowing = btn.textContent.trim() === 'Following';
  btn.textContent   = isFollowing ? 'Follow' : 'Following';
  btn.style.background = isFollowing ? 'var(--gold)' : 'var(--navy)';
}

/**
 * Toggles the wishlist heart icon on a product card.
 * Switches between hollow ♡ and filled ♥.
 * @param {HTMLElement} btn - the wishlist button element clicked
 */
function toggleWishlist(btn) {
  btn.classList.toggle('liked');
  btn.textContent = btn.classList.contains('liked') ? '♥' : '♡';
}

/**
 * Handles the Add to Cart action for a product.
 * Replace the alert with real cart logic (API, localStorage, etc.)
 * @param {string} name  - product name
 * @param {number} price - product price in EGP
 */
function addToCart(name, price) {
  alert(`${name} (${price} EGP) added to cart!`);
}
