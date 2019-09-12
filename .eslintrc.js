module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  "plugins": [
    "prettier",
    "implicit-dependencies"
  ],
  "extends": [
    "plugin:prettier/recommended"
  ],
  "rules": {
    "arrow-parens": [
      "off",
      "as-needed"
    ],
    "camelcase": ["error", {
      "properties": "never",
    }],
    "constructor-super": "error",
    "curly": "error",
    "dot-notation": "error",
    "eol-last": "off",
    "eqeqeq": "error",
    "guard-for-in": "error",
    "implicit-dependencies/no-implicit": ["error", { optional: true }],
    "linebreak-style": "off",
    "new-parens": "off",
    "newline-per-chained-call": "off",
    "no-console": "error",
    "no-empty": "error",
    "no-empty-function": "error",
    "no-extra-semi": "off",
    "no-fallthrough": "error",
    "no-floating-decimal": "error",
    "no-irregular-whitespace": "off",
    "no-multiple-empty-lines": "off",
    "no-param-reassign": "error",
    "no-sparse-arrays": "error",
    "no-template-curly-in-string": "error",
    "no-unsafe-finally": "error",
    "no-unused-expressions": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "one-var": ["error", "never"],
    "prefer-const": "error",
    "prefer-template": "error",
    "prettier/prettier": "error",
    "quote-props": [
      "error",
      "as-needed"
    ],
    "sort-imports": ["error", {
      "ignoreCase": true,
      "ignoreDeclarationSort": true,
    }],
    "space-before-function-paren": "off",
  }
};