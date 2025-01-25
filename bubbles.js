document.addEventListener('DOMContentLoaded', () => {
    const bubbles = document.querySelectorAll('.bubble');
    const maxDistance = 100; // Reduced distance for more immediate reaction
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        bubbles.forEach(bubble => {
            const rect = bubble.getBoundingClientRect();
            const bubbleX = rect.left + rect.width / 2;
            const bubbleY = rect.top + rect.height / 2;

            // Calculate distance between mouse and bubble
            const deltaX = mouseX - bubbleX;
            const deltaY = mouseY - bubbleY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < maxDistance) {
                // Much stronger repulsion force
                const force = (1 - distance / maxDistance) * 100; // Increased from 30 to 100
                
                // More dramatic movement
                const moveX = -deltaX / distance * force;
                const moveY = -deltaY / distance * force;
                
                // Add a sudden jolt in the opposite direction of the mouse
                const joltX = deltaX > 0 ? -20 : 20;
                const joltY = deltaY > 0 ? -20 : 20;
                
                bubble.style.transform = `translate(${moveX + joltX}px, ${moveY + joltY}px)`;
                bubble.style.transition = 'transform 0.1s ease-out'; // Faster transition
            } else {
                bubble.style.transform = 'none';
                bubble.style.transition = 'transform 0.3s ease-out'; // Slower return
            }
        });
    });
});
