import { defineConfig } from 'eslint/config';
import f1BaseConfig from '@forumone/eslint-config-es5';
import f1ReactConfig from '@forumone/eslint-config-react';

const config = defineConfig([
  f1BaseConfig,
  {
    files: ['*.tsx', '.jsx'],
    extends: [f1ReactConfig],
  },
  {
    // allow require() in webpack config files, which use CommonJS,
    // and in lib files, which are used by Node.js
    files: ['webpack.*.js', 'lib/**/*.[j|t]s'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
]);

export default config;
