var express   = require('express');
	app       = express(),
	polyfills = require('./index'),
	useragent = require('useragent'),
	uglify    = require('uglify-js'),
	AliasResolver = require('./aliases'),
	lookupAgent = require('./agent');

'use strict';

// Load additional useragent features: primarily to use: agent.satisfies to
// test a browser version against a semver string
require('useragent/features');

var aliasResolver = AliasResolver.createDefault(polyfills),
	port = 3000;

app.get(/^\/polyfill(\.\w+)(\.\w+)?/, function(req, res) {
	var ua = useragent.lookup(req.header('user-agent')),
		requestedPolyfills = parseRequestedPolyfills(req),
		firstParameter = req.params[0].toLowerCase(),
		minified =  firstParameter === '.min',
		extension = minified ? req.params[1].toLowerCase() : firstParameter,
		uaFamily = lookupAgent(ua.family.toLowerCase()),

		// Holds the strings that will be built into the explainer comment that is
		// placed before the polyfill code.
		explainerComment = [
			req.originalUrl,
			'Detected ' + uaFamily + '/' + ua.toVersion()
		],

		// Holds the source code for each polyfill that should be sent to the
		// client
		currentPolyfills = {};

	// Browsers don't really use semantic versioning but tend to at least
	// have a major and minor version.  This normalises the patch version so that
	// semantic version comparison is consistent.
	if (!isNumeric(ua.patch)) {
		ua.patch = '0';
	}

	if (extension === '.js') {
		res.set('Content-Type', 'application/javascript');
	} else {
		res.set('Conent-Type', 'text/css');
	}

	// Filter out polyfills that do not match the browser version in the UA
	// with their config
	var includePolyfills = requestedPolyfills.maybePolyfills.filter(function(polyfill) {

		if (!polyfills.sources[polyfill.name]) {
			explainerComment.push(polyfill.name + ' does not match any polyfills');
			return false;
		}

		var polyfillConfig = polyfills.sources[polyfill.name].config;

		if (!(polyfillConfig && polyfillConfig.browsers)) {
			return false;
		}


		var browserVersion = polyfillConfig.browsers[uaFamily];
		if (browserVersion && ua.satisfies(browserVersion)) {
			return true;
		}

		return false;
	});

	includePolyfills = includePolyfills.concat(requestedPolyfills.defaultPolyfills);

	includePolyfills.forEach(function(polyfill) {
		var polyfillSource = polyfills.sources[polyfill.name];
		if (!polyfillSource) {
			explainerComment.push(polyfill.name + ' does not match any polyfills');
			return;
		}

		explainerComment.push(polyfill.name + ' - ' + polyfill.aliasOf + ' (LICENSE TODO)');
		currentPolyfills[polyfill.name] = polyfillSource.file;
	});

	var builtExplainerComment = '/* ' + explainerComment.join('\n * ') + '\n */\n';
	var builtPolyfillString = objectJoin(currentPolyfills, '\n');

	if (minified) {
		builtPolyfillString = uglify.minify(builtPolyfillString, {fromString: true}).code;
	}

	res.send(builtExplainerComment + builtPolyfillString);
});

app.listen(port);

function parseRequestedPolyfills(req) {
	var maybeQuery       = req.query.maybe   ? req.query.maybe.split(',')   : [],
		defaultQuery     = req.query.default ? req.query.default.split(',') : [],
		maybePolyfills   = maybeQuery.map(parsePolyfillInfo),
		defaultPolyfills = defaultQuery.map(parsePolyfillInfo);

	return {
		maybePolyfills: aliasResolver.resolve(maybePolyfills),
		defaultPolyfills: aliasResolver.resolve(defaultPolyfills)
	};
}

function parsePolyfillInfo(name) {
	var nameAndFlags = name.split('|');
	return {
		flags:   nameAndFlags.slice(1),
		name:    nameAndFlags[0],
		aliasOf: nameAndFlags[0]
	};
}

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
