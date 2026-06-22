const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Site Build Output', () => {
  beforeAll(() => {
    // Build the site before running tests
    console.log('Building the site for tests...');
    execSync('npm run build', {
      stdio: 'pipe',
      timeout: 30000
    });
  });

  const siteDir = path.resolve(__dirname, '../_site');

  test('_site directory is generated', () => {
    expect(fs.existsSync(siteDir)).toBe(true);
  });

  test('generates an index.html file', () => {
    const indexPath = path.join(siteDir, 'index.html');
    expect(fs.existsSync(indexPath)).toBe(true);

    // Quick check that it rendered Nunjucks correctly
    const content = fs.readFileSync(indexPath, 'utf8');
    expect(content).not.toMatch(/\{\{/); // Should not contain unrendered variables
    expect(content).not.toMatch(/\{%/); // Should not contain unrendered tags
  });

  test('generates css files', () => {
    const twCss = path.join(siteDir, 'css/tw.css');
    const baseCss = path.join(siteDir, 'css/base.css');

    expect(fs.existsSync(twCss)).toBe(true);
    expect(fs.existsSync(baseCss)).toBe(true);
  });

  test('copies assets and js directory', () => {
    const assetsDir = path.join(siteDir, 'assets');
    const jsDir = path.join(siteDir, 'js');

    expect(fs.existsSync(assetsDir)).toBe(true);
    expect(fs.existsSync(jsDir)).toBe(true);

    // Check for our js files
    expect(fs.existsSync(path.join(jsDir, 'mobileMenu.js'))).toBe(true);
    expect(fs.existsSync(path.join(jsDir, 'copyCode.js'))).toBe(true);
    expect(fs.existsSync(path.join(jsDir, 'imageExpand.js'))).toBe(true);
  });

  test('copies expected root passthrough files', () => {
    expect(fs.existsSync(path.join(siteDir, 'llms.txt'))).toBe(true);
    expect(fs.existsSync(path.join(siteDir, 'netlify.toml'))).toBe(true);
  });
});
