/* ==========================================================
   Artiva – main.js
   Shared JavaScript across all pages.
   Each section is labeled with the page(s) it belongs to.
   ========================================================== */


/* ----------------------------------------------------------
   UTILITIES – used across multiple pages
   ---------------------------------------------------------- */

/**
 * Opens a hidden file input by its ID.
 * Used on Shop Setup and Add Product pages.
 */
function triggerUpload(inputId) {
  const el = document.getElementById(inputId);
  if (el) el.click();
}

/**
 * Shows a single image preview after the user picks a file.
 * @param {Event}  event     - change event from file input
 * @param {string} previewId - id of the <img> element to update
 */
function previewImage(event, previewId) {
  const file = event.target.files[0];
  if (!file) return;

  const preview = document.getElementById(previewId);
  if (!preview) return;

  preview.src = URL.createObjectURL(file);
  preview.style.display = 'block';
}

/**
 * Populate a <select> element with a list of string options.
 * @param {string}   selectId    - id of the <select> element
 * @param {string[]} options     - array of option labels
 * @param {string}   placeholder - first empty option text
 */
function populateSelect(selectId, options, placeholder = 'Select...') {
  const sel = document.getElementById(selectId);
  if (!sel) return;

  sel.innerHTML = `<option value="">${placeholder}</option>`;
  options.forEach(opt => {
    sel.innerHTML += `<option value="${opt}">${opt}</option>`;
  });
}

/** Common countries list reused in Profile Data and Shop Setup pages */
const COUNTRIES = [
  'Egypt', 'Saudi Arabia', 'UAE', 'United States', 'United Kingdom',
  'Germany', 'France', 'Canada', 'Australia', 'Jordan',
  'Lebanon', 'Kuwait', 'Qatar', 'Morocco', 'Tunisia'
];


/* ----------------------------------------------------------
   PAGE: START SELLING  (start-selling.html)
   ---------------------------------------------------------- */

/**
 * Navigates to profile-data page when "I'm Ready" is clicked.
 * Extend this function to persist the terms acceptance if needed.
 */
function goToProfileData() {
  window.location.href = 'profile-data.html';
}


/* ----------------------------------------------------------
   PAGE: PROFILE DATA  (profile-data.html)
   ---------------------------------------------------------- */

/** Fills the Day dropdown with numbers 1–31 */
function populateDays() {
  const sel = document.getElementById('day-select');
  if (!sel) return;

  sel.innerHTML = '<option value="">Day</option>';
  for (let d = 1; d <= 31; d++) {
    sel.innerHTML += `<option value="${d}">${d}</option>`;
  }
}

/** Fills the Year dropdown from current year back 100 years */
function populateYears() {
  const sel = document.getElementById('year-select');
  if (!sel) return;

  const current = new Date().getFullYear();
  sel.innerHTML = '<option value="">Year</option>';
  for (let y = current; y >= current - 100; y--) {
    sel.innerHTML += `<option value="${y}">${y}</option>`;
  }
}

/**
 * Shows thumbnail previews after the user selects National ID photos.
 * Expects a container with id="id-preview".
 */
function handleIDUpload(event) {
  const preview = document.getElementById('id-preview');
  if (!preview) return;

  preview.innerHTML = '';

  Array.from(event.target.files).forEach(file => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.style.cssText = 'width:80px; height:60px; object-fit:cover; border-radius:8px;';
    preview.appendChild(img);
  });
}

/**
 * Validates the profile form and navigates to Shop Setup.
 * Checks: full name is not empty.
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


/* ----------------------------------------------------------
   PAGE: SHOP SETUP  (shop-setup.html)
   ---------------------------------------------------------- */

/**
 * Updates the live character counter for the Shop Name field.
 * Expects elements: id="shop-name" and id="char-count".
 */
function updateCharCount() {
  const input = document.getElementById('shop-name');
  const counter = document.getElementById('char-count');
  if (!input || !counter) return;

  counter.textContent = input.value.length;
}

/**
 * Toggles the selected state of a category pill button.
 * Adds or removes the "selected" CSS class.
 */
function toggleCategory(btn) {
  btn.classList.toggle('selected');
}

/**
 * Validates Shop Setup form fields and navigates to My Shop.
 * Checks: shop name is not empty.
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


/* ----------------------------------------------------------
   PAGE: MY SHOP  (my-shop.html)
   ---------------------------------------------------------- */

/**
 * Replaces the PFP image preview with a newly selected file.
 * Expects an <img> with class "pfp-img".
 */
function updatePFP(event) {
  const file = event.target.files[0];
  if (!file) return;

  const img = document.querySelector('.pfp-img');
  if (img) img.src = URL.createObjectURL(file);
}

/**
 * Replaces the cover photo preview with a newly selected file.
 * Expects an <img> with id="cover-img".
 */
function updateCover(event) {
  const file = event.target.files[0];
  if (!file) return;

  const img = document.getElementById('cover-img');
  if (img) img.src = URL.createObjectURL(file);
}

/**
 * Turns the Bio text into an editable textarea.
 * Saves the new value on blur (when user clicks away).
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

  // Save and switch back to plain text on blur
  textarea.addEventListener('blur', () => {
    const newBio = document.createElement('div');
    newBio.className = 'bio-text';
    newBio.id = 'bio-text';
    newBio.textContent = textarea.value;
    textarea.replaceWith(newBio);
  });
}


/* ----------------------------------------------------------
   PAGE: ADD PRODUCT  (add-product.html)
   ---------------------------------------------------------- */

/**
 * Shows the first selected product image in the upload box
 * and renders small thumbnails for all selected images below it.
 */
function previewProductImage(event) {
  const thumbsContainer = document.getElementById('img-thumbnails');
  const placeholder = document.getElementById('camera-placeholder');
  const uploadBox = document.querySelector('.product-image-upload');

  if (!thumbsContainer) return;
  thumbsContainer.innerHTML = '';

  Array.from(event.target.files).forEach((file, index) => {
    const url = URL.createObjectURL(file);

    // First image fills the upload box area
    if (index === 0 && uploadBox) {
      uploadBox.style.backgroundImage = `url(${url})`;
      uploadBox.style.backgroundSize = 'cover';
      uploadBox.style.backgroundPosition = 'center';
      if (placeholder) placeholder.style.display = 'none';
    }

    // Small thumbnail for each image
    const thumb = document.createElement('img');
    thumb.src = url;
    thumb.alt = `Product image ${index + 1}`;
    thumb.style.cssText = 'width:60px; height:60px; object-fit:cover; border-radius:8px; border:2px solid var(--card-bg);';
    thumbsContainer.appendChild(thumb);
  });
}

/**
 * Validates the Add Product form and saves the product.
 * Checks: price must be a positive number.
 */
function saveProduct() {
  const priceInput = document.getElementById('price');
  if (!priceInput) return;

  const price = parseFloat(priceInput.value);

  if (!price || price <= 0) {
    showError(priceInput, 'Please enter a valid price.');
    return;
  }

  // Success — go back to My Shop (replace with real save logic / API call)
  alert('Product saved successfully!');
  window.location.href = 'my-shop.html';
}


/* ----------------------------------------------------------
   PAGE: SELLER PROFILE  (seller-profile.html)
   ---------------------------------------------------------- */

/**
 * Toggles the Follow button between "Follow" and "Following".
 * Updates button background to reflect the current state.
 */
function toggleFollow() {
  const btn = document.getElementById('follow-btn');
  if (!btn) return;

  const isFollowing = btn.textContent.trim() === 'Following';
  btn.textContent = isFollowing ? 'Follow' : 'Following';
  btn.style.background = isFollowing ? 'var(--gold)' : 'var(--navy)';
}

/**
 * Toggles the wishlist heart icon on a product card.
 * @param {HTMLElement} btn - the wishlist button element
 */
function toggleWishlist(btn) {
  btn.classList.toggle('liked');
  btn.textContent = btn.classList.contains('liked') ? '♥' : '♡';
}

/**
 * Handles Add to Cart action.
 * Replace the alert with real cart logic (API call, local storage, etc.)
 * @param {string} name  - product name
 * @param {number} price - product price in EGP
 */
function addToCart(name, price) {
  alert(`${name} (${price} EGP) added to cart!`);
}


/* ----------------------------------------------------------
   SHARED HELPER – inline error display
   ---------------------------------------------------------- */

/**
 * Shows a red error message below an input field.
 * Removes itself after 3 seconds or when the user types again.
 * @param {HTMLElement} inputEl - the invalid input element
 * @param {string}      message - error message to display
 */
function showError(inputEl, message) {
  // Remove any existing error on this field
  const existing = inputEl.parentElement.querySelector('.field-error');
  if (existing) existing.remove();

  // Highlight the input border in red
  inputEl.style.boxShadow = '0 0 0 2px #e55';

  // Create and insert error message element
  const err = document.createElement('div');
  err.className = 'field-error';
  err.textContent = message;
  err.style.cssText = 'color:#e55; font-size:12px; margin-top:5px;';
  inputEl.insertAdjacentElement('afterend', err);

  // Auto-remove error when user starts typing
  inputEl.addEventListener('input', () => {
    err.remove();
    inputEl.style.boxShadow = '';
  }, { once: true });

  // Auto-remove after 3 seconds
  setTimeout(() => {
    err.remove();
    inputEl.style.boxShadow = '';
  }, 3000);
}


/* ----------------------------------------------------------
   INIT – runs on every page load
   Calls setup functions based on elements found in the DOM.
   ---------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // Profile Data page setup
  if (document.getElementById('day-select'))  populateDays();
  if (document.getElementById('year-select')) populateYears();

  // Populate Citizenship and Country dropdowns on Profile Data page
  populateSelect('citizenship-select', COUNTRIES, 'Select...');
  populateSelect('country-select',     COUNTRIES, 'Select...');

  // Shop Name character counter – attach live listener
  const shopNameInput = document.getElementById('shop-name');
  if (shopNameInput) {
    shopNameInput.addEventListener('input', updateCharCount);
  }

});
