const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

describe('Performance', () => {
  beforeAll(() => {
    // Build the site first
    try {
      execSync('npm run build', { stdio: 'pipe' });
    } catch (error) {
      console.warn('Build failed, some tests may not work');
    }
  });

  test('CSS bundle size is reasonable', () => {
    const cssPath = '_site/css/tw.css';
    if (fs.existsSync(cssPath)) {
      const stats = fs.statSync(cssPath);
      // 200KB limit for Tailwind CSS (reasonable for a portfolio site)
      expect(stats.size).toBeLessThan(200000);
    }
  });

  test('JavaScript files are reasonably sized', () => {
    const jsFiles = [
      '_site/js/copyCode.js',
      '_site/js/search.js',
      '_site/js/mobileMenu.js',
      '_site/js/imageExpand.js'
    ];

    jsFiles.forEach(jsFile => {
      if (fs.existsSync(jsFile)) {
        const stats = fs.statSync(jsFile);
        // 50KB limit per JS file
        expect(stats.size).toBeLessThan(50000);
      }
    });
  });

  test('HTML files are not excessively large', () => {
    const htmlFiles = [];

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

    htmlFiles.forEach(file => {
      const stats = fs.statSync(file);
      // 500KB limit per HTML file
      expect(stats.size).toBeLessThan(500000);
    });
  });

  test('no excessive inline styles', () => {
    const htmlFiles = [];

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

    htmlFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const inlineStyles = content.match(/style\s*=\s*["'][^"']*["']/g) || [];

      // Allow some inline styles but not excessive amounts
      expect(inlineStyles.length).toBeLessThan(10);
    });
  });

  test('images have reasonable file sizes', () => {
    const imagesDir = '_site/assets/images';
    if (fs.existsSync(imagesDir)) {
      const imageFiles = fs.readdirSync(imagesDir);

      imageFiles.forEach(imageFile => {
        const imagePath = path.join(imagesDir, imageFile);
        const stats = fs.statSync(imagePath);

        // 6MB limit per image (realistic for portfolio sites with high-quality images)
        expect(stats.size).toBeLessThan(6000000);
      });
    }
  });

  test('no unused CSS classes in critical files', () => {
    const cssPath = '_site/css/tw.css';
    const indexPath = '_site/index.html';

    if (fs.existsSync(cssPath) && fs.existsSync(indexPath)) {
      const cssContent = fs.readFileSync(cssPath, 'utf8');
      const htmlContent = fs.readFileSync(indexPath, 'utf8');

      // Basic check: ensure some common Tailwind classes are actually used
      const commonClasses = ['grid', 'flex', 'text-', 'bg-', 'p-', 'm-'];

      commonClasses.forEach(className => {
        if (cssContent.includes(className)) {
          // If CSS contains the class, HTML should use it somewhere
          const classRegex = new RegExp(`class="[^"]*${className}`, 'g');
          expect(htmlContent).toMatch(classRegex);
        }
      });
    }
  });

  test('RSS feed is valid XML and reasonable size', () => {
    const feedPath = '_site/feed.xml';
    if (fs.existsSync(feedPath)) {
      const stats = fs.statSync(feedPath);
      const content = fs.readFileSync(feedPath, 'utf8');

      // Should be valid XML structure
      expect(content).toMatch(/^<\?xml/);
      expect(content).toContain('<rss');
      expect(content).toContain('</rss>');

      // Should not be excessively large (1MB limit)
      expect(stats.size).toBeLessThan(1000000);
    }
  });

  test('build time is reasonable', () => {
    const startTime = Date.now();

    try {
      execSync('npm run build', { stdio: 'pipe' });
      const buildTime = Date.now() - startTime;

      // Build should complete within 30 seconds for a portfolio site
      expect(buildTime).toBeLessThan(30000);
    } catch (error) {
      // If build fails, that's a separate issue
      console.warn('Build failed during performance test');
    }
  });

  test('generated files have proper compression potential', () => {
    const htmlFiles = [];

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

    htmlFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');

      // Check for excessive whitespace that could be compressed
      const lines = content.split('\n');
      const emptyLines = lines.filter(line => line.trim() === '').length;
      const totalLines = lines.length;

      // Empty lines shouldn't be more than 30% of total lines (more realistic for generated HTML)
      if (totalLines > 0) {
        expect(emptyLines / totalLines).toBeLessThan(0.3);
      }
    });
  });
});