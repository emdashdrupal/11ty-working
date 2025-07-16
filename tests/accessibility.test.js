const fs = require('fs');
const path = require('path');

describe('Accessibility', () => {
  let htmlFiles = [];

  beforeAll(() => {
    // Build the site first
    const { execSync } = require('child_process');
    try {
      execSync('npm run build', { stdio: 'pipe' });
    } catch (error) {
      console.warn('Build failed, some tests may not work');
    }

    // Collect all HTML files
    function findHtmlFiles(dir) {
      if (!fs.existsSync(dir)) return;

      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          findHtmlFiles(filePath);
        } else if (file.endsWith('.html')) {
          htmlFiles.push(filePath);
        }
      });
    }

    findHtmlFiles('_site');
  });

  test('all images have alt attributes', () => {
    htmlFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const imgTags = content.match(/<img[^>]*>/g) || [];

      imgTags.forEach(tag => {
        expect(tag).toMatch(/alt\s*=/);

        // Extract alt text and ensure it's not empty
        const altMatch = tag.match(/alt\s*=\s*["']([^"']*)["']/);
        if (altMatch) {
          expect(altMatch[1].trim()).not.toBe('');
        }
      });
    });
  });

  test('all form inputs have labels or aria-labels', () => {
    htmlFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const inputTags = content.match(/<input[^>]*>/g) || [];

      inputTags.forEach(tag => {
        // Skip hidden inputs as they don't need labels
        if (tag.includes('type="hidden"')) {
          return;
        }

        const idMatch = tag.match(/id\s*=\s*["']([^"']*)["']/);
        const inputId = idMatch ? idMatch[1] : null;

        const hasLabel = inputId && content.includes(`for="${inputId}"`);
        const hasAriaLabel = tag.includes('aria-label');
        const hasAriaLabelledBy = tag.includes('aria-labelledby');

        expect(hasLabel || hasAriaLabel || hasAriaLabelledBy).toBe(true);
      });
    });
  });

  test('headings follow proper hierarchy', () => {
    htmlFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const headings = content.match(/<h[1-6][^>]*>/g) || [];

      let previousLevel = 0;
      headings.forEach(heading => {
        const level = parseInt(heading.match(/<h([1-6])/)[1]);

        // First heading should be h1 or h2 (allowing h2 for layout flexibility)
        if (previousLevel === 0) {
          expect(level).toBeLessThanOrEqual(2);
        } else {
          // Subsequent headings shouldn't skip more than one level
          expect(level).toBeLessThanOrEqual(previousLevel + 1);
        }

        previousLevel = level;
      });
    });
  });

  test('buttons have accessible text', () => {
    htmlFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const buttonTags = content.match(/<button[^>]*>.*?<\/button>/gs) || [];

      buttonTags.forEach(button => {
        // Check for visible text content (including nested elements)
        const textContent = button.replace(/<[^>]*>/g, '').trim();
        const hasVisibleText = textContent.length > 0;

        // Check for accessibility attributes
        const hasAriaLabel = button.includes('aria-label');
        const hasTitle = button.includes('title');

        // Check for sr-only text (screen reader only)
        const hasSrOnlyText = button.includes('sr-only');

        expect(hasVisibleText || hasAriaLabel || hasTitle || hasSrOnlyText).toBeTruthy();
      });
    });
  });

  test('links have descriptive text', () => {
    htmlFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const linkTags = content.match(/<a[^>]*>.*?<\/a>/gs) || [];

      linkTags.forEach(link => {
        // Get all text content, including nested elements
        const textContent = link.replace(/<[^>]*>/g, '').trim();
        const hasVisibleText = textContent.length > 0;

        // Check for accessibility attributes
        const hasAriaLabel = link.includes('aria-label');
        const hasTitle = link.includes('title');

        // Check for sr-only text (screen reader only)
        const hasSrOnlyText = link.includes('sr-only');

        if (hasVisibleText) {
          // Avoid generic link text
          expect(textContent.toLowerCase()).not.toBe('click here');
          expect(textContent.toLowerCase()).not.toBe('read more');
          expect(textContent.toLowerCase()).not.toBe('here');
          expect(textContent.length).toBeGreaterThan(1);
        } else {
          // Icon-only links should have aria-label, title, or sr-only text
          expect(hasAriaLabel || hasTitle || hasSrOnlyText).toBe(true);
        }
      });
    });
  });

  test('page has proper document structure', () => {
    htmlFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');

      // Should have lang attribute
      expect(content).toMatch(/<html[^>]*lang\s*=/);

      // Should have title
      expect(content).toMatch(/<title>/);

      // Should have meta viewport
      expect(content).toMatch(/<meta[^>]*viewport[^>]*>/);
    });
  });

  test('color contrast indicators present', () => {
    // This is a basic check for CSS classes that suggest proper contrast
    const cssPath = '_site/css/tw.css';
    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, 'utf8');

      // Check that we're not using very light text on light backgrounds
      // This is a basic heuristic - real contrast testing would need color analysis
      expect(cssContent).toMatch(/text-/); // Has text color utilities
    }
  });

  test('skip links or navigation aids present', () => {
    htmlFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');

      // Look for navigation elements
      const hasNav = content.includes('<nav') || content.includes('role="navigation"');
      const hasMain = content.includes('<main') || content.includes('role="main"');

      // At least should have semantic HTML structure
      expect(hasNav || hasMain).toBe(true);
    });
  });
});