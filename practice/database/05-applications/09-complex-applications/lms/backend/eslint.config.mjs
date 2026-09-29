import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/**'],
  },

  eslint.configs.recommended,

  eslintPluginPrettierRecommended,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },

    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'lf',
          singleQuote: true,
          trailingComma: 'all',
        },
      ],
    },
  },
];
