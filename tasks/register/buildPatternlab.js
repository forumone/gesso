module.exports = function (grunt) {
  if (grunt.file.exists('pattern-lab')) {
    grunt.registerTask('buildPatternlab', [
      'shell:patternlabComposer',
      'shell:patternlab'
    ]);
  }
  else {
    grunt.registerTask('buildPatternlab', []);
  }
};
