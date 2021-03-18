module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  plugins: [],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'arrow-parens': ['off', 'as-needed'],
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],
    curly: 'error',
    'dot-notation': 'error',
    eqeqeq: 'error',
    'guard-for-in': 'error',
    'no-console': 'error',
    'no-empty-function': 'error',
    'no-floating-decimal': 'error',
    'no-irregular-whitespace': 'off',
    'no-param-reassign': 'error',
    'no-template-curly-in-string': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': ['error', { args: 'none' }],
    'no-var': 'error',
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'prefer-const': 'error',
    'prefer-template': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
  },
};
