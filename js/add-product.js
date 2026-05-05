/* ==========================================================
   add-product.js
   Logic specific to the Add Product form page.
   Depends on: main.js (loaded first in HTML)
   ========================================================== */

/**
 * Previews the first selected image in the upload box
 * and renders small thumbnails for all selected images.
 */
function previewProductImage(event) {
  const thumbsContainer = document.getElementById('img-thumbnails');
  const placeholder     = document.getElementById('camera-placeholder');
  const uploadBox       = document.querySelector('.product-image-upload');

  if (!thumbsContainer) return;
  thumbsContainer.innerHTML = '';

  Array.from(event.target.files).forEach((file, index) => {
    const url = URL.createObjectURL(file);

    /* First image fills the upload box background */
    if (index === 0 && uploadBox) {
      uploadBox.style.backgroundImage    = `url(${url})`;
      uploadBox.style.backgroundSize     = 'cover';
      uploadBox.style.backgroundPosition = 'center';
      if (placeholder) placeholder.style.display = 'none';
    }

    /* Small thumbnail strip below the upload box */
    const thumb = document.createElement('img');
    thumb.src     = url;
    thumb.alt     = `Product image ${index + 1}`;
    thumb.style.cssText = 'width:60px; height:60px; object-fit:cover; border-radius:8px; border:2px solid var(--card-bg);';
    thumbsContainer.appendChild(thumb);
  });
}

/**
 * Validates the product form before saving.
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

  /* Replace alert with real save / API call as needed */
  alert('Product saved successfully!');
  window.location.href = 'my-shop.html';
}
