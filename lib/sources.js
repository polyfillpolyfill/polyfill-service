var path = require('path');
var semver = require('semver');
var fs = require('fs');
var denodeify = require('denodeify');
var readFile = denodeify(fs.readFile);

var versions;
var semverVersions;
var configuredAliases;
var features = {};
var polyfillCount = 0;
var polyfillsPath = path.join(__dirname, '../polyfills/__dist');

// Discover and index all the available polyfills (synchronously so that the index is available for the first request)
try {
	configuredAliases = require(path.join(__dirname, '../polyfills/__dist/aliases.json'));
	versions = fs.readdirSync(polyfillsPath);
	semverVersions = versions.filter(function(ver) {
		return ver.match(/^v?\d+\.\d+\.\d+$/);
	});
	versions.forEach(function(version) {
		if (fs.lstatSync(path.join(polyfillsPath, version)).isDirectory()) {
			features[version] = fs.readdirSync(path.join(polyfillsPath, version)).map(function(fileName) {
				return fileName.replace(/\.json$/i, '');
			});
			polyfillCount += features[version].length;
		}
	});
	console.log("Found "+polyfillCount+" polyfills");
} catch(e) {
	throw Error("No polyfill sources found.  Run `grunt buildsources` to build them");
}

function Collection(version) {
	this.version = version || 'latest';
	this.cache = {};
	if (this.version !== 'latest') {
		this.version = semver.maxSatisfying(semverVersions, version);
	}
	if (versions.indexOf(this.version) === -1) throw new Error('No matching version found');
}

Collection.prototype.polyfillExistsSync = function(featureName) {
	return (features[this.version].indexOf(featureName) !== -1);
};

Collection.prototype.listPolyfills = function() {
	return Promise.resolve(features[this.version]);
};

Collection.prototype.getPolyfill = function(featureName) {

	// TODO: Should this reject if the polyfill doesn't exist?  Makes the main module logic a bit more complex
	if (features[this.version].indexOf(featureName) !== -1) {
		if (this.version === 'latest' && this.cache[featureName]) {
			return Promise.resolve(this.cache[featureName]);
		}
		return readFile(path.join(polyfillsPath, this.version, featureName+'.json'), 'utf-8').then(function(str) {
			var feature = JSON.parse(str);
			if (this.version === 'latest') {
				this.cache[featureName] = feature;
			}
			return feature;
		}.bind(this));
	} else {
		return Promise.resolve(null);
	}
};

Collection.prototype.getConfigAliases = function(featureName) {
	return Promise.resolve(configuredAliases[this.version][featureName]);
};

Collection.prototype.getVersion = function() {
	return this.version;
};

module.exports = {
	getCollection: function(version) {
		return new Collection(version);
	},
	latest: new Collection('latest'),
	listVersions: function() {
		return semverVersions.map(function(ver) { return ver.replace(/^v/, ''); });
	}
};
