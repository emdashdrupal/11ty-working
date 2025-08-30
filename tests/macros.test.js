const fs = require('fs');
const path = require('path');

// Test that all required macro files exist
describe('All macro files exist', () => {
  it('should have macros.njk file', () => {
    const macrosPath = path.join(__dirname, '../_includes/layouts/partials/macros.njk');
    expect(fs.existsSync(macrosPath)).toBe(true);
  });
});

// Test that all templates that use macros exist
describe('All templates using macros exist', () => {
  it('should have all required template files', () => {
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

// Test that macros file contains all required macros
describe('Macros file contains all required macros', () => {
  it('should contain all required macros', () => {
    const macrosPath = path.join(__dirname, '../_includes/layouts/partials/macros.njk');
    const macrosContent = fs.readFileSync(macrosPath, 'utf8');

    const requiredMacros = [
      'getSortedCollection',
      'getNavItemClasses',
      'renderHeroImage',
      'featuredSection',
      'renderRelatedContent',
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

// Test that templates import the macros they use
describe('Templates import the macros they use', () => {
  it('should import macros correctly', () => {
    const templates = {
      '../_includes/layouts/details.njk': ['renderHeroImage', 'renderRelatedContent'],
      '../_includes/layouts/index.njk': ['featuredSection'],
      '../_includes/layouts/grid.njk': ['getSortedCollection'],
      '../_includes/layouts/partials/next-previous.njk': ['getSortedCollection']
    };

    Object.entries(templates).forEach(([templatePath, macros]) => {
      const fullPath = path.join(__dirname, templatePath);
      const templateContent = fs.readFileSync(fullPath, 'utf8');

      // Check for import statement
      expect(templateContent.includes('from "layouts/partials/macros.njk"')).toBe(true);

      // Check for each macro
      macros.forEach(macroName => {
        expect(templateContent.includes(`import ${macroName}`)).toBe(true);
      });
    });
  });
});
