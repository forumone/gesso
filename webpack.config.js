const TerserJsPlugin = require('terser-webpack-plugin');
const glob = require('glob');
const path = require('path');

module.exports = mode => {
  const isProduction = mode === 'production';
  const isDevelopment = !isProduction;
  const sourceFiles = glob.sync('js/src/*.es6.js');
  const entry = {};
  sourceFiles.forEach(file => {
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
        name: 'common',
        minChunks: 2,
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
    devtool: isDevelopment ? 'source-map' : false,
    output: {
      path: `${__dirname}/js/dist`,
      filename: '[name].min.js',
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'eslint-loader',
              options: {
                configFile: isDevelopment
                  ? path.resolve(__dirname, '.eslintrc-dev.js')
                  : path.resolve(__dirname, '.eslintrc.js'),
              },
            },
          ],
        },
      ],
    },
    externals: {
      jquery: 'jQuery',
      drupal: 'Drupal',
      drupalSettings: 'drupalSettings',
      modernizr: 'Modernizr',
    },
  };
};
