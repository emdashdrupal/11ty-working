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
        const hasLabel = content.includes(`for="${tag.match(/id\s*=\s*["']([^"']*)["']/)?.[1]}"`);
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
        const hasText = button.match(/>([^<]+)</)?.[1]?.trim();
        const hasAriaLabel = button.includes('aria-label');
        const hasTitle = button.includes('title');

        expect(hasText || hasAriaLabel || hasTitle).toBeTruthy();
      });
    });
  });

  test('links have descriptive text', () => {
    htmlFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const linkTags = content.match(/<a[^>]*>.*?<\/a>/gs) || [];

      linkTags.forEach(link => {
        const linkText = link.match(/>([^<]+)</)?.[1]?.trim();
        const hasAriaLabel = link.includes('aria-label');

        if (linkText) {
          // Avoid generic link text
          expect(linkText.toLowerCase()).not.toBe('click here');
          expect(linkText.toLowerCase()).not.toBe('read more');
          expect(linkText.toLowerCase()).not.toBe('here');
          expect(linkText.length).toBeGreaterThan(1);
        } else {
          // If no text, should have aria-label
          expect(hasAriaLabel).toBe(true);
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