// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

function addToCart(productId) {
    const product = getProductDetails(productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Quick View functionality
function showQuickView(productId) {
    const product = getProductDetails(productId);
    if (!product) return;

    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="quick-view-content">
            <button class="close-modal">&times;</button>
            <div class="quick-view-grid">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="quick-view-details">
                    <h2>${product.name}</h2>
                    <div class="product-rating">
                        ${generateRatingStars(product.rating)}
                        <span>(${product.reviews} reviews)</span>
                    </div>
                    <div class="product-pricing">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-stock">
                        ${product.inStock ? 
                            `<span class="in-stock"><i class="fas fa-check-circle"></i> In Stock</span>` : 
                            `<span class="out-of-stock"><i class="fas fa-times-circle"></i> Out of Stock</span>`}
                    </div>
                    <div class="quantity-selector">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" value="1" min="1" max="${product.stock}" ${!product.inStock ? 'disabled' : ''}>
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <button class="add-to-cart-btn" ${!product.inStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <div class="quick-view-extra">
                        <div class="quick-view-extra-item"><i class="fas fa-shipping-fast"></i> Free delivery on orders over $50</div>
                        <div class="quick-view-extra-item"><i class="fas fa-undo"></i> 30-day return policy</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.appendChild(modal);

    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    const minusBtn = modal.querySelector('.minus');
    const plusBtn = modal.querySelector('.plus');
    const quantityInput = modal.querySelector('input[type="number"]');
    const addToCartBtn = modal.querySelector('.add-to-cart-btn');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });

    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < product.stock) {
            quantityInput.value = currentValue + 1;
        }
    });

    quantityInput.addEventListener('change', () => {
        let value = parseInt(quantityInput.value);
        if (value < 1) value = 1;
        if (value > product.stock) value = product.stock;
        quantityInput.value = value;
    });

    addToCartBtn.addEventListener('click', () => {
        if (product.inStock) {
            const quantity = parseInt(quantityInput.value);
            addToCartFromQuickView(productId, quantity);
        }
    });
}

function addToCartFromQuickView(productId, quantity) {
    const product = getProductDetails(productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
    
    // Close the quick view modal
    const modal = document.querySelector('.quick-view-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Helper functions
function getProductDetails(productId) {
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (!productCard) return null;

    const name = productCard.querySelector('.product-title').textContent;
    const price = parseFloat(productCard.querySelector('.current-price').textContent.replace('$', ''));
    const image = productCard.querySelector('.product-image img').src;
    const description = productCard.querySelector('.product-description').textContent;
    const rating = parseFloat(productCard.querySelector('.product-rating').dataset.rating || '0');
    const reviews = parseInt(productCard.querySelector('.product-rating').dataset.reviews || '0');
    const stock = parseInt(productCard.querySelector('.product-stock').dataset.stock || '0');
    
    // Get original price and discount if they exist
    const originalPriceElement = productCard.querySelector('.original-price');
    const discountElement = productCard.querySelector('.discount');
    
    const originalPrice = originalPriceElement ? 
        parseFloat(originalPriceElement.textContent.replace('$', '')) : null;
    const discount = discountElement ? 
        parseInt(discountElement.textContent.replace('% OFF', '')) : null;

    const inStock = stock > 0;

    return {
        id: productId,
        name,
        price,
        originalPrice,
        discount,
        image,
        description,
        rating,
        reviews,
        stock,
        inStock
    };
}

function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.closest('.product-card').dataset.productId;
            addToCart(productId);
        });
    });

    // Quick view buttons
    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.closest('.product-card').dataset.productId;
            showQuickView(productId);
        });
    });

    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            button.classList.toggle('active');
            const productId = e.target.closest('.product-card').dataset.productId;
            const isActive = button.classList.contains('active');
            showNotification(`${isActive ? 'Added to' : 'Removed from'} wishlist!`);
        });
    });
}); 