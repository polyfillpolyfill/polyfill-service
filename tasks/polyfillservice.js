'use strict';

module.exports = function(grunt) {
	var spawn = require('child_process').spawn;
	var path = require('path');
	var serviceModule = path.join(__dirname, '/../service/index.js');
	var serviceProcess = null;

	grunt.registerTask('polyfillservice', "Start the polyfill service", function() {

		var done = this.async();

		if (serviceProcess) {
			serviceProcess.kill();
		}

		serviceProcess = spawn(process.argv[0], [serviceModule], { silent: true, env: process.env, cwd: path.join(__dirname, '/..')});

		serviceProcess.stdout.on('data', function(d) {
			var data = d.toString();
			grunt.log.writeln(data);
			if (data.indexOf('listen') > 0) {
				done(true);
			}
		});

		serviceProcess.on('close', function (code, signal) {
			console.log('child process terminated due to receipt of signal '+signal);
		});
	});

	process.on('exit', function() {
		if (serviceProcess) {
			serviceProcess.kill();
		}
	});
};
