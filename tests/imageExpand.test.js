require('@testing-library/jest-dom');

describe('Image Expand', () => {
  let images;

  beforeAll(() => {
    // Setup initial DOM
    // JSDOM has partial support for HTMLDialogElement. We need to mock showModal and close
    window.HTMLDialogElement.prototype.showModal = jest.fn();
    window.HTMLDialogElement.prototype.close = jest.fn();

    document.documentElement.innerHTML = `
      <head></head>
      <body>
        <article>
          <img src="test1.jpg" alt="Test 1" title="Title 1" />
          <img src="test2.jpg" alt="Test 2" />
        </article>
        <div>
          <img src="ignore.jpg" alt="Ignore" />
        </div>
      </body>
    `;

    // Require script only once
    require('../_includes/js/imageExpand.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  beforeEach(() => {
    images = document.querySelectorAll('article img');
    jest.clearAllMocks();
  });

  test('creates a dialog element', () => {
    const dialog = document.querySelector('dialog.image-dialog');
    expect(dialog).toBeInTheDocument();
  });

  test('makes article images clickable and updates cursor', () => {
    images.forEach(img => {
      expect(img.style.cursor).toBe('pointer');
    });

    const ignoredImage = document.querySelector('div img');
    expect(ignoredImage.style.cursor).not.toBe('pointer');
  });

  test('opens dialog with cloned image on click', () => {
    const dialog = document.querySelector('dialog.image-dialog');
    const firstImg = images[0];

    firstImg.click();

    expect(dialog.showModal).toHaveBeenCalledTimes(1);
    const expandedImg = dialog.querySelector('img');
    expect(expandedImg).toBeInTheDocument();
    expect(expandedImg.src).toContain('test1.jpg');
    expect(expandedImg.alt).toBe('Test 1');
    expect(expandedImg.title).toBe('Title 1');
  });

  test('clears previous image from dialog when a new image is clicked', () => {
    const dialog = document.querySelector('dialog.image-dialog');

    images[0].click();
    expect(dialog.querySelectorAll('img').length).toBe(1);

    images[1].click();
    expect(dialog.querySelectorAll('img').length).toBe(1);
    expect(dialog.querySelector('img').src).toContain('test2.jpg');
  });

  test('closes dialog when clicking outside the image', () => {
    const dialog = document.querySelector('dialog.image-dialog');

    // Mock getBoundingClientRect for dialog
    dialog.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: 100,
      width: 500,
      height: 500
    }));

    images[0].click();

    // Click inside
    const insideClick = new MouseEvent('click', {
      clientX: 200,
      clientY: 200,
      bubbles: true
    });
    dialog.dispatchEvent(insideClick);
    expect(dialog.close).not.toHaveBeenCalled();

    // Click outside
    const outsideClick = new MouseEvent('click', {
      clientX: 50,
      clientY: 50,
      bubbles: true
    });
    dialog.dispatchEvent(outsideClick);
    expect(dialog.close).toHaveBeenCalledTimes(1);
  });
});
