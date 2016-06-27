module.exports = function(grunt) {

  grunt.config.merge({
    bower: {
      install: {
        options: {
          targetDir: 'bower_components',
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
};
