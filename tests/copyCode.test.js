// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe('Copy Code to Clipboard', () => {
  beforeAll(() => {
    document.documentElement.innerHTML = `
      <head></head>
      <body>
        <pre><code>const test = 'Hello World';</code></pre>
        <pre><code>let a = 1;</code></pre>
      </body>
    `;

    // Require script only once
    require('../_includes/js/copyCode.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('adds copy buttons to all pre>code blocks', () => {
    const buttons = document.querySelectorAll('.copy-button');
    expect(buttons.length).toBe(2);

    const wrappers = document.querySelectorAll('.code-wrapper');
    expect(wrappers.length).toBe(2);

    expect(buttons[0]).toHaveAttribute('aria-label', 'Copy code to clipboard');
    expect(buttons[0].querySelector('i')).toHaveClass('fa-regular', 'fa-clipboard');
  });

  test('copies code to clipboard on click and updates icon', async () => {
    jest.useFakeTimers();
    const button = document.querySelectorAll('.copy-button')[0];
    const codeBlock = document.querySelectorAll('code')[0];
    const icon = button.querySelector('i');

    // Click to copy
    button.click();

    // Since writeText is async, we need to wait for promises to resolve
    await Promise.resolve();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(codeBlock.textContent);
    expect(icon).toHaveClass('fa-solid', 'fa-check');
    expect(button).toHaveClass('copied');

    // Advance timers for setTimeout to revert icon
    jest.advanceTimersByTime(2000);

    expect(icon).toHaveClass('fa-regular', 'fa-clipboard');
    expect(button).not.toHaveClass('copied');

    jest.useRealTimers();
  });

  test('handles clipboard error', async () => {
    // Mock failure
    navigator.clipboard.writeText.mockImplementationOnce(() => Promise.reject(new Error('Failed')));

    const button = document.querySelectorAll('.copy-button')[1];
    const icon = button.querySelector('i');

    // Silence console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    button.click();
    await Promise.resolve();

    expect(icon).toHaveClass('fa-solid', 'fa-xmark');

    consoleSpy.mockRestore();
  });
});
