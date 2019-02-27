module.exports = function(grunt) {
  grunt.registerTask('gessoBuildStyles', [
    'stylelint',
    'sass_globbing:gesso',
    'sass:gesso',
    'postcss:gesso',
  ]);
};
