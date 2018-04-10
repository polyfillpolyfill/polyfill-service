'use strict';

const fs = require('graceful-fs');
const path = require('path');
const tsort = require('tsort');
const createAliasResolver = require('./aliases');
const UA = require('./UA');
const sourceslib = require('./sources');
const appVersion = require('../package.json').version;
const Handlebars = require('handlebars');
const cloneDeep = require('lodash').cloneDeep;
const streamFromPromise = require('stream-from-promise');
const lazystream = require('lazystream');
const streamFromString = require('from2-string');
const mergeStream = require('merge2');
const streamToString = require('stream-to-string');
const shuffle = require('shuffle-array');


const rumTemplate = Handlebars.compile(fs.readFileSync(path.join(__dirname, 'rumTemplate.js.handlebars'), 'utf-8'));

function listAllPolyfills() {
	return sourceslib.listPolyfills();
}

function describePolyfill(featureName) {
	return Promise.resolve(sourceslib.getPolyfillMetaSync(featureName));
}

function getOptions(opts) {
	opts = Object.assign({
		uaString: '',
		minify: true,
		unknown: 'ignore',
		features: {},
		excludes: [],
		rum: false
	}, opts);

	if (opts.unknown !== 'polyfill') {
		opts.unknown = 'ignore';
	}

	// Normalise flags
	Object.keys(opts.features).forEach(k => {
		if (!opts.features[k].flags) {
			opts.features[k].flags = new Set();
		} else if (opts.features[k].flags.constructor !== Set) {
			opts.features[k].flags = new Set(opts.features[k].flags);
		}
	});
	return opts;
}

/**
 * Given a set of features that should be polyfilled in 'options.features' (with flags i.e. `{<featurename>: {flags:Set[<flaglist>]}, ...}`), determine which have a configuration valid for the given options.uaString, and return a promise of set of canonical (unaliased) features (with flags) and polyfills.
 *
 * @param {object} options - Valid keys are uaString, minify, unknown, excludes, rum and features
 * @return {promise} - Canonicalised feature definitions filtered for UA
 */
function getPolyfills(options) {

	options = getOptions(options);
	const ua = new UA(options.uaString);

	const resolveAliases = createAliasResolver(
		function aliasFromConfig(featureName) {
			return sourceslib.getConfigAliasesSync(featureName);
		},
		function aliasAll(featureName) {
			return (featureName === 'all') ? sourceslib.listPolyfillsSync() : undefined;
		}
	);

	const resolveDependencies = createAliasResolver(
		function aliasDependencies(featureName) {
			const meta = sourceslib.getPolyfillMetaSync(featureName);
			return (meta && meta.dependencies || [])
				.filter(depName => options.excludes.indexOf(depName) === -1)
				.concat(featureName)
			;
		}
	);

	// Filter the features object to remove features not suitable for the current UA
	const filterForUATargeting = function(features) {
		const featuresList = Object.keys(features);
		return featuresList.map(featureName => {
			const meta = sourceslib.getPolyfillMetaSync(featureName);
			if (!meta) return false;

			const isBrowserMatch = (meta.browsers && meta.browsers[ua.getFamily()] && ua.satisfies(meta.browsers[ua.getFamily()]));
			const hasAlwaysFlagOverride = (features[featureName].flags.has('always'));
			const unknownOverride = (options.unknown === 'polyfill' && ua.isUnknown());

			return (isBrowserMatch || hasAlwaysFlagOverride || unknownOverride) ? featureName : false;
		}).reduce(function(out, key) {
			if (key) out[key] = features[key];
			return out;
		}, {});
	};

	const filterForExcludes = function(features) {
		Object.keys(features).forEach(featureName => {
			if (options.excludes.indexOf(featureName) !== -1) {
				delete features[featureName];
			}
		});
		return features;
	};

	const filterForUnusedAbstractMethods = function (features) {
		const featuresMeta = Object.keys(features).map(featureName => sourceslib.getPolyfillMetaSync(featureName));
		let dependencyWasRemoved = false;
		Object.keys(features).forEach(featureName => {
			if (featureName.startsWith('_')) {
				if (!featuresMeta.some(meta => (meta.dependencies || []).some(dep => dep === featureName))) {
					delete features[featureName];
					dependencyWasRemoved = true;
				}
			}
		});
		if (dependencyWasRemoved) {
			return filterForUnusedAbstractMethods(features);
		}
		return features;
	};

	return Promise.resolve(options.features)
		.then(resolveAliases)
		.then(filterForUATargeting)
		.then(resolveDependencies)
		.then(filterForUATargeting)
		.then(filterForExcludes)
		.then(filterForUnusedAbstractMethods)
	;
}

function getPolyfillString(options) {

	options = getOptions(options);
	const ua = new UA(options.uaString);
	const uaDebugName = ua.getFamily() + '/' + ua.getVersion() + ((ua.isUnknown() || !ua.meetsBaseline()) ? ' (unknown/unsupported; using policy `unknown='+options.unknown+'`)' : '');
	const lf = options.minify ? '' : '\n';
	const allWarnText = 'Using the `all` alias with polyfill.io is a very bad idea. In a future version of the service, `all` will deliver the same behaviour as `default`, so we recommend using `default` instead.';
	const output = mergeStream();
	const explainerComment = [];
	// Check UA and turn requested features into a list of polyfills
	const unsupportedUA = ((!ua.meetsBaseline() || ua.isUnknown()) && options.unknown !== 'polyfill');

	Promise.resolve(unsupportedUA ? {} : getPolyfills(options))

	// Build a polyfill bundle of polyfill sources sorted in dependency order
	.then(targetedFeatures => {
		const warnings = {unknown:[]};
		const graph = tsort();

		Object.keys(targetedFeatures).forEach(featureName => {
			const feature = targetedFeatures[featureName];
			const polyfill = sourceslib.getPolyfillMetaSync(featureName);
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

				feature.comment = featureName + ', License: ' + (polyfill.license || 'CC0') + ((feature.aliasOf && feature.aliasOf.size) ? ' (required by "' + Array.from(feature.aliasOf).join('", "') + '")' : '');
			}
		});

		const sortedFeatures = graph.sort();

		if (!options.minify) {
			explainerComment.push(
				'Polyfill service ' + ((process.env.NODE_ENV === 'production') ? 'v'+appVersion : 'DEVELOPMENT MODE - for live use set NODE_ENV to \'production\''),
				'For detailed credits and licence information see https://github.com/financial-times/polyfill-service.',
				'',
				'UA detected: ' + uaDebugName,
				'Features requested: ' + Object.keys(options.features),
				''
			);
			if (!ua.meetsBaseline() && ua.getBaseline()) {
				explainerComment.push(
					'Version range for polyfill support in ' + ua.getFamily() + ' is: ' + ua.getBaseline(),
					''
				);
			}
			explainerComment.push(...sortedFeatures
				.filter(featureName => (targetedFeatures[featureName] && targetedFeatures[featureName].comment))
				.map(featureName => '- ' + targetedFeatures[featureName].comment)
			);
			if (warnings.unknown.length) {
				explainerComment.push(
					'',
					'These features were not recognised:',
					warnings.unknown.map(s => '- '+s)
				);
			}
			if ('all' in options.features) {
				explainerComment.push('', allWarnText);
			}
		} else {
			explainerComment.push('Disable minification (remove `.min` from URL path) for more info');
		}
		output.add(streamFromString('/* ' + explainerComment.join('\n * ') + ' */\n\n'));

		if (options.rum && process.env.RUM_BEACON_HOST) {
			output.add(new lazystream.Readable(() => {
				const optionsForRUM = cloneDeep(options);
				Object.keys(options.features).forEach(f => optionsForRUM.features[f].flags.add('always'));
				const MAX_RUM_TESTS = 10;
				return streamFromPromise(getPolyfills(optionsForRUM)
					.then(rumFeatures => {
						return rumTemplate({
							host: process.env.RUM_BEACON_HOST,
							features: shuffle(Object.keys(rumFeatures)).slice(0, MAX_RUM_TESTS).reduce((op, featureName) => {
								const polyfill = sourceslib.getPolyfillMetaSync(featureName);
								if (polyfill.detectSource) {
									op.push({name: featureName, detect: polyfill.detectSource});
								}
								return op;
							}, [])
						});
					}));
			}));
		}

		if (sortedFeatures.length) {
			// Outer closure hides private features from global scope
			output.add(streamFromString("(function(undefined) {" + lf));

			// Using the graph, stream all the polyfill sources in dependency order
			for (const featureName of sortedFeatures) {
				const polyfill = sourceslib.getPolyfillMetaSync(featureName);
				const wrapInDetect = (targetedFeatures[featureName].flags.has('gated') && polyfill.detectSource);
				if (wrapInDetect) {
					output.add(streamFromString("if (!(" + polyfill.detectSource + ")) {" + lf));
				}

				output.add(sourceslib.streamPolyfillSource(featureName, (options.minify ? 'min' : 'raw')));

				if (wrapInDetect) {
					output.add(streamFromString(lf + "}" + lf + lf));
				}
			}
			
			// Invoke the closure, binding `this` to window (in a browser),
			// self (in a web worker), or global (in Node/IOjs)
			output.add(streamFromString("})" + lf + ".call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});" + lf));
		} else {
			if (!options.minify) {
				output.add(streamFromString('\n/* No polyfills found for current settings */\n\n'));
			}
		}

		if ('all' in options.features) {
			output.add(streamFromString("\nconsole.log('"+allWarnText+"');\n"));
		}
	});

	return options.stream ? output : Promise.resolve(streamToString(output));
}

module.exports = {
	describePolyfill: describePolyfill,
	listAllPolyfills: listAllPolyfills,
	getPolyfills: getPolyfills,
	getPolyfillString: getPolyfillString,
	normalizeUserAgent: UA.normalize,
};
