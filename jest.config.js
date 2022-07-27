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
    '@/components': '<rootDir>/components/index.tsx',
    '@/typescript/types': '<rootDir>/typescript/types/index.ts',
    '@/contexts': '<rootDir>/contexts/index.ts',
    '@/utils': '<rootDir>/utils/index.ts',
    '@/public/(.*)$': '<rootDir>/public/$1',
  },
  // testEnvironment: 'jest-environment-jsdom', // DEFAULT
  testEnvironment: '<rootDir>/test/custom-test-env.js',
};

module.exports = createJestConfig(customJestConfig);
