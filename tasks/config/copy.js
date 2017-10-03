module.exports = function (grunt) {
  grunt.config.merge({
    copy: {
      patternlabSetupCopy: {
        files: [
          {
            expand: true,
            cwd: '<%= pkg.themePath %>/_starter-kit',
            src: '**',
            dest: '<%= pkg.themePath %>/pattern-lab/source/',
          },
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
}
