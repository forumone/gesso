/**
 * @file
 * Task to build all compiled CSS files.
 */
'use strict';

module.exports = function (gulp, runSequence) {
  return function (done) {
    return runSequence(
      ['optimize-images'],
      ['compile-css', 'minify-css'],
      done
    );
  };
};
