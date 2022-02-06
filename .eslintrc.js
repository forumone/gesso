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
    'react/jsx-filename-extension': ['warn', {extensions: ['.tsx']}],

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
    '@typescript-eslint/no-use-before-define': ['error']
  },
};
