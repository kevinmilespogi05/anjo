document.addEventListener('DOMContentLoaded', function() {
    // Form handling
    const form = document.querySelector('.form');
    const submitButton = document.querySelector('.form__submit');
    const googleSignup = document.querySelector('.form__google');
    const loginLink = document.querySelector('.form__login-link');

    // Search functionality
    const searchContainer = document.querySelector('.search__container');
    const searchInput = document.querySelector('.search__input') || document.querySelector('.search-input') || document.querySelector('.search-field');
    const searchBarInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const searchIcon = document.querySelector('.search-icon');

    // Navigation elements
    const navItems = document.querySelectorAll('.header__nav-item, .nav-item');
    const navLinks = document.querySelector('.nav-links');
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;

    // Product elements
    const mainImage = document.querySelector(".main-product-image");
    const thumbnails = document.querySelectorAll(".thumbnail-image");
    const quantityValue = document.querySelector(".quantity-value");
    const quantityBtns = document.querySelectorAll(".quantity-btn");
    const sizeBtns = document.querySelectorAll(".size-btn");
    const colorOptions = document.querySelectorAll(".color-option");
    const buyNowBtn = document.querySelector(".buy-now-btn");
    const wishlistBtn = document.querySelector(".wishlist-btn");
    const cartIcon = document.querySelector(".cart-icon");
    const productGrid = document.querySelector(".products-grid");
    const newArrivalSlider = document.querySelector(".new-arrival-slider");

    // Form elements
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const togglePassword = document.querySelector(".toggle-password");
    const passwordInput = document.querySelector('input[type="password"]');
    const googleBtn = document.querySelector(".form__google");
    const rememberCheckbox = document.getElementById("remember");
    const forgotPasswordLink = document.querySelector(".forgot-password");

    // Create overlay element for mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);

    // Mobile menu state
    let isMenuOpen = false;

    // Initialize all functionality
    if (form) {
        form.addEventListener('submit', function(e) {
            // Only prevent default if it's not the forgot password link
            if (!e.target.classList.contains('forgot-password')) {
                e.preventDefault();
                console.log('Form submitted');
            }
        });
    }

    if (googleSignup) {
        googleSignup.addEventListener('click', function() {
            console.log('Google sign up clicked');
        });
    }

    if (loginLink) {
        loginLink.addEventListener('click', function() {
            console.log('Login link clicked');
        });
    }

    // Search functionality
    if (searchContainer && searchInput) {
        searchContainer.addEventListener('click', function() {
            searchInput.focus();
        });
    }

    if (searchBarInput && searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = searchBarInput.value.trim();
            if (searchTerm) {
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });

        searchBarInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchBarInput.value.trim();
                if (searchTerm) {
                    window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }

    if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', function () {
            if (searchInput.value.trim()) {
                console.log("Searching for:", searchInput.value);
            }
        });

        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && this.value.trim()) {
                console.log("Searching for:", this.value);
            }
        });
    }

    // Mobile menu functionality
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        overlay.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        });
    }

    if (navItems.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (mobileMenuBtn && navMenu) {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        });
    }

    if (navLinks) {
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            navLinks.style.display = isMenuOpen ? "flex" : "none";
        }

        window.addEventListener("resize", function () {
            if (window.innerWidth > 991) {
                navLinks.style.display = "flex";
            } else if (!isMenuOpen) {
                navLinks.style.display = "none";
            }
        });
    }

    // Initialize product functionality
    function initProduct() {
        // Initialize image gallery
        if (thumbnails.length > 0) {
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    if (mainImage) {
                        mainImage.src = thumb.src;
                        thumbnails.forEach(t => t.classList.remove('active'));
                        thumb.classList.add('active');
                    }
                });
            });
        }

        // Handle quantity buttons
        if (quantityBtns.length > 0 && quantityValue) {
            quantityBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    let value = parseInt(quantityValue.textContent);
                    if (btn.classList.contains('decrease')) {
                        value = Math.max(1, value - 1);
                    } else {
                        value += 1;
                    }
                    quantityValue.textContent = value;
                });
            });
        }

        // Handle size selection
        if (sizeBtns.length > 0) {
            sizeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    sizeBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });
        }

        // Handle color selection
        if (colorOptions.length > 0) {
            colorOptions.forEach(option => {
                option.addEventListener('click', () => {
                    colorOptions.forEach(o => o.classList.remove('active'));
                    option.classList.add('active');
                });
            });
        }

        // Handle wishlist button
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => {
                wishlistBtn.classList.toggle('active');
                // Add to wishlist logic here
                const productId = wishlistBtn.dataset.productId;
                if (wishlistBtn.classList.contains('active')) {
                    // Add to wishlist
                    console.log(`Added product ${productId} to wishlist`);
                } else {
                    // Remove from wishlist
                    console.log(`Removed product ${productId} from wishlist`);
                }
            });
        }

        // Handle buy now button
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', () => {
                const productId = buyNowBtn.dataset.productId;
                const quantity = parseInt(quantityValue.textContent);
                const selectedSize = document.querySelector('.size-btn.active')?.textContent;
                const selectedColor = document.querySelector('.color-option.active')?.style.backgroundColor;
                
                // Add to cart and redirect to checkout
                console.log(`Buying product ${productId} with quantity ${quantity}, size ${selectedSize}, color ${selectedColor}`);
                window.location.href = '/checkout';
            });
        }

        // Handle add to cart button
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const productId = addToCartBtn.dataset.productId;
                const quantity = parseInt(quantityValue.textContent);
                const selectedSize = document.querySelector('.size-btn.active')?.textContent;
                const selectedColor = document.querySelector('.color-option.active')?.style.backgroundColor;
                
                // Add to cart logic here
                console.log(`Added product ${productId} to cart with quantity ${quantity}, size ${selectedSize}, color ${selectedColor}`);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Added to cart successfully!';
                document.body.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            });
        }
    }

    // Initialize product grid
    function initProductGrid() {
        if (productGrid) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            productGrid.querySelectorAll('.product-card').forEach(card => {
                observer.observe(card);
            });
        }
    }

    // Initialize new arrival slider
    function initNewArrivalSlider() {
        if (newArrivalSlider) {
            let currentIndex = 0;
            const slides = newArrivalSlider.querySelectorAll('.new-arrival-product');
            const totalSlides = slides.length;

            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.style.transform = `translateX(${100 * (i - index)}%)`;
                    slide.style.opacity = i === index ? '1' : '0';
                    slide.style.pointerEvents = i === index ? 'auto' : 'none';
                });
            }

            // Handle slider controls
            const prevBtn = newArrivalSlider.querySelector('.control-btn.prev');
            const nextBtn = newArrivalSlider.querySelector('.control-btn.next');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                    showSlide(currentIndex);
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % totalSlides;
                    showSlide(currentIndex);
                });
            }

            // Add keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                    showSlide(currentIndex);
                } else if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % totalSlides;
                    showSlide(currentIndex);
                }
            });

            // Initialize first slide
            showSlide(currentIndex);
        }
    }

    // Initialize login form
    if (loginForm) {
        const emailOrPhoneInput = loginForm.querySelector('input[name="emailOrPhone"]');
        const passwordInput = loginForm.querySelector('input[name="password"]');
        const rememberCheckbox = loginForm.querySelector('input[name="remember"]');

        // Handle form submission
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form values
            const emailOrPhone = emailOrPhoneInput.value.trim();
            const password = passwordInput.value.trim();
            const rememberMe = rememberCheckbox.checked;

            // Validate inputs
            if (!emailOrPhone || !password) {
                showError(loginForm, 'Please fill in all fields');
                return;
            }

            try {
                // Show loading state
                const submitBtn = loginForm.querySelector('.form__submit');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Logging in...';
                submitBtn.disabled = true;

                // Here you would typically make an API call to your backend
                // For now, we'll simulate a successful login
                await new Promise(resolve => setTimeout(resolve, 1500));

                // If remember me is checked, store the login info
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', emailOrPhone);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }

                // Redirect to home page or dashboard
                window.location.href = '/';

            } catch (error) {
                showError(loginForm, 'Invalid email/phone or password');
            } finally {
                // Reset button state
                const submitBtn = loginForm.querySelector('.form__submit');
                submitBtn.textContent = 'Log In';
                submitBtn.disabled = false;
            }
        });

        // Handle Google login
        const googleLoginBtn = loginForm.querySelector('.form__google');
        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    // Here you would implement Google OAuth
                    // For now, we'll simulate the process
                    console.log('Initiating Google login...');
                    // Redirect to Google OAuth page
                    // window.location.href = 'YOUR_GOOGLE_OAUTH_URL';
                } catch (error) {
                    showError(loginForm, 'Error with Google login');
                }
            });
        }

        // Handle forgot password
        const forgotPasswordLink = loginForm.querySelector('.forgot-password');
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                // Remove preventDefault to allow the link to work
                window.location.href = 'signup.html';
            });
        }

        // Check for remembered email
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            emailOrPhoneInput.value = rememberedEmail;
            rememberCheckbox.checked = true;
        }
    }

    // Signup Form Handling
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: signupForm.name.value,
                emailOrPhone: signupForm.emailOrPhone.value,
                password: signupForm.password.value,
                terms: signupForm.terms.checked
            };

            // Basic validation
            if (!formData.terms) {
                showError('Please agree to the Terms of Service and Privacy Policy');
                return;
            }

            if (formData.password.length < 6) {
                showError('Password must be at least 6 characters long');
                return;
            }

            try {
                // Here you would typically send the data to your backend
                // For now, we'll just store it in localStorage
                localStorage.setItem('userData', JSON.stringify({
                    name: formData.name,
                    emailOrPhone: formData.emailOrPhone
                }));

                // Redirect to login page after successful signup
                window.location.href = 'login.html';
            } catch (error) {
                showError('An error occurred. Please try again.');
            }
        });
    }

    // Google Signup Button
    const googleSignupBtn = document.querySelector('.form__google');
    if (googleSignupBtn) {
        googleSignupBtn.addEventListener('click', () => {
            // Here you would implement Google OAuth
            alert('Google signup functionality will be implemented soon');
        });
    }

    // Helper function to show error messages
    function showError(form, message) {
        // Remove existing error message
        const existingError = form.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create and show new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        form.insertBefore(errorDiv, form.firstChild);

        // Remove error message after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    // Initialize all functionality
    initProduct();
    initProductGrid();
    initNewArrivalSlider();

    // Cart functionality
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');

    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cartItems.length;
        }
    }

    function addToCart(productId) {
        // Check if product is already in cart
        if (!cartItems.includes(productId)) {
            cartItems.push(productId);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Added to cart successfully!';
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    }

    // Wishlist functionality
    let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

    function toggleWishlist(productId) {
        const wishlistBtn = event.currentTarget;
        const index = wishlistItems.indexOf(productId);
        
        if (index === -1) {
            // Add to wishlist
            wishlistItems.push(productId);
            wishlistBtn.classList.add('active');
            showNotification('Added to wishlist');
        } else {
            // Remove from wishlist
            wishlistItems.splice(index, 1);
            wishlistBtn.classList.remove('active');
            showNotification('Removed from wishlist');
        }
        
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Initialize cart count on page load
    updateCartCount();

    // Initialize wishlist buttons
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        const productLink = button.closest('.product-card').querySelector('a');
        if (productLink && productLink.href) {
            const productId = productLink.href.split('id=')[1];
            if (productId && wishlistItems.includes(productId)) {
                button.classList.add('active');
            }
        }
    });
});

// Page-specific functionality

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }
});

// Product card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Make products visible by default
        card.classList.add('visible');
        
        // Add hover effect for additional styling
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });
});


