var path = require('path');
var semver = require('semver');
var fs = require('fs');
var denodeify = require('denodeify');
var readFile = denodeify(fs.readFile);
var memoize = require('lodash').memoize;

var configuredAliases;
var features = [];
var polyfillCount = 0;
var polyfillsPath = path.join(__dirname, '../polyfills/__dist');

// Discover and index all the available polyfills (synchronously so that the index is available for the first request)
try {
	configuredAliases = require(path.join(__dirname, '../polyfills/__dist/aliases.json'));
	features = fs.readdirSync(polyfillsPath).filter(function(fileName) {
		return (fileName.match(/\.json$/) && fileName !== 'aliases.json');
	}).map(function(fileName) {
		return fileName.replace(/\.json$/i, '');
	});
	polyfillCount = features.length;
	console.log("Found "+polyfillCount+" polyfills");
} catch(e) {
	throw Error("No polyfill sources found.  Run `grunt buildsources` to build them");
}

function Collection() {
	this.cache = {};
}

Collection.prototype.polyfillExistsSync = function(featureName) {
	return (features.indexOf(featureName) !== -1);
};

Collection.prototype.listPolyfills = function() {
	return Promise.resolve(features);
};

Collection.prototype.getPolyfill = function(featureName) {

	// TODO: Should this reject if the polyfill doesn't exist?  Makes the main module logic a bit more complex
	if (features.indexOf(featureName) !== -1) {
		if (this.cache[featureName]) {
			return Promise.resolve(this.cache[featureName]);
		}
		return readFile(path.join(polyfillsPath, featureName+'.json'), 'utf-8').then(function(str) {
			var feature = JSON.parse(str);
			this.cache[featureName] = feature;
			return feature;
		}.bind(this));
	} else {
		return Promise.resolve(null);
	}
};

Collection.prototype.getConfigAliases = function(featureName) {
	return Promise.resolve(configuredAliases[featureName]);
};

module.exports = {
	getCollection: memoize(function() {
		return new Collection();
	})
};
