module.exports = function (grunt) {
  grunt.config.merge({
    clean: {
      patternlab : {
        src: [
          '<%= pkg.themePath %>/pattern-lab'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
}
