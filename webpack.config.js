const TerserJsPlugin = require('terser-webpack-plugin');
const glob = require('glob');
const path = require('path');

module.exports = (mode) => {
  const isProduction = mode === 'production';
  const isDevelopment = !isProduction;
  const sourceFiles = glob.sync('js/src/*.es6.js');
  const entry = {};
  sourceFiles.forEach((file) => {
    const key = path.basename(file, '.es6.js');
    entry[key] = `./${file}`;
  });
  return {
    entry,
    context: __dirname,
    mode,
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'common'
      },
      minimizer: [
        new TerserJsPlugin({
          terserOptions: { comments: false },
        })
      ]
    },
    output: {
      path: `${__dirname}/js/dist`,
      filename: '[name].min.js'
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
      ]
    }
  };
};