const eleventyConfigFn = require('../eleventy.config.js');

describe('filterBy filter', () => {
  let filterBy;

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
    filterBy = mockEleventyConfig.addFilter.mock.calls.find(call => call[0] === 'filterBy')[1];
  });

  test('filters by top-level property', () => {
    const array = [{ title: 'A' }, { title: 'B' }, { title: 'A' }];
    expect(filterBy(array, 'title', 'A')).toEqual([{ title: 'A' }, { title: 'A' }]);
  });

  test('filters by nested property', () => {
    const array = [
      { data: { featured: true } },
      { data: { featured: false } },
      { data: { featured: true } }
    ];
    expect(filterBy(array, 'data.featured', true)).toEqual([
      { data: { featured: true } },
      { data: { featured: true } }
    ]);
  });

  test('handles null/undefined data safely', () => {
    const array = [
      { data: { featured: true } },
      { data: null },
      { title: 'no data' }
    ];
    expect(filterBy(array, 'data.featured', true)).toEqual([{ data: { featured: true } }]);
  });

  test('returns empty array for missing array or key', () => {
    expect(filterBy(null, 'key', 'value')).toEqual([]);
    expect(filterBy([], null, 'value')).toEqual([]);
  });

  test('uses loose equality', () => {
    const array = [{ id: 1 }, { id: '1' }];
    expect(filterBy(array, 'id', 1)).toEqual([{ id: 1 }, { id: '1' }]);
  });

  test('handles errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const array = [
      {
        get data() {
          throw new Error('Test error');
        }
      }
    ];

    const result = filterBy(array, 'data.test', true);

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error in filterBy filter: Test error'));

    consoleSpy.mockRestore();
  });
});
