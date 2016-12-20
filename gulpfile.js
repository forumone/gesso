'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

// Create helpful error mesages.
var showError = function (error) {
  var report = '';
  var color = plugins.util.colors.white.bgRed;
  var task = error.plugin;
  var prob;
  var file;
  var line;
  var cause;

  if (task === 'gulp-uglify') {
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
  else if (task === 'gulp-sass') {
    prob = error.formatted;
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
  // console.log(error);

  // Prevent the watch task from stopping on errors.
  this.emit('end');
};

// Load external tasks.
gulp.task('bower', require('./gulp-tasks/bower')(gulp, plugins));
gulp.task('build', require('./gulp-tasks/build')(gulp, runSequence));
gulp.task('compile-css', ['sass-globbing'], require('./gulp-tasks/compile-css')(gulp, plugins, showError));
gulp.task('lint-js', require('./gulp-tasks/lint-js')(gulp, plugins, showError));
gulp.task('minify-js', require('./gulp-tasks/minify-js')(gulp, plugins, showError));
gulp.task('report-css', ['compile-css'], require('./gulp-tasks/report-css')(gulp, plugins));
gulp.task('report-js', ['minify-js'], require('./gulp-tasks/report-js')(gulp, plugins));
gulp.task('sass-globbing', require('./gulp-tasks/sass-globbing')(gulp, plugins, showError));
gulp.task('test', require('./gulp-tasks/test')(gulp, plugins));
gulp.task('watch', require('./gulp-tasks/watch')(gulp, plugins, runSequence));

// The default task, which builds then watches files.
gulp.task('default', function (done) {
  return runSequence(
    ['build'],
    ['watch'],
    done
  );
});
