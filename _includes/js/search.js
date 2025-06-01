document.addEventListener('DOMContentLoaded', () => {
    const searchToggle = document.getElementById('searchToggle');
    const searchContainer = document.getElementById('search');

    searchToggle.addEventListener('click', () => {
        const isExpanded = searchToggle.getAttribute('aria-expanded') === 'true';
        searchToggle.setAttribute('aria-expanded', !isExpanded);
        searchContainer.classList.toggle('hidden');

        if (!isExpanded) {
            // Focus the search input when expanding
            setTimeout(() => {
                const searchInput = searchContainer.querySelector('input');
                if (searchInput) searchInput.focus();
            }, 100);
        }
    });

    // Close search when clicking outside
    document.addEventListener('click', (event) => {
        if (!searchContainer.contains(event.target) &&
            !searchToggle.contains(event.target) &&
            !searchContainer.classList.contains('hidden')) {
            searchContainer.classList.add('hidden');
            searchToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close search on escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !searchContainer.classList.contains('hidden')) {
            searchContainer.classList.add('hidden');
            searchToggle.setAttribute('aria-expanded', 'false');
        }
    });
});