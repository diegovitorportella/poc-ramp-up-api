import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.ts', '**/src/**/*.spec.ts'], 
  verbose: true,
  forceExit: true,
  clearMocks: true,
};

export default config;