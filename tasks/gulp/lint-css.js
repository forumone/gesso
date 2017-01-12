/**
 * @file
 * Task to lint CSS with Styleint.
 */
'use strict';

module.exports = function (gulp, plugins, showError) {
  return function () {
    return gulp.src(['./sass/**/*.scss'])
      .pipe(plugins.plumber({errorHandler: showError}))
      .pipe(plugins.cached('lint-css'))
      .pipe(plugins.stylelint({
        reporters: [{formatter: 'string', console: true}]
      }));
  };
};
