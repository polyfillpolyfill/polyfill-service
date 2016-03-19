'use strict';

const path = require('path');

module.exports = function(grunt) {

	grunt.registerMultiTask('updatelibrary', 'Update Polyfill imported from external libraries', function() {
		this.files.forEach(function (file) {
			file.src.filter(function(src) {
				return src.indexOf('/__versions/') === -1;
			}).forEach(function(src){
				grunt.log.writeln('Running ' + src + ': ');
				require(path.resolve(src.toString()))(grunt);
				grunt.log.writeln('-------------');
			});
		});

		grunt.log.writeln('Polyfills updated successfully');
	});
};
