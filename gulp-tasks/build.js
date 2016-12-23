/**
 * @file
 * Task to build all compiled files.
 */
'use strict';

module.exports = function (gulp, runSequence) {
  return function (done) {
    return runSequence(
      ['bower', 'optimize-images'],
      ['compile-css', 'minify-css', 'minify-js'],
      done
    );
  };
};
