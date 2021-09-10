const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  entry: () => {
    // Grab any JS files.
    const jsFiles = glob
      .sync("source/**/!(*.stories).js")
      .reduce((entries, currentFile) => {
        const filePaths = currentFile.split(path.sep);
        const sourceDirIndex = filePaths.indexOf("source");
        if (sourceDirIndex >= 0) {
          const filePath = path.join(...filePaths.slice(sourceDirIndex + 1));
          const newFilePath = `js/${filePath.replace(".js", "")}`;
          entries[newFilePath] = path.resolve(__dirname, currentFile);
        }
        return entries;
      }, {});
    // Grab any SCSS files that aren't prefixed with _.
    const scssFiles = glob
      .sync("source/**/*.scss", {
        ignore: ["**/_*"],
      })
      .reduce((entries, currentFile) => {
        const filePaths = currentFile.split(path.sep);
        const sourceDirIndex = filePaths.indexOf("source");
        if (sourceDirIndex >= 0) {
          const filePath = path.join(...filePaths.slice(sourceDirIndex + 1));
          const newFilePath = `css/${filePath.replace(".scss", "")}`;
          entries[newFilePath] = `./${currentFile}`;
        }
        return entries;
      }, {});
    return {
      "css/design-tokens": "./source/00-config/config.design-tokens.yml",
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
            folder: "./dist/css",
            method: (absolutePath) => {
              return new RegExp(/\.js(\.map)?$/, "m").test(absolutePath);
            },
          },
        ],
      },
    }),
    new StylelintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /config\.design-tokens\.yml$/,
        exclude: /node_modules/,
        use: [path.resolve(__dirname, "./lib/configLoader.js")],
        type: "asset/resource",
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        exclude: /images\/_sprite-source-files\/.*\.svg$/,
        loader: "file-loader",
      },
    ],
  },
  externals: {
    jquery: "jQuery",
    drupal: "Drupal",
    drupalSettings: "drupalSettings",
  },
  resolve: {
    modules: [path.resolve(__dirname, 'source'), 'node_modules']
  }
};
