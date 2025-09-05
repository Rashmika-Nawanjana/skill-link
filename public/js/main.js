// SkillLink Frontend JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                // In a real app, this would trigger a search
                window.location.href = `/mentors?search=${encodeURIComponent(query)}`;
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Category card hover effects
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Mentor card interactions
    const mentorCards = document.querySelectorAll('.mentor-card');
    mentorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Mobile menu toggle
    const createMobileMenu = function() {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.style.cssText = `
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-dark);
                cursor: pointer;
                position: absolute;
                right: 2rem;
                top: 1rem;
            `;
            
            navbar.appendChild(mobileMenuBtn);
            
            mobileMenuBtn.addEventListener('click', function() {
                navMenu.style.display = navMenu.style.display === 'none' ? 'flex' : 'none';
            });
        }
    };
    
    // Form validation
    const validateForms = function() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = '#ff4757';
                        
                        // Remove error styling after user starts typing
                        field.addEventListener('input', function() {
                            this.style.borderColor = '#e4e5e7';
                        });
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    alert('Please fill in all required fields.');
                }
            });
        });
    };
    
    // Smooth scrolling for anchor links
    const smoothScroll = function() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };
    
    // Initialize features
    createMobileMenu();
    validateForms();
    smoothScroll();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        createMobileMenu();
    });
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const originalText = this.textContent;
            
            // Don't add loading state to navigation buttons
            if (this.tagName === 'A' || this.type === 'button') {
                return;
            }
            
            this.textContent = 'Loading...';
            this.style.opacity = '0.7';
            
            // Reset after 2 seconds (in real app, this would be when request completes)
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
            }, 2000);
        });
    });
    
    // Add search suggestions (mock functionality)
    if (searchInput) {
        const suggestions = [
            'violin lessons',
            'pottery classes',
            'sword fighting',
            'archery training',
            'flamenco dance',
            'yoga meditation',
            'cooking classes',
            'guitar lessons',
            'martial arts',
            'painting techniques'
        ];
        
        searchInput.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            
            // Remove existing suggestions
            const existingSuggestions = document.querySelector('.search-suggestions');
            if (existingSuggestions) {
                existingSuggestions.remove();
            }
            
            if (value.length > 2) {
                const matchingSuggestions = suggestions.filter(suggestion => 
                    suggestion.includes(value)
                );
                
                if (matchingSuggestions.length > 0) {
                    const suggestionsDiv = document.createElement('div');
                    suggestionsDiv.className = 'search-suggestions';
                    suggestionsDiv.style.cssText = `
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: white;
                        border: 1px solid #e4e5e7;
                        border-top: none;
                        border-radius: 0 0 6px 6px;
                        max-height: 200px;
                        overflow-y: auto;
                        z-index: 10;
                    `;
                    
                    matchingSuggestions.slice(0, 5).forEach(suggestion => {
                        const suggestionItem = document.createElement('div');
                        suggestionItem.textContent = suggestion;
                        suggestionItem.style.cssText = `
                            padding: 0.8rem 1rem;
                            cursor: pointer;
                            border-bottom: 1px solid #f0f0f0;
                        `;
                        
                        suggestionItem.addEventListener('mouseenter', function() {
                            this.style.backgroundColor = '#f8f9fa';
                        });
                        
                        suggestionItem.addEventListener('mouseleave', function() {
                            this.style.backgroundColor = 'white';
                        });
                        
                        suggestionItem.addEventListener('click', function() {
                            searchInput.value = suggestion;
                            suggestionsDiv.remove();
                            searchBtn.click();
                        });
                        
                        suggestionsDiv.appendChild(suggestionItem);
                    });
                    
                    const searchBar = this.closest('.search-bar');
                    searchBar.style.position = 'relative';
                    searchBar.appendChild(suggestionsDiv);
                }
            }
        });
        
        // Close suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-bar')) {
                const suggestions = document.querySelector('.search-suggestions');
                if (suggestions) {
                    suggestions.remove();
                }
            }
        });
    }
    
    console.log('SkillLink frontend initialized successfully!');
});
