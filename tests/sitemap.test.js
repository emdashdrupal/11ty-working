const { execFileSync } = require('child_process');
const fs = require('fs');

// We need to mock child_process before requiring generate-sitemap.js
// because it might execute something if we are not careful
// but actually we wrapped it in require.main === module.

jest.mock('child_process', () => ({
  execFileSync: jest.fn()
}));

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  statSync: jest.fn(),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn()
}));

const {
  getUrlFromFilePath,
  getPriority,
  getChangeFreq
} = require('../generate-sitemap.js');

describe('Sitemap Generator', () => {
  const today = new Date().toISOString().split('T')[0];

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the cache before each test
    // We can do this by re-requiring the module or by exposing a reset function,
    // but here we can just clear the module cache if needed.
    // However, since we are mocking execFileSync, we can just ensure it returns what we want.
    jest.resetModules();
  });

  describe('getGitDate', () => {
    it('returns a valid date string from git cache', () => {
      const { getGitDate } = require('../generate-sitemap.js');
      const { execFileSync } = require('child_process');
      execFileSync.mockReturnValue('DATE:2023-10-27\ntest.md\n');
      expect(getGitDate('test.md')).toBe('2023-10-27');
    });

    it('returns null when git command fails', () => {
      const { getGitDate } = require('../generate-sitemap.js');
      const { execFileSync } = require('child_process');
      execFileSync.mockImplementation(() => {
        throw new Error('git error');
      });
      expect(getGitDate('test.md')).toBeNull();
    });

    it('returns null when file is not in git cache', () => {
      const { getGitDate } = require('../generate-sitemap.js');
      const { execFileSync } = require('child_process');
      execFileSync.mockReturnValue('DATE:2023-10-27\nother.md\n');
      expect(getGitDate('test.md')).toBeNull();
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
