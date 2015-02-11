var tsort         = require('tsort'),
	_             = require('lodash'),
	AliasResolver = require('./aliases'),
	UA            = require('./UA'),
	sources       = require('./sources');

// Polyfill String.prototype.startsWith
if (!String.prototype.startsWith) {
	require('../polyfills/String.prototype.startsWith/polyfill');
}

require('es6-promise').polyfill();


// Load additional useragent features: primarily to use: agent.satisfies to
// test a browser version against a semver string
require('useragent/features');

"use strict";

function getAllPolyfills() {
	return sources.latest.listPolyfills();
}

function getOptions(opts) {
	return _.extend({
		uaString: '',
		minify: true,
		unknown: 'ignore',
		features: {},
		libVersion: 'latest'
	}, opts);
}

/**
 * Given a set of features that should be polyfilled in 'options.features' (with flags i.e. `{<featurename>: {flags:[<flaglist>]}, ...}`), determine which have a configuration valid for the given options.uaString, and return a set of canonical (unaliased) features (with flags) and polyfill variants.
 *
 * @return array, canonicalised features filtered for UA
 */
function getPolyfills(options) {
	var ua, features, sourceslib;

	options = getOptions(options);

	features = options.features;
	sourceslib = sources.getCollection(options.libVersion);
	ua = new UA(options.uaString);

	var aliasResolver = new AliasResolver([
		function aliasFromConfig(featureName) {
			return sourceslib.getConfigAliases(featureName);
		},
		function aliasAll(featureName) {
			if (featureName === 'all') {
				return sourceslib.listPolyfills();
			}
		}
	]);

	features = aliasResolver.resolve(features);


	function chooseVariant(featureName, feature) {
		if (!feature || feature.polyfillVariant !== undefined) return;
		var polyfill = sourceslib.getPolyfill(featureName);
		if (polyfill) {
			Object.keys(polyfill.variants).forEach(function(variantName) {
				var v = polyfill.variants[variantName];
				if (v.browsers && v.browsers[ua.getFamily()] && ua.satisfies(v.browsers[ua.getFamily()])) {
					feature.polyfillVariant = variantName;
					return false;
				}
			});
			if (!feature.polyfillVariant && feature.flags.indexOf('always') !== -1 && polyfill.variants['default']) {
				feature.polyfillVariant = 'default';
			}
			if (!feature.polyfillVariant && (options.unknown === 'polyfill' && ua.isUnknown())) {
				feature.polyfillVariant = 'default';
			}
			if (feature.polyfillVariant) {
				if (polyfill.variants[feature.polyfillVariant].dependencies) {
					polyfill.variants[feature.polyfillVariant].dependencies.forEach(function(dep) {
						if (!features[dep]) {
							features[dep] = {flags:feature.flags, aliasOf: [featureName]};
						} else if (!features[dep].aliasOf) {
							features[dep].aliasOf = [];
						}
						if (features[dep].aliasOf.indexOf(featureName) == -1) {
							features[dep].aliasOf.push(featureName);
						}
						chooseVariant(dep, features[dep]);
					});
				}
				return;
			}
		}
		delete features[featureName];
	}

	// chooseVariant modifies the features object, so use forEach rather than map and disregard return value
	Object.keys(features).forEach(function(featureName) {
		chooseVariant(featureName, features[featureName]);
	});
	return features;
}

function getPolyfillString(options) {
	var ua, uaDebugName;
	var currentPolyfills = {};
	var features = [];
	var explainerComment = [];
	var sourceslib;

	options = getOptions(options);
	ua = new UA(options.uaString);
	uaDebugName = (ua.isUnknown() ? 'Unknown (using policy: '+options.unknown+')' : ua.getFamily() + '/' + ua.getVersion());

	try {
		sourceslib = sources.getCollection(options.libVersion);
	} catch(e) {
		if (e.message == 'No matching version found') {
			sourceslib = null;
		} else {
			throw e;
		}
	}

	if (!ua.meetsBaseline() && !(ua.isUnknown() && options.unknown === 'polyfill')) {
		explainerComment = ['Unsupported UA detected: ' + uaDebugName];
		if (ua.getBaseline()) {
			explainerComment.push('Version range for polyfill support in this family is: ' + ua.getBaseline());
		}

	} else if (!sourceslib) {
		explainerComment = [
			'Cannot find a polyfill collection to satisfy version: '+options.libVersion+'.',
			'Available versions: '+sources.listVersions()
		];

	} else {
		if (options.minify) {
			explainerComment = ['Rerun without minification for verbose metadata'];
		} else  {
			explainerComment = [
				'For detailed credits and licence information see http://github.com/financial-times/polyfill-service.',
				'',
				'UA detected: ' + uaDebugName,
				'Features requested: ' + Object.keys(options.features),
				'Library version: ' + sourceslib.getVersion(),
				''
			]
		}
		features = getPolyfills(options);
	}

	var warnings = {unknown:[], nopolyfill:[]};
	var graph = tsort();
	var lf = options.minify ? '' : '\n';

	Object.keys(features).forEach(function(featureName) {
		var feature = features[featureName];

		if (!sourceslib.getPolyfill(featureName)) {
			warnings.unknown.push(' - '+featureName);
		} else if (!feature.polyfillVariant) {
			warnings.nopolyfill.push(' - '+featureName);
		} else {

			graph.add(featureName);
			var polyfill = sourceslib.getPolyfill(featureName).variants[feature.polyfillVariant];
			var srcKey = (options.minify ? 'min':'raw') + 'Source';


			feature.polyfillOutput = polyfill[srcKey];

			if (feature.flags.indexOf('gated') !== -1 && polyfill.detectSource) {
				feature.polyfillOutput = "if (!(" + polyfill.detectSource + ")) {" + lf + feature.polyfillOutput + "}" + lf + lf;
			}

			if (polyfill.dependencies) {
				for (var i = 0; i < polyfill.dependencies.length; i++) {
					if (features[polyfill.dependencies[i]]) {
						graph.add(polyfill.dependencies[i], featureName);
					}
				}
			}
			feature.comment = '- ' + featureName + (feature.polyfillVariant !== 'default' ? '-'+feature.polyfillVariant:'') + ', License: ' + (polyfill.license || 'CC0')  + ' ' + ((feature.aliasOf && feature.aliasOf.length) ? ' (required by "' + feature.aliasOf.join('", "') + '")' : '');
		}
	});

	// Using the graph order, build the completed polyfill bundle
	var builtPolyfillString = '';
	graph.sort().forEach(function(featureName) {
		builtPolyfillString += features[featureName].polyfillOutput || '';
		if (!options.minify && features[featureName].comment) explainerComment.push(features[featureName].comment);
	});

	// Outer closure hides private features from global scope
	builtPolyfillString = "(function() {" + lf + builtPolyfillString + lf + "})();";

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
}

module.exports = {
	getPolyfills: getPolyfills,
	getAllPolyfills: getAllPolyfills,
	getPolyfillString: getPolyfillString,
	normalizeUserAgent: UA.normalize
};
