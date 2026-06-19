// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * ✅ ESLint config for Node.js / Nest.js projects
 * - Сумісний з TypeScript
 * - Узгоджений із Prettier
 * - Без конфліктів CRLF / LF
 */
export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      'dist/**',
      'node_modules/**',
      '*.config.*',
    ],
  },

  // Рекомендовані ESLint правила
  eslint.configs.recommended,

  // TypeScript + type-checked правила
  ...tseslint.configs.recommendedTypeChecked,

  // Підключення Prettier (вимикає форматувальні правила ESLint)
  eslintPluginPrettierRecommended,

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: 'module',
    },
  },

  {
    rules: {
      // ⚙️ Налаштування правил під Node/Nest
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // 🔧 Для стабільної інтеграції з Prettier
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
);
