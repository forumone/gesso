/**
 * @file
 * Task to report minified JS files.
 */
'use strict';

module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src(['./js/*.min.js'])
      .pipe(plugins.sizereport({gzip: true}));
  };
};
