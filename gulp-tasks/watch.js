/**
 * @file
 * Task to watch files for changes and call appropriate tasks.
 */

module.exports = function (gulp, plugins, runSequence) {
  return function () {
    gulp.watch(['./js/**/*.js', '!./js/**/*.min.js'], ['lint-js', 'minify-js', 'report-js']);
  };
}
