/* eslint no-console: "off" */
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
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    function readyToGoPlugin() {
      this.hooks.beforeCompile.tap('ReadyToGoPlugin', () => {
        console.log(
          `\n${new Date().toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            timeZoneName: 'short',
          })}: Webpack beginning compilation.`
        );
      });
      this.hooks.afterCompile.tap('ReadyToGoPlugin', () => {
        console.log(
          `\n${new Date().toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            timeZoneName: 'short',
          })}: Compilation complete. Watching for changes.`
        );
      });
    },
  ],
});
