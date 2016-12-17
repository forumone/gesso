/**
 * @file
 * Task to minify JS with sourcemaps.
 */

module.exports = function (gulp, plugins, showError) {
  return function () {
    return gulp.src(['./js/**/*.js', '!./js/**/*.min.js'], { base: "." })
      .pipe(plugins.plumber({ errorHandler: showError }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.uglify())
      .pipe(plugins.rename({ suffix: '.min' }))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest('.'));
  };
}
