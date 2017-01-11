/**
 * @file
 * Task to report image files.
 */
'use strict';

module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src(['./images/**/*.{gif,jpg,jpeg,png,svg}'])
      .pipe(plugins.sizereport());
  };
};
