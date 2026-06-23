const eleventyConfigFn = require('../eleventy.config.js');

describe('shouldShowDate filter', () => {
  let shouldShowDate;

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
    // Find the shouldShowDate filter in the mock calls
    shouldShowDate = mockEleventyConfig.addFilter.mock.calls.find(call => call[0] === 'shouldShowDate')[1];
  });

  test('should return false for site root', () => {
    expect(shouldShowDate({ url: '/', inputPath: './content/index.md' })).toBe(false);
  });

  test('should return false for about section (landing and subpages)', () => {
    expect(shouldShowDate({ url: '/about/', inputPath: './content/about/index.md' })).toBe(false);
    expect(shouldShowDate({ url: '/about/about-ed-marsh/', inputPath: './content/about/about-ed-marsh.md' })).toBe(false);
  });

  test('should return false for contact section (landing and subpages)', () => {
    expect(shouldShowDate({ url: '/contact/', inputPath: './content/contact/contact.md' })).toBe(false);
  });

  test('should return false for skills section (landing and all skill files)', () => {
    expect(shouldShowDate({ url: '/skills/', inputPath: './content/skills/index.md' })).toBe(false);
    expect(shouldShowDate({ url: '/skills/artificial-intelligence/', inputPath: './content/skills/artificial-intelligence.md' })).toBe(false);
  });

  test('should return false for blog landing page', () => {
    expect(shouldShowDate({ url: '/blog/', inputPath: './content/blog/index.md' })).toBe(false);
  });

  test('should return false for blog sub-index pages', () => {
    expect(shouldShowDate({ url: '/blog/llms/', inputPath: './content/blog/llms/index.md' })).toBe(false);
    expect(shouldShowDate({ url: '/blog/static-site-transformation/', inputPath: './content/blog/static-site-transformation/index.md' })).toBe(false);
  });

  test('should return true for blog posts', () => {
    expect(shouldShowDate({ url: '/blog/some-post/', inputPath: './content/blog/some-post.md' })).toBe(true);
  });

  test('should return false for podcasts landing page', () => {
    expect(shouldShowDate({ url: '/podcasts/', inputPath: './content/podcasts/index.md' })).toBe(false);
  });

  test('should return true for podcast episodes', () => {
    expect(shouldShowDate({ url: '/podcasts/some-episode/', inputPath: './content/podcasts/some-episode.md' })).toBe(true);
  });

  test('should return false if showDate is explicitly false in frontmatter', () => {
    expect(shouldShowDate({ url: '/blog/some-post/', inputPath: './content/blog/some-post.md', data: { showDate: false } })).toBe(false);
  });

  test('should handle missing page or url safely', () => {
    expect(shouldShowDate(null)).toBe(false);
    expect(shouldShowDate({})).toBe(false);
    expect(shouldShowDate({ url: 123 })).toBe(false);
  });
});
