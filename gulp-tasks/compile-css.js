/**
 * @file
 * Task to compile Sass into CSS using libsass.
 */
'use strict';

module.exports = function (gulp, plugins, showError) {
  return function () {
    var assets = require('postcss-assets');
    var autoprefixer = require('autoprefixer');
    var cssnano = require('cssnano');
    var mqpacker = require('css-mqpacker');
    var processors = [
      assets({
        loadPaths: ['./images/']
      }),
      autoprefixer({
        browsers: ['last 3 versions', '> 1%'],
        remove: false // Don’t remove outdated prefixes: about 10% faster.
      }),
      mqpacker(),
      cssnano({
        safe: true // Disable aggressive optimizations.
      })
    ];
    return gulp.src(['./sass/**/*.scss'], {base: './sass'})
      .pipe(plugins.plumber({errorHandler: showError}))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        includePaths: ['./bower_components'],
        precision: 10
      }))
      .pipe(plugins.postcss(processors))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest('./css'));
  };
};
