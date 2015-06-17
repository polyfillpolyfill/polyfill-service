'use strict';

var fs = require('fs');
var path = require('path');
var IntlSourcePath = require.resolve('intl/dist/Intl.min.js');
var LocalesPath = path.dirname(require.resolve('intl/locale-data/jsonp/en.js'));
var IntlPolyfillOutput = path.resolve('polyfills/Intl');
var LocalesPolyfillOutput = path.resolve('polyfills/Intl/~locale');

module.exports = function(grunt) {

	grunt.registerTask('importintl', 'Import Intl Polyfill from NPM', function() {

		var detectFileSource = fs.readFileSync(path.join(IntlPolyfillOutput, 'detect.js'));
		var configFileSource = fs.readFileSync(path.join(IntlPolyfillOutput, 'config.json'));

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
	});
};
