const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'design-tokens': './source/00-config/config.design-tokens.yml',
  },
  context: __dirname,
  module: {
    rules: [
      {
        test: /config\.design-tokens\.yml$/,
        exclude: /node_modules/,
        use: [path.resolve(__dirname, './lib/configLoader.js')],
        type: 'asset/source',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
};
