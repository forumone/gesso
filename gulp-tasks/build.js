/**
 * @file
 * Task to build all compiled files.
 */
'use strict';

module.exports = function (gulp, runSequence) {
  return function () {
    return runSequence(
      ['bower'],
      ['minify-js']
    );
  };
};
