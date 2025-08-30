const fs = require('fs');
const path = require('path');

describe('Macros file', () => {
  test('macros.njk file should exist', () => {
    const macrosPath = path.join(__dirname, '../_includes/layouts/partials/macros.njk');
    expect(fs.existsSync(macrosPath)).toBe(true);
  });
});

describe('All templates using macros exist', () => {
  test('should have all required template files', () => {
    const templatesUsingMacros = [
      '../_includes/layouts/details.njk',
      '../_includes/layouts/index.njk',
      '../_includes/layouts/grid.njk',
      '../_includes/layouts/partials/next-previous.njk'
    ];

    templatesUsingMacros.forEach(templatePath => {
      const fullPath = path.join(__dirname, templatePath);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });
});

describe('Macros file contains all required macros', () => {
  test('should contain all required macros', () => {
    const macrosPath = path.join(__dirname, '../_includes/layouts/partials/macros.njk');
    const macrosContent = fs.readFileSync(macrosPath, 'utf8');

    const requiredMacros = [
      'featuredSection',
      'dropdown',
      'listItem',
      'gridItem',
      'renderButton',
      'card'
    ];

    requiredMacros.forEach(macroName => {
      expect(macrosContent.includes(`macro ${macroName}`)).toBe(true);
    });
  });
});

describe('Templates import the macros they use', () => {
  test('should import macros correctly', () => {
    const templates = {
      '../_includes/layouts/partials/navbar.njk': ['dropdown', 'listItem']
    };

    Object.entries(templates).forEach(([templatePath, macros]) => {
      const fullPath = path.join(__dirname, templatePath);
      const templateContent = fs.readFileSync(fullPath, 'utf8');

      // Check for import statement with correct path
      expect(templateContent.includes('{%- from "layouts/partials/macros.njk"')).toBe(true);

      // Check for each macro usage
      macros.forEach(macroName => {
        expect(templateContent.includes(macroName)).toBe(true);
      });
    });
  });
});
