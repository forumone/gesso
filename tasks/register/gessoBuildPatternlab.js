module.exports = function (grunt) {
  grunt.registerTask('gessoBuildPatternlab', [
    'clean:patternlab',
    'shell:patternlab'
  ]);
};
