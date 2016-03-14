'use strict';

const tsort = require('tsort');
const createAliasResolver = require('./aliases');
const UA = require('./UA');
const sourceslib = require('./sources').getCollection();
const path = require('path');
const appVersion = require(path.join(__dirname,'../package.json')).version;

// Load additional useragent features: primarily to use: agent.satisfies to
// test a browser version against a semver string
require('useragent/features');

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
			return sourceslib.getConfigAliases(featureName);
		},
		function aliasAll(featureName) {
			return (featureName === 'all') ? sourceslib.listPolyfills() : undefined;
		}
	]);

	const resolveDependencies = createAliasResolver(
		function aliasDependencies(featureName) {
			return sourceslib.getPolyfill(featureName).then(function(polyfill) {
				return ((polyfill && polyfill.dependencies) || []).concat(featureName);
			});
		}
	);

	// Filter the features object to remove features not suitable for the current UA
	const filterForUATargeting = function(features) {
		const featuresList = Object.keys(features);
		return Promise.all(featuresList.map(featureName => {
			return sourceslib.getPolyfill(featureName).then(function(polyfill) {
				if (!polyfill) return false;

				const isBrowserMatch = (polyfill.browsers && polyfill.browsers[ua.getFamily()] && ua.satisfies(polyfill.browsers[ua.getFamily()]));
				const hasAlwaysFlagOverride = (features[featureName].flags.indexOf('always') !== -1);
				const unknownOverride = (options.unknown === 'polyfill' && ua.isUnknown());

				return (isBrowserMatch || hasAlwaysFlagOverride || unknownOverride) ? featureName : false;
			});
		})).then(filteredList => {
			return filteredList.reduce(function(out, key) {
				if (key) out[key] = features[key];
				return out;
			}, {});
		});
	};

	return Promise.resolve(options.features)
		.then(resolveAliases)
		.then(filterForUATargeting)
		.then(resolveDependencies)
		.then(filterForUATargeting)
	;
}

function getPolyfillString(options) {

	options = getOptions(options);
	const ua = new UA(options.uaString);
	const uaDebugName = ua.getFamily() + '/' + ua.getVersion() + ((ua.isUnknown() || !ua.meetsBaseline()) ? ' (unknown/unsupported; using policy `unknown='+options.unknown+'`)' : '');
	const lf = options.minify ? '' : '\n';
	let explainerComment = [];

	// Check UA and turn requested features into a list of polyfills
	return Promise.resolve()
		.then(() => {
			if (options.minify) {
				explainerComment.push('Rerun without minification (remove `.min` from URL path) for verbose metadata');
			} else {
				explainerComment.push(
					'Polyfill service v' + appVersion,
					'For detailed credits and licence information see http://github.com/financial-times/polyfill-service.',
					'',
					'UA detected: ' + uaDebugName,
					'Features requested: ' + Object.keys(options.features),
					''
				);
				if (!ua.meetsBaseline() && ua.getBaseline()) {
					explainerComment.push('Version range for polyfill support in this family is: ' + ua.getBaseline());
					explainerComment.push('');
				}
			}
			return ((!ua.meetsBaseline() || ua.isUnknown()) && options.unknown !== 'polyfill') ? {} : getPolyfills(options);
		})

		// Build a polyfill bundle of polyfill sources sorted in dependency order
		.then(features => {
			const warnings = {unknown:[], nopolyfill:[]};
			const graph = tsort();
			let builtPolyfillString = '';

			return Promise.all(Object.keys(features).map(featureName => {
				const feature = features[featureName];
				return sourceslib.getPolyfill(featureName).then(polyfill => {
					if (!polyfill) {
						warnings.unknown.push(' - '+featureName);
					} else {

						graph.add(featureName);

						const srcKey = (options.minify ? 'min':'raw') + 'Source';
						feature.polyfillOutput = polyfill[srcKey];

						if (feature.flags.indexOf('gated') !== -1 && polyfill.detectSource) {
							feature.polyfillOutput = "if (!(" + polyfill.detectSource + ")) {" + lf + feature.polyfillOutput + "}" + lf + lf;
						}

						if (polyfill.dependencies) {
							polyfill.dependencies.forEach(depName => {
								if (depName in features) {
									graph.add(depName, featureName);
								}
							});
						}

						feature.comment = '- ' + featureName + ', License: ' + (polyfill.license || 'CC0') + ((feature.aliasOf && feature.aliasOf.length) ? ' (required by "' + feature.aliasOf.join('", "') + '")' : '');
					}
				});
			}))
			.then(() => {

				// Using the graph order, build the completed polyfill bundle
				graph.sort().forEach(featureName => {
					builtPolyfillString += features[featureName].polyfillOutput || '';
					if (!options.minify && features[featureName].comment) {
						explainerComment.push(features[featureName].comment);
					}
				});
				if (builtPolyfillString) {

					// Outer closure hides private features from global scope
					builtPolyfillString = "(function(undefined) {" + lf + builtPolyfillString + lf + "})" + lf;

					// Invoke the closure, binding `this` to window (in a browser), self (in a web worker), or global (in Node/IOjs)
					builtPolyfillString += ".call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});";
				}

				if (warnings.unknown.length && !options.minify) {
					explainerComment = explainerComment.concat(
						'',
						'These features were not recognised:',
						warnings.unknown
					);
				}

				if (warnings.nopolyfill.length && !options.minify) {
					explainerComment = explainerComment.concat(
						'',
						'These features have no polyfill suitable for '+ua.getFamily() + '/' + ua.getVersion() + ':',
						warnings.nopolyfill
					);
				}

				return '/* ' + explainerComment.join('\n * ') + ' */\n\n' + builtPolyfillString;
			});
		})
		.catch(function(err) {
			console.log(err.stack || err);
		})
	;
}

module.exports = {
	describePolyfill: describePolyfill,
	listAllPolyfills: listAllPolyfills,
	getPolyfills: getPolyfills,
	getPolyfillString: getPolyfillString,
	normalizeUserAgent: UA.normalize,
};
