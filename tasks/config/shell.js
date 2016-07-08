module.exports = function (grunt) {
  grunt.config.merge({
    shell: {
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
