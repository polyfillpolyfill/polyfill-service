var express   = require('express');
	app       = express(),
	polyfills = require('./index'),
	useragent = require('useragent'),
	uglify    = require('uglify-js'),
	AliasResolver = require('./aliases');

var aliasResolver = new AliasResolver([
		function(polyfill) {
			var aliases = polyfills.aliases[polyfill.name];

			// If aliases exist, expand them adding aliasOf information to
			// each and tranferring the flags from the alias
			if (aliases) {
				return aliases.map(function(alias) {
					return {
						name: alias,
						flags: polyfill.flags,
						aliasOf: polyfill.name
					};
				});
			}

			return [polyfill];
		}
	]);

app.get(/^\/polyfill(\.\w+)(\.\w+)?/, function(req, res) {
	var ua = useragent.lookup(req.header('user-agent'));
	var requestedPolyfills = getRequestPolyfills(req);
	var minified =  req.params[0] === '.min'
	var extension = req.params[0];

	if (minified) {
		extension = req.params[1];
	}

	var explainerComment = [
		req.originalUrl,
		'Detected ' + ua.toAgent()
	];

	var polyFills = [];

	if (extension === '.js') {
		res.set('Content-Type', 'application/javascript');
	} else {
		res.set('Conent-Type', 'text/css');
	}

	requestedPolyfills.defaultPolyfills.forEach(function(polyfillInfo) {
		var polyfill = polyfills.source[polyfillInfo.name];
		if (!polyfill) {
			explainerComment.push(polyfillInfo.name + ' does not match any polyfills');
			return;
		}

		explainerComment.push(polyfillInfo.name + ' - ' + polyfillInfo.aliasOf + ' (LICENSE TODO)');
		polyFills.push(polyfill.file);
	});


	var builtExplainerComment = '/* ' + explainerComment.join('\n * ') + '\n */\n';
	var builtPolyfillString = polyFills.join('\n');

	if (minified) {
		builtPolyfillString = uglify.minify(builtPolyfillString, {fromString: true}).code;
	}

	res.send(builtExplainerComment + builtPolyfillString);
});

app.listen(3000);



function getRequestPolyfills(req) {
	var maybeQuery = req.query.maybe ? req.query.maybe.split(',') : [];
	var defaultQuery= req.query.default ? req.query.default.split(',') : [];

	var maybePolyfills = maybeQuery.map(parseQueryString);
	var defaultPolyfills = defaultQuery.map(parseQueryString);

	return {
		maybePolyfills: aliasResolver.resolve(maybePolyfills),
		defaultPolyfills: aliasResolver.resolve(defaultPolyfills)
	};
}

function parseQueryString(name) {
	var nameAndFlags = name.split('|');
	return {
		flags: nameAndFlags.slice(1),
		name: nameAndFlags[0],
		aliasOf: nameAndFlags[0]
	};
}
