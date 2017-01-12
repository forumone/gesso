/**
 * @file
 * Task to lint JS with ESLint.
 */
'use strict';

module.exports = function (gulp, plugins, showError) {
  return function () {
    return gulp.src(['./js/**/*.js', '!./js/**/*.min.js'], {base: '.'})
      .pipe(plugins.cached('lint-js'))
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format());
  };
};
