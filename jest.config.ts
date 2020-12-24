import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  roots: ['<rootDir>/tests'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000,
  globalSetup: './tests/globalSetup.ts',
  globalTeardown: './tests/globalTeardown.ts',
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/$1',
    '@test/(.*)': '<rootDir>/$1',
  },
  testMatch: ['**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};

export default config;
