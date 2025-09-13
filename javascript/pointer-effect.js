// Custom Spaceship Cursor Effect
document.addEventListener('DOMContentLoaded', function() {
  // Create custom cursor element
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  // Track mouse movement
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let isScrolling = false;
  
  // Mouse move event
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Scroll event
  let scrollTimeout;
  document.addEventListener('scroll', () => {
    isScrolling = true;
    cursor.classList.add('scrolling');
    
    // Remove scrolling class after scroll stops
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      cursor.classList.remove('scrolling');
    }, 150);
  });
  
  // Hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
    });
  });
  
  // Smooth cursor animation
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
});
