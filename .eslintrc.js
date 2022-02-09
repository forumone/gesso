module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['airbnb', 'prettier', 'plugin:@typescript-eslint/recommended'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
    'import/core-modules': ['drupal', 'drupalSettings', 'jquery', 'once'],
  },
  rules: {
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off', // Too many false positives

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    'react/function-component-definition': 'off',

    'react/jsx-filename-extension': ['warn', {extensions: ['.jsx', '.tsx']}],

    'react/no-danger': 'off', // Necessary for Storybook

    'no-param-reassign': [
      // Allow modifying props, esp. for DOM Nodes
      'error',
      {
        props: false,
      },
    ],

    // TS-eslint is smarter about how to implement this rule.
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    // disable the rule for all files
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  'overrides': [
    {
      // enable the rule specifically for TypeScript files
      'files': ['*.ts', '*.tsx'],
      'rules': {
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
      },
    },
  ],
};
