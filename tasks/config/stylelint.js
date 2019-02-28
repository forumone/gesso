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
        '<%= pkg.themePath %>/pattern-lab/source/_patterns/**/*.scss',
        '<%= pkg.themePath %>/_starter-kit/_patterns/**/*.scss',
      ],
    },
  });

  grunt.loadNpmTasks('grunt-stylelint');
};
