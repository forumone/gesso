/**
 * @file
 * Task to lint JS with ESLint.
 */

module.exports = function (gulp, plugins, showError) {
  return function () {
    return gulp.src(['./js/**/*.js', '!./js/**/*.min.js'], { base: "." })
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format());
  };
}
