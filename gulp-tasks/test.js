/**
 * @file
 * Task to test gulp code.
 */

module.exports = function (gulp, plugins, showError) {
  return function () {
    return gulp.src(['gulpfile.js', './gulp-tasks/**/*.js'])
      .pipe(plugins.eslint({
        envs: ['node']
      }))
      .pipe(plugins.eslint.format());
  };
}
