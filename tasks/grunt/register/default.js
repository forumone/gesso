module.exports = function (grunt) {
  grunt.registerTask('default', [
    'bower',
    'gessoBuild',
    'simple-watch'
  ]);
};
