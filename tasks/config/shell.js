module.exports = function (grunt) {
  grunt.config.merge({
    shell: {
      patternlab: {
        command: 'patternlab build --config ./patternlab-config.json',
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
