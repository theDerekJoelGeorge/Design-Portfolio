// Particle Background
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Detect mobile device
function isMobile() {
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Get particle speed based on device type
function getParticleSpeed() {
  return isMobile() ? 0.2 : 0.5; // Slower on mobile
}

// Create particles
for (let i = 0; i < 80; i++) {
  const speed = getParticleSpeed();
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * speed,
    dy: (Math.random() - 0.5) * speed,
  });
}

// Draw particles
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.8)";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Update positions
function update() {
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    // Wrap around edges
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });
}

// Animation loop
function animate() {
  draw();
  update();
  requestAnimationFrame(animate);
}
animate();

// Resize canvas when window resizes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Update particle speeds based on new screen size
  const speed = getParticleSpeed();
  particles.forEach(p => {
    const currentSpeed = Math.sqrt(p.dx * p.dx + p.dy * p.dy);
    const directionX = p.dx / currentSpeed;
    const directionY = p.dy / currentSpeed;
    p.dx = directionX * speed;
    p.dy = directionY * speed;
  });
});

// Active navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Function to remove active class from all links
  function removeActiveClass() {
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
  }
  
  // Function to add active class to clicked link
  function setActiveLink(clickedLink) {
    removeActiveClass();
    clickedLink.classList.add('active');
  }
  
  // Add click event listeners to all navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default for internal links (not external like Resume)
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
      }
      setActiveLink(this);
    });
  });
});