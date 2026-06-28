const fs = require('fs');
const sitemap = require('../generate-sitemap.js');

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  statSync: jest.fn()
}));

describe('getDateFromFile', () => {
  const today = new Date().toISOString().split('T')[0];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(sitemap, 'getGitDate').mockImplementation(() => null);
  });

  afterEach(() => {
    sitemap.getGitDate.mockRestore();
  });

  it('prioritizes frontmatter date when it is a valid string', () => {
    const data = { date: '2023-01-01' };
    expect(sitemap.getDateFromFile('test.md', data)).toBe('2023-01-01');
  });

  it('prioritizes frontmatter date when it is a Date object', () => {
    const data = { date: new Date(Date.UTC(2023, 5, 15)) };
    expect(sitemap.getDateFromFile('test.md', data)).toBe('2023-06-15');
  });

  it('falls back to Git date if frontmatter date is missing', () => {
    const data = {};
    sitemap.getGitDate.mockReturnValue('2023-10-27');
    expect(sitemap.getDateFromFile('test.md', data)).toBe('2023-10-27');
  });

  it('falls back to Git date if frontmatter date is "Last Modified"', () => {
    const data = { date: 'Last Modified' };
    sitemap.getGitDate.mockReturnValue('2023-10-27');
    expect(sitemap.getDateFromFile('test.md', data)).toBe('2023-10-27');
  });

  it('falls back to Git date if frontmatter date is an invalid date string', () => {
    const data = { date: 'not-a-date' };
    sitemap.getGitDate.mockReturnValue('2023-10-27');
    expect(sitemap.getDateFromFile('test.md', data)).toBe('2023-10-27');
  });

  it('falls back to fs.statSync mtime if Git date is unavailable', () => {
    const data = {};
    sitemap.getGitDate.mockReturnValue(null);
    fs.statSync.mockReturnValue({ mtime: new Date(Date.UTC(2023, 4, 20)) });
    expect(sitemap.getDateFromFile('test.md', data)).toBe('2023-05-20');
  });

  it('returns today as ultimate fallback on error', () => {
    const data = {};
    sitemap.getGitDate.mockImplementation(() => { throw new Error('git error'); });
    // This will be caught by the try-catch in getDateFromFile

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(sitemap.getDateFromFile('test.md', data)).toBe(today);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error processing date for test.md'));
    consoleSpy.mockRestore();
  });

  it('handles errors in fs.statSync by returning today', () => {
    const data = {};
    sitemap.getGitDate.mockReturnValue(null);
    fs.statSync.mockImplementation(() => { throw new Error('fs error'); });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(sitemap.getDateFromFile('test.md', data)).toBe(today);
    consoleSpy.mockRestore();
  });
});
