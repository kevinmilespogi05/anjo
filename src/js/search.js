document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const productsGrid = document.querySelector('.products-grid');

    // Sample product data with proper images
    const products = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 99.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
            category: "Audio",
            description: "High-quality wireless headphones with noise cancellation",
            rating: 4.5,
            reviews: 128,
            inStock: true
        },
        {
            id: 2,
            name: "Smartphone X",
            price: 699.99,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
            category: "Smartphones",
            description: "Latest smartphone with advanced features",
            rating: 4.8,
            reviews: 256,
            inStock: true
        },
        {
            id: 3,
            name: "Gaming Laptop",
            price: 1299.99,
            image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60",
            category: "Electronics",
            description: "High-performance gaming laptop with RTX graphics",
            rating: 4.7,
            reviews: 189,
            inStock: true
        },
        {
            id: 4,
            name: "Smart Watch",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
            category: "Electronics",
            description: "Feature-rich smartwatch with health monitoring",
            rating: 4.3,
            reviews: 95,
            inStock: true
        },
        {
            id: 5,
            name: "Wireless Earbuds",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60",
            category: "Audio",
            description: "True wireless earbuds with premium sound quality",
            rating: 4.4,
            reviews: 167,
            inStock: true
        },
        {
            id: 6,
            name: "4K Smart TV",
            price: 899.99,
            image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=60",
            category: "Electronics",
            description: "55-inch 4K Smart TV with HDR",
            rating: 4.6,
            reviews: 234,
            inStock: true
        }
    ];

    function searchProducts(query) {
        query = query.toLowerCase().trim();
        
        if (!query) {
            // If search is empty, show all products
            displayProducts(products);
            return;
        }

        const filteredProducts = products.filter(product => {
            return (
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        });

        displayProducts(filteredProducts);
    }

    function displayProducts(productsToShow) {
        if (!productsGrid) return;

        productsGrid.innerHTML = '';

        if (productsToShow.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try different keywords or browse our categories</p>
                </div>
            `;
            return;
        }

        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-product-id', product.id);
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <button class="quick-view-btn" onclick="showQuickView(${product.id})">
                        <i class="fas fa-eye"></i> Quick View
                    </button>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating" data-rating="${product.rating}" data-reviews="${product.reviews}">
                        ${generateRatingStars(product.rating)}
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="product-pricing">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                    </div>
                    <div class="product-stock" data-stock="${product.inStock ? '10' : '0'}">
                        ${product.inStock ? 
                            `<span class="in-stock"><i class="fas fa-check-circle"></i> In Stock</span>` : 
                            `<span class="out-of-stock"><i class="fas fa-times-circle"></i> Out of Stock</span>`}
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
    }

    // Helper function to generate rating stars
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

    // Event listeners for search
    searchButton.addEventListener('click', () => {
        searchProducts(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchProducts(searchInput.value);
        }
    });

    // Initial display of all products
    displayProducts(products);
}); 