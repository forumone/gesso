module.exports = function (grunt) {
  grunt.config.merge({
		concurrent: {
      watchSync: ['simple-watch', 'browserSync'],
      options: {
        logConcurrentOutput: true
      }
		}
});

	grunt.loadNpmTasks('grunt-concurrent');
}