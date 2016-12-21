/**
 * @file
 * Task to optimize images.
 */
'use strict';

module.exports = function (gulp, plugins, showError) {
  return function () {
    var pngcrush = require('imagemin-pngcrush');
    var pngquant = require('imagemin-pngquant');
    return gulp.src(['./images/**/*.{gif,jpg,jpeg,png,svg}'], {base: '.'})
      .pipe(plugins.plumber({errorHandler: showError}))
      .pipe(plugins.imagemin({
        progressive: true,
        svgoPlugins: [
          {removeRasterImages: true},
          {removeTitle: true},
          {removeViewBox: false},
          {removeXMLNS: false}, // Can be true for inline SVGs, not background images.
          {sortAttrs: true}
        ],
        use: [pngcrush(), pngquant()]
      }))
      .pipe(gulp.dest('.'));
  };
};
