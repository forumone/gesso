/**
 * @file
 * Task to minify CSS with cssnano and mqpacker.
 */
'use strict';

module.exports = function (gulp, plugins, showError) {
  return function () {
    var cssnano = require('cssnano');
    var mqpacker = require('css-mqpacker');
    var processors = [
      mqpacker(),
      cssnano({
        safe: true // Disable aggressive optimizations.
      })
    ];
    return gulp.src(['./css/**/*.css'], {base: '.'})
      .pipe(plugins.plumber({errorHandler: showError}))
      .pipe(plugins.cached('minify-css'))
      .pipe(plugins.sourcemaps.init({loadMaps: true}))
      .pipe(plugins.postcss(processors))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest('.'));
  };
};
