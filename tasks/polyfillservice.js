'use strict';

module.exports = function(grunt) {
	var spawn = require('child_process').spawn;
	var path = require('path');
	var serviceModule = path.join(__dirname, '/../service/index.js');

	grunt.registerTask('polyfillservice', "Start the polyfill service", function() {

		var done = this.async();

		var serviceProcess = spawn(process.argv[0], [serviceModule], { silent: true });

		serviceProcess.stdout.on('data', function(d) {
			var data = d.toString();
			grunt.log.writeln(data);
			if (data.indexOf('listen') > 0) {
				done(true);
			}
		});

		process.on('exit', function() {
			serviceProcess.kill();
		});

	});
};
