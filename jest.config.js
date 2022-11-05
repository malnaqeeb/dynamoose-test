module.exports = {
    roots: ['<rootDir>/'],
    collectCoverageFrom: [
        'src/**/*.{js,ts,jsx,tsx}',
        './*.{js,ts,jsx,tsx}',
        '!.eslint*.js',
        '!babel.*.js',
        '!commitlint.*.js',
        '!jest.*.js',
        '!lint-staged.*.js',
        '!prettier.*.js',
        '!release.*.js',
        '!**/*.d.{ts,tsx}',
        '!**/node_modules/**',
    ],
    testRegex: '.spec.[jt]s$',
    modulePathIgnorePatterns: ['/infra/'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    testEnvironment: 'node',
    coverageProvider: 'v8',
    collectCoverage: false,
    coverageDirectory: '<rootDir>/coverage/',
    coverageReporters: ['lcov', 'text', 'cobertura'],
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverageFrom: [
        // e2e tests are invoking the endpoints, so there's no use in collecting coverage from those tests
        '!src/tests/e2e/**/*',
        '!src/tests/e2e/*',
    ],
    transformIgnorePatterns: ['/node_modules/(?!<dynamoose>)/'],
}
