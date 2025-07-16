const fs = require('fs');

describe('Configuration Files', () => {
  test('package.json has required fields', () => {
    const packageJson = require('../package.json');

    expect(packageJson.name).toBeDefined();
    expect(packageJson.version).toBeDefined();
    expect(packageJson.scripts).toBeDefined();
    expect(packageJson.scripts.build).toBeDefined();
    expect(packageJson.scripts.start).toBeDefined();
    expect(packageJson.dependencies).toBeDefined();
  });

  test('eleventy config loads without errors', () => {
    expect(() => {
      require('../eleventy.config.js');
    }).not.toThrow();
  });

  test('tailwind config is valid', () => {
    expect(() => {
      const config = require('../tailwind.config.js');
      expect(config.content).toBeDefined();
      expect(Array.isArray(config.content)).toBe(true);
      expect(config.plugins).toBeDefined();
    }).not.toThrow();
  });

  test('postcss config is valid', () => {
    expect(() => {
      const config = require('../postcss.config.js');
      expect(config.plugins).toBeDefined();
      expect(config.plugins.tailwindcss).toBeDefined();
      expect(config.plugins.autoprefixer).toBeDefined();
    }).not.toThrow();
  });

  test('data files are valid JSON', () => {
    expect(() => {
      require('../_data/presentations.json');
      require('../_data/tools.json');
    }).not.toThrow();
  });

  test('cspell config is valid', () => {
    expect(() => {
      const config = require('../cspell.json');
      expect(config.version).toBeDefined();
      expect(Array.isArray(config.words)).toBe(true);
    }).not.toThrow();
  });

  test('required directories exist', () => {
    const requiredDirs = [
      'content',
      '_includes',
      '_data',
      'assets'
    ];

    requiredDirs.forEach(dir => {
      expect(fs.existsSync(dir)).toBe(true);
    });
  });

  test('gitignore includes build artifacts', () => {
    if (fs.existsSync('.gitignore')) {
      const gitignore = fs.readFileSync('.gitignore', 'utf8');
      expect(gitignore).toContain('_site');
      expect(gitignore).toContain('node_modules');
    }
  });

  test('netlify config exists if using Netlify', () => {
    if (fs.existsSync('.netlify')) {
      // If .netlify directory exists, should have proper config
      const netlifyDir = fs.readdirSync('.netlify');
      expect(netlifyDir.length).toBeGreaterThan(0);
    }
  });
});