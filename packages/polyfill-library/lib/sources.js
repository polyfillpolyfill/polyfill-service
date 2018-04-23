"use strict";

const path = require("path");
const fs = require("graceful-fs");
const denodeify = require("denodeify");
const readFile = denodeify(fs.readFile);
const readdir = denodeify(fs.readdir);

/**
 * Class representing a collection of polyfill sources.
 */
const Sources = class Sources {
	/**
	 * Create an instance of Sources.
	 * @param {String} [polyfillsPath] - The folder location on the file system where the polyfill sources exist.
	 * Defaults to the location of the polyfill sources which come bundled with the polyfill-library module.
	 * @returns {Sources} A new Sources instance.
	 */
	constructor(polyfillsPath = path.join(__dirname, "../polyfills/__dist")) {
		this.polyfillsPath = polyfillsPath;
	}

	/**
	 * Find out if a specific polyfill exists within the collection of polyfill sources.
	 * @param {String} featureName - The name of a polyfill which may exist.
	 * @returns {Promise<Boolean>} A promise which resolves with `true` if the polyfill exists or `false` if the polyfill does not exist.
	 * @throws {Error} Will throw if an error occurs when checking the file system for the polyfill.
	 */
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

	/**
	 * Get the metadata for a specific polyfill within the collection of polyfill sources.
	 * @param {String} featureName - The name of a polyfill whose metadata should be returned.
	 * @returns {Promise<Object|undefined>} A promise which resolves with the metadata or with `undefined` if no metadata exists for the polyfill.
	 */
	getPolyfillMeta(featureName) {
		return readFile(
			path.join(this.polyfillsPath, featureName, "meta.json"),
			"UTF-8"
		)
			.then(JSON.parse)
			.catch(() => undefined);
	}

	/**
	 * Get a list of all the polyfills which exist within the collection of polyfill sources.
	 * @returns {Promise<Array>} A promise which resolves with an array of all the polyfills within the collection.
	 */
	listPolyfills() {
		return readdir(this.polyfillsPath).then(features =>
			features.filter(f => f.indexOf(".json") === -1)
		);
	}

	/**
	 * Get the aliases for a specific polyfill.
	 * @param {String} featureName - The name of a polyfill whose metadata should be returned.
	 * @returns {Promise<Object|undefined>} A promise which resolves with the metadata or with `undefined` if no metadata exists for the polyfill.
	 */
	getConfigAliases(featureName) {
		return readFile(path.join(this.polyfillsPath, "aliases.json")).then(
			aliasesJson => {
				const aliases = JSON.parse(aliasesJson);
				return aliases[featureName] ? aliases[featureName] : undefined;
			}
		);
	}

	/**
	 * Get the aliases for a specific polyfill.
	 * @param {String} featureName - The name of a polyfill whose implementation should be returned.
	 * @param {'min'|'raw'} type - Which implementation should be returned: minified or raw implementation.
	 * @returns {ReadStream} A ReadStream instance of the polyfill implementation as a utf-8 string.
	 */
	streamPolyfillSource(featureName, type) {
		return fs.createReadStream(
			path.join(this.polyfillsPath, featureName, type + ".js"),
			{ encoding: "UTF-8" }
		);
	}
};

module.exports = Sources;
