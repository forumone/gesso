import { merge } from 'webpack-merge';
import TerserJsPlugin from 'terser-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import common from './webpack.common.js';

const prodConfig = merge(common, {
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
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
});

export default prodConfig;
