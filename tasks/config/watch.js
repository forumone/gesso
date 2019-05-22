module.exports = function(grunt) {
  grunt.config.merge({
    chokidar: {
      gesso: {
        files: [
          '<%= pkg.themePath %>/source/**/*.scss',
          '<%= pkg.themePath %>/source/_patterns/**/*.scss'
        ],
        tasks: ['gessoBuildStyles'],
        options: {
          usePolling: true
        }
      },
      patternlab: {
        files: [
          '<%= pkg.themePath %>/source/**/*.twig',
          '<%= pkg.themePath %>/source/**/*.json',
          '<%= pkg.themePath %>/source/**/*.yaml',
          '<%= pkg.themePath %>/source/**/*.yml'
        ],
        tasks: ['gessoBuildPatternlab'],
        options: {
          livereload: true,
          usePolling: true
        }
      },
      svgs: {
        files: ['<%= pkg.themePath %>/images/*.svg'],
        tasks: ['gessoBuildStyles'],
        options: {
          livereload: true,
          usePolling: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-chokidar');
};
