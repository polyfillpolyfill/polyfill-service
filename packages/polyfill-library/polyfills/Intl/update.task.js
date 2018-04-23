/* eslint-env node */

/*
 * This script will copy all of the localisation language files from the Intl
 * module and install them within a folder in this directory named ~locale.
 *
 * The detect.js file used for Intl is copied into every ~locale polyfill for
 * use on detecting whether that locale needs to be polyfilled.
 *
 * The config.json file for each locale polyfill is based off of the one for
 * Intl. The changes made ot it are:
 *  - Removing the "install" section
 *  - Adding Intl as a dependency
 */

'use strict';

var fs = require('fs');
var path = require('path');
var LocalesPath = path.dirname(require.resolve('intl/locale-data/jsonp/en.js'));
var IntlPolyfillOutput = path.resolve('polyfills/Intl');
var LocalesPolyfillOutput = path.resolve('polyfills/Intl/~locale');
var crypto = require('crypto');
var existsSync = require('exists-sync');
var mkdirp = require('mkdirp');

function md5 (contents) {
	return crypto.createHash('md5').update(contents).digest('hex');
}

function writeFileIfChanged (filePath, newFile) {
	if (existsSync(filePath)) {
		var currentFile = fs.readFileSync(filePath);
		var currentFileHash = md5(currentFile);
		var newFileHash = md5(newFile);

		if (newFileHash !== currentFileHash) {
			fs.writeFileSync(filePath, newFile);
		}
  } else {
		fs.writeFileSync(filePath, newFile);
	}
}

var configSource = require(path.join(IntlPolyfillOutput, 'config.json'));
delete configSource.install;

if (!existsSync(LocalesPolyfillOutput)) {
	mkdirp.sync(LocalesPolyfillOutput);
}

// customizing the config to add intl as a dependency
configSource.dependencies.push('Intl');

// don't test every single locale - it will be too slow
configSource.test = { ci: false };

var configFileSource = JSON.stringify(configSource, null, 4);

function intlLocaleDetectFor(locale) {
	return "'Intl' in this && " +
			"Intl.Collator && " +
			"Intl.Collator.supportedLocalesOf && " +
			"Intl.Collator.supportedLocalesOf('"+locale+"').length === 1 && " +
			"Intl.DateTimeFormat && " +
			"Intl.DateTimeFormat.supportedLocalesOf && " +
			"Intl.DateTimeFormat.supportedLocalesOf('"+locale+"').length === 1 && " +
			"Intl.NumberFormat && " +
			"Intl.NumberFormat.supportedLocalesOf && " +
			"Intl.NumberFormat.supportedLocalesOf('"+locale+"').length === 1";
}

console.log('Importing Intl.~locale.* polyfill from ' + LocalesPath);
var locales = fs.readdirSync(LocalesPath);
locales.forEach(function (file) {
	var locale = file.slice(0, file.indexOf('.'));
	var localeOutputPath = path.join(LocalesPolyfillOutput, locale);

	if (!existsSync(localeOutputPath)) {
		mkdirp.sync(localeOutputPath);
	}

	var localePolyfillSource = fs.readFileSync(path.join(LocalesPath, file));
	var polyfillOutputPath = path.join(localeOutputPath, 'polyfill.js');
	var detectOutputPath = path.join(localeOutputPath, 'detect.js');
	var configOutputPath = path.join(localeOutputPath, 'config.json');
	writeFileIfChanged(polyfillOutputPath, localePolyfillSource);
	writeFileIfChanged(detectOutputPath, intlLocaleDetectFor(locale));
	writeFileIfChanged(configOutputPath, configFileSource);
});


console.log(locales.length + ' imported locales');
console.log('Intl polyfill imported successfully');
