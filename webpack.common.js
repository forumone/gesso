/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const { Glob } = require('glob');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const embeddedSass = require('sass-embedded');

async function gatherProjectFiles() {
  const jsFiles = {};
  const scssFiles = {};
  const jsGlob = new Glob('source/**/!(*.stories).[jt]s', {
    ignore: ['**/_*', 'source/@types/**'],
  });
  const scssGlob = new Glob('source/**/*.scss', jsGlob);
  // The Airbnb style guide, which we're generally following, does not allow
  // for for...of statements. There's a long debate about this rule at
  // https://github.com/airbnb/javascript/issues/1271, but the gist seems to be
  // that the intention is to disable loops for arrays in favor of array iteration.
  // I don't think that applies here, since we're using it with an AsyncGenerator,
  // and the code here follows the examples of the documentation for Glob and
  // the MDN example of an AsyncGenerator.
  // eslint-disable-next-line no-restricted-syntax
  for await (const currentFile of jsGlob.iterate()) {
    const filePaths = currentFile.split(path.sep);
    const sourceDirIndex = filePaths.indexOf('source');
    if (sourceDirIndex >= 0) {
      const fileName = path.basename(currentFile).replace(/\.[jt]s$/, '');
      const newFilePath = `js/${fileName}`;
      // Throw an error if duplicate files detected.
      if (jsFiles[newFilePath]) {
        throw new Error(`More than one file named ${fileName}.[jt]s found.`);
      }
      jsFiles[newFilePath] = {
        import: path.resolve(__dirname, currentFile),
      };
    }
  }
  // See comment above for why this is disabled.
  // eslint-disable-next-line no-restricted-syntax
  for await (const currentFile of scssGlob.iterate()) {
    const filePaths = currentFile.split(path.sep);
    const sourceDirIndex = filePaths.indexOf('source');
    if (sourceDirIndex >= 0) {
      const fileName = path.basename(currentFile, '.scss');
      const newFilePath = `css/${fileName}`;
      // Throw an error if duplicate files detected.
      if (scssFiles[newFilePath]) {
        throw new Error(`More that one file named ${fileName}.scss found.`);
      }
      scssFiles[newFilePath] = {
        import: `./${currentFile}`,
      };
    }
  }
  return {
    ...jsFiles,
    ...scssFiles,
  };
}

module.exports = {
  entry: () => gatherProjectFiles(),
  plugins: [
    new MiniCssExtractPlugin(),
    new RemovePlugin({
      after: {
        test: [
          {
            folder: './dist/css',
            method: absolutePath => /\.js(\.map)?$/m.test(absolutePath),
            recursive: true,
          },
        ],
      },
    }),
    new StylelintPlugin({
      exclude: ['node_modules', 'dist', 'storybook'],
    }),
    new SpriteLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // We will check types in fork plugin
          transpileOnly: true,
        },
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
          filename: 'images/backgrounds/[hash][ext][query]',
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
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'source'), 'node_modules'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: {
      keep: /images/,
    },
  },
  stats: 'minimal',
};
