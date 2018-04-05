module.exports = function (grunt) {
  grunt.registerTask('gessoBuildPatternlab', [
    'shell:patternlabComposer',
    'shell:patternlab'
  ]);
};
