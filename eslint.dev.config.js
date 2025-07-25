import { defineConfig } from 'eslint/config';
import gessoConfig from './eslint.config.js';

const devConfig = defineConfig([
  gessoConfig,
  {
    rules: {
      'no-console': 'off',
      'no-empty-function': 'off',
      'no-unused-vars': 'off',
      'prefer-const': 'off',
    },
  },
]);

export default devConfig;
