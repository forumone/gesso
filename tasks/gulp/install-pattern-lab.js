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
      var error = new plugins.util.PluginError('install-pattern-lab', 'You need to manually install Pattern Lab first by running:\ncomposer create-project pattern-lab/edition-drupal-standard pattern-lab\nAlways choose \'r\' to replace when prompted and select #4 for the Gesso starterkit.');
      done(error);
    }
  };
};
