document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.getElementById('explore-btn');
    const facilitiesSection = document.querySelector('.heading2');
    const navbar = document.querySelector('.navbar');
    const videoContainer = document.querySelector('.video-container');

    // Smooth scroll functionality
    exploreBtn.addEventListener('click', function() {
        facilitiesSection.scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Navbar opacity on scroll
    window.addEventListener('scroll', function() {
        const videoBottom = videoContainer.offsetHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition > videoBottom - 100) {
            navbar.classList.add('opaque');
        } else {
            navbar.classList.remove('opaque');
        }
    });

    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Toggle dropdown on click
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdown.classList.remove('active');
            }
        });
    });
});