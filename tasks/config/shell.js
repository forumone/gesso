module.exports = function (grunt) {
  grunt.config.merge({
    shell: {
      patternlab: {
        command: 'patternlab build --config ./patternlab-config.json',
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
