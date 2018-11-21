"use strict";

const tsort = require("tsort");
const createAliasResolver = require("./aliases");
const UA = require("./UA");
const Sources = require("./sources");
const appVersion = require("../package.json").version;
const streamFromPromise = require("stream-from-promise");
const streamFromString = require("from2-string");
const mergeStream = require("merge2");
const streamToString = require("stream-to-string");

/**
 * Class representing a polyfill bundling library.
 */
const PolyfillLibrary = class PolyfillLibrary {
	/**
	 * Create an PolyfillLibrary instance.
	 * @param {String} [polyfillsPath] - The folder location on the file system where the polyfill sources exist.
	 * Defaults to the location of the polyfill sources which come bundled with the polyfill-library module.
	 * @returns {PolyfillLibrary} A new PolyfillLibrary instance.
	 */
	constructor(polyfillsPath) {
		this.sourceslib = new Sources(polyfillsPath);
	}

	/**
	 * Get a list of all the polyfills which exist within the collection of polyfill sources.
	 * @returns {Promise<Array>} A promise which resolves with an array of all the polyfills within the collection.
	 */
	listAllPolyfills() {
		return this.sourceslib.listPolyfills();
	}

	/**
	 * Get the metadata for a specific polyfill within the collection of polyfill sources.
	 * @param {String} featureName - The name of a polyfill whose metadata should be returned.
	 * @returns {Promise<Object|undefined>} A promise which resolves with the metadata or with `undefined` if no metadata exists for the polyfill.
	 */
	describePolyfill(featureName) {
		return this.sourceslib.getPolyfillMeta(featureName);
	}

	/**
	 * Create an options object for use with `getPolyfills` or `getPolyfillString`.
	 * @param {object} opts - Valid keys are uaString, minify, unknown, excludes, rum and features.
	 * @param {Boolean} [opts.minify=true] - Whether to return the minified or raw implementation of the polyfills.
	 * @param {'ignore'|'polyfill'} [opts.unknown='ignore'] - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
	 * @param {Object} [opts.features={}] - Which features should be returned if the user-agent does not support them natively.
	 * @param {Array<String>} [opts.excludes=[]] - Which features should be excluded from the returned object.
	 * @param {String} [opts.uaString=''] - The user-agent string to check each feature against.
	 * @param {Boolean} [opts.rum=false] - Whether to add a script to the polyfill bundle which reports anonymous usage data
	 * @return {Object} options - opts merged with the defaults option values.
	 */
	getOptions(opts = {}) {
		const hasProperty = (prop, obj) => Object.prototype.hasOwnProperty.call(obj, prop);
		const options = {
			uaString: hasProperty('uaString', opts) ? opts.uaString : "",
			minify: hasProperty('minify', opts) ? opts.minify : true,
			unknown: hasProperty('unknown', opts) ? opts.unknown : "polyfill",
			features: hasProperty('features', opts) ? opts.features : {},
			excludes: hasProperty('excludes', opts) ? opts.excludes : [],
			rum: hasProperty('rum', opts) ? opts.rum : false
		};

		// Normalise flags
		Object.keys(options.features).forEach(k => {
			if (!options.features[k].flags) {
				options.features[k].flags = new Set();
			} else if (options.features[k].flags.constructor !== Set) {
				options.features[k].flags = new Set(options.features[k].flags);
			}
		});

		return options;
	}

	/**
	 * Given a set of features that should be polyfilled in 'options.features'
	 * (with flags i.e. `{<featurename>: {flags:Set[<flaglist>]}, ...}`),
	 * determine which have a configuration valid for the given options.uaString,
	 * and return a promise of set of canonical (unaliased) features (with flags) and polyfills.
	 *
	 * @param {object} opts - Valid keys are uaString, minify, unknown, excludes, rum and features.
	 * @param {Boolean} [opts.minify=true] - Whether to return the minified or raw implementation of the polyfills.
	 * @param {'ignore'|'polyfill'} [opts.unknown='ignore'] - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
	 * @param {Object} [opts.features={}] - Which features should be returned if the user-agent does not support them natively.
	 * @param {Array<String>} [opts.excludes=[]] - Which features should be excluded from the returned object.
	 * @param {String} [opts.uaString=''] - The user-agent string to check each feature against.
	 * @param {Boolean} [opts.rum=false] - Whether to add a script to the polyfill bundle which reports anonymous usage data.
	 * @return {Promise<Object>} - Canonicalised feature definitions filtered for UA
	 */
	getPolyfills(opts) {
		const options = this.getOptions(opts);
		const ua = new UA(options.uaString);
		const aliasFromConfig = featureName => {
			return this.sourceslib.getConfigAliases(featureName);
		};
		const aliasAll = featureName => {
			return featureName === "all"
				? this.sourceslib.listPolyfills()
				: undefined;
		};
		const resolveAliases = createAliasResolver(aliasFromConfig, aliasAll);
		const aliasDependencies = featureName => {
			return this.sourceslib.getPolyfillMeta(featureName).then(meta => {
				const result = ((meta && meta.dependencies) || [])
					.filter(depName => options.excludes.indexOf(depName) === -1)
					.concat(featureName);
				return result;
			});
		};
		const resolveDependencies = createAliasResolver(aliasDependencies);

		// Filter the features object to remove features not suitable for the current UA
		const filterForUATargeting = features => {
			const featuresList = Object.keys(features);
			return Promise.all(
				featuresList.map(featureName => {
					return this.sourceslib.getPolyfillMeta(featureName).then(meta => {
						if (!meta) return false;

						const isBrowserMatch =
							meta.browsers &&
							meta.browsers[ua.getFamily()] &&
							ua.satisfies(meta.browsers[ua.getFamily()]);
						const hasAlwaysFlagOverride = features[featureName].flags.has(
							"always"
						);
						const unknownOverride =
							options.unknown === "polyfill" && ua.isUnknown();
						
						if (unknownOverride) {
							features[featureName].flags.add('gated');
						}

						return isBrowserMatch || hasAlwaysFlagOverride || unknownOverride
							? featureName
							: false;
					});
				})
			).then(featureNames => {
				return featureNames.reduce(function(out, key) {
					if (key) out[key] = features[key];
					return out;
				}, {});
			});
		};

		const filterForExcludes = function(features) {
			Object.keys(features).forEach(featureName => {
				if (options.excludes.indexOf(featureName) !== -1) {
					delete features[featureName];
				}
			});
			return features;
		};

		const filterForUnusedAbstractMethods = features => {
			let dependencyWasRemoved = false;
			return Promise.all(
				Object.keys(features).map(featureName =>
					this.sourceslib.getPolyfillMeta(featureName)
				)
			).then(featuresMeta => {
				Object.keys(features).forEach(featureName => {
					if (featureName.startsWith("_")) {
						if (
							!featuresMeta.some(meta =>
								(meta.dependencies || []).some(dep => dep === featureName)
							)
						) {
							delete features[featureName];
							dependencyWasRemoved = true;
						}
					}
				});
				if (dependencyWasRemoved) {
					return filterForUnusedAbstractMethods(features);
				}
				return features;
			});
		};

		return Promise.resolve(options.features)
			.then(resolveAliases)
			.then(filterForUATargeting)
			.then(resolveDependencies)
			.then(filterForUATargeting)
			.then(filterForExcludes)
			.then(filterForUnusedAbstractMethods);
	}

	/**
	 * Create a polyfill bundle.
	 * @param {object} opts - Valid keys are uaString, minify, unknown, excludes, rum and features.
	 * @param {Boolean} [opts.minify=true] - Whether to return the minified or raw implementation of the polyfills.
	 * @param {'ignore'|'polyfill'} [opts.unknown='ignore'] - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
	 * @param {Object} [opts.features={}] - Which features should be returned if the user-agent does not support them natively.
	 * @param {Array<String>} [opts.excludes=[]] - Which features should be excluded from the returned object.
	 * @param {String} [opts.uaString=''] - The user-agent string to check each feature against.
	 * @param {Boolean} [opts.rum=false] - Whether to add a script to the polyfill bundle which reports anonymous usage data.
	 * @param {Boolean} [opts.stream=false] - Whether to return a stream or a string of the polyfill bundle.
	 * @return {Promise<String> | ReadStream} - Polyfill bundle as either a utf-8 stream or a promise of a utf-8 string.
	 */
	getPolyfillString(opts) {
		const options = this.getOptions(opts);
		const ua = new UA(options.uaString);
		const lf = options.minify ? "" : "\n";
		const allWarnText =
			"Using the `all` alias with polyfill.io is a very bad idea. In a future version of the service, `all` will deliver the same behaviour as `default`, so we recommend using `default` instead.";
		const output = mergeStream();
		const explainerComment = [];
		// Check UA and turn requested features into a list of polyfills
		const unsupportedUA =
			(!ua.meetsBaseline() || ua.isUnknown()) && options.unknown !== "polyfill";

		Promise.resolve(unsupportedUA ? {} : this.getPolyfills(options))

			// Build a polyfill bundle of polyfill sources sorted in dependency order
			.then(targetedFeatures => {
				const warnings = { unknown: [] };
				const graph = tsort();

				Promise.all(Object.keys(targetedFeatures).map(featureName => {
					const feature = targetedFeatures[featureName];
					return this.sourceslib.getPolyfillMeta(featureName).then(polyfill => {
						if (!polyfill) {
							warnings.unknown.push(featureName);
						} else {
							graph.add(featureName);

							if (polyfill.dependencies) {
								polyfill.dependencies.forEach(depName => {
									if (depName in targetedFeatures) {
										graph.add(depName, featureName);
									}
								});
							}

							feature.comment =
								featureName +
								", License: " +
								(polyfill.license || "CC0") +
							  (feature.aliasOf && feature.aliasOf.size
								  ? ' (required by "' +
									  Array.from(feature.aliasOf).join('", "') +
								    '")'
								  : "");
						}
					});
				})).then(() => {
					const sortedFeatures = graph.sort();

					if (!options.minify) {
						explainerComment.push(
							"Polyfill service " +
							(process.env.NODE_ENV === "production"
								? "v" + appVersion
								: "DEVELOPMENT MODE - for live use set NODE_ENV to 'production'"),
							"For detailed credits and licence information see https://github.com/financial-times/polyfill-service.",
							"",
							"Features requested: " + Object.keys(options.features),
							""
						);
						explainerComment.push(
							...sortedFeatures
							.filter(
								featureName =>
								targetedFeatures[featureName] &&
								targetedFeatures[featureName].comment
							)
							.map(featureName => "- " + targetedFeatures[featureName].comment)
						);
						if (warnings.unknown.length) {
							explainerComment.push(
								"",
								"These features were not recognised:",
								warnings.unknown.map(s => "- " + s)
							);
						}
						if ("all" in options.features) {
							explainerComment.push("", allWarnText);
						}
					} else {
						explainerComment.push(
							"Disable minification (remove `.min` from URL path) for more info"
						);
					}
					output.add(
						streamFromString("/* " + explainerComment.join("\n * ") + " */\n\n")
					);

					if (sortedFeatures.length) {
						// Outer closure hides private features from global scope
						output.add(streamFromString("(function(undefined) {" + lf));

						// Using the graph, stream all the polyfill sources in dependency order
						for (const featureName of sortedFeatures) {
							const detect = this.sourceslib
								.getPolyfillMeta(featureName)
								.then(meta => {
									if (meta.detectSource) {
										return "if (!(" + meta.detectSource + ")) {" + lf;
									} else {
										return "";
									}
								});
							const wrapInDetect = targetedFeatures[featureName].flags.has(
								"gated"
							);
							if (wrapInDetect) {
								output.add(streamFromPromise(detect));
								output.add(
									this.sourceslib.streamPolyfillSource(
										featureName,
										options.minify ? "min" : "raw"
									)
								);
								output.add(streamFromPromise(detect.then(wrap => {
									if (wrap) {
										return (lf + "}" + lf + lf);
									}
								})));
							} else {
								output.add(
									this.sourceslib.streamPolyfillSource(
										featureName,
										options.minify ? "min" : "raw"
									)
								);
							}
						}
						// Invoke the closure, binding `this` to window (in a browser),
						// self (in a web worker), or global (in Node/IOjs)
						output.add(
							streamFromString(
								"})" +
								lf +
								".call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});" +
								lf
							)
						);
					} else {
						if (!options.minify) {
							output.add(
								streamFromString(
									"\n/* No polyfills found for current settings */\n\n"
								)
							);
						}
					}

					if ("all" in options.features) {
						output.add(
							streamFromString("\nconsole.log('" + allWarnText + "');\n")
						);
					}

					if (options.callback && typeof options.callback === 'string' && options.callback.match(/^[\w\.]+$/)) {
						output.add(streamFromString("\ntypeof " + options.callback + "==='function' && " + options.callback + "();"));
					}
				});
			});

		return opts.stream ? output : Promise.resolve(streamToString(output));
	};
};

PolyfillLibrary.prototype.normalizeUserAgent = UA.normalize;

module.exports = PolyfillLibrary;
