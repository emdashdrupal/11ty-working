# Testing Suite

This directory contains comprehensive tests for the Ed Marsh portfolio site built with Eleventy.

## Test Categories

### Data Validation Tests (`data.test.js`)
- Validates JSON data structure consistency
- Ensures all required fields are present
- Checks for proper data types (arrays vs strings)
- Validates URLs and years format

### Filter Tests (`filters.test.js`)
- Tests Eleventy custom filters
- Validates error handling for edge cases
- Ensures filters work with various input types

### Build Tests (`build.test.js`)
- Verifies site builds without errors
- Checks that all expected files are generated
- Validates HTML structure
- Tests internal link integrity

### Accessibility Tests (`accessibility.test.js`)
- Ensures all images have alt attributes
- Validates proper heading hierarchy
- Checks for accessible form labels
- Tests semantic HTML structure

### Performance Tests (`performance.test.js`)
- Monitors bundle sizes
- Checks build times
- Validates file compression potential
- Tests for excessive inline styles

### Configuration Tests (`config.test.js`)
- Validates all config files load properly
- Checks required directories exist
- Tests JSON validity

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI (no watch, with coverage)
npm run test:ci
```

## Test Requirements

- Node.js environment
- Jest testing framework
- Site must be built before some tests run

## Adding New Tests

When adding new features:
1. Add data validation tests for new JSON structures
2. Test any new Eleventy filters or shortcodes
3. Add accessibility tests for new UI components
4. Include performance tests for new assets

## Coverage Goals

- Data validation: 100%
- Filter functions: 90%+
- Build process: 80%+
- Accessibility: 90%+