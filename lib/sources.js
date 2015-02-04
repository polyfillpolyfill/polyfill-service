var fs = require('fs');
var path = require('path');
var semver = require('semver');

var sources;
var configuredAliases;

try {
	sources = require(path.join(__dirname, '../polyfills/sources.json'));
	configuredAliases = require(path.join(__dirname, '../polyfills/aliases.json'));
} catch(e) {
	throw Error("No polyfill sources found.  Run `grunt buildsources` to build them");
}

function Collection(version) {
	this.version = version || 'latest';
	if (this.version !== 'latest') {
		var versions = Object.keys(sources).filter(function(ver) {
			return ver !== 'latest';
		});
		this.version = semver.maxSatisfying(versions, version);
	}
	if (!sources[this.version]) throw Error('No matching version found');
}

Collection.prototype.polyfillExists = function(featureName) {
	return (featureName in sources[this.version]);
}

Collection.prototype.listPolyfills = function() {
	return Object.keys(sources[this.version]);
}

Collection.prototype.getPolyfill = function(featureName) {
	return sources[this.version][featureName]
};

Collection.prototype.getConfigAliases = function(featureName) {
	return configuredAliases[this.version][featureName];
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
		return Object.keys(sources);
	}
}
