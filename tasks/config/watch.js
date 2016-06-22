module.exports = function(grunt) {

  grunt.config.merge({
    watch : {
      gesso: {
        files : [ 'sass/**/*.scss' ],
        tasks : [ 'buildStyles' ],
      },
      patternlab : {
        files : [ 'pattern-lab/source/**/*' ],
        tasks : [ 'shell:patternlab' ],
        options : {
          livereload : true
        }
      },
      svgs: {
        files : [ 'images/bg/*.svg' ],
        tasks : [ 'buildImages','buildStyles' ],
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-watch');
}
