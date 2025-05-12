// Product data structure
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        category: "Audio",
        price: 99.99,
        originalPrice: 129.99,
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
        price: 199.99,
        originalPrice: 249.99,
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
        price: 49.99,
        originalPrice: 49.99,
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
        price: 29.99,
        originalPrice: 39.99,
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
        price: 129.99,
        originalPrice: 159.99,
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
        price: 19.99,
        originalPrice: 24.99,
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
    maxPrice: 1000,
    minRating: 0,
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
const ratingCheckboxes = document.querySelectorAll('.rating-filter input');
const availabilityCheckboxes = document.querySelectorAll('.availability-filter input');
const sortSelect = document.querySelector('.sort-options select');
const productsGrid = document.querySelector('.products-grid');

// Event Listeners
function initializeFilters() {
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
        filterState.maxPrice = parseInt(e.target.value);
        maxPriceInput.value = filterState.maxPrice;
        applyFilters();
    });

    minPriceInput.addEventListener('change', (e) => {
        filterState.minPrice = parseInt(e.target.value) || 0;
        applyFilters();
    });

    maxPriceInput.addEventListener('change', (e) => {
        filterState.maxPrice = parseInt(e.target.value) || 1000;
        applyFilters();
    });

    // Rating filter
    ratingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const rating = parseInt(e.target.parentElement.textContent);
            filterState.minRating = e.target.checked ? rating : 0;
            applyFilters();
        });
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
    let filteredProducts = [...products];

    // Apply category filter
    if (filterState.category) {
        filteredProducts = filteredProducts.filter(product => 
            product.category === filterState.category
        );
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter(product =>
        product.price >= filterState.minPrice && product.price <= filterState.maxPrice
    );

    // Apply rating filter
    if (filterState.minRating > 0) {
        filteredProducts = filteredProducts.filter(product =>
            product.rating >= filterState.minRating
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
        case 'customer rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
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
            <div class="product-rating" data-rating="${product.rating}" data-reviews="${product.reviews}">
                ${generateStarRating(product.rating)}
                <span>(${product.reviews})</span>
            </div>
            <div class="product-pricing">
                <span class="current-price">$${product.price.toFixed(2)}</span>
                ${product.originalPrice > product.price ? 
                    `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <p class="product-description">${getProductDescription(product.title)}</p>
            <div class="product-stock" data-stock="${product.stockCount}">
                ${product.inStock ? 
                    `<span class="in-stock">In Stock</span>` : 
                    `<span class="out-of-stock">Out of Stock</span>`}
            </div>
            <div class="product-actions">
                <button class="add-to-cart-btn" ${!product.inStock ? 'disabled' : ''}>
                    Add to Cart
                </button>
                <button class="quick-view-btn">
                    <i class="fas fa-eye"></i> Quick View
                </button>
            </div>
        </div>
    `;

    // Add event listeners for the buttons
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    const quickViewBtn = card.querySelector('.quick-view-btn');

    addToCartBtn.addEventListener('click', () => {
        if (product.inStock) {
            addToCart(product.id);
        }
    });

    quickViewBtn.addEventListener('click', () => {
        showQuickView(product.id);
    });

    return card;
}

// Helper function to generate star rating HTML
function generateStarRating(rating) {
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
    applyFilters();
}); 