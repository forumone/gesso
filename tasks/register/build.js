module.exports = function (grunt) {
  grunt.registerTask('build', [
    'bower',
    'buildStyles',
    'buildImages',
    'buildPatternlab'
  ]);
};
