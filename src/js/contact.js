// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
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

            try {
                // Show loading state
                Swal.fire({
                    title: 'Sending message...',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    willOpen: () => {
                        Swal.showLoading();
                    }
                });

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                await showSuccess('Message sent successfully!');
                contactForm.reset();
            } catch (error) {
                showError('An error occurred. Please try again.');
            }
        });
    }
    
    // Function to show error messages using SweetAlert2
    function showError(message) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            timer: 3000,
            showConfirmButton: false
        });
    }
    
    // Function to show success messages using SweetAlert2
    function showSuccess(message) {
        return Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: message,
            timer: 1500,
            showConfirmButton: false
        });
    }
}); 