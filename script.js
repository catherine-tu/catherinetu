// Typing animation
function setupTypingAnimation() {
    const title = document.querySelector('.animate-title');
    const text = title.textContent;
    title.textContent = '';  // Clear the text
    
    async function typeText() {
        title.classList.add('typing-animation');
        for (let i = 0; i < text.length; i++) {
            title.textContent += text[i];
            await new Promise(resolve => setTimeout(resolve, 100));  // Adjust speed here
        }
        await new Promise(resolve => setTimeout(resolve, 2000));  // Pause at the end
        
        // Delete text
        while (title.textContent.length > 0) {
            title.textContent = title.textContent.slice(0, -1);
            await new Promise(resolve => setTimeout(resolve, 50));  // Faster deletion
        }
        await new Promise(resolve => setTimeout(resolve, 500));  // Pause before restarting
        
        // Restart animation
        typeText();
    }
    
    typeText();
}

// Scroll reveal animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Bubble animation
function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const size = Math.random() * 60 + 20; // Size between 20px and 80px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Random starting position and movement
    bubble.style.setProperty('--start-x', `${Math.random() * 100}vw`);
    bubble.style.setProperty('--x-drift', `${(Math.random() - 0.5) * 40}vw`);
    bubble.style.setProperty('--y-drift', `${(Math.random() - 0.5) * 40}vh`);
    bubble.style.setProperty('--bubble-opacity', `${Math.random() * 0.4 + 0.2}`); // More visible opacity
    
    bubble.style.animation = `float ${Math.random() * 10 + 15}s linear`;
    
    document.querySelector('.bubble-container').appendChild(bubble);
    
    // Remove bubble after animation
    bubble.addEventListener('animationend', () => {
        bubble.remove();
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Create initial set of bubbles
    for(let i = 0; i < 20; i++) {
        setTimeout(() => createBubble(), i * 200);
    }
    
    // Continue creating bubbles
    setInterval(createBubble, 1000);
    
    // Setup scroll reveal
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    setupTypingAnimation();
});

// Smooth scroll for arrow click
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    const projectsSection = document.querySelector('.projects');
    projectsSection.scrollIntoView({ behavior: 'smooth' });
});
