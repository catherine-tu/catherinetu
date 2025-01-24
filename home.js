// home.js - Handles home page animations
document.addEventListener('DOMContentLoaded', function() {
    const bubbleContainer = document.querySelector('.bubble-container');
    
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Random size between 20px and 80px
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random starting position along the bottom
        bubble.style.setProperty('--start-x', `${Math.random() * 100}vw`);
        // Random drift between -40vw and +40vw
        bubble.style.setProperty('--x-drift', `${(Math.random() - 0.5) * 40}vw`);
        
        bubbleContainer.appendChild(bubble);
        
        // Remove bubble after animation completes
        bubble.addEventListener('animationend', () => {
            bubbleContainer.removeChild(bubble);
        });
    }
    
    // Create initial set of bubbles with random delays
    const initialBubbles = 8; 
    for (let i = 0; i < initialBubbles; i++) {
        setTimeout(() => createBubble(), Math.random() * 2000); 
    }
    
    // Create additional bubbles with varied intervals
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createBubble();
            // Add 1-3 extra bubbles randomly
            if (Math.random() < 0.3) {
                setTimeout(createBubble, Math.random() * 300);
            }
        }, 1000 + Math.random() * 3000); 
    }
    
    // Continue creating bubbles with random intervals
    setInterval(() => {
        createBubble();
        // Occasionally create an extra bubble
        if (Math.random() < 0.2) {
            setTimeout(createBubble, Math.random() * 400);
        }
    }, 800 + Math.random() * 400); 
    
    // Typing animation
    const title = document.querySelector('.animate-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        
        async function typeText() {
            title.classList.add('typing-animation');
            for (let i = 0; i < text.length; i++) {
                title.textContent += text[i];
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            while (title.textContent.length > 0) {
                title.textContent = title.textContent.slice(0, -1);
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            await new Promise(resolve => setTimeout(resolve, 500));
            
            typeText();
        }
        
        typeText();
    }
    
    // Scroll reveal
    function revealOnScroll() {
        document.querySelectorAll('.scroll-reveal').forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
