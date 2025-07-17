const test = require('ava');
const fs = require('fs');
const path = require('path');

// Test that all required macro files exist
test('All macro files exist', t => {
  const macrosPath = path.join(__dirname, '../_includes/layouts/partials/macros.njk');
  t.true(fs.existsSync(macrosPath), 'macros.njk should exist');
});

// Test that all templates that use macros exist
test('All templates using macros exist', t => {
  const templatesUsingMacros = [
    '../_includes/layouts/details.njk',
    '../_includes/layouts/index.njk',
    '../_includes/layouts/grid.njk',
    '../_includes/layouts/partials/next-previous.njk'
  ];

  templatesUsingMacros.forEach(templatePath => {
    const fullPath = path.join(__dirname, templatePath);
    t.true(fs.existsSync(fullPath), `${templatePath} should exist`);
  });
});

// Test that macros file contains all required macros
test('Macros file contains all required macros', t => {
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
    t.true(
      macrosContent.includes(`macro ${macroName}`),
      `macros.njk should contain the ${macroName} macro`
    );
  });
});

// Test that templates import the macros they use
test('Templates import the macros they use', t => {
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
    t.true(
      templateContent.includes('from "layouts/partials/macros.njk"'),
      `${templatePath} should import macros`
    );

    // Check for each macro
    macros.forEach(macroName => {
      t.true(
        templateContent.includes(`import ${macroName}`),
        `${templatePath} should import the ${macroName} macro`
      );
    });
  });
});