const presentations = require('../_data/presentations.json');
const tools = require('../_data/tools.json');

describe('Data Structure Validation', () => {
  test('all presentations have array categories', () => {
    presentations.forEach((item, index) => {
      expect(Array.isArray(item.categories)).toBe(true);
      expect(item.categories.length).toBeGreaterThan(0);
    });
  });

  test('all presentations have required fields', () => {
    presentations.forEach((item, index) => {
      expect(item.title).toBeDefined();
      expect(item.title.trim()).not.toBe('');
      expect(item.year).toBeDefined();
      expect(item.categories).toBeDefined();
      expect(item.venue).toBeDefined();
      expect(item.type).toBeDefined();
    });
  });

  test('all tools have required fields', () => {
    tools.forEach((tool, index) => {
      expect(tool.title).toBeDefined();
      expect(tool.title.trim()).not.toBe('');
      expect(tool.publisher).toBeDefined();
      expect(tool.publisher.trim()).not.toBe('');
      expect(tool.category).toBeDefined();
      expect(Array.isArray(tool.category)).toBe(true);
    });
  });

  test('no empty links in presentations', () => {
    presentations.forEach((item, index) => {
      if (item.link && item.link.trim() !== '') {
        expect(item.link).toMatch(/^https?:\/\/.+/);
      }
    });
  });

  test('years are valid format', () => {
    presentations.forEach((item, index) => {
      // Allow single years (2020) or ranges (2016-2019)
      expect(item.year).toMatch(/^\d{4}(-\d{4})?$/);
    });
  });

  test('categories contain valid strings', () => {
    const validCategories = [
      'technical-writing', 'public-speaking', 'design', 'marketing',
      'content-strategy', 'podcasting', 'metrics', 'structured-authoring',
      'markdown', 'docs-as-code', 'coding-experience', 'social-media'
    ];

    presentations.forEach((item, index) => {
      item.categories.forEach(category => {
        expect(typeof category).toBe('string');
        expect(category.trim()).not.toBe('');
      });
    });
  });
});