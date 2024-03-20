import path, { dirname } from 'node:path';
import embeddedSass from 'sass-embedded';
import { fileURLToPath } from 'node:url';

const __dirname =
  import.meta.dirname ?? dirname(fileURLToPath(import.meta.url));

const reactConfig = {
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
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    modules: [path.resolve(__dirname, 'source'), 'node_modules'],
  },

  stats: 'minimal',
};

export default reactConfig;
