module.exports = {
    // Cerca solo file che corrispondono a questo pattern nella cartella build
    testMatch: ['<rootDir>/build/**/*.test.[jt]s?(x)'],
    // oppure usando testRegex:
    // testRegex: 'build/.*\\.(test|spec)\\.[jt]sx?$',
    testEnvironment: 'node',
  };
  