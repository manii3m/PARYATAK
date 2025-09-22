document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const typeButtons = document.querySelectorAll('.type-btn');
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const authPanels = document.querySelectorAll('.auth-panel');
    const loginForms = document.querySelectorAll('.login-form');
    const signupForms = document.querySelectorAll('.signup-form');

    // Type switching functionality
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            // Remove active class from all type buttons
            typeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all auth panels
            authPanels.forEach(panel => panel.classList.remove('active'));
            // Show selected panel
            document.getElementById(`${type}-panel`).classList.add('active');
            
            // Reset to login form when switching types
            showLoginForm();
        });
    });

    // Login/Signup toggle functionality
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            
            // Remove active class from all toggle buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            if (mode === 'login') {
                showLoginForm();
            } else {
                showSignupForm();
            }
        });
    });

    // Function to show login form
    function showLoginForm() {
        loginForms.forEach(form => form.classList.remove('active'));
        signupForms.forEach(form => form.classList.remove('active'));
        
        // Show login form for active panel
        const activePanel = document.querySelector('.auth-panel.active');
        const loginForm = activePanel.querySelector('.login-form');
        loginForm.classList.add('active');
    }

    // Function to show signup form
    function showSignupForm() {
        loginForms.forEach(form => form.classList.remove('active'));
        signupForms.forEach(form => form.classList.remove('active'));
        
        // Show signup form for active panel
        const activePanel = document.querySelector('.auth-panel.active');
        const signupForm = activePanel.querySelector('.signup-form');
        signupForm.classList.add('active');
    }

    // Form submission handling
    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formType = this.closest('.auth-panel').id;
            const isLogin = this.classList.contains('login-form');
            
            // Basic validation
            if (validateForm(this)) {
                // Simulate form submission
                handleFormSubmission(formType, isLogin, formData);
            }
        });
    });

    // Form validation
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else {
                clearFieldError(input);
            }
        });

        // Password confirmation validation
        const password = form.querySelector('input[name="password"]');
        const confirmPassword = form.querySelector('input[name="confirm-password"]');
        
        if (password && confirmPassword) {
            if (password.value !== confirmPassword.value) {
                showFieldError(confirmPassword, 'Passwords do not match');
                isValid = false;
            }
        }

        // Email validation
        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            if (input.value && !isValidEmail(input.value)) {
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            }
        });

        return isValid;
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show field error
    function showFieldError(input, message) {
        clearFieldError(input);
        
        input.style.borderColor = '#e74c3c';
        input.style.backgroundColor = '#fdf2f2';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.8em';
        errorDiv.style.marginTop = '5px';
        
        input.parentNode.appendChild(errorDiv);
    }

    // Clear field error
    function clearFieldError(input) {
        input.style.borderColor = '#e6f2e6';
        input.style.backgroundColor = '#f9f9f9';
        
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Handle form submission
    function handleFormSubmission(formType, isLogin, formData) {
        const submitBtn = document.querySelector('.auth-panel.active .submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showSuccessMessage(formType, isLogin);
            
            // Clear form
            const activeForm = document.querySelector('.auth-panel.active form');
            activeForm.reset();
            
        }, 2000);
    }

    // Show success message
    function showSuccessMessage(formType, isLogin) {
        const message = isLogin ? 
            `Successfully logged in as ${formType}!` : 
            `Successfully registered as ${formType}!`;
        
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✓</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #2e4600, #006400);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(46, 70, 0, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }, 3000);
    }

    // Add real-time validation
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                showFieldError(this, 'This field is required');
            } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                showFieldError(this, 'Please enter a valid email address');
            } else {
                clearFieldError(this);
            }
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    // Initialize with user login form
    showLoginForm();
});
