var express   = require('express');
	app       = express(),
	polyfills = require('./index'),
	useragent = require('useragent'),
	uglify    = require('uglify-js'),
	AliasResolver = require('./aliases'),
	lookupAgent = require('./agent');

// Load additional useragent features: primarily to use: agent.satisfies to
// test a browser version against a semver string
require('useragent/features');

var aliasResolver = AliasResolver.createDefault(polyfills);

app.get(/^\/polyfill(\.\w+)(\.\w+)?/, function(req, res) {
	var ua = useragent.lookup(req.header('user-agent')),
		requestedPolyfills = parseRequestedPolyfills(req),
		firstParameter = req.params[0].toLowerCase(),
		minified =  firstParameter === '.min',
		extension = minified ? req.params[1].toLowerCase() : firstParameter,
		uaFamily = lookupAgent(ua.family.toLowerCase());


	// Holds the strings that will be built into the explainer comment that is
	// placed before the polyfill code.
	var explainerComment = [
		req.originalUrl,
		'Detected ' + uaFamily + '/' + ua.toVersion()
	];

	// Holds the source code for each polyfill
	var currentPolyfills = {};

	if (extension === '.js') {
		res.set('Content-Type', 'application/javascript');
	} else {
		res.set('Conent-Type', 'text/css');
	}


	function includePolyfill(polyfill) {
		var polyfillSource = polyfills.sources[polyfill.name];
		if (!polyfillSource) {
			explainerComment.push(polyfillInfo.name + ' does not match any polyfills');
			return;
		}

		explainerComment.push(polyfill.name + ' - ' + polyfill.aliasOf + ' (LICENSE TODO)');
		currentPolyfills[polyfill.name] = polyfillSource.file;
	}

	requestedPolyfills.defaultPolyfills.forEach(includePolyfill);

	requestedPolyfills.maybePolyfills.forEach(function(polyfill) {
		var polyfillSource = polyfills.sources[polyfill.name];

		if (!polyfillSource) {
			explainerComment.push(polyfill.name + ' does not match any polyfills');
			return;
		}

		var polyfillConfig = polyfills.sources[polyfill.name].config;

		if (!(polyfillConfig && polyfillConfig.browsers)) {
			return;
		}

		var browserVersion = polyfillConfig.browsers[uaFamily];

		if (browserVersion) {
			var uaMatchesBrowser = ua.satisfies(browserVersion);

			if (uaMatchesBrowser) {
				includePolyfill(polyfill);
			}
		}
	});


	var builtExplainerComment = '/* ' + explainerComment.join('\n * ') + '\n */\n';
	var builtPolyfillString = Object.keys(currentPolyfills).map(function(polyfillName) { return currentPolyfills[polyfillName]; }).join('\n');

	if (minified) {
		builtPolyfillString = uglify.minify(builtPolyfillString, {fromString: true}).code;
	}

	res.send(builtExplainerComment + builtPolyfillString);
});

app.listen(3000);

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
