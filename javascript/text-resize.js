// Text Resize Functionality for Mobile
document.addEventListener('DOMContentLoaded', function() {
    // Create text resize controls
    function createTextResizeControls() {
        const controls = document.createElement('div');
        controls.className = 'text-resize-controls';
        controls.innerHTML = `
            <button class="text-resize-btn" id="decrease-text" aria-label="Decrease text size" title="Decrease text size">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13H5v-2h14v2z"/>
                </svg>
            </button>
            <span class="text-size-indicator" id="text-size-indicator">100%</span>
            <button class="text-resize-btn" id="increase-text" aria-label="Increase text size" title="Increase text size">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
            </button>
        `;
        
        // Add to body
        document.body.appendChild(controls);
        
        // Add event listeners
        const decreaseBtn = document.getElementById('decrease-text');
        const increaseBtn = document.getElementById('increase-text');
        const indicator = document.getElementById('text-size-indicator');
        
        let currentSize = 100;
        
        function updateTextSize() {
            document.documentElement.style.setProperty('--text-scale', currentSize / 100);
            indicator.textContent = currentSize + '%';
            
            // Add visual feedback
            indicator.style.transform = 'scale(1.1)';
            setTimeout(() => {
                indicator.style.transform = 'scale(1)';
            }, 200);
            
            // Save to localStorage
            localStorage.setItem('textSize', currentSize);
        }
        
        function decreaseTextSize() {
            if (currentSize > 80) {
                currentSize -= 10;
                updateTextSize();
            }
        }
        
        function increaseTextSize() {
            if (currentSize < 150) {
                currentSize += 10;
                updateTextSize();
            }
        }
        
        decreaseBtn.addEventListener('click', decreaseTextSize);
        increaseBtn.addEventListener('click', increaseTextSize);
        
        // Load saved text size
        const savedSize = localStorage.getItem('textSize');
        if (savedSize) {
            currentSize = parseInt(savedSize);
            updateTextSize();
        }
    }
    
    // Only show on mobile devices
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Create controls if mobile
    if (isMobile()) {
        createTextResizeControls();
    }
    
    // Recreate controls on resize if switching to mobile
    window.addEventListener('resize', function() {
        const existingControls = document.querySelector('.text-resize-controls');
        if (isMobile() && !existingControls) {
            createTextResizeControls();
        } else if (!isMobile() && existingControls) {
            existingControls.remove();
        }
    });
});
