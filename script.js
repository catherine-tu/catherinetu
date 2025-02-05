// PDF Preview functionality for notes.html
document.addEventListener('DOMContentLoaded', function() {
    const pdfPreviews = document.querySelectorAll('.pdf-preview');
    
    if (pdfPreviews.length > 0) {  // Only run on notes page
        pdfPreviews.forEach(preview => {
            preview.style.cursor = 'pointer';
            preview.addEventListener('click', function() {
                const pdfLink = this.closest('.note-card').querySelector('.view-notes').href;
                if (pdfLink) {
                    window.open(pdfLink, '_blank');
                }
            });
        });
        return;  // Exit early on notes page
    }
    
    // Below this line is only for home page
    const bubbleContainer = document.querySelector('.bubble-container');
    if (!bubbleContainer) return;  // Exit if not on home page
    
    // Home page animations
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        bubble.style.setProperty('--start-x', `${Math.random() * 100}vw`);
        bubble.style.setProperty('--x-drift', `${(Math.random() - 0.5) * 40}vw`);
        bubble.style.setProperty('--y-drift', `${(Math.random() - 0.5) * 20}vh`);
        bubble.style.setProperty('--bubble-opacity', `${Math.random() * 0.3 + 0.1}`);
        
        bubbleContainer.appendChild(bubble);
        
        bubble.addEventListener('animationend', () => {
            bubbleContainer.removeChild(bubble);
        });
    }
    
    // Create initial bubbles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createBubble(), Math.random() * 2000);
    }
    
    // Continue creating bubbles
    setInterval(createBubble, 300);
    
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

// Smooth scroll for arrow click
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    const projectsSection = document.querySelector('.projects');
    projectsSection.scrollIntoView({ behavior: 'smooth' });
});
