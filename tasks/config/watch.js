module.exports = function (grunt) {
  grunt.config.merge({
    watch: {
      gesso: {
        files: ['<%= pkg.themePath %>/pattern-lab/source/**/*.scss','<%= pkg.themePath %>/pattern-lab/source/_patterns/**/*.scss'],
        tasks: ['gessoBuildStyles'],
      },
      patternlab: {
        files: ['<%= pkg.themePath %>/pattern-lab/source/**/*.twig','<%= pkg.themePath %>/pattern-lab/source/**/*.json','<%= pkg.themePath %>/pattern-lab/source/**/*.yaml','<%= pkg.themePath %>/pattern-lab/source/**/*.yml'],
        tasks: ['shell:patternlab'],
        options: {
          livereload: true
        }
      },
      svgs: {
        files: ['<%= pkg.themePath %>/images/*.svg'],
        tasks: ['gessoBuildStyles'],
      },
    }
  });

  grunt.loadNpmTasks('grunt-simple-watch');
}
