module.exports = function(grunt) {

	grunt.initConfig({
		uglify: {
			target: {
				src: '*.js',
				dest: '../minified/',
				expand: true
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['uglify']);

	grunt.file.setBase('source');

};
