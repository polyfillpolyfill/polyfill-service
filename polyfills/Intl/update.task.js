'use strict';

var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var IntlSourcePath = require.resolve('intl/dist/Intl.min.js');
var LocalesPath = path.dirname(require.resolve('intl/locale-data/jsonp/en.js'));
var IntlPolyfillOutput = path.resolve('polyfills/Intl');
var LocalesPolyfillOutput = path.resolve('polyfills/Intl/~locale');

// this is not really a grunt task, but a function that is suppose
// to be sync, and receive access to grunt instance for convenience.
module.exports = function(grunt) {
	var detectFileSource = fs.readFileSync(path.join(IntlPolyfillOutput, 'detect.js'));
	var configSource = require(path.join(IntlPolyfillOutput, 'config.json'));

	// deleting existing files
	if (grunt.file.exists(IntlPolyfillOutput + 'polyfill.js')) {
		try {
			// Actually delete. Or not.
			rimraf.sync(IntlPolyfillOutput + 'polyfill.js');
		} catch (e) {/* ignore */}
    }

	if (grunt.file.exists(LocalesPolyfillOutput)) {
		try {
	    	// Actually delete. Or not.
			rimraf.sync(LocalesPolyfillOutput);
	    } catch (e) {/* ignore */}
	}

	// customizing the config to add intl as a dependency
	configSource.dependencies.push('Intl');

	// don't test every single locale - it will be too slow
	configSource.test = { ci: false };

	var configFileSource = JSON.stringify(configSource, null, 4);

	grunt.log.writeln('Importing Intl polyfill from ' + IntlSourcePath);

	var IntlPolyfillSource = fs.readFileSync(IntlSourcePath);
	grunt.file.write(path.join(IntlPolyfillOutput, 'polyfill.js'), IntlPolyfillSource);


	grunt.log.writeln('Importing Intl.~locale.* polyfill from ' + LocalesPath);

	var locales = fs.readdirSync(LocalesPath);
	locales.forEach(function (file) {
		var locale = file.slice(0, file.indexOf('.'));
		var localePolyfillSource = fs.readFileSync(path.join(LocalesPath, file));
		// produce a new locale data polyfill
		grunt.file.write(path.join(LocalesPolyfillOutput, locale, 'polyfill.js'), localePolyfillSource);
		grunt.file.write(path.join(LocalesPolyfillOutput, locale, 'detect.js'), detectFileSource);
		grunt.file.write(path.join(LocalesPolyfillOutput, locale, 'config.json'), configFileSource);
	});


	grunt.log.writeln(locales.length + ' imported locales');
	grunt.log.writeln('Intl polyfill imported successfully');

};
