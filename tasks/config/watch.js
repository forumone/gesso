module.exports = function(grunt) {
  grunt.config.merge({
    chokidar: {
      gesso: {
        options: {
          atBegin: true,
        },
        files: [
          '<%= pkg.themePath %>/pattern-lab/source/**/*.scss',
          '<%= pkg.themePath %>/pattern-lab/source/_patterns/**/*.scss'
        ],
        tasks: ['gessoBuildStyles'],
        options: {
          usePolling: true
        }
      },
      patternlab: {
        files: [
          '<%= pkg.themePath %>/pattern-lab/source/**/*.twig',
          '<%= pkg.themePath %>/pattern-lab/source/**/*.json',
          '<%= pkg.themePath %>/pattern-lab/source/**/*.yaml',
          '<%= pkg.themePath %>/pattern-lab/source/**/*.yml'
        ],
        tasks: ['shell:patternlab'],
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
