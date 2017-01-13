'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
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
gulp.task('bower', require('./tasks/gulp/bower')(gulp, plugins));
gulp.task('browser-sync', require('./tasks/gulp/browser-sync')(gulp, browserSync));
gulp.task('build', require('./tasks/gulp/build')(gulp, runSequence));
gulp.task('build-css', require('./tasks/gulp/build-css')(gulp, runSequence));
gulp.task('clear-drupal-cache', require('./tasks/gulp/clear-drupal-cache')(gulp, plugins, browserSync, showError));
gulp.task('compile-css', ['sass-globbing'], require('./tasks/gulp/compile-css')(gulp, plugins, browserSync, showError));
gulp.task('compile-pattern-lab', ['install-pattern-lab'], require('./tasks/gulp/compile-pattern-lab')(gulp, plugins, browserSync, showError));
gulp.task('create-png-fallbacks', ['optimize-images'], require('./tasks/gulp/create-png-fallbacks')(gulp, plugins, showError));
gulp.task('install-pattern-lab', require('./tasks/gulp/install-pattern-lab')(gulp, plugins, showError));
gulp.task('lint-css', require('./tasks/gulp/lint-css')(gulp, plugins, showError));
gulp.task('lint-js', require('./tasks/gulp/lint-js')(gulp, plugins, showError));
gulp.task('minify-css', ['compile-css'], require('./tasks/gulp/minify-css')(gulp, plugins, showError));
gulp.task('minify-js', require('./tasks/gulp/minify-js')(gulp, plugins, browserSync, showError));
gulp.task('optimize-images', require('./tasks/gulp/optimize-images')(gulp, plugins, browserSync, showError));
gulp.task('report-css', ['minify-css'], require('./tasks/gulp/report-css')(gulp, plugins));
gulp.task('report-images', ['optimize-images'], require('./tasks/gulp/report-images')(gulp, plugins));
gulp.task('report-js', ['minify-js'], require('./tasks/gulp/report-js')(gulp, plugins));
gulp.task('sass-globbing', require('./tasks/gulp/sass-globbing')(gulp, plugins, showError));
gulp.task('test', require('./tasks/gulp/test')(gulp, plugins));
gulp.task('watch', ['browser-sync'], require('./tasks/gulp/watch')(gulp, plugins, runSequence));

// The default task, which builds then watches files.
gulp.task('default', function (done) {
  return runSequence(
    ['build'],
    ['watch'],
    done
  );
});
