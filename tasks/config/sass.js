module.exports = function(grunt) {

  grunt.config.merge({
    sass: {
      gesso: {
        files : [{
          expand : true,
          cwd : 'sass/',
          src : [ '**/*.scss' ],
          dest : 'css',
          ext : '.css'
        }],
        options : {
          sourceMap : true,
          outputStyle : 'nested',
          includePaths : [ 'bower_components' ],
          quiet : true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
}
