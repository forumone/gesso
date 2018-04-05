module.exports = function (grunt) {
  grunt.config.merge({
    clean: {
      patternlabSetupClear: {
        src: [
          '!<%= pkg.themePath %>/pattern-lab/source/**',
          '<%= pkg.themePath %>/pattern-lab/source/*',
          '!<%= pkg.themePath %>/pattern-lab/source/_twig-components'
        ]
      },
      patternlabSetupCleanup: {
        src: [
          '<%= pkg.themePath %>/_starter-kit'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
}
