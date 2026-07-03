import type { Config } from 'jest'

const coverageThreshold = process.env.CI
  ? {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    }
  : undefined

const jestConfig: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test', '<rootDir>/src'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  testMatch: ['**/?(*.)+(test).[tj]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      { tsconfig: '<rootDir>/tsconfig.test.json' },
    ],
  },
  watchman: false,
  collectCoverageFrom: ['src/utils/**/*.{ts,tsx}'],
  coverageThreshold,
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@types$': '<rootDir>/src/types/index.ts',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
  },
  clearMocks: true,
}

export default jestConfig
