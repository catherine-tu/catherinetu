console.log('Script starting...');

function filterCards() {
    console.log('Filtering cards...');
    const activeType = document.querySelector('.filter-btn[data-type].active');
    const activeClass = document.querySelector('.filter-btn[data-class].active');
    
    const typeFilter = activeType ? activeType.dataset.type : 'all';
    const classFilter = activeClass ? activeClass.dataset.class : 'all';
    
    console.log('Filters:', { typeFilter, classFilter });

    document.querySelectorAll('.note-card').forEach(card => {
        const matchesType = typeFilter === 'all' || card.dataset.type === typeFilter;
        const matchesClass = classFilter === 'all' || card.dataset.class === classFilter;
        card.style.display = matchesType && matchesClass ? '' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');

    // Add click handlers to filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.onclick = function() {
            console.log('Button clicked:', this.dataset);
            
            // Remove active class from siblings
            const group = this.parentElement;
            group.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter the cards
            filterCards();
        };
    });

    // Handle PDF preview clicks
    document.querySelectorAll('.pdf-preview').forEach(preview => {
        preview.onclick = function() {
            const link = this.closest('.note-card').querySelector('.view-notes');
            if (link && link.href) {
                window.open(link.href, '_blank');
            }
        };
    });
});


