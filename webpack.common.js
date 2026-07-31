import path, { dirname } from 'node:path';
import { Glob } from 'glob';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import RemovePlugin from 'remove-files-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import * as embeddedSass from 'sass-embedded';
import { fileURLToPath } from 'node:url';
import SvgSpritemapPlugin from 'svg-spritemap-webpack-plugin';

const __dirname =
  import.meta.dirname ?? dirname(fileURLToPath(import.meta.url));

async function gatherProjectFiles() {
  const jsFiles = {};
  const scssFiles = {};

  // Source directory globs
  const jsGlob = new Glob('source/**/!(*.stories).{cjs,js,ts}', {
    ignore: ['**/_*', 'source/@types/**', 'source/03-react/**'],
  });
  const scssGlob = new Glob('source/**/*.scss', jsGlob);

  // Component directory globs
  const componentJsGlob = new Glob('components/**/*.source.{js,ts}', {
    ignore: ['**/_*'],
  });
  const componentScssGlob = new Glob('components/**/*.source.{scss,css}', {
    ignore: ['**/_*'],
  });

  // Process source JS files
  for await (const currentFile of jsGlob.iterate()) {
    const filePaths = currentFile.split(path.sep);
    const sourceDirIndex = filePaths.indexOf('source');
    if (sourceDirIndex >= 0) {
      const fileName = path.basename(currentFile).replace(/\.c?[jt]s$/, '');
      const newFilePath = `dist/js/${fileName}`;
      // Throw an error if duplicate files detected.
      if (jsFiles[newFilePath]) {
        throw new Error(`More than one file named ${fileName}.[jt]s found.`);
      }
      jsFiles[newFilePath] = {
        import: path.resolve(__dirname, currentFile),
      };
    }
  }

  // Process source SCSS files
  for await (const currentFile of scssGlob.iterate()) {
    const filePaths = currentFile.split(path.sep);
    const sourceDirIndex = filePaths.indexOf('source');
    if (sourceDirIndex >= 0) {
      const fileName = path.basename(currentFile, '.scss');
      const newFilePath = `dist/css/${fileName}`;
      // Throw an error if duplicate files detected.
      if (scssFiles[newFilePath]) {
        throw new Error(`More that one file named ${fileName}.scss found.`);
      }
      scssFiles[newFilePath] = {
        import: path.resolve(__dirname, currentFile),
      };
    }
  }

  // Process component JS files
  for await (const currentFile of componentJsGlob.iterate()) {
    const filePaths = currentFile.split(path.sep);
    const componentsIndex = filePaths.indexOf('components');
    if (componentsIndex >= 0) {
      const relativePath = filePaths.slice(componentsIndex).join(path.sep);
      const fileName = path
        .basename(currentFile)
        .replace(/\.source\.([jt]s)$/, '');
      const dirPath = path.dirname(relativePath);
      const newFilePath = `${dirPath}/${fileName}`;

      if (jsFiles[newFilePath]) {
        throw new Error(
          `More than one component file named ${currentFile} found.`
        );
      }

      jsFiles[newFilePath] = {
        import: path.resolve(__dirname, currentFile),
      };
    }
  }

  // Process component SCSS/CSS files
  for await (const currentFile of componentScssGlob.iterate()) {
    const filePaths = currentFile.split(path.sep);
    const componentsIndex = filePaths.indexOf('components');
    if (componentsIndex >= 0) {
      const relativePath = filePaths.slice(componentsIndex).join(path.sep);
      const fileName = path
        .basename(currentFile)
        .replace(/\.source\.(scss|css)$/, '');
      const dirPath = path.dirname(relativePath);
      const newFilePath = `${dirPath}/${fileName}.tmp`;

      if (scssFiles[newFilePath]) {
        throw new Error(
          `More than one component file named ${currentFile} found.`
        );
      }

      scssFiles[newFilePath] = {
        import: path.resolve(__dirname, currentFile),
      };
    }
  }

  return {
    ...jsFiles,
    ...scssFiles,
  };
}

const commonConfig = {
  entry: () => gatherProjectFiles(),
  plugins: [
    new MiniCssExtractPlugin({
      filename: pathData => `${pathData.chunk.name.replace('.tmp', '')}.css`,
    }),
    new RemovePlugin({
      after: {
        test: [
          {
            folder: './dist/css',
            method: absolutePath => /\.js(\.map)?$/m.test(absolutePath),
            recursive: true,
          },
          {
            folder: './components',
            method: absolutePath => /\.tmp.js(\.map)?$/m.test(absolutePath),
            recursive: true,
          },
        ],
        log: false,
        logError: true,
        logWarning: false,
      },
    }),
    new StylelintPlugin({
      files: ['source/**/*.scss', 'components/**/*.source.{scss,css}'],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new SvgSpritemapPlugin('source/images/_sprite-source-files/*.svg', {
      output: {
        filename: 'dist/images/sprite.artifact.svg',
        svg4everybody: false,
        svgo: true,
      },
      sprite: {
        prefix: '',
        generate: {
          title: false,
          use: true,
        },
      },
    }),
  ],
  context: __dirname,
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
  },
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
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['swc-loader'],
        resolve: {
          fullySpecified: false,
        },
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
              esModule: false,
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
                loadPaths: [path.resolve(__dirname, 'source')],
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
          filename: 'dist/fonts/[name][ext][query]',
        },
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/i,
        exclude: [/images\/_sprite-source-files\/.*\.svg$/, '/node_modules/'],
        type: 'asset',
        generator: {
          filename: 'dist/images/backgrounds/[hash][ext][query]',
        },
      },
    ],
  },
  externals: {
    drupal: 'Drupal',
    drupalSettings: 'drupalSettings',
    once: 'once',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    extensionAlias: {
      '.es6': ['.es6.ts', '.es6.js'],
    },
    modules: [path.resolve(__dirname, 'source'), 'node_modules'],
    enforceExtension: false,
  },
  output: {
    path: path.resolve(__dirname),
    clean: false,
  },
  stats: 'minimal',
};

export default commonConfig;
