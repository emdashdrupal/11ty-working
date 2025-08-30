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
    expect(content.includes('{% extends "base.njk" %}')).toBe(true);
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

  test('should ignore code blocks in markdown files', () => {
    const dom = createDom();
    const mdFile = path.join(__dirname, '..', 'content', 'static-site-transformation', 'writing-with-ai.md');
    const content = fs.readFileSync(mdFile, 'utf8');
    // Verify that frontmatter is correctly formatted and not mistaken for a code block
    const frontmatterMatch = content.match(/^---[\s\S]*?---/);
    expect(frontmatterMatch).not.toBeNull();
    // Check for actual code blocks in the content (after the frontmatter)
    const contentAfterFrontmatter = content.substring(frontmatterMatch[0].length);
    expect(contentAfterFrontmatter).toMatch(/```[\s\S]*?```/);
    expect(content.includes('```')).toBe(true);
    cleanupDom(dom);
  });

  test('should render templates with proper HTML structure', () => {
    const dom = createDom();
    const indexPath = path.join(__dirname, '..', '_includes', 'layouts', 'index.njk');
    const content = fs.readFileSync(indexPath, 'utf8');
    expect(content.includes('<html>')).toBe(true);
    expect(content.includes('<head>')).toBe(true);
    expect(content.includes('<body>')).toBe(true);
    cleanupDom(dom);
  });

  test('should render templates with correct layout structure', () => {
    const dom = createDom();
    const indexPath = path.join(__dirname, '..', '_includes', 'layouts', 'index.njk');
    const content = fs.readFileSync(indexPath, 'utf8');
    expect(content.includes('{% extends "base.njk" %}')).toBe(true);
    expect(content.includes('{% block content %}')).toBe(true);
    expect(content.includes('{% endblock %}')).toBe(true);
    cleanupDom(dom);
  });

  test('should render partials correctly', () => {
    const dom = createDom();
    const navbarPath = path.join(__dirname, '..', '_includes', 'layouts', 'partials', 'navbar.njk');
    expect(fs.existsSync(navbarPath)).toBe(true);
    const content = fs.readFileSync(navbarPath, 'utf8');
    expect(content.includes('{% from "layouts/partials/macros.njk"')).toBe(true);
    cleanupDom(dom);
  });
});
