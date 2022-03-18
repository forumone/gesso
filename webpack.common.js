const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const dartSass = require('sass');

module.exports = {
  entry: () => {
    // Grab any JS files.
    const jsFiles = glob
      .sync('source/**/!(*.stories).js', {
        ignore: ['**/_*'],
      })
      .reduce((entries, currentFile) => {
        const updatedEntries = entries;
        const filePaths = currentFile.split(path.sep);
        const sourceDirIndex = filePaths.indexOf('source');
        if (sourceDirIndex >= 0) {
          const fileName = path.basename(currentFile, '.js');
          const newFilePath = `js/${fileName}`;
          // Throw an error if duplicate files detected.
          if (updatedEntries[newFilePath]) {
            throw new Error(`More than one file named ${fileName}.js found.`);
          }
          updatedEntries[newFilePath] = {
            import: path.resolve(__dirname, currentFile),
          };
        }
        return updatedEntries;
      }, {});
    // Grab any SCSS files that aren't prefixed with _.
    const scssFiles = glob
      .sync('source/**/*.scss', {
        ignore: ['**/_*'],
      })
      .reduce((entries, currentFile) => {
        const updatedEntries = entries;
        const filePaths = currentFile.split(path.sep);
        const sourceDirIndex = filePaths.indexOf('source');
        if (sourceDirIndex >= 0) {
          const fileName = path.basename(currentFile, '.scss');
          const newFilePath = `css/${fileName}`;
          // Throw an error if duplicate files detected.
          if (updatedEntries[newFilePath]) {
            throw new Error(`More that one file named ${fileName}.scss found.`);
          }
          updatedEntries[newFilePath] = {
            import: `./${currentFile}`,
          };
        }
        return updatedEntries;
      }, {});
    return {
      ...jsFiles,
      ...scssFiles,
    };
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new RemovePlugin({
      after: {
        test: [
          {
            folder: './dist/css',
            method: absolutePath =>
              new RegExp(/\.js(\.map)?$/, 'm').test(absolutePath),
            recursive: true,
          },
        ],
      },
    }),
    new StylelintPlugin({
      exclude: ['node_modules', 'dist', 'storybook'],
    }),
    new SpriteLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /config\.design-tokens\.yml$/,
        exclude: /node_modules/,
        use: [path.resolve(__dirname, './lib/configLoader.js')],
        type: 'asset/source',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              // Ignore /core/ URLs
              url: {
                filter: url => !url.includes('/core/'),
              },
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: dartSass,
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'source')],
              },
            },
          },
        ],
      },
      {
        test: /images\/_sprite-source-files\/.*\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'sprite.artifact.svg',
              outputPath: 'images/',
            },
          },
          'svg-transform-loader',
          'svgo-loader',
        ],
      },
      {
        test: /fonts\/.*\.(woff2?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        exclude: ['/node_modules/'],
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        exclude: [/images\/_sprite-source-files\/.*\.svg$/, '/node_modules/'],
        type: 'asset',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
    ],
  },
  externals: {
    jquery: 'jQuery',
    drupal: 'Drupal',
    drupalSettings: 'drupalSettings',
    once: 'once',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'source'), 'node_modules'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
};
