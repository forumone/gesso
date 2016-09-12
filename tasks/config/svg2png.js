// https://github.com/dbushell/grunt-svg2png

module.exports = function (grunt) {
  grunt.config.merge({
    svg2png: {
      gesso: {
        files: [{
          expand: false,
          flatten: true,
          cwd: '<%= pkg.themePath %>/images/bg/',
          src: ['*.svg'],
          dest: '<%= pkg.themePath %>/images/bg/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-svg2png');
};
