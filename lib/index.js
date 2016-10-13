'use strict';

const fs = require('fs');
const path = require('path');
const tsort = require('tsort');
const createAliasResolver = require('./aliases');
const UA = require('./UA');
const sourceslib = require('./sources');
const appVersion = require('../package.json').version;
const Handlebars = require('handlebars');
const cloneDeep = require('lodash').cloneDeep;
const StreamCombiner = require('./stream-concat');

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
 * Given a set of features that should be polyfilled in 'options.features' (with flags i.e. `{<featurename>: {flags:Set[<flaglist>]}, ...}`), determine which have a configuration valid for the given options.uaString, and return a promise of set of canonical (unaliased) features (with flags) and polyfills.
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
	const output = new StreamCombiner();
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
			output.queue('/* ' + explainerComment.join('\n * ') + ' */\n\n');

			if (!sortedFeatures.length) {
				if (!options.minify) {
					output.queue('/* No polyfills found for current settings */\n');
				}
				output.finalize();
				return;
			}

			// Outer closure hides private features from global scope
			output.queue("(function(undefined) {" + lf);

			if (options.rum && process.env.RUM_BEACON_HOST) {
				output.queue(() => {
					const optionsForRUM = cloneDeep(options);
					Object.keys(options.features).forEach(f => optionsForRUM.features[f].flags.add('always'));
					return getPolyfills(optionsForRUM)
						.then(rumFeatures => {
							return rumTemplate({
								host: process.env.RUM_BEACON_HOST,
								features: Object.keys(rumFeatures).reduce((op, featureName) => {
									const polyfill = sourceslib.getPolyfillMetaSync(featureName);
									if (polyfill.detectSource) {
										op.push({name: featureName, detect: polyfill.detectSource});
									}
									return op;
								}, [])
							});
						})
					;
				});
			}

			// Using the graph, stream all the polyfill sources in dependency order
			sortedFeatures.forEach(featureName => {
				const polyfill = sourceslib.getPolyfillMetaSync(featureName);
				const wrapInDetect = (targetedFeatures[featureName].flags.has('gated') && polyfill.detectSource);
				
				if (wrapInDetect) output.queue("if (!(" + polyfill.detectSource + ")) {" + lf);
				output.queue(() => {
					return sourceslib.streamPolyfillSource(featureName, (options.minify ? 'min':'raw'));
				});
				if (wrapInDetect) output.queue(lf + "}" + lf + lf);
			});

			// Invoke the closure, binding `this` to window (in a browser),
			// self (in a web worker), or global (in Node/IOjs)
			output.queue("})" + lf + ".call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});" + lf);

			if ('all' in options.features) {
				output.queue("\nconsole.log('"+allWarnText+"');\n");
			}
					
			output.finalize();

		})
		.catch(function(err) {
			console.log(err.stack || err);
		})
	;

	return options.stream ? output : new Promise(resolve => {
		const bufs = [];
		output.on('data', chunk => bufs.push(chunk));
		output.on('end', () => resolve(Buffer.concat(bufs).toString('UTF-8')));
	});
}

module.exports = {
	describePolyfill: describePolyfill,
	listAllPolyfills: listAllPolyfills,
	getPolyfills: getPolyfills,
	getPolyfillString: getPolyfillString,
	normalizeUserAgent: UA.normalize,
};
