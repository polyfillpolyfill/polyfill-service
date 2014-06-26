var fs = require('fs'),
	path = require('path');
	useragent = require('useragent'),
	uglify    = require('uglify-js'),
	AliasResolver = require('./aliases'),
	lookupAgent = require('./agent');

// Load additional useragent features: primarily to use: agent.satisfies to
// test a browser version against a semver string
require('useragent/features');

"use strict";

var polyfillSourceFolder = path.join(__dirname, 'source');

var sources = {},
	aliases = {};

fs.readdirSync(polyfillSourceFolder).forEach(function (polyfillName) {

	var config = require(path.join(polyfillSourceFolder, polyfillName, 'config.json')),
		polyfillSourcePath = path.join(polyfillSourceFolder, polyfillName, 'polyfill.js');

	// Read each file and store in a map for quick lookup
	sources[polyfillName] = {
		file: fs.readFileSync(polyfillSourcePath, 'utf8'),
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

	var includePolyfills = options.polyfills.forEach(function(polyfill) {
		var polyfillSource = sources[polyfill.name];

		if (!polyfillSource) {
			explainerComment.push('"' + polyfill.name + '" does not match any polyfills');
			return;
		}

		if (polyfill.flags.indexOf('maybe') !== -1) {
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
		currentPolyfills[polyfill.name] = polyfillSource.file;

	});

	var builtExplainerComment = '/* ' + explainerComment.join('\n * ') + '\n */\n';
	var builtPolyfillString = objectJoin(currentPolyfills, '\n');

	if (options.minified) {
		builtPolyfillString = uglify.minify(builtPolyfillString, {fromString: true}).code;
	}

	return builtExplainerComment + builtPolyfillString;
}

module.exports = {
	getPolyfills: getPolyfillString,
	aliases: aliases
};

/**
 * jQuery: isNumeric
 * https://github.com/jquery/jquery/blob/bbdfbb4ee859fe9319b348d88120ddc2c9efbd63/src/core.js#L212
 */
function isNumeric(obj) {
	return !Array.isArray(obj) && (((obj- parseFloat(obj)) + 1) >= 0);
}

/**
 * For each key in an object/hash map, join the value associated with the
 * key.  This allows you to perform a join operation over what is effectively
 * a set.
 *
 * Example:
 *
 * objectJoin({ x: 'A', y: 'B' }, ',');
 *
 * Result:
 * 'A,B'
 *
 * In Harmony (ES6) Just use 'Set':
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 */
function objectJoin(obj, joinString) {
	return Object.keys(obj).map(function(key) { return obj[key]; }).join(joinString);
}
