'use strict';

const fs = require('fs');
const path = require('path');
const ReadableStream = require('stream').Readable;
const tsort = require('tsort');
const createAliasResolver = require('./aliases');
const UA = require('./UA');
const sourceslib = require('./sources');
const appVersion = require('../package.json').version;
const Handlebars = require('handlebars');
const cloneDeep = require('lodash').cloneDeep;

// Load additional useragent features: primarily to use: agent.satisfies to
// test a browser version against a semver string
require('useragent/features');

const rumTemplate = Handlebars.compile(fs.readFileSync(path.join(__dirname, 'rumTemplate.js.handlebars'), 'utf-8'));

function listAllPolyfills() {
	return sourceslib.listPolyfills();
}

function describePolyfill(featureName) {
	return sourceslib.getPolyfill(featureName);
}

function getOptions(opts) {
	return Object.assign({
		uaString: '',
		minify: true,
		unknown: 'ignore',
		features: {},
		excludes: [],
		rum: false
	}, opts);
}

/**
 * Given a set of features that should be polyfilled in 'options.features' (with flags i.e. `{<featurename>: {flags:[<flaglist>]}, ...}`), determine which have a configuration valid for the given options.uaString, and return a promise of set of canonical (unaliased) features (with flags) and polyfills.
 *
 * @param {object} options - Valid keys are uaString, minify, unknown and features
 * @return {promise} - Canonicalised feature definitions filtered for UA
 */
function getPolyfills(options) {

	options = getOptions(options);
	const ua = new UA(options.uaString);

	const resolveAliases = createAliasResolver([
		function aliasFromConfig(featureName) {
			return sourceslib.getConfigAliasesSync(featureName);
		},
		function aliasAll(featureName) {
			return (featureName === 'all') ? sourceslib.listPolyfillsSync() : undefined;
		}
	]);

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
			const hasAlwaysFlagOverride = (features[featureName].flags.indexOf('always') !== -1);
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

	return Promise.resolve(options.features)
		.then(resolveAliases)
		.then(filterForUATargeting)
		.then(resolveDependencies)
		.then(filterForUATargeting)
		.then(filterForExcludes)
	;
}

function getPolyfillString(options) {

	options = getOptions(options);
	const ua = new UA(options.uaString);
	const uaDebugName = ua.getFamily() + '/' + ua.getVersion() + ((ua.isUnknown() || !ua.meetsBaseline()) ? ' (unknown/unsupported; using policy `unknown='+options.unknown+'`)' : '');
	const lf = options.minify ? '' : '\n';
	const allWarnText = 'Using the `all` alias with polyfill.io is a very bad idea. In a future version of the service, `all` will deliver the same behaviour as `default`, so we recommend using default instead.';
	const outputString = options.stream ? new ReadableStream : [];
	const explainerComment = [];

	// Check UA and turn requested features into a list of polyfills
	const taskPromise = Promise.resolve()
		.then(() => {
			if ((!ua.meetsBaseline() || ua.isUnknown()) && options.unknown !== 'polyfill') {
				return [{}, []];
			} else {

				// Turn on the 'always' flag to fetch the complete list of resolved features
				const optionsForAll = cloneDeep(options);
				Object.keys(options.features).forEach(f => optionsForAll.features[f].flags.push('always'));
				return Promise.all([getPolyfills(optionsForAll), getPolyfills(options).then(obj => Object.keys(obj))]);
			}
		})

		// Build a polyfill bundle of polyfill sources sorted in dependency order
		.then(featureLists => {
			const allFeatures = featureLists[0];
			const targetedFeatures = featureLists[1];
			const warnings = {unknown:[]};
			const graph = tsort();

			Object.keys(allFeatures).forEach(featureName => {
				const feature = allFeatures[featureName];
				const polyfill = sourceslib.getPolyfillMetaSync(featureName);
				if (!polyfill) {
					warnings.unknown.push(featureName);
				} else {

					if (targetedFeatures.includes(featureName)) {
						graph.add(featureName);

						if (polyfill.dependencies) {
							polyfill.dependencies.forEach(depName => {
								if (targetedFeatures.includes(depName)) {
									graph.add(depName, featureName);
								}
							});
						}
					}

					feature.detectSource = polyfill.detectSource;
					feature.comment = featureName + ', License: ' + (polyfill.license || 'CC0') + ((feature.aliasOf && feature.aliasOf.length) ? ' (required by "' + feature.aliasOf.join('", "') + '")' : '');
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
					.filter(featureName => (allFeatures[featureName] && allFeatures[featureName].comment))
					.map(featureName => '- ' + allFeatures[featureName].comment)
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
			outputString.push('/* ' + explainerComment.join('\n * ') + ' */\n\n');

			if (!targetedFeatures.length) {
				return;
			}

			return !targetedFeatures.length ? true : Promise.resolve()
				.then(() => {

					// Outer closure hides private features from global scope
					outputString.push("(function(undefined) {" + lf);

					if (options.rum && process.env.RUM_BEACON_HOST) {
						outputString.push(rumTemplate({host: process.env.RUM_BEACON_HOST, features:allFeatures}));
					}

					// Using the graph, stream all the polyfill sources in dependency order
					return sortedFeatures
						.reduce((chainedPromise, featureName) => {
							return chainedPromise
								.then(() => Promise.resolve(sourceslib.getPolyfill(featureName)))
								.then(polyfill => {
									const srcKey = (options.minify ? 'min':'raw') + 'Source';
									let output = polyfill[srcKey];
									if (allFeatures[featureName].flags.indexOf('gated') !== -1 && polyfill.detectSource) {
										output = "if (!(" + polyfill.detectSource + ")) {" + lf + output + lf + "}" + lf + lf;
									}
									outputString.push(output);
								})
							;
						}, Promise.resolve())
					;
				})
				.then(() => {

					// Invoke the closure, binding `this` to window (in a browser),
					// self (in a web worker), or global (in Node/IOjs)
					outputString.push("})" + lf + ".call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});" + lf);

					if ('all' in options.features) {
						outputString.push("\nconsole.log('"+allWarnText+"');\n");
					}
					
					if (options.stream) {
						outputString.push(null);
					}

					return outputString;

				})
			;
		})
		.catch(function(err) {
			console.log(err.stack || err);
		})
	;

	if (options.stream) {
		outputString._read = () => {};
		return outputString;
	} else {
		return taskPromise.then(op => op.join(''));
	}
}

module.exports = {
	describePolyfill: describePolyfill,
	listAllPolyfills: listAllPolyfills,
	getPolyfills: getPolyfills,
	getPolyfillString: getPolyfillString,
	normalizeUserAgent: UA.normalize,
};
