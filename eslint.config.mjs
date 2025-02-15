import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'no-console': 'error',
      'sort-imports': 'error',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
];
