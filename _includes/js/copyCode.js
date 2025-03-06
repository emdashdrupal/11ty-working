document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach((codeBlock) => {
    // Create button
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.innerHTML = '<i class="fa-regular fa-clipboard"></i>';
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
        button.innerHTML = '<i class="fa-solid fa-check"></i>';
        button.classList.add('copied');

        setTimeout(() => {
          button.innerHTML = '<i class="fa-regular fa-clipboard"></i>';
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        button.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      }
    });
  });
});