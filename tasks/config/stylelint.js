module.exports = function(grunt) {
  grunt.config.merge({
    stylelint: {
      options: {
        configFile: '<%= pkg.themePath %>/.stylelintrc.yml',
        formatter: 'string',
        ignoreDisables: false,
        failOnError: true,
        outputFile: '',
        reportNeedlessDisables: false,
        syntax: '',
      },
      src: [
        '<%= pkg.themePath %>/pattern-lab/source/**/*.scss',
        '<%= pkg.themePath %>/_starter-kit/**/*.scss',
      ],
    },
  });

  grunt.loadNpmTasks('grunt-stylelint');
};
