module.exports = function (grunt) {
  grunt.config.merge({
    shell: {
      patternlab: {
        command: 'patternlab serve --config ./patternlab-config.json',
        options: {
          execOptions: {
            cwd: '<%= pkg.themePath %>'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
}
