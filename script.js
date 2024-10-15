const bar = document.getElementById('bar')
const close = document.getElementById('close')
const nav = document.getElementById('navbar')

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active')
  })
 
 if (close) {
   close.addEventListener('click', () => {
     nav.classList.remove('active')
   })
 }
}

// Cart functionality

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const quantityElements = document.querySelectorAll('.quantity');

// Function to update cart quantity in the header
function updateCartQuantity() {
  const cartCount = cart.length;
  quantityElements.forEach((q) => (q.textContent = cartCount));
}

// Function to add product to cart
function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartQuantity();
}

// Add event listeners to cart icons for each product
document.querySelectorAll('.cart').forEach((button, index) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();

    // Sample product data. You can dynamically generate this based on the page.
    const product = {
      id: index + 1, // Use index to simulate product IDs
      name: event.target.closest('.pro').querySelector('h5').innerText,
      price: event.target.closest('.pro').querySelector('h4').innerText,
      image: event.target.closest('.pro').querySelector('img').src,
    };

    addToCart(product);
    alert(`${product.name} has been added to your cart!`);
  });
});

// On page load, update cart quantity
document.addEventListener('DOMContentLoaded', updateCartQuantity);

// Cart Page Functionality
if (document.querySelector('.cart-items')) {
  loadCart();
}

// Load the cart page
function loadCart() {
  const cartItemsContainer = document.querySelector('.cart-items');
  cartItemsContainer.innerHTML = ''; // Clear cart items first
  let total = 0;

  // Loop through cart and create cart item elements
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>${item.price}</p>
        <button class="remove-item" data-index="${index}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);

    const price = parseFloat(item.price.replace('$', '')); // Extract price
    total += price;
  });

  document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
  
  // Add event listeners to remove buttons
  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', (event) => {
      const itemIndex = event.target.dataset.index;
      removeItemFromCart(itemIndex);
    });
  });
}

// Remove item from cart
function removeItemFromCart(index) {
  cart.splice(index, 1); // Remove the item from the cart
  localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
  loadCart(); // Reload the cart items
  updateCartQuantity(); // Update the cart quantity in the header
}

// Checkout functionality to clear the cart
document.querySelector('.checkout').addEventListener('click', () => {
  alert('Thank you for your purchase!');
  cart = [];
  localStorage.removeItem('cart');
  loadCart();
  updateCartQuantity();
});
