import { defineConfig, globalIgnores } from 'eslint/config';
import f1BaseConfig from '@forumone/eslint-config-es5';
import f1StorybookConfig from '@forumone/eslint-config-es5/storybook';
import f1ReactConfig from '@forumone/eslint-config-react';

const reactFiles = ['**/*.tsx', '**/*.jsx'];

const config = defineConfig([
  globalIgnores(['**/_GESSO.es6.js', 'source/@types/**']),
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  f1BaseConfig,
  f1StorybookConfig,
  ...f1ReactConfig.map((reactConfig) => ({
    ...reactConfig,
    files: reactConfig.files ?? reactFiles,
  })),
  {
    files: reactFiles,
    rules: {
      // PropTypes are not used; TSX files use types and JSX files are Storybook-only.
      'react/prop-types': 'off',
    },
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
