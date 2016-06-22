// https://github.com/dbushell/grunt-svg2png

module.exports = function(grunt) {

  grunt.config.merge({
    svg2png: {
      dist: {
        files: [{
          expand: false,
          flatten: true,
          cwd: 'images/bg/',
          src: ['*.svg'],
          dest: 'images/bg/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-svg2png');
};
