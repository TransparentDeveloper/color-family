import typescriptPlugin from '@typescript-eslint/eslint-plugin'

import prettierPlugin from 'eslint-plugin-prettier'

export default [
  {
    files: ['src/**/*.js'],
    plugin: {
      prettier: prettierPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'prettier/prettier': ['error'],
      indent: ['error', 2],
      semi: 'off',
    },
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
  },
]
