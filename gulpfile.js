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

  // Prevent the watch task from stopping.
  this.emit('end');
};

// Install Bower components.
gulp.task('bower', function () { 
  plugins.bower({ cwd: '.' })
    .pipe(gulp.dest('./bower_components'));
});

// Minify js files with sourcemaps.
gulp.task('js', function () {
  gulp.src(['./js/**/*.js', '!./js/**/*.min.js'], { base: "./" })
    .pipe(plugins.plumber({ errorHandler: showError }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.uglify())
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('.'));
});

// Show filesize report for js files.
gulp.task('report:js', function () {
  gulp.src(['./js/**/*.min.js'])
    .pipe(plugins.sizereport({ gzip: true }));
});

// The build task.
gulp.task('build', function (callback) {
  runSequence(
    ['bower', ],
    ['js'],
    callback
  );
});

// The watch task.
gulp.task('watch', function () {
  gulp.watch(['./js/**/*.js', '!./js/**/*.min.js'], ['js']);
});

// The default task, which builds then watches files.
gulp.task('default', ['build', 'watch']);
