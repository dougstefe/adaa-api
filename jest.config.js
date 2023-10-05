const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

module.exports = {
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts'
    ],
    coveragePathIgnorePatterns: [
      "index.ts"
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    transform: {
      '.+\\.ts$': 'ts-jest'
    },
    roots: [
      '<rootDir>'
    ],
    setupFiles: ['./jest.setup.ts'],
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
  }
  