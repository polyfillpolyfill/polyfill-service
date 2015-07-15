'use strict';

var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var SymbolSourcePath = require.resolve('core-js/client/modules/es6/es6.symbol/es6.symbol-umd.js');
var SymbolPolyfillOutput = path.resolve('polyfills/Symbol');

// this is not really a grunt task, but a function that is suppose
// to be sync, and receive access to grunt instance for convenience.
module.exports = function(grunt) {
	var detectFileSource = fs.readFileSync(path.join(SymbolPolyfillOutput, 'detect.js'));
	var configSource = require(path.join(SymbolPolyfillOutput, 'config.json'));

	// deleting existing files
	if (grunt.file.exists(SymbolPolyfillOutput + 'polyfill.js')) {
		try {
			// Actually delete. Or not.
			rimraf.sync(SymbolPolyfillOutput + 'polyfill.js');
		} catch (e) {/* ignore */}
	}

	configSource.dependencies.push('example');
	var configFileSource = JSON.stringify(configSource, null, 4);

	grunt.log.writeln('Importing Symbol polyfill from ' + SymbolSourcePath);

	var source = fs.readFileSync(SymbolSourcePath);
	grunt.file.write(path.join(SymbolPolyfillOutput, 'polyfill.js'), source);
	grunt.log.writeln('Symbol polyfill imported successfully');

};
