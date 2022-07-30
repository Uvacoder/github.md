const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '@/components': '<rootDir>/src/components/index.tsx',
    '@/typescript/types': '<rootDir>/src/typescript/types/index.ts',
    '@/contexts': '<rootDir>/src/contexts/index.ts',
    '@/utils': '<rootDir>/src/utils/index.ts',
    '@/public/(.*)$': '<rootDir>/public/$1',
  },
  // testEnvironment: 'jest-environment-jsdom', // DEFAULT
  testEnvironment: '<rootDir>/src/tests/custom-test-env.js',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.tsx'],
};

module.exports = createJestConfig(customJestConfig);
