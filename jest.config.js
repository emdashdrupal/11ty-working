module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  setupFilesAfterEnv: ['./tests/setupTests.js'],
  collectCoverageFrom: [
    'eleventy.config.js',
    '_includes/js/**/*.js',
    '!node_modules/**',
    '!_site/**',
    '!tests/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
  testTimeout: 30000 // 30 seconds for build tests
};