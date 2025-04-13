// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showError('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            // If validation passes, you can handle the form submission here
            // For now, we'll just show a success message
            showSuccess('Message sent successfully!');
            contactForm.reset();
        });
    }
    
    // Function to show error messages
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Remove any existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add the new error message
        const form = document.getElementById('contactForm');
        form.insertBefore(errorDiv, form.firstChild);
        
        // Remove the error message after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
    
    // Function to show success messages
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        // Remove any existing success messages
        const existingSuccess = document.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        // Add the new success message
        const form = document.getElementById('contactForm');
        form.insertBefore(successDiv, form.firstChild);
        
        // Remove the success message after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}); 