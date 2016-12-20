/**
 * @file
 * Task to report CSS files.
 */
'use strict';

module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src(['./css/*.css'])
      .pipe(plugins.sizereport({gzip: true}));
  };
};
