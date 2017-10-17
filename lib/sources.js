'use strict';

const path = require('path');
const fs = require('graceful-fs');
const denodeify = require('denodeify');
const readFile = denodeify(fs.readFile);
const process = require('process');
const console = require('console');

const polyfillsPath = path.join(__dirname, '../polyfills/__dist');

let features;
let configuredAliases;
const metadata = {};

// Discover and index all the available polyfills (synchronously so that the index is available for the first request)
try {
	configuredAliases = require('../polyfills/__dist/aliases.json');
	features = fs.readdirSync(polyfillsPath).filter(f => f.indexOf('.json') === -1);
	features.forEach(featureName => {
		metadata[featureName] = JSON.parse(fs.readFileSync(path.join(polyfillsPath, featureName, 'meta.json'), 'UTF-8'));
	});
} catch(e) {
	console.log("No polyfill sources found.  Run `npm run build` to build them");
	process.exit(1);
}

exports.polyfillExistsSync = function(featureName) {
	return (features.indexOf(featureName) !== -1);
};

exports.getPolyfillMetaSync = function(featureName) {
	return metadata[featureName];
};

exports.listPolyfillsSync = function() {
	return features;
};


exports.listPolyfills = function() {
	return Promise.resolve(features);
};

exports.getConfigAliasesSync = function(featureName) {
	return configuredAliases[featureName];
};

exports.streamPolyfillSource = function (featureName, type) {
	return fs.createReadStream(path.join(polyfillsPath, featureName, type + '.js'), { encoding: 'UTF-8' });
};

// TODO: deprecate this
exports.getPolyfill = function (featureName) {
	if (features.indexOf(featureName) !== -1) {
		const getSources = [
			readFile(path.join(polyfillsPath, featureName, 'raw.js'), 'utf-8'),
			readFile(path.join(polyfillsPath, featureName, 'min.js'), 'utf-8')
		];
		return Promise.all(getSources)
			.then(sources => {
				const op = Object.assign({}, metadata[featureName], {
					rawSource: sources[0],
					minSource: sources[1],
					name: featureName
				});
				return op;
			})
		;
	} else {
		return Promise.resolve(null);
	}
};
