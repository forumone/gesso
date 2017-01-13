/**
 * @file
 * Task to rebuild Drupal 8 cache via drush.
 */
'use strict';

module.exports = function (gulp, plugins, browserSync, showError) {
  return function (done) {
    var exec = require('child_process').exec;
    exec('drush cr', {cwd: '.'}, function (error, stdout, stderr) {
      stdout = stdout.trim();
      if (stdout) {
        plugins.util.log(stdout);
      }
      browserSync.reload();
      done(error);
    });
  };
};
