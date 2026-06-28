const eleventyConfigFn = require('../eleventy.config.js');

describe('Eleventy Configuration', () => {
  let mockEleventyConfig;
  let returnedConfig;

  beforeEach(() => {
    mockEleventyConfig = {
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

    returnedConfig = eleventyConfigFn(mockEleventyConfig);
  });

  test('exports a configuration function', () => {
    expect(typeof eleventyConfigFn).toBe('function');
  });

  test('returns expected directory configuration', () => {
    expect(returnedConfig).toBeDefined();
    expect(returnedConfig.dir).toEqual({
      input: "content",
      includes: "../_includes",
      output: "_site",
      data: "../_data",
    });
  });

  test('returns expected template engine configuration', () => {
    expect(returnedConfig.markdownTemplateEngine).toBe('njk');
    expect(returnedConfig.htmlTemplateEngine).toBe('njk');
    expect(returnedConfig.templateFormats).toContain('md');
    expect(returnedConfig.templateFormats).toContain('njk');
    expect(returnedConfig.templateFormats).toContain('html');
    expect(returnedConfig.templateFormats).toContain('css');
  });

  test('registers required plugins', () => {
    expect(mockEleventyConfig.addPlugin).toHaveBeenCalled();
    // Assuming navigation, syntaxHighlight, and feedPlugin are called
    expect(mockEleventyConfig.addPlugin.mock.calls.length).toBeGreaterThanOrEqual(3);
  });

  test('registers custom filters', () => {
    expect(mockEleventyConfig.addFilter).toHaveBeenCalledWith('date', expect.any(Function));
    expect(mockEleventyConfig.addFilter).toHaveBeenCalledWith('filterBy', expect.any(Function));
    expect(mockEleventyConfig.addFilter).toHaveBeenCalledWith('limit', expect.any(Function));
    expect(mockEleventyConfig.addFilter).toHaveBeenCalledWith('markdown', expect.any(Function));
    expect(mockEleventyConfig.addFilter).toHaveBeenCalledWith('filterByCategory', expect.any(Function));
    expect(mockEleventyConfig.addFilter).toHaveBeenCalledWith('reject', expect.any(Function));
    expect(mockEleventyConfig.addFilter).toHaveBeenCalledWith('shouldShowDate', expect.any(Function));
  });

  test('registers custom shortcodes', () => {
    expect(mockEleventyConfig.addShortcode).toHaveBeenCalledWith('year', expect.any(Function));

    // Test the year shortcode logic
    const yearCallback = mockEleventyConfig.addShortcode.mock.calls.find(call => call[0] === 'year')[1];
    expect(yearCallback()).toBe(`${new Date().getFullYear()}`);
  });

  test('registers passthrough copies', () => {
    expect(mockEleventyConfig.addPassthroughCopy).toHaveBeenCalledWith({
      "assets/": "assets",
      "_includes/js": "js/",
      "podcast.xml": "podcast.xml",
      "llms.txt": "llms.txt",
    });
  });

  test('registers collections', () => {
    expect(mockEleventyConfig.addCollection).toHaveBeenCalledWith('skills', expect.any(Function));
    expect(mockEleventyConfig.addCollection).toHaveBeenCalledWith('podcasts', expect.any(Function));
    expect(mockEleventyConfig.addCollection).toHaveBeenCalledWith('blog', expect.any(Function));
  });
});
