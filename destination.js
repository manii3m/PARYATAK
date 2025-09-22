document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const placeCards = document.querySelectorAll('.place-card');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.querySelector('.search-btn');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter cards
            filterCards(filter);
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        searchCards(searchTerm);
    });

    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        searchCards(searchTerm);
    });

    // Filter cards based on category
    function filterCards(filter) {
        placeCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Search cards based on text content
    function searchCards(searchTerm) {
        placeCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const location = card.querySelector('.location').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || location.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Contact Guide button functionality
    placeCards.forEach(card => {
        const contactBtn = card.querySelector('.contact-guide-btn');
        contactBtn.addEventListener('click', function() {
            const placeName = card.querySelector('h3').textContent;
            const location = card.querySelector('.location').textContent;
            
            // Show contact modal or redirect
            showContactModal(placeName, location);
        });
    });

    // VR View button functionality
    placeCards.forEach(card => {
        const vrBtn = card.querySelector('.vr-view-btn');
        vrBtn.addEventListener('click', function() {
            const placeName = card.querySelector('h3').textContent;
            const location = card.querySelector('.location').textContent;
            
            // Show VR modal
            showVRModal(placeName, location);
        });
    });

    // Show contact modal
    function showContactModal(placeName, location) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'contact-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Contact Guide for ${placeName}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Place:</strong> ${placeName}</p>
                    <div class="contact-options">
                        <button class="contact-option-btn">
                            📞 Call Guide
                        </button>
                        <button class="contact-option-btn">
                            💬 WhatsApp
                        </button>
                        <button class="contact-option-btn">
                            📧 Email
                        </button>
                    </div>
                    <div class="guide-info">
                        <h4>Available Guides:</h4>
                        <div class="guide-list">
                            <div class="guide-item">
                                <div class="guide-avatar">👨‍💼</div>
                                <div class="guide-details">
                                    <h5>Rajesh Kumar</h5>
                                    <p>Local Expert • 5+ years experience</p>
                                    <div class="rating">⭐⭐⭐⭐⭐ 4.9</div>
                                </div>
                            </div>
                            <div class="guide-item">
                                <div class="guide-avatar">👩‍💼</div>
                                <div class="guide-details">
                                    <h5>Priya Singh</h5>
                                    <p>Nature Specialist • 3+ years experience</p>
                                    <div class="rating">⭐⭐⭐⭐⭐ 4.8</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyles = `
            .contact-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: #fff;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                animation: slideIn 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #e8e8e8;
            }
            
            .modal-header h3 {
                color: #2e4600;
                margin: 0;
                font-size: 1.3em;
            }
            
            .close-btn {
                background: none;
                border: none;
                font-size: 1.5em;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.3s ease;
            }
            
            .close-btn:hover {
                background: #f0f0f0;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .contact-options {
                display: flex;
                gap: 10px;
                margin: 20px 0;
                flex-wrap: wrap;
            }
            
            .contact-option-btn {
                background: #f8f9fa;
                border: 1px solid #e8e8e8;
                color: #2e4600;
                padding: 10px 15px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9em;
                flex: 1;
                min-width: 120px;
            }
            
            .contact-option-btn:hover {
                background: #2e4600;
                color: #fff;
                border-color: #2e4600;
            }
            
            .guide-info {
                margin-top: 20px;
            }
            
            .guide-info h4 {
                color: #2e4600;
                margin-bottom: 15px;
                font-size: 1.1em;
            }
            
            .guide-list {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .guide-item {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
                border: 1px solid #e8e8e8;
            }
            
            .guide-avatar {
                font-size: 2em;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #e8e8e8;
                border-radius: 50%;
            }
            
            .guide-details h5 {
                color: #2e4600;
                margin: 0 0 5px 0;
                font-size: 1em;
            }
            
            .guide-details p {
                color: #666;
                margin: 0 0 5px 0;
                font-size: 0.85em;
            }
            
            .rating {
                color: #d4a017;
                font-size: 0.8em;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;

        // Add styles to head
        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);

        // Add modal to body
        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', function() {
            modal.remove();
            styleSheet.remove();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
                styleSheet.remove();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modal.remove();
                styleSheet.remove();
            }
        });
    }

    // Add fadeIn animation styles
    const animationStyles = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);

    // Show VR modal
    function showVRModal(placeName, location) {
        // Create VR modal
        const modal = document.createElement('div');
        modal.className = 'vr-modal';
        modal.innerHTML = `
            <div class="vr-modal-content">
                <div class="vr-modal-header">
                    <h3 class="vr-modal-title">${placeName} - 360° VR View</h3>
                    <button class="vr-close-btn">&times;</button>
                </div>
                <div class="vr-viewer">
                    <div class="vr-loading">Loading VR Experience</div>
                    <img class="vr-image" src="" alt="${placeName} VR View" style="display: none;">
                </div>
                <div class="vr-controls">
                    <button class="vr-control-btn active" data-view="panorama">🌐 Panorama</button>
                    <button class="vr-control-btn" data-view="street">🛣️ Street View</button>
                    <button class="vr-control-btn" data-view="aerial">🛸 Aerial</button>
                    <button class="vr-control-btn" data-view="interactive">🎮 Interactive</button>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.appendChild(modal);

        // VR images data (you can replace with actual 360° images)
        const vrImages = {
            'Ranchi Hill': {
                panorama: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
                street: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
                aerial: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
                interactive: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop'
            },
            'Dassam Falls': {
                panorama: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
                street: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
                aerial: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
                interactive: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop'
            },
            'Betla National Park': {
                panorama: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
                street: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
                aerial: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
                interactive: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop'
            },
            'Hundru Falls': {
                panorama: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
                street: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
                aerial: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
                interactive: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop'
            },
            'Netarhat': {
                panorama: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
                street: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
                aerial: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
                interactive: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop'
            },
            'Patratu Valley': {
                panorama: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
                street: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
                aerial: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
                interactive: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop'
            }
        };

        // Load initial image
        const vrImage = modal.querySelector('.vr-image');
        const loading = modal.querySelector('.vr-loading');
        const currentImages = vrImages[placeName] || vrImages['Ranchi Hill'];
        
        // Simulate loading
        setTimeout(() => {
            vrImage.src = currentImages.panorama;
            vrImage.style.display = 'block';
            loading.style.display = 'none';
        }, 1500);

        // VR control functionality
        const controlBtns = modal.querySelectorAll('.vr-control-btn');
        controlBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const viewType = this.getAttribute('data-view');
                
                // Remove active class from all buttons
                controlBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show loading
                loading.style.display = 'block';
                vrImage.style.display = 'none';
                
                // Load new image
                setTimeout(() => {
                    vrImage.src = currentImages[viewType];
                    vrImage.style.display = 'block';
                    loading.style.display = 'none';
                }, 800);
            });
        });

        // Close modal functionality
        const closeBtn = modal.querySelector('.vr-close-btn');
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modal.remove();
            }
        });

        // Add mouse/touch controls for 360° view simulation
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        const vrViewer = modal.querySelector('.vr-viewer');
        
        vrViewer.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            vrViewer.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                currentX = e.clientX - startX;
                currentY = e.clientY - startY;
                
                // Simulate 360° rotation
                const rotationX = currentY * 0.1;
                const rotationY = currentX * 0.1;
                
                vrImage.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(1.1)`;
            }
        });

        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                vrViewer.style.cursor = 'grab';
                
                // Reset rotation
                setTimeout(() => {
                    vrImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }, 200);
            }
        });

        // Touch controls for mobile
        vrViewer.addEventListener('touchstart', function(e) {
            isDragging = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchmove', function(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.touches[0].clientX - startX;
                currentY = e.touches[0].clientY - startY;
                
                const rotationX = currentY * 0.1;
                const rotationY = currentX * 0.1;
                
                vrImage.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(1.1)`;
            }
        });

        document.addEventListener('touchend', function() {
            if (isDragging) {
                isDragging = false;
                setTimeout(() => {
                    vrImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }, 200);
            }
        });
    }

    // Initialize with all cards visible
    filterCards('all');
});
