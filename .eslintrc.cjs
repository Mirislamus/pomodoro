module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'error',
      {
        proseWrap: 'never',
        semi: true,
        trailingComma: 'es5',
        singleQuote: true,
        jsxSingleQuote: false,
        printWidth: 100,
        tabWidth: 2,
        bracketSpacing: true,
        endOfLine: 'lf',
        arrowParens: 'avoid',
        objectCurlySpacing: 'never',
        spaceInfixOps: false,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
