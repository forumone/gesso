module.exports = function (grunt) {
  grunt.registerTask('buildStyles', [
    'sass_globbing:gesso',
    'sass:gesso',
    'postcss:gesso'
  ]);
};
