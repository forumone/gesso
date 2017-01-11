module.exports = function (grunt) {
  if (grunt.file.exists(grunt.config.get('pkg').themePath + '/pattern-lab/')) {
    grunt.registerTask('gessoBuildPatternlab', [
      'shell:patternlabComposer',
      'shell:patternlab'
    ]);
  }
  else {
    grunt.registerTask('gessoBuildPatternlab', []);
  }
};
