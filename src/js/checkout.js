// Form elements
const checkoutForm = document.querySelector(".billing-form");
const formInputs = document.querySelectorAll(".form-input");
const placeOrderBtn = document.querySelector(".place-order-btn");
const orderSummary = document.querySelector(".order-summary");
const shippingMethods = document.querySelectorAll(".shipping-method");
const paymentMethods = document.querySelectorAll(".payment-method");

// Validation patterns
const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[\d\s-]{10,}$/,
};

// Error messages
const errorMessages = {
    required: "This field is required",
    email: "Please enter a valid email address",
    phone: "Please enter a valid phone number",
};

// Add loading state to button
function setLoadingState(isLoading) {
    if (isLoading) {
        placeOrderBtn.textContent = "Processing...";
        placeOrderBtn.disabled = true;
    } else {
        placeOrderBtn.textContent = "Place Order";
        placeOrderBtn.disabled = false;
    }
}

// Validate form input
function validateInput(input) {
    const value = input.value.trim();
    const type = input.type || input.getAttribute('data-type');
    const isRequired = input.hasAttribute('required');

    // Remove existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Check if required field is empty
    if (isRequired && !value) {
        showError(input, errorMessages.required);
        return false;
    }

    // Validate based on input type
    if (value) {
        switch (type) {
            case 'email':
                if (!patterns.email.test(value)) {
                    showError(input, errorMessages.email);
                    return false;
                }
                break;
            case 'tel':
                if (!patterns.phone.test(value)) {
                    showError(input, errorMessages.phone);
                    return false;
                }
                break;
        }
    }

    return true;
}

// Show error message
function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
    input.classList.add('error');
}

// Real-time validation
formInputs.forEach((input) => {
    input.addEventListener("blur", () => {
        validateInput(input);
    });

    input.addEventListener("input", () => {
        // Remove error styling on input
        input.style.borderColor = "";
        const errorMessage = input.parentElement.querySelector(".error-message");
        if (errorMessage) {
            errorMessage.remove();
        }
    });
});

// Handle form submission
if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Get form data
        const formData = new FormData(checkoutForm);
        const data = Object.fromEntries(formData.entries());

        // Add shipping and payment method
        const selectedShipping = document.querySelector('.shipping-method:checked');
        const selectedPayment = document.querySelector('.payment-method:checked');
        
        if (selectedShipping) {
            data.shippingMethod = selectedShipping.value;
            data.shippingCost = selectedShipping.dataset.cost;
        }
        
        if (selectedPayment) {
            data.paymentMethod = selectedPayment.value;
        }

        try {
            setLoadingState(true);
            
            // Here you would typically send the data to your backend
            console.log('Submitting order:', data);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            alert('Order placed successfully!');
            window.location.href = '/order-confirmation';
            
        } catch (error) {
            console.error('Error placing order:', error);
            alert('There was an error placing your order. Please try again.');
        } finally {
            setLoadingState(false);
        }
    });
}

// Handle shipping method selection
if (shippingMethods.length > 0) {
    shippingMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            const cost = parseFloat(e.target.dataset.cost || 0);
            updateOrderSummary({ shipping: cost });
        });
    });
}

// Handle payment method selection
if (paymentMethods.length > 0) {
    paymentMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            const paymentForms = document.querySelectorAll('.payment-form');
            paymentForms.forEach(form => form.style.display = 'none');
            
            const selectedForm = document.querySelector(`.${e.target.value}-form`);
            if (selectedForm) {
                selectedForm.style.display = 'block';
            }
        });
    });
}

// Update order summary
function updateOrderSummary(updates) {
    if (!orderSummary) return;

    const subtotal = parseFloat(orderSummary.dataset.subtotal || 0);
    const shipping = updates.shipping || parseFloat(orderSummary.dataset.shipping || 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    // Update displayed values
    const shippingElement = orderSummary.querySelector('.shipping-cost');
    const taxElement = orderSummary.querySelector('.tax-cost');
    const totalElement = orderSummary.querySelector('.total-cost');

    if (shippingElement) shippingElement.textContent = window.utils.formatPrice(shipping);
    if (taxElement) taxElement.textContent = window.utils.formatPrice(tax);
    if (totalElement) totalElement.textContent = window.utils.formatPrice(total);

    // Update data attributes
    orderSummary.dataset.shipping = shipping;
    orderSummary.dataset.tax = tax;
    orderSummary.dataset.total = total;
}

// Format phone number as user types
const phoneInput = document.querySelector("#phone");
phoneInput.addEventListener("input", (e) => {
    // Remove all non-digits
    let value = e.target.value.replace(/\D/g, "");

    // Format with spaces
    if (value.length > 0) {
        value = value.match(new RegExp(".{1,4}", "g")).join(" ");
    }

    e.target.value = value;
});

// Initialize search functionality
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Implement search functionality here
        console.log("Searching for:", searchTerm);
    }
});

// Mobile menu toggle (if needed)
const mobileMenuBtn = document.createElement("button");
mobileMenuBtn.className = "mobile-menu-btn";
mobileMenuBtn.setAttribute("aria-label", "Toggle mobile menu");
mobileMenuBtn.style.display = "none";

// Show/hide mobile menu button based on screen size
function handleMobileMenu() {
    if (window.innerWidth <= 991) {
        mobileMenuBtn.style.display = "block";
    } else {
        mobileMenuBtn.style.display = "none";
    }
}

window.addEventListener("resize", handleMobileMenu);
handleMobileMenu();

// Price formatting
function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
}

// Update prices if needed
function updatePrices() {
    const priceElements = document.querySelectorAll(".amount");
    priceElements.forEach((el) => {
        const price = parseFloat(el.textContent);
        if (!isNaN(price)) {
            el.textContent = formatPrice(price);
        }
    });
}

// Initialize price formatting
updatePrices();

document.addEventListener('DOMContentLoaded', function() {
    // Initialize checkout
    function initCheckout() {
        // Save original button text
        if (placeOrderBtn) {
            placeOrderBtn.setAttribute('data-original-text', placeOrderBtn.textContent);
        }

        // Handle shipping method selection
        if (shippingMethods.length > 0) {
            shippingMethods.forEach(method => {
                method.addEventListener('change', updateShipping);
            });
        }

        // Handle payment method selection
        if (paymentMethods.length > 0) {
            paymentMethods.forEach(method => {
                method.addEventListener('change', updatePayment);
            });
        }

        // Handle form submission
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', handleCheckout);
        }
    }

    // Update shipping method
    function updateShipping(e) {
        const method = e.target;
        if (method.checked) {
            // Update shipping cost
            const shippingCost = parseFloat(method.dataset.cost || 0);
            updateOrderSummary({ shipping: shippingCost });
        }
    }

    // Update payment method
    function updatePayment(e) {
        const method = e.target;
        if (method.checked) {
            // Show/hide payment form fields based on method
            const paymentForms = document.querySelectorAll('.payment-form');
            paymentForms.forEach(form => form.style.display = 'none');
            
            const selectedForm = document.querySelector(`.${method.value}-form`);
            if (selectedForm) {
                selectedForm.style.display = 'block';
            }
        }
    }

    // Handle checkout submission
    function handleCheckout(e) {
        e.preventDefault();

        // Validate form
        if (!window.utils.validateForm(checkoutForm)) {
            return;
        }

        // Set loading state
        window.utils.setLoadingState(placeOrderBtn, true);

        // Simulate API call
        setTimeout(() => {
            // Reset loading state
            window.utils.setLoadingState(placeOrderBtn, false);

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Order placed successfully!';
            checkoutForm.appendChild(successMessage);

            // Redirect to thank you page
            setTimeout(() => {
                window.location.href = '/thank-you.html';
            }, 2000);
        }, 1500);
    }

    // Initialize checkout
    initCheckout();
}); 