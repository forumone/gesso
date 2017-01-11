/**
 * @file
 * Task to install Bower components.
 */
'use strict';

module.exports = function (gulp, plugins) {
  return function () {
    return plugins.bower({cwd: '.'})
      .pipe(gulp.dest('./bower_components'));
  };
};
