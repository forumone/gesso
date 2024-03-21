import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';

const __dirname =
  import.meta.dirname ?? dirname(fileURLToPath(import.meta.url));

const themeConfig = (_env, argv) => ({
  mode: 'production',
  entry: {
    'design-tokens': './source/00-config/config.design-tokens.yml',
  },
  context: __dirname,
  plugins: [
    function readyToGoPlugin() {
      if (argv.mode === 'development') {
        this.hooks.beforeCompile.tap('ReadyToGoPlugin', () => {
          console.log(
            `${new Date().toLocaleTimeString('en-US', {
              timeZone: 'America/New_York',
              timeZoneName: 'short',
            })}: ${chalk.magenta(
              'Webpack beginning design tokens compilation.'
            )}`
          );
        });
        this.hooks.afterCompile.tap('ReadyToGoPlugin', () => {
          console.log(
            `${new Date().toLocaleTimeString('en-US', {
              timeZone: 'America/New_York',
              timeZoneName: 'short',
            })}: ${chalk.greenBright.bold(
              'Design tokens compilation complete. Watching for changes.'
            )}`
          );
        });
      }
    },
  ],
  module: {
    rules: [
      {
        test: /config\.design-tokens\.yml$/,
        exclude: /node_modules/,
        use: [path.resolve(__dirname, './lib/configLoader.cjs')],
        type: 'asset/source',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  stats: 'minimal',
});

export default themeConfig;
