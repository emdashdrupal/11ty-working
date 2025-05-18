document.addEventListener('DOMContentLoaded', () => {
    // Create dialog element
    const dialog = document.createElement('dialog');
    dialog.classList.add('image-dialog');
    document.body.appendChild(dialog);

    // Get all images in the article content
    const images = document.querySelectorAll('article img');

    images.forEach(img => {
        // Make images clickable
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', () => {
            // Create expanded image
            const expandedImg = document.createElement('img');
            expandedImg.src = img.src;
            expandedImg.alt = img.alt;
            expandedImg.title = img.title;
            
            // Clear and update dialog content
            dialog.innerHTML = '';
            dialog.appendChild(expandedImg);
            
            // Show dialog
            dialog.showModal();
        });
    });

    // Close dialog when clicking outside the image
    dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
            && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        
        if (!isInDialog) {
            dialog.close();
        }
    });
});