/**
 * About Page JavaScript
 * Handles timeline animations, skill bar animations, and form interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTimelineAnimations();
    initContactForm();
    initScrollAnimations();
    initSlideshow(); // Initialize slideshow
    initVerticalNavigation(); // Initialize vertical navigation
    initHorizontalSlideshow(); // Initialize horizontal scrolling slideshow
    initFlipCard(); // Initialize flip card
    initBackToTop(); // Initialize back to top button
    initPersonaSlideshow(); // Initialize persona slideshow
});

/**
 * Timeline Animations
 * Animates timeline items as they come into view
 */
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-content');
    
    // Intersection Observer for timeline animations
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all timeline items
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}


/**
 * Contact Form Functionality
 * Handles form submission and validation
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

/**
 * Scroll Animations
 * Adds fade-in animations to elements as they scroll into view
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.bio-text, .skill-category, .contact-item');
    
    // Intersection Observer for scroll animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Set initial state and observe elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(element);
    });
}

/**
 * Utility Functions
 */

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

/**
 * Smooth scrolling for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Keyboard navigation for slideshow
 */
document.addEventListener('keydown', function(e) {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer && isElementInViewport(slideshowContainer)) {
        if (e.key === 'ArrowLeft') {
            document.querySelector('.prev-btn')?.click();
        } else if (e.key === 'ArrowRight') {
            document.querySelector('.next-btn')?.click();
        }
    }
});

/**
 * Check if element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Parallax effect for header section
 */
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.about-header');
    
    if (header) {
        const rate = scrolled * -0.5;
        header.style.transform = `translateY(${rate}px)`;
    }
});

/**
 * Mobile menu toggle (if needed for responsive navigation)
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// Initialize mobile menu if elements exist
initMobileMenu();

/**
 * Performance optimization: Lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

/**
 * Slideshow functionality
 */
let currentSlideIndex = 8;
let autoSlideInterval;
const slides = [
    'images/about slideshow/IMG-20250907-WA0044.jpg',
    'images/about slideshow/IMG-20250907-WA0046.jpg',
    'images/about slideshow/IMG-20250907-WA0047.jpg',
    'images/about slideshow/IMG-20250907-WA0048.jpg',
    'images/about slideshow/IMG-20250907-WA0049.jpg',
    'images/about slideshow/IMG-20250907-WA0050.jpg',
    'images/about slideshow/IMG-20250907-WA0051.jpg',
    'images/about slideshow/IMG-20250907-WA0052.jpg',
    'images/about slideshow/IMG-20250907-WA0053.jpg',
    'images/about slideshow/IMG-20250907-WA0054.jpg',
    'images/about slideshow/IMG-20250907-WA0055.jpg',
    'images/about slideshow/IMG-20250907-WA0056.jpg',
    'images/about slideshow/WhatsApp Image 2025-09-07 at 10.28.43_9269f7b4.jpg'
];

function initSlideshow() {
    const mainSlide = document.getElementById('main-slide');
    const currentSlideSpan = document.getElementById('current-slide');
    const totalSlidesSpan = document.getElementById('total-slides');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (!mainSlide || !currentSlideSpan || !totalSlidesSpan) return;

    // Set total slides count
    totalSlidesSpan.textContent = slides.length;

    // Update slide function
    function updateSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentSlideIndex = index;
        
        // Update main image with fade effect
        mainSlide.style.opacity = '0';
        setTimeout(() => {
            mainSlide.src = slides[currentSlideIndex];
            mainSlide.alt = `Derek Joel George - Slide ${currentSlideIndex + 1}`;
            mainSlide.style.opacity = '1';
        }, 150);

        // Update counter
        currentSlideSpan.textContent = currentSlideIndex + 1;

        // Update thumbnails
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentSlideIndex);
        });
    }

    // Navigation functions
    function nextSlide() {
        updateSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
        updateSlide(currentSlideIndex - 1);
    }

    function goToSlide(index) {
        updateSlide(index);
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // Thumbnail click handlers
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => goToSlide(index));
    });

    // Auto-play functionality
    function startAutoPlay() {
        autoSlideInterval = setInterval(nextSlide, 4000); // Change every 4 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoSlideInterval);
    }

    // Pause auto-play on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopAutoPlay);
        slideshowContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Initialize
    updateSlide(8);
    startAutoPlay();
}

/**
 * Vertical Navigation with Scroll Spy
 * Highlights navigation items based on current section in view
 */
function initVerticalNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section[id], header[id], div[id]');
    
    // Smooth scrolling for navigation links
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate the position to center the section vertically
                const sectionTop = targetSection.offsetTop;
                const sectionHeight = targetSection.offsetHeight;
                const windowHeight = window.innerHeight;
                const scrollPosition = sectionTop - (windowHeight - sectionHeight) / 2;
                
                window.scrollTo({
                    top: Math.max(0, scrollPosition),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll spy functionality
    function updateActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.pageYOffset + 100; // Offset for better UX
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active navigation dot
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === currentSection) {
                dot.classList.add('active');
            }
        });
    }

    // Throttled scroll event listener
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveNav, 10);
    });

    // Initial call to set active section
    updateActiveNav();
}

// Horizontal Scrolling Slideshow Functionality
function initHorizontalSlideshow() {
    const slideshowTrack = document.getElementById('slideshowTrack');
    const slideshowContainer = document.querySelector('.slideshow-container');
    
    if (!slideshowTrack || !slideshowContainer) {
        console.log('Horizontal slideshow elements not found');
        return;
    }
    
    // Configuration
    const config = {
        scrollSpeed: 60, // seconds for one complete cycle
        pauseOnHover: true,
        smoothScrolling: true
    };
    
    // Add pause on hover functionality
    if (config.pauseOnHover) {
        slideshowContainer.addEventListener('mouseenter', pauseAnimation);
        slideshowContainer.addEventListener('mouseleave', resumeAnimation);
    }
    
    // Touch support removed to prevent refresh issues
    
    // Add keyboard controls
    addKeyboardControls();
    
    console.log('Horizontal slideshow initialized successfully');
    
    // Pause animation
    function pauseAnimation() {
        slideshowTrack.style.animationPlayState = 'paused';
    }
    
    // Resume animation
    function resumeAnimation() {
        slideshowTrack.style.animationPlayState = 'running';
    }
    
    
    // Add keyboard controls
    function addKeyboardControls() {
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case ' ':
                case 'Escape':
                    e.preventDefault();
                    toggleAnimation();
                    break;
            }
        });
    }
    
    // Toggle animation play/pause
    function toggleAnimation() {
        const isPaused = slideshowTrack.style.animationPlayState === 'paused';
        slideshowTrack.style.animationPlayState = isPaused ? 'running' : 'paused';
    }
    
    // Handle visibility change (pause when tab is not active)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseAnimation();
        } else {
            resumeAnimation();
        }
    });
    
    // Performance optimization
    function optimizePerformance() {
        slideshowTrack.style.willChange = 'transform';
        
        setTimeout(() => {
            slideshowTrack.style.willChange = 'auto';
        }, 1000);
    }
    
    optimizePerformance();
}

// Flip Card Functionality - Following W3Schools Guide (Hover-based)
function initFlipCard() {
    const flipCard = document.getElementById('flipCard');
    
    if (!flipCard) {
        console.log('Flip card element not found');
        return;
    }
    
    console.log('Flip card initialized successfully - hover to flip');
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

/**
 * Persona Slideshow functionality
 * Handles navigation between persona cards
 */
function initPersonaSlideshow() {
    const slides = document.querySelectorAll('.persona-slide');
    const dots = document.querySelectorAll('.persona-dot');
    const prevBtn = document.querySelector('.persona-nav-btn.prev');
    const nextBtn = document.querySelector('.persona-nav-btn.next');
    
    if (!slides.length || !dots.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active', 'prev'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Add prev class to previous slide for animation
        const prevIndex = index === 0 ? totalSlides - 1 : index - 1;
        slides[prevIndex].classList.add('prev');
        
        // Update button states
        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === totalSlides - 1;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Initialize first slide
    showSlide(0);
    
    console.log('Persona slideshow initialized successfully');
}

