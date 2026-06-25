const eleventyConfigFn = require('../eleventy.config.js');

describe('date filter', () => {
  let dateFilter;

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
    // Find the date filter registration
    const dateFilterCall = mockEleventyConfig.addFilter.mock.calls.find(call => call[0] === 'date');
    dateFilter = dateFilterCall[1];
  });

  test('returns empty string if no date is provided', () => {
    expect(dateFilter(null)).toBe("");
    expect(dateFilter(undefined)).toBe("");
  });

  test('formats date as YYYY-MM-DD', () => {
    const date = new Date(2023, 0, 1); // Jan 1, 2023
    expect(dateFilter(date, "YYYY-MM-DD")).toBe("2023-01-01");

    const date2 = new Date(2023, 11, 31); // Dec 31, 2023
    expect(dateFilter(date2, "YYYY-MM-DD")).toBe("2023-12-31");
  });

  test('formats date as YYYY-MMM-DD', () => {
    const date = new Date(2023, 0, 5); // Jan 5, 2023
    expect(dateFilter(date, "YYYY-MMM-DD")).toBe("2023-Jan-05");

    const date2 = new Date(2023, 9, 20); // Oct 20, 2023
    expect(dateFilter(date2, "YYYY-MMM-DD")).toBe("2023-Oct-20");
  });

  test('returns original date for unsupported formats', () => {
    const date = new Date(2023, 0, 1);
    expect(dateFilter(date, "YYYY")).toBe(date);
    expect(dateFilter("2023-01-01", "unsupported")).toBe("2023-01-01");
  });

  test('handles "now" string with unsupported format (current behavior)', () => {
      // Based on my analysis, current code returns the input if format doesn't match
      expect(dateFilter("now", "YYYY")).toBe("now");
  });

  test('handles invalid date with supported format (updated behavior)', () => {
      // Updated behavior: returns original date if it's invalid, instead of "NaN-NaN-NaN"
      expect(dateFilter("invalid", "YYYY-MM-DD")).toBe("invalid");
  });

  test('handles spaces in format (as seen in header.njk)', () => {
      // In header.njk: page.date | date(" YYYY - MMM - DD ")
      // Current implementation: if (format === "YYYY-MMM-DD")
      // So " YYYY - MMM - DD " will NOT match and will return the original date
      const date = new Date(2023, 0, 1);
      expect(dateFilter(date, " YYYY - MMM - DD ")).toBe(date);
  });
});
