module.exports = {
    ignorePatterns: [
        '.eslintrc.js',
        'babel.config.js',
        'commitlint.config.js',
        'jest.config.js',
        'lint-staged.config.js',
        'package-lock.json',
        'prettier.config.js',
        'release.config.js',
        '**/*.spec.ts',
    ],
    rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
    },
}
