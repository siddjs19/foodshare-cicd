const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  collectCoverageFrom: [
    'lib/**/*.{js,jsx}',
    'components/**/*.{js,jsx}',
    'app/**/*.{js,jsx}',
    '!app/**/layout.js',
    '!**/*.config.js',
  ],
  coverageReporters: ['text', 'lcov', 'cobertura'],
  coverageDirectory: 'coverage',
  // Quality gate: the pipeline fails if coverage drops below these numbers.
  coverageThreshold: {
    './lib/': {
      statements: 85,
      branches: 80,
      functions: 100,
      lines: 90,
    },
    './components/': {
      statements: 80,
      branches: 85,
      functions: 65,
      lines: 80,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
