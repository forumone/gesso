module.exports = function (grunt) {
  grunt.config.merge({
		browserSync: {
		  dev: {
		    bsFiles: {
	        src : ['<%= pkg.themePath %>/css/pattern-lab.css',
	        '<%= pkg.themePath %>/pattern-lab/public/latest-change.txt'
	        ]
		    },
		    options: {
	        proxy: "10.11.12.14",
	        open: false
		    }
		  }
		}
});

	grunt.loadNpmTasks('grunt-browser-sync');
}