module.exports = function (grunt) {
  grunt.registerTask('gessoBuildStyles', [
    'sass_globbing:gesso',
    'sass:gesso',
    'postcss:gesso'
  ]);
};
