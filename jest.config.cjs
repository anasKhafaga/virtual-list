/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  },  
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jest-environment-jsdom',
};