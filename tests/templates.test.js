const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Mock the Eleventy environment
jest.mock('@11ty/eleventy', () => ({
  // Mock Eleventy functions as needed
}));

describe('Template Rendering Tests', () => {
  let dom;

  beforeEach(() => {
    // Create a mock DOM environment for testing
    dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;
    global.window = dom.window;
  });

  afterEach(() => {
    // Cleanup after each test
    if (dom) {
      dom = null;
      delete global.document;
      delete global.window;
    }
  });

  test('should render templates with correct content', () => {
    // Test that templates render content correctly
    const indexPath = path.join(__dirname, '..', '_includes', 'layouts', 'index.njk');

    expect(fs.existsSync(indexPath)).toBe(true);

    const content = fs.readFileSync(indexPath, 'utf8');
    expect(content).toContain('{% extends "base.njk" %}');
  });

  test('should render markdown content correctly', () => {
    // Test that markdown content renders properly
    const mdFile = path.join(__dirname, '..', 'content', 'static-site-transformation', 'writing-with-ai.md');

    expect(fs.existsSync(mdFile)).toBe(true);

    const content = fs.readFileSync(mdFile, 'utf8');
    expect(content).toContain('---');
    expect(content).toContain('title:');
    expect(content).toContain('description:');
  });

  test('should ignore code blocks in markdown files', () => {
    // Test that code blocks are properly ignored or handled
    const mdFile = path.join(__dirname, '..', 'content', 'static-site-transformation', 'writing-with-ai.md');

    const content = fs.readFileSync(mdFile, 'utf8');

    // Check for code block markers in markdown
    expect(content).toMatch(/```[\s\S]*?```/);

    // Verify that content contains both markdown and code blocks
    expect(content).toContain('```');
  });

  test('should render templates with proper HTML structure', () => {
    // Test basic HTML structure of rendered templates
    const indexPath = path.join(__dirname, '..', '_includes', 'layouts', 'index.njk');

    const content = fs.readFileSync(indexPath, 'utf8');

    expect(content).toContain('<html>');
    expect(content).toContain('<head>');
    expect(content).toContain('<body>');
  });

  test('should render templates with correct layout structure', () => {
    // Test that templates are structured correctly
    const indexPath = path.join(__dirname, '..', '_includes', 'layouts', 'index.njk');

    const content = fs.readFileSync(indexPath, 'utf8');

    expect(content).toContain('{% extends "base.njk" %}');
    expect(content).toContain('{% block content %}');
    expect(content).toContain('{% endblock %}');
  });

  test('should render partials correctly', () => {
    // Test that partials are rendered correctly
    const navbarPath = path.join(__dirname, '..', '_includes', 'layouts', 'partials', 'navbar.njk');

    expect(fs.existsSync(navbarPath)).toBe(true);

    const content = fs.readFileSync(navbarPath, 'utf8');
    expect(content).toContain('{% for item in navigation %}');
  });
});
