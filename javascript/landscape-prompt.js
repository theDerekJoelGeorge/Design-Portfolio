// Landscape Orientation Prompt
document.addEventListener('DOMContentLoaded', function() {
    const landscapePrompt = document.getElementById('landscape-prompt');
    const landscapeCanvas = document.getElementById('landscape-particle-canvas');
    
    if (!landscapePrompt) return;
    
    // Landscape particle effect variables
    let landscapeCtx = null;
    let landscapeParticles = [];
    let landscapeAnimationId = null;
    
    // Initialize landscape particle effect
    function initLandscapeParticles() {
        if (!landscapeCanvas) return;
        
        landscapeCtx = landscapeCanvas.getContext('2d');
        landscapeCanvas.width = window.innerWidth;
        landscapeCanvas.height = window.innerHeight;
        
        // Create particles for landscape prompt
        landscapeParticles = [];
        const particleCount = Math.min(50, Math.floor((window.innerWidth * window.innerHeight) / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            landscapeParticles.push({
                x: Math.random() * landscapeCanvas.width,
                y: Math.random() * landscapeCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
        
        animateLandscapeParticles();
    }
    
    // Animate landscape particles
    function animateLandscapeParticles() {
        if (!landscapeCtx || !landscapeCanvas) return;
        
        landscapeCtx.clearRect(0, 0, landscapeCanvas.width, landscapeCanvas.height);
        
        // Draw particles
        landscapeParticles.forEach(p => {
            landscapeCtx.beginPath();
            landscapeCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            landscapeCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            landscapeCtx.fill();
        });
        
        // Update particle positions
        landscapeParticles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            // Wrap around screen
            if (p.x < 0) p.x = landscapeCanvas.width;
            if (p.x > landscapeCanvas.width) p.x = 0;
            if (p.y < 0) p.y = landscapeCanvas.height;
            if (p.y > landscapeCanvas.height) p.y = 0;
        });
        
        if (landscapePrompt.style.display === 'flex') {
            landscapeAnimationId = requestAnimationFrame(animateLandscapeParticles);
        }
    }
    
    // Stop landscape particle animation
    function stopLandscapeParticles() {
        if (landscapeAnimationId) {
            cancelAnimationFrame(landscapeAnimationId);
            landscapeAnimationId = null;
        }
    }
    
    function checkOrientation() {
        const isMobile = window.innerWidth <= 768;
        const isPortrait = window.innerHeight > window.innerWidth;
        
        if (isMobile && isPortrait) {
            landscapePrompt.style.display = 'flex';
            // Prevent scrolling when prompt is shown
            document.body.style.overflow = 'hidden';
            // Initialize particles when prompt is shown
            setTimeout(initLandscapeParticles, 100);
        } else {
            landscapePrompt.style.display = 'none';
            // Restore scrolling when prompt is hidden
            document.body.style.overflow = '';
            // Stop particle animation when prompt is hidden
            stopLandscapeParticles();
        }
    }
    
    // Check orientation on load
    checkOrientation();
    
    // Check orientation on resize/orientation change
    window.addEventListener('resize', function() {
        // Update canvas size when window resizes
        if (landscapeCanvas && landscapeCtx) {
            landscapeCanvas.width = window.innerWidth;
            landscapeCanvas.height = window.innerHeight;
        }
        checkOrientation();
    });
    window.addEventListener('orientationchange', function() {
        // Small delay to ensure orientation change is complete
        setTimeout(checkOrientation, 100);
    });
    
    // Prevent any clicks from navigating away
    landscapePrompt.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Don't dismiss on click - let users rotate their device instead
    });
    
    // Prevent any form submissions or link clicks within the prompt
    landscapePrompt.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    
    landscapePrompt.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            e.stopPropagation();
        }
    });
    
    // Add escape key to dismiss
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && landscapePrompt.style.display === 'flex') {
            landscapePrompt.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});
