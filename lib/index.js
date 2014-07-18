var fs = require('fs'),
	path = require('path');
	useragent = require('useragent'),
	uglify    = require('uglify-js'),
	tsort     = require('tsort'),
	AliasResolver = require('./aliases'),
	lookupAgent = require('./agent');

// Load additional useragent features: primarily to use: agent.satisfies to
// test a browser version against a semver string
require('useragent/features');

"use strict";

var polyfillSourceFolder = path.join(__dirname, '../polyfills');

var sources = {},
	aliases = {};

fs.readdirSync(polyfillSourceFolder).forEach(function (polyfillName) {

	var polyfillPath = path.join(polyfillSourceFolder, polyfillName),
		configPath   = path.join(polyfillPath, 'config.json');

	if (!fs.existsSync(polyfillPath) || !fs.existsSync(configPath)) {
		return;
	}

	var config = require(configPath),
		polyfillSourcePath = path.join(polyfillPath, 'polyfill.js'),
		fileContents = fs.readFileSync(polyfillSourcePath, 'utf8');

	// Read each file and store in a map for quick lookup
	sources[polyfillName] = {
		file: fileContents,
		minifile: uglify.minify(fileContents, {fromString: true}).code,
		config: config
	};

	// Store alias names in a map for efficient lookup, mapping aliases to
	// polyfillNames.  An alias can map to many polyfill names. So a group
	// of polyfills can be aliased under the same name.  This is why an
	// array is created and used for the value in the map.
	config.aliases = config.aliases || [];
	config.aliases.forEach(function(aliasName) {
		if (aliases[aliasName]) {
			aliases[aliasName].push(polyfillName);
		} else {
			aliases[aliasName] = [ polyfillName ];
		}
	});
});

var aliasResolver = AliasResolver.createDefault(aliases);

function getPolyfillString(options) {
	var ua = useragent.lookup(options.uaString),
		uaFamily = lookupAgent(ua.family.toLowerCase()),
		explainerComment = [
			options.url,
			'Detected ' + uaFamily + '/' + ua.toVersion()
		],
		currentPolyfills = {};

	// Browsers don't really use semantic versioning but tend to at least
	// have a major and minor version.  This normalises the patch version so that
	// semantic version comparison is consistent.
	if (!isNumeric(ua.patch)) {
		ua.patch = '0';
	}

	var expandedPolyfillList = aliasResolver.resolve(options.polyfills);

	expandedPolyfillList.forEach(function(polyfill) {
		var polyfillSource = sources[polyfill.name];

		if (!polyfillSource) {
			explainerComment.push('"' + polyfill.name + '" does not match any polyfills');
			return;
		}

		var alwaysInclude = polyfill.flags.indexOf('always') !== -1;

		if (!alwaysInclude) {
			var polyfillConfig = polyfillSource.config,
				browsersConfigured = polyfillConfig && polyfillConfig.browsers;

			if (!(browsersConfigured)) {
				return;
			}

			var browserVersion = polyfillConfig.browsers[uaFamily];
			if (!(browserVersion && ua.satisfies(browserVersion))) {
				return;
			}
		}

		explainerComment.push(polyfill.name + ' - ' + polyfill.aliasOf + ' (LICENSE TODO)');
		currentPolyfills[polyfill.name] = options.minify ? polyfillSource.minifile : polyfillSource.file;
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

	return builtExplainerComment + builtPolyfillString;
}

module.exports = {
	getPolyfills: getPolyfillString
};

/**
 * jQuery: isNumeric
 * https://github.com/jquery/jquery/blob/bbdfbb4ee859fe9319b348d88120ddc2c9efbd63/src/core.js#L212
 */
function isNumeric(obj) {
	return !Array.isArray(obj) && (((obj- parseFloat(obj)) + 1) >= 0);
}
