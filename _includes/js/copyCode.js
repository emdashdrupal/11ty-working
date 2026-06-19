document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach((codeBlock) => {
    // Create button
    const button = document.createElement('button');
    button.className = 'copy-button';

    const icon = document.createElement('i');
    icon.className = 'fa-regular fa-clipboard';
    button.appendChild(icon);

    button.setAttribute('aria-label', 'Copy code to clipboard');

    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper relative';

    // Insert wrapper before codeBlock
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    // Move codeBlock into wrapper
    wrapper.appendChild(codeBlock);
    // Add button to wrapper
    wrapper.appendChild(button);

    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(codeBlock.textContent);
        icon.className = 'fa-solid fa-check';
        button.classList.add('copied');

        setTimeout(() => {
          icon.className = 'fa-regular fa-clipboard';
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        icon.className = 'fa-solid fa-xmark';
      }
    });
  });
});
