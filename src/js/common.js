// Common utility functions
window.utils = {
  // Validation patterns
  patterns: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[\d\s-]{10,}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    name: /^[a-zA-Z\s]{2,}$/
  },

  // Error messages
  errorMessages: {
    required: "This field is required",
    email: "Please enter a valid email address",
    phone: "Please enter a valid phone number",
    password: "Password must be at least 8 characters with letters and numbers",
    name: "Please enter a valid name"
  },

  // Format price with currency symbol
  formatPrice: (price) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(price);
  },

  // Handle form submissions
  handleFormSubmit: (formId, callback) => {
    const form = document.getElementById(formId);
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (callback) callback(form);
      });
    }
  },

  // Toggle mobile menu
  toggleMobileMenu: () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
    
    if (menuBtn && navMenu) {
      menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        if (overlay) overlay.classList.toggle('active');
      });
    }
  },

  // Initialize search functionality
  initSearch: () => {
    const searchContainer = document.querySelector('.search__container');
    const searchInput = document.querySelector('.search__input') || 
                       document.querySelector('.search-input') || 
                       document.querySelector('.search-field');
    const searchBarInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const searchIcon = document.querySelector('.search-icon');

    if (searchInput) {
      searchInput.addEventListener('focus', () => {
        if (searchContainer) searchContainer.classList.add('active');
      });

      searchInput.addEventListener('blur', () => {
        if (searchContainer) searchContainer.classList.remove('active');
      });
    }
  },

  // Handle form validation
  validateForm: (form) => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });

    return isValid;
  },

  // Validate single input
  validateInput: (input) => {
    const value = input.value.trim();
    const isRequired = input.hasAttribute("required");
    const type = input.type || input.getAttribute('data-type');

    // Remove existing error message
    const existingError = input.parentElement.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Check if empty and required
    if (isRequired && !value) {
      this.showError(input, this.errorMessages.required);
      return false;
    }

    // Validate based on type
    if (value) {
      switch (type) {
        case 'email':
          if (!this.patterns.email.test(value)) {
            this.showError(input, this.errorMessages.email);
            return false;
          }
          break;
        case 'tel':
          if (!this.patterns.phone.test(value)) {
            this.showError(input, this.errorMessages.phone);
            return false;
          }
          break;
        case 'password':
          if (!this.patterns.password.test(value)) {
            this.showError(input, this.errorMessages.password);
            return false;
          }
          break;
        case 'text':
          if (input.name === 'name' && !this.patterns.name.test(value)) {
            this.showError(input, this.errorMessages.name);
            return false;
          }
          break;
      }
    }

    return true;
  },

  // Show error message
  showError: (input, message) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
    input.classList.add('error');
  },

  // Set loading state for buttons
  setLoadingState: (button, isLoading) => {
    if (isLoading) {
      button.textContent = "Processing...";
      button.disabled = true;
    } else {
      button.textContent = button.getAttribute('data-original-text') || "Submit";
      button.disabled = false;
    }
  }
};

// Initialize common functionality
document.addEventListener('DOMContentLoaded', () => {
  window.utils.toggleMobileMenu();
  window.utils.initSearch();

  // Add to cart buttons
  document.querySelectorAll('.add-to-cart, .add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      if (!productCard) return;
      
      const productId = productCard.dataset.productId;
      if (!productId) return;
      
      addToCart(productId);
    });
  });

  // Initialize cart count
  updateCartCount();
});

// Product data (you can replace this with your actual product data or fetch from an API)
const products = {
    '1': { id: '1', name: 'Wireless Headphones', price: 1499.00, image: '../assets/images/product1.jpg' },
    '2': { id: '2', name: 'Smart Watch', price: 2499.00, image: '../assets/images/product2.jpg' },
    '3': { id: '3', name: 'Laptop Backpack', price: 799.00, image: '../assets/images/product3.jpg' }
};

function getProductDetails(productId) {
    return products[productId];
}

// Cart functionality
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }
}

function addToCart(productId) {
    const product = getProductDetails(productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
    showNotification('Added to cart successfully!');
}

// Wishlist functionality
let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

function toggleWishlist(productId) {
    const wishlistBtn = event.currentTarget;
    const index = wishlistItems.indexOf(productId);
    
    if (index === -1) {
        wishlistItems.push(productId);
        wishlistBtn.classList.add('active');
        showNotification('Added to wishlist');
    } else {
        wishlistItems.splice(index, 1);
        wishlistBtn.classList.remove('active');
        showNotification('Removed from wishlist');
    }
    
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
} 