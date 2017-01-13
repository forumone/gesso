/**
 * @file
 * Task to watch files for changes and call appropriate tasks.
 */
'use strict';

module.exports = function (gulp, plugins, browserSync, runSequence) {
  return function () {
    gulp.watch(['.eslintrc.json'], ['lint-js']);
    gulp.watch(['.stylelintrc.json'], ['lint-css']);
    gulp.watch(['./bower.json'], ['bower']);
    gulp.watch(['./images/bg/*.svg'], ['create-png-fallbacks']);
    gulp.watch(['./images/**/*.{gif,jpg,jpeg,png,svg}'], ['optimize-images']);
    gulp.watch(['./js/**/*.js', '!./js/**/*.min.js'], ['minify-js', 'lint-js']);
    gulp.watch(['./pattern-lab/source/**/*'], ['compile-pattern-lab']);
    gulp.watch(['./sass/**/*.scss', '!./sass/partials/sass-globbing/**/*.scss'], ['compile-css', 'lint-css']);
    gulp.watch(['./templates/**/*.twig'], ['clear-drupal-cache']);
  };
};
