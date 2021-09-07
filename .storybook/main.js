const gessoWebpack = require("../webpack.dev");
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  stories: ["../source/**/*.stories.mdx", "../source/**/*.stories.@(js|jsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.twig$/,
      use: [
        {
          loader: "twig-loader",
          options: {
            twigOptions: {
              namespaces: {
                global: resolve(__dirname, "../", "source/01-global"),
                layouts: resolve(__dirname, "../", "source/02-layouts"),
                components: resolve(__dirname, "../", "source/03-components"),
                templates: resolve(__dirname, "../", "source/04-templates"),
              },
            },
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      loader: "js-yaml-loader",
    });

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            implementation: require("sass"),
          },
        },
      ],
    });

    config.externals = {
      jquery: "jQuery",
      drupal: "Drupal",
      drupalSettings: "drupalSettings",
    };

    return config;
  },
  core: {
    builder: "webpack5",
  },
};
