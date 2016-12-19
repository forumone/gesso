'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence');

// Create helpful error mesages.
var showError = function (error) {
  var report = '',
      color = plugins.util.colors.white.bgRed,
      task = error.plugin,
      prob,
      file,
      line,
      cause;

  if (task == 'gulp-uglify') {
    prob = error.message;
    if (error.cause) {
      if (error.cause.message) {
        cause = error.cause.message;
      }
      if (error.cause.filename) {
        file = error.cause.filename;
      }
      if (error.cause.line) {
        line = error.cause.line;
      }
    }
  }
  else {
    prob = error.message;
    if (error.fileName) {
      file = error.fileName;
    }
    if (error.lineNumber) {
      line = error.lineNumber;
    }
  }

  report += color('TASK:') + ' [' + task + ']\n';
  report += color('PROB:') + ' ' + prob + '\n';
  if (file) { report += color('FILE:') + ' ' + file + '\n'; }
  if (line) { report += color('LINE:') + ' ' + line + '\n'; }
  if (cause) { report += color('CASE:') + ' ' + cause + '\n'; }
  console.error(report);

  // Uncomment to inspect the error object.
  //console.log(error);

  // Prevent the watch task from stopping on errors.
  this.emit('end');
};

// Load external tasks.
gulp.task('bower', require('./gulp-tasks/bower')(gulp, plugins));
gulp.task('build', require('./gulp-tasks/build')(gulp, runSequence));
gulp.task('lint-js', require('./gulp-tasks/lint-js')(gulp, plugins, showError));
gulp.task('minify-js', require('./gulp-tasks/minify-js')(gulp, plugins, showError));
gulp.task('report-js', ['minify-js'], require('./gulp-tasks/report-js')(gulp, plugins));
gulp.task('watch', require('./gulp-tasks/watch')(gulp, plugins, runSequence));

// The default task, which builds then watches files.
gulp.task('default', ['build', 'watch']);
