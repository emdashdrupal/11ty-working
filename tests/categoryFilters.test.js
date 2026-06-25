const eleventyConfigFn = require('../eleventy.config.js');

describe('Category Filters', () => {
  let filterByCategory;
  let filterToolsByCategory;

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
    filterByCategory = mockEleventyConfig.addFilter.mock.calls.find(call => call[0] === 'filterByCategory')[1];
    filterToolsByCategory = mockEleventyConfig.addFilter.mock.calls.find(call => call[0] === 'filterToolsByCategory')[1];
  });

  describe('filterByCategory', () => {
    const items = [
      { title: 'Item 1', categories: 'blog' },
      { title: 'Item 2', categories: ['blog', 'news'] },
      { title: 'Item 3', categories: 'news' },
      { title: 'Item 4' }
    ];

    test('returns empty array if items or category is missing', () => {
      expect(filterByCategory(null, 'blog')).toEqual([]);
      expect(filterByCategory(items, null)).toEqual([]);
    });

    test('filters by single category (string)', () => {
      const result = filterByCategory(items, 'blog');
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Item 1');
      expect(result[1].title).toBe('Item 2');
    });

    test('filters by multiple categories (array)', () => {
      const result = filterByCategory(items, ['blog', 'news']);
      expect(result).toHaveLength(3);
    });

    test('handles items without categories property', () => {
      const result = filterByCategory(items, 'news');
      expect(result).toHaveLength(2);
      expect(result.find(i => i.title === 'Item 4')).toBeUndefined();
    });

    test('handles item with multiple categories matching one of many requested', () => {
      const result = filterByCategory(items, 'news');
      expect(result.find(i => i.title === 'Item 2')).toBeDefined();
    });
  });

  describe('filterToolsByCategory', () => {
    const tools = [
      { name: 'Tool 1', category: 'design' },
      { name: 'Tool 2', categories: 'dev' },
      { name: 'Tool 3', categories: ['design', 'dev'] },
      { name: 'Tool 4', category: ['dev'] },
      { name: 'Tool 5' }
    ];

    test('returns empty array if tools or category is missing', () => {
      expect(filterToolsByCategory(null, 'dev')).toEqual([]);
      expect(filterToolsByCategory(tools, null)).toEqual([]);
    });

    test('filters by category property', () => {
      const result = filterToolsByCategory(tools, 'design');
      expect(result).toHaveLength(2);
      expect(result.find(t => t.name === 'Tool 1')).toBeDefined();
      expect(result.find(t => t.name === 'Tool 3')).toBeDefined();
    });

    test('filters by categories property', () => {
      const result = filterToolsByCategory(tools, 'dev');
      expect(result).toHaveLength(3);
      expect(result.find(t => t.name === 'Tool 2')).toBeDefined();
      expect(result.find(t => t.name === 'Tool 3')).toBeDefined();
      expect(result.find(t => t.name === 'Tool 4')).toBeDefined();
    });

    test('handles array of categories for filtering', () => {
      const result = filterToolsByCategory(tools, ['design', 'dev']);
      expect(result).toHaveLength(4);
    });

    test('handles tools without any category property', () => {
      const result = filterToolsByCategory(tools, 'design');
      expect(result.find(t => t.name === 'Tool 5')).toBeUndefined();
    });
  });
});
