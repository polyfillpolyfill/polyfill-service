'use strict';

var path = require('path');

module.exports = function(grunt) {

	grunt.registerMultiTask('updatelibrary', 'Update Polyfill imported from external libraries', function() {
		this.files.forEach(function (file) {
			grunt.log.writeln('Running ' + file.src + ': ');
			require(path.resolve(file.src.toString()))(grunt);
			grunt.log.writeln('-------------');
		});

		grunt.log.writeln('Polyfills updated successfully');
	});
};
