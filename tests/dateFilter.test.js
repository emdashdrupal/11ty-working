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
    const date = new Date(Date.UTC(2023, 0, 1)); // Jan 1, 2023 UTC
    expect(dateFilter(date, "YYYY-MM-DD")).toBe("2023-01-01");

    const date2 = new Date(Date.UTC(2023, 11, 31)); // Dec 31, 2023 UTC
    expect(dateFilter(date2, "YYYY-MM-DD")).toBe("2023-12-31");
  });

  test('formats date as YYYY-MMM-DD', () => {
    const date = new Date(Date.UTC(2023, 0, 5)); // Jan 5, 2023 UTC
    expect(dateFilter(date, "YYYY-MMM-DD")).toBe("2023-Jan-05");

    const date2 = new Date(Date.UTC(2023, 9, 20)); // Oct 20, 2023 UTC
    expect(dateFilter(date2, "YYYY-MMM-DD")).toBe("2023-Oct-20");
  });

  test('returns original date for unsupported formats', () => {
    const date = new Date(Date.UTC(2023, 0, 1));
    expect(dateFilter(date, "YYYY")).toBe(date);
    expect(dateFilter("2023-01-01", "unsupported")).toBe("2023-01-01");
  });

  test('handles "now" string with unsupported format', () => {
      expect(dateFilter("now", "YYYY")).toBe("now");
  });

  test('handles invalid date with supported format', () => {
      expect(dateFilter("invalid", "YYYY-MM-DD")).toBe("invalid");
  });

  test('handles spaces in format (as seen in header.njk)', () => {
      const date = new Date(Date.UTC(2023, 0, 1));
      expect(dateFilter(date, " YYYY - MMM - DD ")).toBe("2023-Jan-01");
  });

  test('handles ISO date strings', () => {
    // 2023-05-15 as a string is interpreted as UTC by the Date constructor
    expect(dateFilter("2023-05-15", "YYYY-MM-DD")).toBe("2023-05-15");
    expect(dateFilter("2023-05-15T12:00:00Z", "YYYY-MMM-DD")).toBe("2023-May-15");
  });

  test('handles leap years', () => {
    const leapDay = new Date(Date.UTC(2024, 1, 29)); // Feb 29, 2024 UTC
    expect(dateFilter(leapDay, "YYYY-MM-DD")).toBe("2024-02-29");
  });

  test('formats all months correctly in YYYY-MMM-DD', () => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    months.forEach((month, index) => {
      const date = new Date(Date.UTC(2023, index, 15));
      expect(dateFilter(date, "YYYY-MMM-DD")).toBe(`2023-${month}-15`);
    });
  });

  test('ensures timezone independence (UTC)', () => {
    // Using TZ environment variable to simulate different timezones
    const originalTZ = process.env.TZ;
    try {
      process.env.TZ = 'America/New_York';
      const dateStr = "2023-01-01"; // Should be Jan 1 in UTC
      expect(dateFilter(dateStr, "YYYY-MM-DD")).toBe("2023-01-01");

      process.env.TZ = 'Asia/Tokyo';
      expect(dateFilter(dateStr, "YYYY-MM-DD")).toBe("2023-01-01");
    } finally {
      process.env.TZ = originalTZ;
    }
  });
});
