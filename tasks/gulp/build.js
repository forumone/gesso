/**
 * @file
 * Task to build all compiled files.
 */
'use strict';

module.exports = function (gulp, runSequence) {
  return function (done) {
    return runSequence(
      ['build-css', 'compile-pattern-lab', 'minify-js'],
      done
    );
  };
};
