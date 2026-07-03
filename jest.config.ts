import type { Config } from 'jest'

const jestConfig: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  testMatch: ['**/?(*.)+(test).[tj]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      { tsconfig: '<rootDir>/tsconfig.test.json' },
    ],
  },
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@types$': '<rootDir>/src/types/index.ts',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
  },
  clearMocks: true,
}

export default jestConfig
