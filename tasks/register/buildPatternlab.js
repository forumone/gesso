module.exports = function (grunt) {
  grunt.registerTask('buildPatternlab', [
    'shell:patternlabComposer',
    'shell:patternlab'
  ]);
};
