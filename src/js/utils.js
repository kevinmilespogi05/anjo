// Currency formatting utilities
const utils = {
    formatPrice: function(price) {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    },
    
    toggleMobileMenu: function() {
        const mobileMenu = document.querySelector('.nav-links');
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
        }
    },

    initSearch: function() {
        const searchInput = document.querySelector('.search-bar input');
        const searchButton = document.querySelector('.search-bar button');
        
        if (searchInput && searchButton) {
            searchButton.addEventListener('click', () => {
                const query = searchInput.value.trim();
                if (query) {
                    // You can implement the actual search functionality here
                    console.log('Searching for:', query);
                }
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const query = searchInput.value.trim();
                    if (query) {
                        // You can implement the actual search functionality here
                        console.log('Searching for:', query);
                    }
                }
            });
        }
    }
};

// Make utils available globally
window.utils = utils; 