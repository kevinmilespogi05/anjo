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

    // Helper function to show error messages using SweetAlert2
    function showError(form, message) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            timer: 3000,
            showConfirmButton: false
        });
    }

    // Helper function to show success messages using SweetAlert2
    function showSuccess(message, timer = 1500) {
        return Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: message,
            timer: timer,
            showConfirmButton: false
        });
    }

    // Helper function to show notifications using SweetAlert2
    function showNotification(message, icon = 'success') {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });

        Toast.fire({
            icon: icon,
            title: message
        });
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
                // Show loading state using SweetAlert2
                Swal.fire({
                    title: 'Logging in...',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    willOpen: () => {
                        Swal.showLoading();
                    }
                });

                // Here you would typically make an API call to your backend
                // For now, we'll simulate a successful login
                await new Promise(resolve => setTimeout(resolve, 1500));

                // If remember me is checked, store the login info
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', emailOrPhone);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }

                // Show success message and redirect
                await showSuccess('Login successful!');
                window.location.href = 'index.html';

            } catch (error) {
                showError(loginForm, 'Invalid email/phone or password');
            }
        });

        // Handle Google login
        const googleLoginBtn = loginForm.querySelector('.form__google');
        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    showNotification('Google login coming soon...', 'info');
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
                name: signupForm.name.value.trim(),
                emailOrPhone: signupForm.emailOrPhone.value.trim(),
                password: signupForm.password.value.trim(),
                confirmPassword: signupForm.confirmPassword.value.trim(),
                terms: signupForm.terms.checked
            };

            // Validate name
            if (!formData.name) {
                showError(signupForm, 'Please enter your name');
                return;
            }

            if (!utils.patterns.name.test(formData.name)) {
                showError(signupForm, 'Please enter a valid name (letters and spaces only)');
                return;
            }

            // Validate email/phone
            if (!formData.emailOrPhone) {
                showError(signupForm, 'Please enter your email or phone number');
                return;
            }

            const isEmail = utils.patterns.email.test(formData.emailOrPhone);
            const isPhone = utils.patterns.phone.test(formData.emailOrPhone);

            if (!isEmail && !isPhone) {
                showError(signupForm, 'Please enter a valid email address or phone number');
                return;
            }

            // Validate password
            if (!formData.password) {
                showError(signupForm, 'Please enter a password');
                return;
            }

            if (formData.password.length < 8) {
                showError(signupForm, 'Password must be at least 8 characters long');
                return;
            }

            if (!utils.patterns.password.test(formData.password)) {
                showError(signupForm, 'Password must contain at least one letter and one number');
                return;
            }

            if (formData.password !== formData.confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Password Mismatch',
                    text: 'The passwords you entered do not match',
                    confirmButtonColor: '#DB4444'
                });
                return;
            }

            // Validate terms
            if (!formData.terms) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Terms & Conditions',
                    text: 'Please agree to the Terms of Service and Privacy Policy to continue',
                    confirmButtonColor: '#DB4444'
                });
                return;
            }

            try {
                // Show loading state with a custom design
                Swal.fire({
                    title: 'Creating your account...',
                    html: 'Please wait while we set up your account',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                    background: '#fff',
                    customClass: {
                        title: 'swal-title',
                        popup: 'swal-popup'
                    }
                });

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Store user data
                localStorage.setItem('userData', JSON.stringify({
                    name: formData.name,
                    emailOrPhone: formData.emailOrPhone
                }));

                // Show success message with a nice animation
                await Swal.fire({
                    icon: 'success',
                    title: 'Welcome to AfordaShop!',
                    text: 'Your account has been created successfully',
                    timer: 2000,
                    showConfirmButton: false,
                    background: '#fff',
                    customClass: {
                        popup: 'swal-popup',
                        title: 'swal-title'
                    }
                });

                // Redirect to login page
                window.location.href = 'login.html';
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error occurred while creating your account. Please try again.',
                    confirmButtonColor: '#DB4444'
                });
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
            
            showNotification('Added to cart successfully!');
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
            showNotification('Removed from wishlist', 'info');
        }
        
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
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


