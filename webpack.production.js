const { merge } = require('webpack-merge');
const TerserJsPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          name: 'js/common',
          minChunks: 2,
        },
      },
    },
    minimizer: [
      new TerserJsPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  devtool: false,
  plugins: [new ESLintPlugin()],
});
