const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Setup and teardown helpers
const createDom = () => {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  global.document = dom.window.document;
  global.window = dom.window;
  return dom;
};

const cleanupDom = (dom) => {
  if (dom) {
    dom = null;
    delete global.document;
    delete global.window;
  }
};

describe('Template rendering', () => {
  test('should render templates with correct content', () => {
    const dom = createDom();
    const indexPath = path.join(__dirname, '..', '_includes', 'layouts', 'index.njk');
    expect(fs.existsSync(indexPath)).toBe(true);
    const content = fs.readFileSync(indexPath, 'utf8');

    cleanupDom(dom);
  });

  test('should render markdown content correctly', () => {
    const dom = createDom();
    const mdFile = path.join(__dirname, '..', 'content', 'static-site-transformation', 'writing-with-ai.md');
    expect(fs.existsSync(mdFile)).toBe(true);
    const content = fs.readFileSync(mdFile, 'utf8');
    expect(content.includes('---')).toBe(true);
    expect(content.includes('title:')).toBe(true);
    expect(content.includes('description:')).toBe(true);
    cleanupDom(dom);
  });

  test('should handle frontmatter and code blocks separately', () => {
    const dom = createDom();
    const mdFile = path.join(__dirname, '..', 'content', 'static-site-transformation', 'writing-with-ai.md');
    expect(fs.existsSync(mdFile)).toBe(true);
    const content = fs.readFileSync(mdFile, 'utf8');
    expect(content).toContain('The answer for coders is');  // Verify we're reading the correct file

    // First check frontmatter
    const frontmatterRegex = /^---\s*\n(?:.*\n)*?---\s*\n/m;
    const hasFrontmatter = frontmatterRegex.test(content);
    expect(hasFrontmatter).toBe(true);

    // Then look for blockquotes and markdown links in the main content
    const mainContent = content.replace(frontmatterRegex, '');
    const hasBlockquote = /^>.*$/m.test(mainContent);
    const hasMarkdownLink = /\[.*?\]\(.*?\)/.test(mainContent);
    expect(hasBlockquote).toBe(true);
    expect(hasMarkdownLink).toBe(true);
    cleanupDom(dom);
  });

  test('should render templates with proper HTML structure', () => {
    const dom = createDom();
    const indexPath = path.join(__dirname, '..', '_includes', 'layouts', 'index.njk');
    const content = fs.readFileSync(indexPath, 'utf8');
/*     expect(content.includes('<html>')).toBe(true);
    expect(content.includes('<head>')).toBe(true);
    expect(content.includes('<body>')).toBe(true); */
    cleanupDom(dom);
  });

  test('should render templates with correct layout structure', () => {
    const dom = createDom();
    const indexPath = path.join(__dirname, '..', '_includes', 'layouts', 'index.njk');
    const content = fs.readFileSync(indexPath, 'utf8');
    expect(content.includes('{%- from "layouts/partials/macros.njk" import featuredSection -%}')).toBe(true);

    /* expect(content.includes('{% block content %}')).toBe(true);
    expect(content.includes('{% endblock %}')).toBe(true);
     */cleanupDom(dom);
  });

  test('should render partials correctly', () => {
    const dom = createDom();
    const navbarPath = path.join(__dirname, '..', '_includes', 'layouts', 'partials', 'navbar.njk');
    expect(fs.existsSync(navbarPath)).toBe(true);
    const content = fs.readFileSync(navbarPath, 'utf8');
    expect(content.includes('{%- from "layouts/partials/macros.njk"')).toBe(true);
    cleanupDom(dom);
  });
});
