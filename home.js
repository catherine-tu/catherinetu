// home.js - Handles home page animations
document.addEventListener('DOMContentLoaded', function() {
    const bubbleContainer = document.querySelector('.bubble-container');
    let mouseX = 0;
    let mouseY = 0;
    const maxDistance = 120; // Reduced detection range
    const force = 150; // Reduced force

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        requestAnimationFrame(updateAllBubbles);
    });
    
    function updateAllBubbles() {
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach(bubble => {
            const rect = bubble.getBoundingClientRect();
            const bubbleX = rect.left + rect.width / 2;
            const bubbleY = rect.top + rect.height / 2;

            const deltaX = mouseX - bubbleX;
            const deltaY = mouseY - bubbleY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < maxDistance) {
                // Calculate repulsion
                const repulsion = (1 - distance / maxDistance) * force;
                const angle = Math.atan2(deltaY, deltaX);
                
                // Calculate movement
                const moveX = -Math.cos(angle) * repulsion;
                const moveY = -Math.sin(angle) * repulsion;
                
                // Add smaller jolt
                const joltX = deltaX > 0 ? -40 : 40;
                const joltY = deltaY > 0 ? -40 : 40;

                bubble.style.transform = `translate(${moveX + joltX}px, ${moveY + joltY}px)`;
            } else {
                bubble.style.transform = 'translate(0, 0)';
            }
        });
    }
    
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
    const initialBubbles = 12; // Increased from 8 to 12
    for (let i = 0; i < initialBubbles; i++) {
        setTimeout(() => createBubble(), Math.random() * 2000); 
    }
    
    // Create additional bubbles with varied intervals
    for (let i = 0; i < 15; i++) { // Increased from 10 to 15
        setTimeout(() => {
            createBubble();
            // Add 1-3 extra bubbles randomly
            if (Math.random() < 0.4) { // Increased chance from 0.3 to 0.4
                setTimeout(createBubble, Math.random() * 300);
                if (Math.random() < 0.3) { // Additional chance for a third bubble
                    setTimeout(createBubble, Math.random() * 400);
                }
            }
        }, 1000 + Math.random() * 3000); 
    }
    
    // Continue creating bubbles with shorter intervals
    setInterval(() => {
        createBubble();
        // Occasionally create extra bubbles
        if (Math.random() < 0.3) { // Increased chance from 0.2 to 0.3
            setTimeout(createBubble, Math.random() * 300);
            if (Math.random() < 0.2) { // Chance for a third bubble
                setTimeout(createBubble, Math.random() * 400);
            }
        }
    }, 600 + Math.random() * 400); // Reduced from 800 to 600
    
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
    
    // Preload slideshow images
    const slideshowImages = [
        'images/mit-logs-pfp.jpg',
        'images/fishing.jpg',
        'images/nano.jpg',
        'images/robo-comp.jpg',
        'images/org-lights.jpg',
    ];
    
    function preloadImages() {
        slideshowImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Start preloading immediately
    preloadImages();
    
    // Initialize slideshow only after first image is loaded
    const firstSlide = document.querySelector('.slide img');
    if (firstSlide) {
        if (firstSlide.complete) {
            initializeSlideshow();
        } else {
            firstSlide.onload = initializeSlideshow;
        }
    }
    
    function initializeSlideshow() {
        const slides = document.getElementsByClassName("slide");
        // Show first slide immediately
        slides[0].classList.add("active");
        
        // Initialize slideshow functionality
        let currentSlideIndex = 1;
        let autoAdvanceTimer;
        
        showSlide(currentSlideIndex);

        function changeSlide(n) {
            showSlide(currentSlideIndex += n);
            // Reset the timer whenever slide is changed manually
            resetAutoAdvance();
        }

        function currentSlide(n) {
            showSlide(currentSlideIndex = n);
            // Reset the timer when directly selecting a slide
            resetAutoAdvance();
        }

        function showSlide(n) {
            if (n > slides.length) {
                currentSlideIndex = 1;
            }
            if (n < 1) {
                currentSlideIndex = slides.length;
            }
            
            // Hide all slides
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active");
            }
            
            // Remove active class from all dots
            const dots = document.getElementsByClassName("dot");
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove("active");
            }
            
            // Show current slide and activate corresponding dot
            slides[currentSlideIndex - 1].classList.add("active");
            dots[currentSlideIndex - 1].classList.add("active");
        }

        function resetAutoAdvance() {
            // Clear the existing timer
            clearInterval(autoAdvanceTimer);
            // Start a new timer
            autoAdvanceTimer = setInterval(() => {
                changeSlide(1);
            }, 5000);
        }

        // Make functions globally accessible
        window.changeSlide = changeSlide;
        window.currentSlide = currentSlide;

        // Start the initial auto-advance timer
        resetAutoAdvance();
    }
});
