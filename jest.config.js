module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '.(js|ts|tsx)': 'ts-jest'
  },
  testRegex: '((\\.|/)(test|spec))\\.ts|.js?$',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/dist/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/*.{js,ts}', '!src/index.ts', '!src/**/*.d.ts'],
  moduleFileExtensions: ['ts', 'js']
}
