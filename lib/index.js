var fs = require('fs'),
	path = require('path'),
	uglify    = require('uglify-js'),
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
			minifile: uglify.minify(fileContents, {fromString: true}).code,
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
		polyfillInfo.miniGatedFile = uglify.minify(gatedFile, {fromString: true}).code;
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

// Alias resolvers are functions that receive a polyfill name as an argument, and return an array of polyfill names or a falsy value to indicate that the resolver has no alias for the supplied polyfill name.  Resolvers act in sequence, so the second resolver will be called on the list of polyfills resulting from the first resolver.  The final resolver must return only canonical names.
(function initAliasResolvers() {

	// Map pre-configured aliases
	AliasResolver.addResolver(function aliasFromConfig(polyfillIdentifierName) {
		return configuredAliases[polyfillIdentifierName] || undefined;

	// Expand a polyfill name i.e. Element.prototype becomes Element.prototype.* etc
	}).addResolver(function expandNamespacedPolyfills(polyfillIdentifierName) {

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

	// Add all the dependencies of a polyfill by resolving the polyfill to itself plus all its dependencies
	}).addResolver(function addDependencies(polyfillIdentifierName) {
		if (sources[polyfillIdentifierName] && sources[polyfillIdentifierName].config.dependencies) {
			var list = [polyfillIdentifierName];
			sources[polyfillIdentifierName].config.dependencies.forEach(function(dep) {
				var subdeps = addDependencies(dep);
				list = subdeps ? list.concat(subdeps) : list.concat(dep);
			})
			return list;
		}
	});
}());

function getPolyfillString(options) {
	var ua = getUserAgentInfo(options.uaString),
		explainerComment = options.minify ? [
			'Rerun without minification for verbose metadata'
		] : [
			'Polyfill bundle includes the following polyfills.  For detailed credits',
			'and licence information see http://github.com/financial-times/polyfill-service.',
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

		var shouldGate = polyfill.flags.indexOf('gated') !== -1;

		var file = polyfillSource.file;
		var minifile = polyfillSource.minifile;

		if (shouldGate && polyfillSource.gatedFile) {
			file = polyfillSource.gatedFile;
			minifile = polyfillSource.miniGatedFile;
		}

		if (!options.minify) {
			explainerComment.push(
				'- ' + polyfill.name +
				', License: ' + (polyfillConfig.license || 'CC0')  + ' ' +
				((polyfill.aliasOf && polyfill.aliasOf.length) ? ' (required by ' + polyfill.aliasOf.join(',') + ')' : '')
			);
		}

		currentPolyfills[polyfill.name] = options.minify ? minifile : file;
	});

	// Build a graph sort to determine the order in which to output the polyfills, respecting dependencies
	var graph = tsort();
	for (var name in currentPolyfills) {
		var config = sources[name].config;
		if (config.dependencies) {
			for (var i = 0; i < config.dependencies.length; i++) {
				graph.add(config.dependencies[i], name);
			}
		} else {
			graph.add(name);
		}
	}

	// Using the graph order, build the completed polyfill bundle
	var builtPolyfillString = graph.sort().map(function(name) {
		return currentPolyfills[name];
	}).join('');

	return '/* ' + explainerComment.join('\n * ') + '\n */\n\n' + builtPolyfillString;
}

module.exports = {
	getPolyfills: getPolyfillString
};
