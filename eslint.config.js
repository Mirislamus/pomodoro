export default {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier', 'astro'],
  overrides: [
    {
      files: ['*.astro'],
      extends: ['plugin:astro/recommended'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        extraFileExtensions: ['.astro'],
      },
      rules: {},
    },
  ],
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
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignores: [
    'node_modules/',
    'dist/',
    'build/',
    'public/',
    '.astro/types/',
    'coverage/',
    '*.config.js',
    '*.config.cjs',
    '*.d.ts',
    '.vscode/',
    '.env',
    '.env.*',
    'temp/',
    'tmp/',
    '.DS_Store',
    '._*',
    '.AppleDouble',
    '.idea/',
    '*.iml',
    'Thumbs.db',
    '*.log'
  ]

};
