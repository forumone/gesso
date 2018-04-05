module.exports = function (grunt) {
  if (grunt.file.exists(grunt.config.get('pkg').themePath + '/pattern-lab/')) {
    grunt.registerTask('gessoSetup', []);
  }
  else {
    grunt.registerTask('gessoSetup', [
      'shell:patternlabSetupInstall',
      'clean:patternlabSetupClear',
      'copy:patternlabSetupCopy',
      'clean:patternlabSetupCleanup'
    ]);
  }
};
