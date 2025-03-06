document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const items = dropdown.querySelectorAll('[role="menuitem"]');

        button.addEventListener('click', (e) => {
            e.preventDefault();
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('show');

            if (!isExpanded) {
                items[0]?.focus();
            }
        });

        // Handle keyboard navigation
        dropdown.addEventListener('keydown', (e) => {
            const activeElement = document.activeElement;
            const isButton = activeElement === button;
            const isMenuItem = activeElement.getAttribute('role') === 'menuitem';

            // ESC key closes dropdown
            if (e.key === 'Escape') {
                button.setAttribute('aria-expanded', 'false');
                menu.classList.remove('show');
                button.focus();
            }

            if (isButton) {
                // Space/Enter opens dropdown
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    button.click();
                }
            }

            if (isMenuItem) {
                const index = parseInt(activeElement.dataset.index);

                switch(e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        items[(index + 1) % items.length]?.focus();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        items[index - 1 >= 0 ? index - 1 : items.length - 1]?.focus();
                        break;
                    case 'Home':
                        e.preventDefault();
                        items[0]?.focus();
                        break;
                    case 'End':
                        e.preventDefault();
                        items[items.length - 1]?.focus();
                        break;
                }
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                button.setAttribute('aria-expanded', 'false');
                menu.classList.remove('show');
            }
        });
    });
});