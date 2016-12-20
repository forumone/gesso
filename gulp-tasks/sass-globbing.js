/**
 * @file
 * Task to use sass globbing.
 */
'use strict';

module.exports = function (gulp, plugins, showError) {
  return function (done) {
    var fs = require('fs');
    var globbingFiles = JSON.parse(fs.readFileSync('./sass/sass-globbing.json'));
    for (var target in globbingFiles) {
      if (globbingFiles.hasOwnProperty(target)) {
        var sourceFiles = globbingFiles[target];
        gulp.src(sourceFiles, {cwd: './sass'})
          .pipe(plugins.sassGlobbing(
            {
              path: target
            },
            {
              useSingleQuotes: true,
              signature: '// Generated with gulp-sass-globbing.'
            }
          ))
          .pipe(gulp.dest('./sass'));
      }
    }
    done();
  };
};
