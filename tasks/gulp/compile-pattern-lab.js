/**
 * @file
 * Task to compile Pattern Lab.
 */
'use strict';

module.exports = function (gulp, plugins, showError) {
  return function (done) {
    var exec = require('child_process').exec;
    exec('php core/console --generate', {cwd: './pattern-lab'}, function (error, stdout, stderr) {
      stdout = stdout.trim();
      if (stdout) {
        plugins.util.log(stdout);
      }
      done(error);
    });
  };
};
