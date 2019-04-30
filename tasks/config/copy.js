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
      },
      patternlabConfigChange: {
        src: '<%= pkg.themePath %>/pattern-lab/config/config.yml',
        dest: '<%= pkg.themePath %>/pattern-lab/config/config.yml',
        options : {
          process : function(content, srcpath) {
            return content.replace('twigAutoescape: html', 'twigAutoescape: false');
          },
        },
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
}
