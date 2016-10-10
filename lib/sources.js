'use strict';

const path = require('path');
const fs = require('fs');
const denodeify = require('denodeify');
const readFile = denodeify(fs.readFile);
const memoize = require('lodash').memoize;

const polyfillsPath = path.join(__dirname, '../polyfills/__dist');
const metaFields = ['dependencies', 'browsers', 'detectSource'];
const cache = {};

let features = [];
let configuredAliases;

// Discover and index all the available polyfills (synchronously so that the index is available for the first request)
try {
	configuredAliases = require(path.join(__dirname, '../polyfills/__dist/aliases.json'));
	features = fs
		.readdirSync(polyfillsPath)
		.filter(fileName => (fileName.match(/\.json$/) && fileName !== 'aliases.json'))
		.map(fileName => fileName.replace(/\.json$/i, ''))
	;
} catch(e) {
	throw Error("No polyfill sources found.  Run `grunt build` to build them");
}

exports.polyfillExistsSync = function(featureName) {
	return (features.indexOf(featureName) !== -1);
};

exports.getPolyfillMetaSync = function(featureName) {
	return !(featureName in cache) ? null : metaFields.reduce((out, key) => {
		out[key] = cache[featureName][key];
		return out;
	}, {});
};

exports.listPolyfillsSync = function() {
	return features;
};


exports.listPolyfills = function() {
	return Promise.resolve(features);
};

exports.getPolyfill = function(featureName) {

	// TODO: Should this reject if the polyfill doesn't exist?  Makes the main module logic a bit more complex
	if (features.indexOf(featureName) !== -1) {
		if (cache[featureName]) {
			return Promise.resolve(cache[featureName]);
		}
		return readFile(path.join(polyfillsPath, featureName+'.json'), 'utf-8').then(jsondata => {
			const feature = JSON.parse(jsondata);
			feature.name = featureName;
			cache[featureName] = feature;
			return feature;
		});
	} else {
		return Promise.resolve(null);
	}
};

exports.getConfigAliasesSync = function(featureName) {
	return configuredAliases[featureName];
};

// Preload all polyfills
features.forEach(feature => exports.getPolyfill(feature));
