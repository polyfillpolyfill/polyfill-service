var tsort         = require('tsort'),
	AliasResolver = require('./aliases'),
	UA            = require('./UA'),
	sources       = require('./sources');

// Polyfill String.prototype.startsWith
if (!String.prototype.startsWith) {
	require('../polyfills/String.prototype.startsWith/polyfill');
}

// Load additional useragent features: primarily to use: agent.satisfies to
// test a browser version against a semver string
require('useragent/features');

"use strict";

function getAllPolyfills() {
	return Object.keys(sources);
}

/**
 * Given a list of features that should be polyfilled in 'options.features' (with flags i.e. `[{ name: <featurename>, flags: [<flaglist>] }, {...}]`), determine which have a configuration valid for the given options.uaString, and return a list of canonical (unaliased) features (with flags) and polyfill variants.
 *
 * @return array, canonicalised features filtered for UA
 */
function getPolyfills(options) {
	var ua = new UA(options.uaString);

	function chooseVariant(feature) {
		if (feature.polyfillVariant !== undefined) return;
		var polyfill = sources.getPolyfill(feature.name);
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
			if (feature.polyfillVariant) {
				var deps = getDependencies(feature);
				if (deps) deps.forEach(chooseVariant);
				return;
			}
		}
		feature.polyfillVariant = null;
	}

	function getDependencies(feature) {
		var polyfill = sources.getPolyfill(feature.name);
		var deps = [];
		if (feature.polyfillVariant && polyfill.variants[feature.polyfillVariant].dependencies) {
			polyfill.variants[feature.polyfillVariant].dependencies.forEach(function(dep) {
				if (!features[dep]) {
					features[dep] = {name: dep, flags:feature.flags, aliasOf: [feature.name]};
				}
				features[dep].aliasOf.push(feature.name);
				deps.push(features[dep]);
			});
		}
		return deps;
	}

	var aliasResolver = new AliasResolver([
		function expandNamespacedPolyfills(feature) {

			// Append a dot separator to the polyfill name before testing 'startsWith' if it does not already end with a dot.
			var namespace = feature.name.replace(/(\.)?$/, '') + '.';
			var expandedFeatureNames = sources.listPolyfills().filter(function(canonicalFeatureName) {
				return canonicalFeatureName.startsWith(namespace);
			});

			if (expandedFeatureNames.length === 0) {
				return feature;
			}

			if (sources.polyfillExists(feature.name)) {
				expandedFeatureNames.push(feature.name);
			}

			return expandedFeatureNames;
		},
		function aliasFromConfig(feature) {
			return sources.getConfigAliases(feature.name) || feature;
		}
	]);

	var features = aliasResolver.resolve(options.features).reduce(function(obj, val) {
		obj[val.name] = val;
		return obj;
	}, {});

	Object.keys(features).forEach(function(featureName) {
		chooseVariant(features[featureName]);
	});

	return Object.keys(features).map(function(key) { return features[key]; });
}

function getPolyfillString(options) {
	var ua = new UA(options.uaString),
		currentPolyfills = {},
		explainerComment;

	if (ua.meetsBaseline()) {
		if (options.minify) {
			explainerComment = ['Rerun without minification for verbose metadata'];
		} else  {
			explainerComment = [
				'For detailed credits and licence information see http://github.com/financial-times/polyfill-service.',
				'',
				'Detected: ' + ua.getFamily() + '/' + ua.getVersion(),
				''
			]
		}
	} else {
		explainerComment = ['Unsupported UA detected: ' + ua.getFamily() + '/' + ua.getVersion()];
		if (ua.getBaseline()) {
			explainerComment.push('Version range for polyfill support in this family is: ' + ua.getBaseline());
		}
		options.features = [];
	}

	var features = getPolyfills(options);
	var warnings = {unknown:[], nopolyfill:[]};
	var graph = tsort();

	// Convert to object to make it easier to pick polyfills out in graph order
	features = features.reduce(function(obj, val) {
		obj[val.name] = val;
		return obj;
	}, {});

	Object.keys(features).forEach(function(featureName) {
		var feature = features[featureName];

		if (!sources.getPolyfill(featureName)) {
			warnings.unknown.push(' - '+featureName);
		} else if (!feature.polyfillVariant) {
			warnings.nopolyfill.push(' - '+featureName);
		} else {

			graph.add(featureName);
			var polyfill = sources.getPolyfill(featureName).variants[feature.polyfillVariant];
			var srcKey = (options.minify ? 'min':'raw') + (polyfill.shouldGate ? 'Gated':'') + 'Source';

			feature.polyfillOutput = polyfill[srcKey];

			if (polyfill.dependencies) {
				for (var i = 0; i < polyfill.dependencies.length; i++) {
					graph.add(polyfill.dependencies[i], featureName);
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
