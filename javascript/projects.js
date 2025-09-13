/**
 * Projects Page JavaScript
 * Handles project interactions and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initProjectAnimations();
    initBackToTop();
});

/**
 * Project Card Animations
 * Animates project cards as they come into view
 */
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Back to Top Button Functionality
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) {
        console.log('Back to top button not found');
        return;
    }
    
    // Show/hide button based on scroll position
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
    
    // Scroll to top when clicked
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Event listeners
    window.addEventListener('scroll', toggleBackToTop);
    backToTopButton.addEventListener('click', scrollToTop);
    
    console.log('Back to top button initialized successfully');
}

