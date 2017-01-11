/**
 * @file
 * Task to create PNG fallback images for SVGs.
 */
'use strict';

module.exports = function (gulp, plugins, showError) {
  return function () {
    return gulp.src(['./images/bg/*.svg'], {base: '.'})
      .pipe(plugins.plumber({errorHandler: showError}))
      .pipe(plugins.svg2png())
      .pipe(gulp.dest('.'));
  };
};
