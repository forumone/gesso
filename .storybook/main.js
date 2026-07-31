/* eslint no-console: "off" */
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import path, { resolve, dirname } from 'node:path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import * as sass from 'sass-embedded';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const isProdBuild = process.env.NODE_ENV === 'production';
const ddevHostname = process.env.DDEV_HOSTNAME || process.env.VIRTUAL_HOST;

const config = {
  stories: [
    '../source/**/*.mdx',
    '../source/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  framework: {
    name: '@storybook/react-webpack5',
  },
  typescript: {
    check: false,
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-docs',
  ],
  features: {
    actions: false,
  },
  core: {
    // Replace allowedHosts value with your DDEV URL if neither ddevHostname nor the .ddev.site pattern apply.
    allowedHosts: ddevHostname ? [ddevHostname] : ['.ddev.site'],
  },
  staticDirs: ['../dist'],
  webpackFinal: async (webpackConfig, { configType }) => {
    // Storybook 8 removes fast-refresh as a framework option and instead
    // requires manual set-up.
    // Adapted from https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#frameworkoptionsfastrefresh-for-webpack5-based-projects-removed
    // and https://github.com/pmmmwh/react-refresh-webpack-plugin?tab=readme-ov-file#usage.
    const swcLoaderRule = webpackConfig.module.rules.find(
      rule =>
        (rule.loader && rule.loader.toString().includes('swc-loader')) ||
        (rule.use &&
          rule.use.some(
            subRule =>
              subRule.loader && subRule.loader.toString().includes('swc-loader')
          ))
    );
    if (swcLoaderRule) {
      swcLoaderRule.sideEffects = true;
      const swcLoaderConfig =
        swcLoaderRule.loader ||
        swcLoaderRule.use.find(
          subRule =>
            subRule.loader && subRule.loader.toString().includes('swc-loader')
        );
      if (swcLoaderConfig) {
        swcLoaderConfig.options = {
          ...swcLoaderConfig?.options,
          jsc: {
            ...swcLoaderConfig?.options?.jsc,
            transform: {
              ...swcLoaderConfig?.options?.jsc?.transform,
              react: {
                ...swcLoaderConfig?.options?.jsc?.transform?.react,
                development: !isProdBuild,
                refresh: !isProdBuild,
                runtime: 'automatic',
              },
            },
          },
        };
      }
    }
    webpackConfig.module.rules.push({
      test: /\.twig$/,
      use: [
        {
          loader: '@forumone/twig-loader',
          options: {
            twigOptions: {
              namespaces: {
                // Match gesso.info.yml components.namespaces where applicable.
                global: resolve(__dirname, '../', 'source/01-global'),
                utility: resolve(__dirname, '../', 'source/02-utility'),
                layouts: resolve(__dirname, '../', 'components/layouts'),
                components: resolve(__dirname, '../', 'components/components'),
                templates: resolve(__dirname, '../', 'components/templates'),
                // SDC provider:name — loader resolves under components/{components,layouts,templates}/
                gesso: resolve(__dirname, '../', 'components'),
              },
            },
          },
        },
      ],
    });

    webpackConfig.module.rules.push({
      test: /config\.design-tokens\.yml$/,
      exclude: /node_modules/,
      use: [
        'js-yaml-loader',
        path.resolve(__dirname, '../lib/configLoader.cjs'),
      ],
    });

    webpackConfig.module.rules.push({
      test: /\.ya?ml$/,
      exclude: /config\.design-tokens\.yml$/,
      loader: 'js-yaml-loader',
    });

    webpackConfig.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            esModule: false,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: sass,
            webpackImporter: false,
            sassOptions: {
              loadPaths: [path.resolve(__dirname, '../source')],
            },
          },
        },
      ],
    });

    webpackConfig.externals = {
      drupal: 'Drupal',
      drupalSettings: 'drupalSettings',
      once: 'once',
    };

    webpackConfig.resolve.modules.push(
      path.resolve(__dirname, '../source'),
      path.resolve(__dirname, '../components')
    );
    webpackConfig.stats = 'errors-warnings';

    if (configType === 'DEVELOPMENT') {
      webpackConfig.plugins.push(function readyToGoPlugin() {
        this.hooks.beforeCompile.tap('ReadyToGoPlugin', () => {
          console.log(
            `\n${new Date().toLocaleTimeString('en-US', {
              timeZone: 'America/New_York',
              timeZoneName: 'short',
            })}: Storybook's webpack beginning compilation.`
          );
        });
        this.hooks.afterCompile.tap('ReadyToGoPlugin', () => {
          console.log(
            `\n${new Date().toLocaleTimeString('en-US', {
              timeZone: 'America/New_York',
              timeZoneName: 'short',
            })}: Storybook's compilation complete. Watching for changes.`
          );
        });
      });
    }

    webpackConfig.plugins = [
      !isProdBuild &&
        new ReactRefreshWebpackPlugin({
          overlay: {
            sockIntegration: 'whm',
          },
        }),
      ...webpackConfig.plugins,
    ].filter(Boolean);

    // Storybook 9's builder-webpack no longer provides a polyfill for path,
    // but Twig.js still needs one.
    webpackConfig.resolve = {
      ...webpackConfig.resolve,
      fallback: {
        ...webpackConfig.resolve?.fallback,
        path: require.resolve('path-browserify'),
      },
    };

    return webpackConfig;
  },
};
export default config;
