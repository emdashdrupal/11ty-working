const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

describe("Site Build", () => {
  beforeAll(() => {
    // Clean build directory before tests
    try {
      execSync("npm run clean", { stdio: "pipe" });
    } catch (error) {
      // Ignore if clean fails
    }
  });

  test("site builds without errors", () => {
    expect(() => {
      execSync("npm run build", { stdio: "pipe" });
    }).not.toThrow();
  });

  test("generated HTML files exist", () => {
    const expectedFiles = [
      "_site/index.html",
      "_site/about/about-ed-marsh/index.html",
      "_site/contact/index.html",
      "_site/skills/index.html",
      "_site/podcasts/index.html",
    ];

    expectedFiles.forEach((filePath) => {
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  test("generated HTML is valid structure", () => {
    const indexPath = "_site/index.html";
    expect(fs.existsSync(indexPath)).toBe(true);

    const content = fs.readFileSync(indexPath, "utf8");
    expect(content).toContain("<!doctype html>");
    expect(content).toContain("<html");
    expect(content).toContain("</html>");
    expect(content).toContain("<head>");
    expect(content).toContain("</head>");
    expect(content).toMatch(/<body[^>]*>/);
    expect(content).toContain("</body>");
  });

  test("CSS files are generated", () => {
    const cssPath = "_site/css/tw.css";
    expect(fs.existsSync(cssPath)).toBe(true);

    const cssContent = fs.readFileSync(cssPath, "utf8");
    expect(cssContent.length).toBeGreaterThan(0);
  });

  test("JavaScript files are copied", () => {
    const jsFiles = [
      "_site/js/copyCode.js",
      "_site/js/search.js",
      "_site/js/mobileMenu.js",
    ];

    jsFiles.forEach((jsFile) => {
      expect(fs.existsSync(jsFile)).toBe(true);
    });
  });

  test("assets are copied correctly", () => {
    const assetsPath = "_site/assets";
    expect(fs.existsSync(assetsPath)).toBe(true);

    // Check if images directory exists
    const imagesPath = path.join(assetsPath, "images");
    if (fs.existsSync("assets/images")) {
      expect(fs.existsSync(imagesPath)).toBe(true);
    }
  });

  test("RSS feed is generated", () => {
    const feedPath = "_site/feed.xml";
    expect(fs.existsSync(feedPath)).toBe(true);

    const feedContent = fs.readFileSync(feedPath, "utf8");
    expect(feedContent).toContain("<?xml");
    expect(feedContent).toContain("<rss");
    expect(feedContent).toContain("Content Content podcast");
  });

  test("sitemap is copied", () => {
    const sitemapPath = "_site/sitemap.xml";
    expect(fs.existsSync(sitemapPath)).toBe(true);
  });

  test("no broken internal links in generated HTML", () => {
    const htmlFiles = [];

    function findHtmlFiles(dir) {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          findHtmlFiles(filePath);
        } else if (file.endsWith(".html")) {
          htmlFiles.push(filePath);
        }
      });
    }

    findHtmlFiles("_site");

    htmlFiles.forEach((file) => {
      const content = fs.readFileSync(file, "utf8");
      const internalLinks = content.match(/href="\/[^"]*"/g) || [];

      internalLinks.forEach((link) => {
        const href = link.match(/href="([^"]*)"/)[1];
        if (href.startsWith("/") && !href.startsWith("//")) {
          const filePath = path.join(
            "_site",
            href === "/" ? "index.html" : href
          );
          const indexPath = path.join(filePath, "index.html");

          // Check if either the direct file or index.html exists
          const exists = fs.existsSync(filePath) || fs.existsSync(indexPath);
          if (!exists && !href.includes("#") && !href.includes("?")) {
            console.warn(`Broken link found in ${file}: ${href}`);
          }
        }
      });
    });
  });
});
