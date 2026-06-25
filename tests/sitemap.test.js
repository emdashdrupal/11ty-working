const { execSync } = require('child_process');
const fs = require('fs');

// We need to mock child_process before requiring generate-sitemap.js
// because it might execute something if we are not careful
// but actually we wrapped it in require.main === module.

jest.mock('child_process', () => ({
  execSync: jest.fn()
}));

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  statSync: jest.fn(),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn()
}));

const {
  getGitDate,
  getDateFromFile,
  getUrlFromFilePath,
  getPriority,
  getChangeFreq
} = require('../generate-sitemap.js');

describe('Sitemap Generator', () => {
  const today = new Date().toISOString().split('T')[0];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getGitDate', () => {
    it('returns a valid date string from git', () => {
      execSync.mockReturnValue('2023-10-27\n');
      expect(getGitDate('test.md')).toBe('2023-10-27');
    });

    it('returns null when git command fails', () => {
      execSync.mockImplementation(() => {
        throw new Error('git error');
      });
      expect(getGitDate('test.md')).toBeNull();
    });

    it('returns null when git returns invalid format', () => {
      execSync.mockReturnValue('not-a-date\n');
      expect(getGitDate('test.md')).toBeNull();
    });
  });

  describe('getDateFromFile', () => {
    it('prioritizes frontmatter date', () => {
      const data = { date: '2023-01-01' };
      expect(getDateFromFile('test.md', data)).toBe('2023-01-01');
    });

    it('falls back to Git date if frontmatter date is missing', () => {
      const data = {};
      execSync.mockReturnValue('2023-10-27\n');
      expect(getDateFromFile('test.md', data)).toBe('2023-10-27');
    });

    it('falls back to Git date if frontmatter date is "Last Modified"', () => {
      const data = { date: 'Last Modified' };
      execSync.mockReturnValue('2023-10-27\n');
      expect(getDateFromFile('test.md', data)).toBe('2023-10-27');
    });

    it('falls back to fs.statSync mtime if Git date is unavailable', () => {
      const data = {};
      execSync.mockImplementation(() => { throw new Error(); });
      fs.statSync.mockReturnValue({ mtime: new Date('2023-05-20') });
      expect(getDateFromFile('test.md', data)).toBe('2023-05-20');
    });

    it('returns today as ultimate fallback on error', () => {
      const data = {};
      execSync.mockImplementation(() => { throw new Error(); });
      fs.statSync.mockImplementation(() => { throw new Error('stat error'); });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      expect(getDateFromFile('test.md', data)).toBe(today);
      consoleSpy.mockRestore();
    });
  });

  describe('getUrlFromFilePath', () => {
    it('handles standard markdown files', () => {
      expect(getUrlFromFilePath('content/blog/post.md')).toBe('/blog/post/');
    });

    it('handles index files', () => {
      expect(getUrlFromFilePath('content/blog/index.md')).toBe('/blog/');
      expect(getUrlFromFilePath('content/index.md')).toBe('/');
    });

    it('handles filename matching directory name', () => {
      expect(getUrlFromFilePath('content/contact/contact.md')).toBe('/contact/');
    });

    it('handles root level files', () => {
      expect(getUrlFromFilePath('content/about.md')).toBe('/about/');
    });
  });

  describe('getPriority', () => {
    it('returns 1.0 for root path', () => {
      expect(getPriority('/')).toBe(1.0);
    });

    it('returns configured priority for specific paths', () => {
      expect(getPriority('/blog/')).toBe(0.9);
      expect(getPriority('/skills/')).toBe(0.9);
    });

    it('returns default page priority for depth 1 paths', () => {
      // url.split('/').filter(Boolean) for '/about/' is ['about'], length 1
      expect(getPriority('/about/')).toBe(0.9);
    });

    it('returns default post priority for deeper paths', () => {
      // url.split('/').filter(Boolean) for '/blog/post/' is ['blog', 'post'], length 2
      expect(getPriority('/blog/post/')).toBe(0.8);
      // depth 3+
      expect(getPriority('/a/b/c/')).toBe(0.7);
    });
  });

  describe('getChangeFreq', () => {
    it('returns configured changefreq', () => {
      expect(getChangeFreq('/blog/')).toBe('weekly');
    });

    it('returns default changefreq for others', () => {
      expect(getChangeFreq('/about/')).toBe('monthly');
    });
  });
});
