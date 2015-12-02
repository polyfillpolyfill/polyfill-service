'use strict';

var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var Svg4EverybodySourcePath = require.resolve('svg4everybody/lib/svg4everybody.js');
var Svg4EverybodyPolyfillOutput = path.resolve('polyfills/SVGExternalContent');

// this is not really a grunt task, but a function that is suppose
// to be sync, and receive access to grunt instance for convenience.
module.exports = function(grunt) {
	var configSource = require(path.join(Svg4EverybodyPolyfillOutput, 'config.json'));

	// deleting existing files
	if (grunt.file.exists(Svg4EverybodyPolyfillOutput + 'polyfill.js')) {
		try {
			// Actually delete. Or not.
			rimraf.sync(Svg4EverybodyPolyfillOutput + 'polyfill.js');
		} catch (e) {/* ignore */}
    }

	// customizing the config to add Picture as a dependency
	configSource.dependencies.push('html5shiv');
	var configFileSource = JSON.stringify(configSource, null, 4);

	grunt.log.writeln('Importing SVG external content polyfill from ' + Svg4EverybodySourcePath);

	var Svg4EverybodyPolyfillSource = fs.readFileSync(Svg4EverybodySourcePath);

	var Svg4EverbodyPolyfillRun = 'svg4everybody();';

	var PolyfillCombinedSource = Svg4EverybodyPolyfillSource + Svg4EverbodyPolyfillRun;

	grunt.file.write(path.join(Svg4EverybodyPolyfillOutput, 'polyfill.js'), PolyfillCombinedSource);

	grunt.log.writeln('SVG external content polyfill imported successfully');

};