
module.exports = {
  rootDir: 'src',
  collectCoverageFrom: [
    '<rootDir>/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  setupFiles: ['../jest.setup.ts'],
  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/domain/$1',
    '^@infra/(.*)$': '<rootDir>/infra/$1',
    '^@main/(.*)$': '<rootDir>/main/$1',
    '^@presentation/(.*)$': '<rootDir>/presentation/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1'
  }
}
  