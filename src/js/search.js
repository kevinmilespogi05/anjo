document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const productsGrid = document.querySelector('.products-grid');

    function searchProducts(query) {
        query = query.toLowerCase().trim();
        
        if (!query) {
            // If search is empty, show all products using filters.js functionality
            applyFilters();
            return;
        }

        const filteredProducts = catalogProducts.filter(product => {
            return (
                product.title.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        });

        // Use the filters.js function to display products
        updateProductsDisplay(filteredProducts);
    }

    // Event listeners for search
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            searchProducts(searchInput.value);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProducts(searchInput.value);
            }
        });
    }
});

// Helper function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Helper function to update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
} 