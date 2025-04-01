/* eslint no-console: "off" */
import { merge } from 'webpack-merge';
import ESLintPlugin from 'eslint-webpack-plugin';
import path, { dirname } from 'node:path';
import chalk from 'chalk';
import common from './webpack.common.js';
import { fileURLToPath } from 'node:url';

const __dirname =
  import.meta.dirname ?? dirname(fileURLToPath(import.meta.url));

const devConfig = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new ESLintPlugin({
      overrideConfigFile: path.resolve(__dirname, 'eslint.dev.config.js'),
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    function readyToGoPlugin() {
      this.hooks.beforeCompile.tap('ReadyToGoPlugin', () => {
        console.log(
          `${new Date().toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            timeZoneName: 'short',
          })}: ${chalk.magenta('Webpack beginning compilation.')}`
        );
      });
      this.hooks.afterCompile.tap('ReadyToGoPlugin', () => {
        console.log(
          `${new Date().toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            timeZoneName: 'short',
          })}: ${chalk.greenBright.bold(
            'Compilation complete. Watching for changes.'
          )}`
        );
      });
    },
  ],
});

export default devConfig;
