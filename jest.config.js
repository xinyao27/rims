module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  testPathIgnorePatterns: [
    '<rootDir>/(dist|demo|node_modules)',
  ],
  setupFiles: [
    './test/setup.js',
  ],
};
