'use strict';

var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var polyfillSourcePath = require.resolve('audio-context-polyfill/AudioContext.js');;
var polyfillOutput = path.resolve('polyfills/AudioContext');

// this is not really a grunt task, but a function that is suppose
// to be sync, and receive access to grunt instance for convenience.
module.exports = function(grunt) {
	var configSource = require(path.join(polyfillOutput, 'config.json'));

	// deleting existing files
	if (grunt.file.exists(polyfillOutput + 'polyfill.js')) {
		try {
			// Actually delete. Or not.
			rimraf.sync(polyfillOutput + 'polyfill.js');
		} catch (e) {/* ignore */}
  }

	grunt.log.writeln('Importing polyfill from ' + polyfillSourcePath);

	grunt.file.write(path.join(polyfillOutput, 'polyfill.js'), fs.readFileSync(polyfillSourcePath));

	grunt.log.writeln('Polyfill imported successfully');

};
