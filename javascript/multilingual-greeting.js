// Multilingual Greeting Effect
document.addEventListener('DOMContentLoaded', function() {
  const greetingElement = document.querySelector('.hero h1');
  
  if (!greetingElement) return;
  
  // Multilingual greetings - only the greeting part changes
  const greetings = [
    { text: "Hello, I'm", lang: "English" },
    { text: "Hola, soy", lang: "Spanish" },
    { text: "Bonjour, je suis", lang: "French" },
    { text: "Hallo, ich bin", lang: "German" },
    { text: "Ciao, sono", lang: "Italian" },
    { text: "Olá, eu sou", lang: "Portuguese" },
    { text: "Привет, я", lang: "Russian" },
    { text: "こんにちは、私は", lang: "Japanese" },
    { text: "你好，我是", lang: "Chinese" },
    { text: "안녕하세요, 저는", lang: "Korean" },
    { text: "مرحبا، أنا", lang: "Arabic" },
    { text: "नमस्ते, मैं", lang: "Hindi" },
    { text: "שלום, אני", lang: "Hebrew" },
    { text: "Merhaba, ben", lang: "Turkish" },
    { text: "Hej, jag är", lang: "Swedish" },
    { text: "Hei, jeg er", lang: "Norwegian" },
    { text: "Hej, jeg er", lang: "Danish" },
    { text: "Tere, ma olen", lang: "Estonian" },
    { text: "Sveiki, es esmu", lang: "Latvian" },
    { text: "Labas, aš esu", lang: "Lithuanian" }
  ];
  
  // Static name
  const staticName = "Derek Joel George";
  
  // Create the structure with separate elements
  greetingElement.innerHTML = `
    <span class="greeting-text">Hello, I'm</span> 
    <span class="static-name">${staticName}</span>
  `;
  
  const greetingTextElement = greetingElement.querySelector('.greeting-text');
  const staticNameElement = greetingElement.querySelector('.static-name');
  
  // Add flip transition from top to bottom
  greetingTextElement.style.transition = 'transform 0.6s ease-in-out';
  greetingTextElement.style.transformOrigin = 'top';
  
  let currentIndex = 0;
  let isAnimating = false;
  
  // Function to update the greeting
  function updateGreeting() {
    if (isAnimating) return;
    
    isAnimating = true;
    const currentGreeting = greetings[currentIndex];
    
    // Flip down - rotate around top edge
    greetingTextElement.style.transform = 'rotateX(90deg)';
    
    setTimeout(() => {
      // Update the text content
      greetingTextElement.textContent = currentGreeting.text;
      
      // Flip back up - rotate back to normal
      greetingTextElement.style.transform = 'rotateX(0deg)';
      
      // Move to next greeting
      currentIndex = (currentIndex + 1) % greetings.length;
      
      // Reset animation state after the flip completes
      setTimeout(() => {
        isAnimating = false;
      }, 600); // Wait for the 0.6s transition to complete
    }, 300); // Wait for flip down to complete
  }
  
  // Start the cycle
  updateGreeting();
  
  // Change greeting every 3 seconds
  setInterval(updateGreeting, 3000);
  
  // Optional: Add click to manually cycle through greetings
  greetingElement.style.cursor = 'pointer';
  greetingElement.addEventListener('click', updateGreeting);
  
  // Add language indicator (optional)
  const languageIndicator = document.createElement('div');
  languageIndicator.style.cssText = `
    position: absolute;
    top: -30px;
    left: 0;
    font-size: 0.8rem;
    color: var(--text-color-secondary);
    opacity: 0.7;
    transition: opacity 0.3s ease;
  `;
  
  function updateLanguageIndicator() {
    const currentGreeting = greetings[currentIndex];
    languageIndicator.textContent = currentGreeting.lang;
  }
  
  // Insert language indicator
  greetingElement.style.position = 'relative';
  greetingElement.appendChild(languageIndicator);
  
  // Update language indicator
  updateLanguageIndicator();
  setInterval(updateLanguageIndicator, 3000);
});
