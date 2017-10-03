module.exports = function (grunt) {
  grunt.config.merge({
    shell: {
      patternlabSetupInstall: {
        command: "composer create-project pattern-lab/edition-drupal-standard pattern-lab --no-interaction || true",
        options: {
          execOptions : {
            cwd: '<%= pkg.themePath %>'
          }
        }
      },
      patternlabComposer: {
        command: 'composer install',
        options: {
          execOptions : {
            cwd: '<%= pkg.themePath %>/pattern-lab'
          }
        }
      },
      patternlab: {
        command: 'php core/console --generate',
        options: {
          execOptions: {
            cwd: '<%= pkg.themePath %>/pattern-lab'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
}
