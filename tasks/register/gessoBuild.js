module.exports = function (grunt) {
  grunt.registerTask('gessoBuild', [
    'bower',
    'gessoBuildStyles',
    'gessoBuildImages',
    'gessoBuildPatternlab'
  ]);
};
