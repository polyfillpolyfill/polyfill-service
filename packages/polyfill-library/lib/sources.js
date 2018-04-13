"use strict";

const path = require("path");
const fs = require("graceful-fs");
const denodeify = require("denodeify");
const readFile = denodeify(fs.readFile);
module.exports = class Sources {
	constructor(polyfillsPath = path.join(__dirname, "../polyfills/__dist")) {
		this.polyfillsPath = polyfillsPath;
		// Discover and index all the available polyfills (synchronously so that the index is available for the first request)
		try {
			this.metadata = {};
			this.configuredAliases = require(path.join(polyfillsPath, "aliases.json"));
			this.features = fs.readdirSync(polyfillsPath).filter(f => f.indexOf(".json") === -1);
			this.features.forEach(featureName => {
				this.metadata[featureName] = JSON.parse(fs.readFileSync(path.join(polyfillsPath, featureName, "meta.json"), "UTF-8"));
			});
		} catch (e) {
			throw new Error(`No polyfill sources found in ${polyfillsPath}.  Run "npm run build" to build them`);
		}
	}

	polyfillExistsSync(featureName) {
		return this.features.indexOf(featureName) !== -1;
	}

	getPolyfillMetaSync(featureName) {
		return this.metadata[featureName];
	}

	listPolyfillsSync() {
		return this.features;
	}

	listPolyfills() {
		return Promise.resolve(this.features);
	}

	getConfigAliasesSync(featureName) {
		return this.configuredAliases[featureName];
	}

	streamPolyfillSource(featureName, type) {
		return fs.createReadStream(path.join(this.polyfillsPath, featureName, type + ".js"), { encoding: "UTF-8" });
	}

	// TODO: deprecate this
	getPolyfill(featureName) {
		if (this.features.indexOf(featureName) !== -1) {
			const getSources = [readFile(path.join(this.polyfillsPath, featureName, "raw.js"), "utf-8"), readFile(path.join(this.polyfillsPath, featureName, "min.js"), "utf-8")];
			return Promise.all(getSources).then(sources => {
				const op = Object.assign({}, this.metadata[featureName], {
					rawSource: sources[0],
					minSource: sources[1],
					name: featureName
				});
				return op;
			});
		} else {
			return Promise.resolve(null);
		}
	}
};
