const path = require('path');
const embeddedSass = require('sass-embedded');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'source/07-react', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist/js/react'),
    chunkFilename: '[name]-[fullhash].js',
    filename: '[name].js',
    clean: true,
  },
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'swc-loader',
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
          {
            loader: 'sass-loader',
            options: {
              implementation: embeddedSass,
              webpackImporter: false,
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'source')],
              },
            },
          },
        ],
      },
      {
        test: /fonts\/.*\.(woff2?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        exclude: ['/node_modules/'],
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    modules: [path.resolve(__dirname, 'source'), 'node_modules'],
  },

  stats: 'minimal',
};
