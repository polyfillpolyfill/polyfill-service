import {array as toposort} from "toposort";
import UA from "@financial-times/polyfill-useragent-normaliser";
import {UA as oldUA} from './old-ua.js';
import {listPolyfills, getConfigAliases, getPolyfillMeta, streamPolyfillSource} from "./sources.js";

const encoder = new TextEncoder()
function stringToReadableStream(value) {
	return new ReadableStream({
		start(controller) {
			controller.enqueue(encoder.encode(value));
			controller.close();
		},
	});
}

/**
 * Get a list of all the polyfills which exist within the collection of polyfill sources.
 * @returns {Promise<Array>} A promise which resolves with an array of all the polyfills within the collection.
 */
export function listAllPolyfills(store) {
	return listPolyfills(store);
}

function hasProperty(property, object) {
	return Object.prototype.hasOwnProperty.call(object, property);
}

/**
 * Create an options object for use with `getPolyfills` or `getPolyfillString`.
 * @param {object} options_ - Valid keys are uaString, minify, unknown, excludes, and features.
 * @param {Boolean} [options_.minify=true] - Whether to return the minified or raw implementation of the polyfills.
 * @param {'ignore'|'polyfill'} [options_.unknown='polyfill'] - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
 * @param {Object} [options_.features={}] - Which features should be returned if the user-agent does not support them natively.
 * @param {false|String} [options_.callback=false] - Name of the JavaScript function to call after the polyfill bundle is loaded.
 * @param {Array<String>} [options_.excludes=[]] - Which features should be excluded from the returned object.
 * @param {String} [options_.uaString=''] - The user-agent string to check each feature against.
 * @return {Object} options - options_ merged with the defaults option values.
 */
export function getOptions(options_ = {}) {
	const options = {
		callback: hasProperty("callback", options_) &&
			typeof options_.callback === "string" &&
			/^[\w.]+$/.test(options_.callback) ?
			options_.callback : false,
		uaString: hasProperty("uaString", options_) ? options_.uaString : "",
		minify: hasProperty("minify", options_) ? options_.minify : true,
		unknown: hasProperty("unknown", options_) ? options_.unknown : "polyfill",
		features: hasProperty("features", options_) ? options_.features : {},
		excludes: hasProperty("excludes", options_) ? options_.excludes : [],
	};

	// Normalise flags
	for (const k of Object.keys(options.features)) {
		if (!options.features[k].flags) {
			options.features[k].flags = new Set();
		} else if (options.features[k].flags.constructor !== Set) {
			options.features[k].flags = new Set(options.features[k].flags);
		}
	}

	return options;
}

/**
 * Given a set of features that should be polyfilled in 'options.features'
 * (with flags i.e. `{<featurename>: {flags:Set[<flaglist>]}, ...}`),
 * determine which have a configuration valid for the given options.uaString,
 * and return a promise of set of canonical (unaliased) features (with flags) and polyfills.
 *
 * @param {object} options_ - Valid keys are uaString, minify, unknown, excludes, and features.
 * @param {Boolean} [options_.minify=true] - Whether to return the minified or raw implementation of the polyfills.
 * @param {'ignore'|'polyfill'} [options_.unknown='polyfill'] - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
 * @param {Object} [options_.features={}] - Which features should be returned if the user-agent does not support them natively.
 * @param {Array<String>} [options_.excludes=[]] - Which features should be excluded from the returned object.
 * @param {String} [options_.uaString=''] - The user-agent string to check each feature against.
 * @return {Promise<Object>} - Canonicalised feature definitions filtered for UA
 */
export async function getPolyfills(options_, store, version) {
	// const now = Date.now();
	const options = getOptions(options_);
	const ua = version === '3.25.1' ? new oldUA(options.uaString) : new UA(options.uaString);
	const featureNames = new Set(Object.keys(options.features));
	const targetedFeatures = Object.create(null);

	/*
		A feature would be removed in these scenarios:
		- If it has been specified to be excluded from the bundle via the exlcudes option.
		- If the feature is not meant to be in the bundle it does not target the browser.
				Targeting a browser happens if the feature has the always option applied or
				the browser is unsupported/unknown and the unknown option is set to polyfill
				or the browser version is within the semver range specified in the features config.toml file.
	*/
	function removeFeature(featureName) {
		featureNames.delete(featureName);
		if (targetedFeatures[featureName]) {
			delete targetedFeatures[featureName];
		}
	}

	function addFeature(featureName, featureFlags, featureProperties) {
		targetedFeatures[featureName] = Object.assign(Object.create(null), featureFlags, featureProperties);
		featureNames.add(featureName);
	}

	for (const featureName of featureNames) {
		// Remove feature if it exists in the `excludes` array.
		if (options.excludes.includes(featureName)) {
			removeFeature(featureName);
			continue;
		}

		const feature = targetedFeatures[featureName] || options.features[featureName];
		const properties = {
			aliasOf: new Set((feature.aliasOf || [])),
			dependencyOf: new Set((feature.dependencyOf || [])),
			flags: new Set(feature.flags || [])
		};

		// If featureName is an alias for a group of features
		// Add each feature.
		let alias;
		try {
			alias = await getConfigAliases(store, featureName);
		} catch (e) {
		}
		if (alias) {
			const aliasProperties = {
				aliasOf: new Set(properties.aliasOf),
				dependencyOf: new Set(properties.dependencyOf),
				flags: new Set(properties.flags)
			};
			aliasProperties.aliasOf.add(featureName);
			for (const aliasedFeature of alias) {
				addFeature(aliasedFeature, feature, aliasProperties);
			}
			continue;
		}

		// If always flag is set, then the feature should be targeted at the browser.
		let targeted = feature.flags.has("always");

		// If not already targeted, then set targeted to true if the browser is unknown/unsupported
		// and the unknown option is set the serve polyfills.
		if (!targeted) {
			const unknownOverride = options.unknown === "polyfill" && ua.isUnknown();
			if (unknownOverride) {
				targeted = true;
				properties.flags.add("gated");
			}
		}

		let meta;
		try {
			meta = await getPolyfillMeta(store, featureName)
		} catch (e) {
		}
		if (!meta) {
			// this is a bit strange but the best thing I could come up with.
			// by adding the feature, it will show up as an "unrecognized" polyfill
			// which I think is better than just pretending it doesn't exsist.
			addFeature(featureName);
			continue;
		}
		// If not already targeted, check to see if the polyfill's configuration states it should target
		// this browser version.
		if (!targeted) {
			const isBrowserMatch = meta.browsers &&
				meta.browsers[ua.getFamily()] &&
				ua.satisfies(meta.browsers[ua.getFamily()]);

			targeted = isBrowserMatch;
		}

		if (targeted) {
			addFeature(featureName, feature, properties);
			const deps = meta.dependencies;
			// If feature has dependency then add the dependencies as well.
			if (deps) {
				const dependencyProperties = {
					aliasOf: new Set(properties.aliasOf),
					dependencyOf: new Set(properties.dependencyOf).add(featureName),
					flags: new Set(properties.flags)
				};
				for (const dep of deps) {
					addFeature(dep, feature, dependencyProperties);
				}
			}
		} else {
			removeFeature(featureName);
		}
	}
	// console.log('getPolyfills', 'took', Date.now() - now);
	return targetedFeatures;
}

/**
 * Create a polyfill bundle.
 * @param {object} options_ - Valid keys are uaString, minify, unknown, excludes, and features.
 * @param {Boolean} [options_.minify=true] - Whether to return the minified or raw implementation of the polyfills.
 * @param {'ignore'|'polyfill'} [options_.unknown='polyfill'] - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
 * @param {Object} [options_.features={}] - Which features should be returned if the user-agent does not support them natively.
 * @param {Array<String>} [options_.excludes=[]] - Which features should be excluded from the returned object.
 * @param {String} [options_.uaString=''] - The user-agent string to check each feature against.
 * @param {Boolean} [options_.stream=false] - Whether to return a stream or a string of the polyfill bundle.
 * @return {Promise<String> | ReadStream} - Polyfill bundle as either a utf-8 stream or a promise of a utf-8 string.
 */
export async function getPolyfillString(options_, store, appVersion) {
	// const now = Date.now();
	const options = getOptions(options_);
	const lf = options.minify ? "" : "\n";
	const allWarnText =
		"Using the `all` alias with polyfill.io is a very bad idea. In a future version of the service, `all` will deliver the same behaviour as `default`, so we recommend using `default` instead.";
	const appVersionText = "Polyfill service " + "v" + appVersion
	let output = [];
	const explainerComment = [];
	// Build a polyfill bundle of polyfill sources sorted in dependency order
	const targetedFeatures = await getPolyfills(options, store);
	const warnings = {
		unknown: []
	};
	const featureNodes = [];
	const featureEdges = [];

	await Promise.all(
		Object.keys(targetedFeatures).map(featureName => {
			const feature = targetedFeatures[featureName];
			return getPolyfillMeta(store, featureName).then(polyfill => {
				if (!polyfill) {
					warnings.unknown.push(featureName);
				} else {
					featureNodes.push(featureName);

					if (polyfill.dependencies) {
						for (const depName of polyfill.dependencies) {
							if (depName in targetedFeatures) {
								featureEdges.push([depName, featureName]);
							}
						}
					}

					feature.comment = featureName + ", License: " + (polyfill.license || "CC0");
				}
			});
		})
	);
	// Sort the features alphabetically, so ones with no dependencies
	// turn up in the same order
	featureNodes.sort((a, b) => a.localeCompare(b));
	featureEdges.sort(([, a], [, b]) => a.localeCompare(b));

	const sortedFeatures = toposort(featureNodes, featureEdges);

	if (!options.minify) {
		explainerComment.push(
			appVersionText,
			"For detailed credits and licence information see https://github.com/JakeChampion/polyfill-service.",
			"",
			"Features requested: " + Object.keys(options.features),
			"",
			...sortedFeatures
			.filter(
				featureName =>
				targetedFeatures[featureName] &&
				targetedFeatures[featureName].comment
			)
			.map(featureName => "- " + targetedFeatures[featureName].comment)
		);
		if (warnings.unknown.length > 0) {
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
			appVersionText,
			"Disable minification (remove `.min` from URL path) for more info"
		);
	}
	output.push(stringToReadableStream("/* " + explainerComment.join("\n * ") + " */\n\n"));

	if (sortedFeatures.length > 0) {
		// Outer closure hides private features from global scope
		output.push(stringToReadableStream("(function(self, undefined) {" + lf));

		// Using the graph, stream all the polyfill sources in dependency order
		for (const featureName of sortedFeatures) {
			const wrapInDetect = targetedFeatures[featureName].flags.has("gated");
			if (wrapInDetect) {
				const meta = await getPolyfillMeta(store, featureName);
				if (meta.detectSource) {
					output.push(stringToReadableStream("if (!(" + meta.detectSource + ")) {" + lf));
				}
				output.push(await streamPolyfillSource(store, featureName, options.minify ? "min" : "raw"));
				if (meta.detectSource) {
					output.push(stringToReadableStream(lf + "}" + lf + lf));
				}
			} else {
				output.push(await streamPolyfillSource(store,
					featureName,
					options.minify ? "min" : "raw"
				));
			}
		}
		// Invoke the closure, passing the global object as the only argument
		output.push(stringToReadableStream("})" +
			lf +
			"('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});" +
			lf));
	} else {
		if (!options.minify) {
			output.push(stringToReadableStream("\n/* No polyfills needed for current settings and browser */\n\n"));
		}
	}

	if ("all" in options.features) {
		output.push(stringToReadableStream("\nconsole.log('" + allWarnText + "');\n"));
	}

	if (options.callback) {
		output.push(stringToReadableStream("\ntypeof " +
			options.callback +
			"==='function' && " +
			options.callback +
			"();"));
	}
	let {readable, writable} = new TransformStream;
	output.reduce(
		(a, res, i, arr) => a.then(() => res?.pipeTo(writable, {preventClose: (i+1) !== arr.length})),
		Promise.resolve()
	)
	// console.log('getPolyfillString', 'took', Date.now() - now, options_, store, appVersion);
	return readable;
}
