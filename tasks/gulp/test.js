/**
 * @file
 * Task to test gulp code.
 */
'use strict';

module.exports = function (gulp, plugins, showError) {
  return function () {
    return gulp.src(['gulpfile.js', './gulp-tasks/**/*.js'])
      .pipe(plugins.eslint({
        envs: ['node'],
        rules: {
          'no-console': ['error', {allow: ['warn', 'error']}]
        }
      }))
      .pipe(plugins.eslint.format());
  };
};
