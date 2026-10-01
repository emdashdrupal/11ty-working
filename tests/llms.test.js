const fs = require('fs');
const path = require('path');
const { cleanDescription, getMarkdownUrl, generateLlmsTxt } = require('../generate-llms');

describe('LLMs.txt Generator', () => {
  describe('cleanDescription', () => {
    test('returns empty string for null or undefined input', () => {
      expect(cleanDescription(null)).toBe('');
      expect(cleanDescription(undefined)).toBe('');
    });

    test('strips HTML tags and handles entities', () => {
      const input = 'This is <i>italic</i> and &ldquo;quoted&rdquo; with &#233; and &hellip;';
      const output = cleanDescription(input);
      expect(output).toBe('This is italic and "quoted" with é and …');
    });

    test('strips Markdown links and images', () => {
      const input = 'Check out [[A]](https://simplea.com) and ![diagram](/assets/images/content-lifecycle.png)';
      const output = cleanDescription(input);
      expect(output).toBe('Check out A and');
    });

    test('normalizes em-dashes to thin-spaced em-dashes', () => {
      const input = 'Word—another word &mdash; third word';
      const output = cleanDescription(input);
      expect(output).toBe('Word&thinsp;&mdash;&thinsp;another word &thinsp;&mdash;&thinsp; third word');
    });
  });

  describe('getMarkdownUrl', () => {
    test('converts file path to canonical URL pointing to .md file', () => {
      expect(getMarkdownUrl('content/contact/contact.md')).toBe('https://edmar.sh/content/contact/contact.md');
      expect(getMarkdownUrl(`content${path.sep}podcasts${path.sep}index.md`)).toBe('https://edmar.sh/content/podcasts/index.md');
    });
  });

  describe('generateLlmsTxt', () => {
    let output;

    beforeAll(() => {
      output = generateLlmsTxt();
    });

    test('generates expected header and structure', () => {
      expect(output).toContain('# edmar.sh llms.txt');
      expect(output).toContain('> Ed Marsh: Senior technical writer');
      expect(output).toContain('## Podcasts');
      expect(output).toContain('## Professional Skills & Capabilities');
      expect(output).toContain('## AI-Enhanced Development & Modern Technical Skills');
    });

    test('all URL references point to markdown (.md) files under content/', () => {
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let match;
      let linkCount = 0;

      while ((match = linkRegex.exec(output)) !== null) {
        const url = match[2];
        linkCount++;
        expect(url).toMatch(/^https:\/\/edmar\.sh\/content\/.*\.md$/);
      }

      expect(linkCount).toBeGreaterThan(30);
    });

    test('contains new podcast content', () => {
      expect(output).toContain('[Podcast: Kelly Schrank](https://edmar.sh/content/podcasts/it-works-for-a-lot-of-brains-featuring-kelly-schrank-content-content-podcast.md)');
      expect(output).toContain('[Podcast: Jack Molisani (2026)](https://edmar.sh/content/podcasts/whatever-this-is-now-jack-molisani-july-2026.md)');
    });

    test('contains core pages, skills, and blog posts pointing to .md files', () => {
      expect(output).toContain('[Ed Marsh Portfolio & Overview](https://edmar.sh/content/index.md)');
      expect(output).toContain('[Contact Ed Marsh](https://edmar.sh/content/contact/contact.md)');
      expect(output).toContain('[About Ed Marsh](https://edmar.sh/content/about/about-ed-marsh.md)');
      expect(output).toContain('[Core Skills Portfolio](https://edmar.sh/content/skills/index.md)');
      expect(output).toContain('[Static Site Transformation](https://edmar.sh/content/blog/static-site-transformation/index.md)');
      expect(output).toContain('[LLMs](https://edmar.sh/content/blog/llms/index.md)');
    });
  });
});
