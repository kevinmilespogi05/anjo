// Product data structure
const catalogProducts = [
    {
        id: 1,
        title: "Wireless Headphones",
        category: "Audio",
        price: 1499.00,
        originalPrice: 1999.00,
        rating: 4.5,
        reviews: 128,
        inStock: true,
        primeDelivery: true,
        freeShipping: true,
        stockCount: 15,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 2,
        title: "Smart Watch",
        category: "Electronics",
        price: 2499.00,
        originalPrice: 2999.00,
        rating: 4.8,
        reviews: 256,
        inStock: true,
        primeDelivery: true,
        freeShipping: true,
        stockCount: 10,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        title: "Laptop Backpack",
        category: "Home & Kitchen",
        price: 799.00,
        originalPrice: 999.00,
        rating: 4.3,
        reviews: 89,
        inStock: true,
        primeDelivery: false,
        freeShipping: true,
        stockCount: 25,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        id: 4,
        title: "Wireless Mouse",
        category: "Electronics",
        price: 499.00,
        originalPrice: 699.00,
        rating: 4.6,
        reviews: 156,
        inStock: true,
        primeDelivery: true,
        freeShipping: false,
        stockCount: 30,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500"
    },
    {
        id: 5,
        title: "Mechanical Keyboard",
        category: "Electronics",
        price: 1999.00,
        originalPrice: 2499.00,
        rating: 4.7,
        reviews: 203,
        inStock: true,
        primeDelivery: true,
        freeShipping: true,
        stockCount: 12,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500"
    },
    {
        id: 6,
        title: "Gaming Mouse Pad",
        category: "Gaming",
        price: 249.00,
        originalPrice: 349.00,
        rating: 4.4,
        reviews: 78,
        inStock: true,
        primeDelivery: false,
        freeShipping: true,
        stockCount: 50,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500"
    }
];

// Filter state
let filterState = {
    category: null,
    minPrice: 0,
    maxPrice: 0,
    inStock: false,
    primeDelivery: false,
    freeShipping: false,
    sortBy: 'featured'
};

// DOM Elements
const categoryLinks = document.querySelectorAll('.filters-sidebar ul li a');
const priceSlider = document.querySelector('.price-slider');
const minPriceInput = document.querySelector('.min-price');
const maxPriceInput = document.querySelector('.max-price');
const availabilityCheckboxes = document.querySelectorAll('.availability-filter input');
const sortSelect = document.querySelector('.sort-options select');
const productsGrid = document.querySelector('.products-grid');

// Event Listeners
function initializeFilters() {
    // Set initial price range to 0 (inactive state)
    priceSlider.value = 0;
    minPriceInput.value = '';  // Empty for placeholder to show
    maxPriceInput.value = '';  // Empty for placeholder to show
    filterState.minPrice = 0;
    filterState.maxPrice = 0;
    
    // Update the display of min/max price inputs
    function updatePriceDisplay() {
        minPriceInput.setAttribute('placeholder', '₱0');
        maxPriceInput.setAttribute('placeholder', '₱1,000');
    }
    
    updatePriceDisplay();

    // Category filter
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.textContent.trim();
            filterState.category = filterState.category === category ? null : category;
            applyFilters();
        });
    });

    // Price range filter
    priceSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        filterState.maxPrice = value;
        maxPriceInput.value = value > 0 ? value : '';
        minPriceInput.value = filterState.minPrice > 0 ? filterState.minPrice : '';
        applyFilters();
    });

    minPriceInput.addEventListener('change', (e) => {
        const value = parseInt(e.target.value) || 0;
        filterState.minPrice = value;
        minPriceInput.value = value > 0 ? value : '';
        applyFilters();
    });

    maxPriceInput.addEventListener('change', (e) => {
        const value = parseInt(e.target.value) || 0;
        filterState.maxPrice = value;
        maxPriceInput.value = value > 0 ? value : '';
        applyFilters();
    });

    // Availability filter
    availabilityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const filterType = e.target.parentElement.textContent.trim();
            switch(filterType) {
                case 'In Stock':
                    filterState.inStock = e.target.checked;
                    break;
                case 'Prime Delivery':
                    filterState.primeDelivery = e.target.checked;
                    break;
                case 'Free Shipping':
                    filterState.freeShipping = e.target.checked;
                    break;
            }
            applyFilters();
        });
    });

    // Sort options
    sortSelect.addEventListener('change', (e) => {
        filterState.sortBy = e.target.value.toLowerCase();
        applyFilters();
    });
}

// Filter and sort products
function applyFilters() {
    let filteredProducts = [...catalogProducts];

    // Apply category filter
    if (filterState.category) {
        filteredProducts = filteredProducts.filter(product => 
            product.category === filterState.category
        );
    }

    // Apply price filter only if maxPrice is greater than 0
    if (filterState.maxPrice > 0) {
        filteredProducts = filteredProducts.filter(product =>
            product.price >= filterState.minPrice && product.price <= filterState.maxPrice
        );
    }

    // Apply availability filters
    if (filterState.inStock) {
        filteredProducts = filteredProducts.filter(product => product.inStock);
    }
    if (filterState.primeDelivery) {
        filteredProducts = filteredProducts.filter(product => product.primeDelivery);
    }
    if (filterState.freeShipping) {
        filteredProducts = filteredProducts.filter(product => product.freeShipping);
    }

    // Apply sorting
    switch(filterState.sortBy) {
        case 'price: low to high':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price: high to low':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest arrivals':
            // Assuming newer products have higher IDs
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'best selling':
            filteredProducts.sort((a, b) => b.reviews - a.reviews);
            break;
    }

    // Update UI
    updateProductsDisplay(filteredProducts);
}

// Update the products display
function updateProductsDisplay(filteredProducts) {
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;

    const discount = product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}">
            ${discount > 0 ? `<span class="discount-badge">${discount}% OFF</span>` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-pricing">
                <span class="current-price">₱${product.price.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                ${product.originalPrice ? `<span class="original-price">₱${product.originalPrice.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>` : ''}
            </div>
            <div class="product-stock">
                ${product.inStock ? 
                    `<span class="in-stock"><i class="fas fa-check-circle"></i> In Stock</span>` : 
                    `<span class="out-of-stock"><i class="fas fa-times-circle"></i> Out of Stock</span>`}
            </div>
            <button class="add-to-cart-btn" ${!product.inStock ? 'disabled' : ''}>
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;

    // Add click event for add to cart button
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = product.id;
        
        // Get existing cart or initialize empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        window.cart = cart; // Update global cart
        
        // Update cart count
        updateCartCount();
        
        // Show success message
        showNotification(`${product.title} added to cart!`);
    });

    return card;
}

// Helper function to generate star rating HTML
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

// Helper function to get product description
function getProductDescription(title) {
    const descriptions = {
        "Wireless Headphones": "High-quality wireless headphones with noise cancellation and premium sound quality.",
        "Smart Watch": "Feature-rich smartwatch with health monitoring and fitness tracking capabilities.",
        "Laptop Backpack": "Durable and spacious laptop backpack with multiple compartments and water resistance.",
        "Wireless Mouse": "Ergonomic wireless mouse with long battery life and precise tracking.",
        "Mechanical Keyboard": "Premium mechanical keyboard with customizable RGB lighting and responsive switches.",
        "Gaming Mouse Pad": "Large gaming mouse pad with smooth surface and non-slip rubber base."
    };
    return descriptions[title] || "Product description not available.";
}

// Initialize filters when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    // Show all products immediately when page loads
    updateProductsDisplay(catalogProducts);
    
    // Update any static prices on the page to PHP
    const priceElements = document.querySelectorAll('.price, .current-price, .original-price');
    priceElements.forEach(element => {
        const price = parseFloat(element.textContent.replace(/[^0-9.-]+/g, ''));
        if (!isNaN(price)) {
            element.textContent = `₱${price.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        }
    });
}); 