export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
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
      'coverage/',
      '*.config.js',
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
      '*.log',
    ],
  },
];
