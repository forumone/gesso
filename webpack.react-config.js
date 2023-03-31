/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'source/07-react', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist/js/react'),
    chunkFilename: '[name]-[fullhash].js',
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(?:png|svg|jpg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
};
