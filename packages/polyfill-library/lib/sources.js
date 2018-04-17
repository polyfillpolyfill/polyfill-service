"use strict";

const path = require("path");
const fs = require("graceful-fs");
const denodeify = require("denodeify");
const readFile = denodeify(fs.readFile);
const readdir = denodeify(fs.readdir);
const Sources = class Sources {
	constructor(polyfillsPath = path.join(__dirname, "../polyfills/__dist")) {
		this.polyfillsPath = polyfillsPath;
	}

	polyfillExists(featureName) {
		return new Promise((resolve, reject) => {
			fs.stat(
				path.join(this.polyfillsPath, featureName, "raw.js"),
				(err, stats) => {
					if (err) {
						return err.code === "ENOENT" ? resolve(false) : reject(err);
					}
					resolve(stats.isFile());
				}
			);
		});
	}

	getPolyfillMeta(featureName) {
		return readFile(
			path.join(this.polyfillsPath, featureName, "meta.json"),
			"UTF-8"
		)
			.then(JSON.parse)
			.catch(() => undefined);
	}

	listPolyfills() {
		return readdir(this.polyfillsPath).then(features =>
			features.filter(f => f.indexOf(".json") === -1)
		);
	}

	getConfigAliases(featureName) {
		return readFile(path.join(this.polyfillsPath, "aliases.json")).then(
			aliasesJson => {
				const aliases = JSON.parse(aliasesJson);
				return aliases[featureName] ? aliases[featureName] : undefined;
			}
		);
	}

	streamPolyfillSource(featureName, type) {
		return fs.createReadStream(
			path.join(this.polyfillsPath, featureName, type + ".js"),
			{ encoding: "UTF-8" }
		);
	}
};

module.exports = Sources;
