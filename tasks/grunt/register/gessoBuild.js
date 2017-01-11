module.exports = function (grunt) {
  grunt.registerTask('gessoBuild', [
    'gessoBuildStyles',
    'gessoBuildImages',
    'gessoBuildPatternlab'
  ]);
};
