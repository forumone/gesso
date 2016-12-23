/**
 * @file
 * Task to install Pattern Lab using Composer.
 */
'use strict';

module.exports = function (gulp, plugins, showError) {
  return function (done) {
    var exec = require('child_process').exec;
    var fs = require('fs');
    if (fs.existsSync('./pattern-lab')) {
      plugins.util.log('Pattern Lab directory already exists.');
      done();
    }
    else {
      exec('composer create-project pattern-lab/edition-drupal-standard pattern-lab', {cwd: './'}, function (error, stdout, stderr) {
        stdout = stdout.trim();
        stderr = stderr.trim();
        if (stdout) {
          plugins.util.log(stdout);
        }
        if (stderr) {
          plugins.util.log(stderr);
        }
        done(error);
      });
    }
  };
};
