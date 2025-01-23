// notes.js - Handles PDF preview clicks
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.pdf-preview').forEach(preview => {
        preview.style.cursor = 'pointer';
        preview.addEventListener('click', function() {
            const pdfLink = this.closest('.note-card').querySelector('.view-notes').href;
            if (pdfLink) {
                window.open(pdfLink, '_blank');
            }
        });
    });
});
