const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new ESLintPlugin({
      overrideConfigFile: path.resolve(__dirname, '.eslintrc-dev.js'),
      useEslintrc: false,
    }),
  ],
});
