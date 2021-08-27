const gessoWebpack = require("../webpack.dev");
const { resolve } = require("path");

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
                base: resolve(__dirname, "../", "source/02-base"),
                layouts: resolve(__dirname, "../", "source/03-layouts"),
                components: resolve(__dirname, "../", "source/04-components"),
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

    return config;
  },
  core: {
    builder: "webpack5",
  },
};
