const eleventyConfigFn = require('../eleventy.config.js');

describe('sanitize filter', () => {
  let sanitizeFilter;

  beforeEach(() => {
    const mockEleventyConfig = {
      addPlugin: jest.fn(),
      addFilter: jest.fn(),
      setLibrary: jest.fn(),
      addTemplateFormats: jest.fn(),
      addExtension: jest.fn(),
      addTransform: jest.fn(),
      addGlobalData: jest.fn(),
      addShortcode: jest.fn(),
      addPassthroughCopy: jest.fn(),
      addCollection: jest.fn(),
    };

    eleventyConfigFn(mockEleventyConfig);

    const sanitizeCall = mockEleventyConfig.addFilter.mock.calls.find(call => call[0] === 'sanitize');
    sanitizeFilter = sanitizeCall[1];
  });

  test('returns empty string if content is empty or falsy', () => {
    expect(sanitizeFilter(null)).toBe('');
    expect(sanitizeFilter(undefined)).toBe('');
    expect(sanitizeFilter('')).toBe('');
  });

  test('strips dangerous <script> tags', () => {
    const input = '<p>Hello <script>alert("xss")</script> World</p>';
    const output = sanitizeFilter(input);
    expect(output).not.toContain('<script>');
    expect(output).not.toContain('alert("xss")');
    expect(output).toBe('<p>Hello  World</p>');
  });

  test('strips inline event handlers like onerror', () => {
    const input = '<img src="x" onerror="alert(1)" alt="test" />';
    const output = sanitizeFilter(input);
    expect(output).not.toContain('onerror');
    expect(output).toContain('src="x"');
    expect(output).toContain('alt="test"');
  });

  test('allows safe tags and attributes', () => {
    const input = '<a href="https://example.com" target="_blank" class="link">Link</a>';
    const output = sanitizeFilter(input);
    expect(output).toBe('<a href="https://example.com" target="_blank" class="link">Link</a>');
  });
});
