document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const menubar = document.getElementById('menubar');

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menubar.classList.toggle('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!menubar.contains(event.target) &&
            !menuToggle.contains(event.target) &&
            !menubar.classList.contains('hidden') &&
            window.innerWidth < 768) {
            menubar.classList.add('hidden');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            menubar.classList.remove('hidden');
        } else {
            menubar.classList.add('hidden');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});