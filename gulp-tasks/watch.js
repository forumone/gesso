/**
 * @file
 * Task to watch files for changes and call appropriate tasks.
 */
'use strict';

module.exports = function (gulp, plugins, runSequence) {
  return function () {
    gulp.watch(['./js/**/*.js', '!./js/**/*.min.js'], ['lint-js', 'minify-js', 'report-js']);
    gulp.watch(['./sass/**/*.scss', '!./sass/partials/sass-globbing/**/*.scss'], ['compile-css', 'report-css']);
  };
};
