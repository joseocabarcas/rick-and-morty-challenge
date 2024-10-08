const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@rick-and-morty-ch/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: [
    "<rootDir>/e2e"
  ]
}

module.exports = createJestConfig(customJestConfig)