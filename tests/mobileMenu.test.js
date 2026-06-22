require('@testing-library/jest-dom');

describe('Mobile Menu Toggle', () => {
  let menuToggle;
  let menubar;

  beforeAll(() => {
    // Setup initial DOM
    document.documentElement.innerHTML = `
      <head></head>
      <body>
        <button id="menuToggle" aria-expanded="false"></button>
        <div id="menubar" class="hidden"></div>
      </body>
    `;

    // Require script ONLY ONCE so listeners don't pile up
    require('../_includes/js/mobileMenu.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  beforeEach(() => {
    menuToggle = document.getElementById('menuToggle');
    menubar = document.getElementById('menubar');

    // Reset state before each test
    menubar.className = 'hidden';
    menuToggle.setAttribute('aria-expanded', 'false');
    global.innerWidth = 1024;
  });

  test('toggles the mobile menu on click', () => {
    expect(menubar).toHaveClass('hidden');
    expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

    menuToggle.click();

    expect(menubar).not.toHaveClass('hidden');
    expect(menuToggle).toHaveAttribute('aria-expanded', 'true');

    menuToggle.click();

    expect(menubar).toHaveClass('hidden');
    expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('closes menu when clicking outside if expanded and window width < 768', () => {
    global.innerWidth = 500;

    // Ensure state matches
    window.dispatchEvent(new Event('resize'));
    expect(menubar).toHaveClass('hidden');

    // Open menu
    menuToggle.click();
    expect(menubar).not.toHaveClass('hidden');

    // Click outside
    document.dispatchEvent(new Event('click'));

    expect(menubar).toHaveClass('hidden');
    expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('does not close menu when clicking outside if window width >= 768', () => {
    global.innerWidth = 800;

    menuToggle.click();
    expect(menubar).not.toHaveClass('hidden');

    // Click outside
    document.dispatchEvent(new Event('click'));

    expect(menubar).not.toHaveClass('hidden');
  });

  test('adjusts menu visibility on window resize', () => {
    menuToggle.click();
    expect(menubar).not.toHaveClass('hidden');

    // Resize back to small screen
    global.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));

    expect(menubar).toHaveClass('hidden');
    expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  });
});
