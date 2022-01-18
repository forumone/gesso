const { resolve } = require('path');
const path = require('path');

module.exports = {
  stories: ['../source/**/*.stories.mdx', '../source/**/*.stories.@(js|jsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
      },
    },
    '@storybook/addon-a11y',
  ],
  staticDirs: ['../dist'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.twig$/,
      use: [
        {
          loader: 'twig-loader',
          options: {
            twigOptions: {
              namespaces: {
                global: resolve(__dirname, '../', 'source/01-global'),
                layouts: resolve(__dirname, '../', 'source/02-layouts'),
                components: resolve(__dirname, '../', 'source/03-components'),
                templates: resolve(__dirname, '../', 'source/04-templates'),
                pages: resolve(__dirname, '../', 'source/05-pages'),
              },
            },
          },
        },
      ],
    });

    config.module.rules.push({
      test: /config\.design-tokens\.yml$/,
      exclude: /node_modules/,
      use: [
        'js-yaml-loader',
        path.resolve(__dirname, '../lib/configLoader.js'),
      ],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      exclude: /config\.design-tokens\.yml$/,
      loader: 'js-yaml-loader',
    });

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sassOptions: {
              includePaths: [path.resolve(__dirname, '../source')],
            },
          },
        },
      ],
    });

    config.externals = {
      drupal: 'Drupal',
      drupalSettings: 'drupalSettings',
      once: 'once',
    };

    config.resolve.modules.push(path.resolve(__dirname, '../source'));

    return config;
  },
  core: {
    builder: 'webpack5',
  },
};
