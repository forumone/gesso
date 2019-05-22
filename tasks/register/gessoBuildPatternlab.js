module.exports = function (grunt) {
  grunt.registerTask('gessoBuildPatternlab', [
    'shell:patternlabComposer',
    'copy:patternlabConfigChange',
    'shell:patternlab'
  ]);
};
