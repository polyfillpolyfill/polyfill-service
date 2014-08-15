var fs = require('fs'),
	path = require('path'),
	tsort     = require('tsort'),
	AliasResolver = require('./aliases'),
	getUserAgentInfo = require('./agent');

// Polyfill String.prototype.startsWith
if (!String.prototype.startsWith) {
	require('../polyfills/String.prototype.startsWith/polyfill');
}

// Load additional useragent features: primarily to use: agent.satisfies to
// test a browser version against a semver string
require('useragent/features');

"use strict";

var polyfillSourceFolder = path.join(__dirname, '../polyfills');

var sources = {},
	configuredAliases = {};

fs.readdirSync(polyfillSourceFolder).forEach(function (polyfillName) {

	var polyfillPath = path.join(polyfillSourceFolder, polyfillName),
		configPath   = path.join(polyfillPath, 'config.json');

	if (!fs.existsSync(polyfillPath) || !fs.existsSync(configPath)) {
		return;
	}

	var config = require(configPath),
		polyfillSourcePath = path.join(polyfillPath, 'polyfill.js'),
		detectSourcePath = path.join(polyfillPath, 'detect.js'),
		fileContents = fs.readFileSync(polyfillSourcePath, 'utf8'),
		polyfillInfo = {
			file: fileContents,
			config: config
		};


	if (fs.existsSync(detectSourcePath)) {
		var featureGate = fs.readFileSync(detectSourcePath);
		var gatedFile = "if (!(" + featureGate + ")) {" + fileContents + "}";

		// Verify the generated feature gate is valid javascript
		try {
			new Function(gatedFile);
		} catch(e) {
			console.error("Error generating feature gate for polyfill: " + polyfillName);
			console.error("Invalid Syntax in feature gate: '" + e.message + "'");
			console.error("The detect.js file must be a valid expression that can be inserted as the condition of an if statement");
			process.exit(1);
		}

		polyfillInfo.gatedFile = gatedFile;
	}

	sources[polyfillName] = polyfillInfo;

	// Store alias names in a map for efficient lookup, mapping aliases to
	// polyfillNames.  An alias can map to many polyfill names. So a group
	// of polyfills can be aliased under the same name.  This is why an
	// array is created and used for the value in the map.
	config.aliases = config.aliases || [];
	config.aliases.forEach(function(aliasName) {
		if (configuredAliases[aliasName]) {
			configuredAliases[aliasName].push(polyfillName);
		} else {
			configuredAliases[aliasName] = [ polyfillName ];
		}
	});
});

(function initAliasResolvers() {

	// Each alias resolver function is applied to a polyfill name (string), the
	// function should then return an array of new strings that represent the name
	// or undefined to indicate that the name can not be expanded, each is
	// called in the sequence defined here
	AliasResolver.addResolver(function aliasFromConfig(polyfillIdentifierName) {
		// If an name can not be resolved to anything return undefined
		return configuredAliases[polyfillIdentifierName] || undefined;
	}).addResolver(function expandNamespacedPolyfills(polyfillIdentifierName) {
		// Expand a polyfill name i.e. Element.prototype becomes Element.prototype.* etc

		// Append a dot separator to the polyfill name before testing 'startsWith' if it does not already end with a dot.
		var polyfillIdentifierNameAsNamespace = polyfillIdentifierName.replace(/(\.)?$/, '.') + '.';

		var expandedPolyfillNames = Object.keys(sources).filter(function(canonicalSourceName) {
			return canonicalSourceName.startsWith(polyfillIdentifierNameAsNamespace);
		});

		if (expandedPolyfillNames.length === 0) {
			return undefined;
		}

		if (polyfillIdentifierName in sources) {
			expandedPolyfillNames.push(polyfillIdentifierName);
		}

		return expandedPolyfillNames;
	});
}());

function getPolyfillString(options) {
	var ua = getUserAgentInfo(options.uaString),
		explainerComment = options.minify ? [
			'Rerun without minification for verbose metadata'
		] : [
			'Polyfill bundle includes the following polyfills.  For detailed credits and licence information see http://github.com/financial-times/polyfill-service.',
			'',
			'Detected: ' + ua.family + '/' + ua.toVersion(),
			''
		],
		currentPolyfills = {};


	var desired = options.polyfills

	// By default conditionally include all polyfills based on the User Agent
	if (desired.length === 0) {
		desired = Object.keys(sources).map(function(name) {
			return {
				flags: [],
				name: name
			}
		})
	} else {
		desired = AliasResolver.resolvePolyfills(desired);
	}

	desired.forEach(function(polyfill) {
		var polyfillSource = sources[polyfill.name];

		if (!polyfillSource) {
			explainerComment.push('- "' + polyfill.name + '" did not match any polyfills');
			return;
		}

		var polyfillConfig = polyfillSource.config;
		var alwaysInclude = polyfill.flags.indexOf('always') !== -1;

		if (!alwaysInclude) {
			var browsersConfigured = polyfillConfig && polyfillConfig.browsers;

			if (!(browsersConfigured)) {
				return;
			}

			var browserVersion = polyfillConfig.browsers[ua.family];
			if (!(browserVersion && ua.satisfies(browserVersion))) {
				return;
			}
		}

		var shouldGate = (polyfill.flags.indexOf('gated') !== -1 && polyfillSource.gatedFile);
		currentPolyfills[polyfill.name] = (shouldGate) ? polyfillSource.gatedFile : polyfillSource.file;

		explainerComment.push(
			'- ' + polyfill.name +
			', License: ' + (polyfillConfig.license || 'CC0')  + ' ' +
			((polyfill.aliasOf && polyfill.aliasOf.length) ? ' (' + polyfill.aliasOf.join(',') + ')' : '')
		);
	});

	var graph = tsort();
	for (var name in currentPolyfills) {
		var config = sources[name].config;
		if (config.dependencies) {
			for (var i = 0; i < config.dependencies.length; i++) {
				graph.add(config.dependencies[i], name);
			}
		}
		else {
			graph.add(name);
		}
	}
	var orderedPolyfills = graph.sort();

	var builtExplainerComment = '/* ' + explainerComment.join('\n * ') + '\n */\n';
	var builtPolyfillString = orderedPolyfills.map(function(name) {
		return currentPolyfills[name];
	}).join('');

	var output = builtExplainerComment + builtPolyfillString;

	if (options.minify) {
		var uglres = require('uglify-js').minify(output, {fromString:true, outSourceMap:options.mapUrl});
		if (options.minify == 'map') {
			return uglres.map;
		} else {
			return uglres.code;
		}
	} else {
		return output;
	}
}

module.exports = {
	getPolyfills: getPolyfillString
};
