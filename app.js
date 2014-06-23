var express   = require('express');
	app       = express(),
	polyfills = require('./index'),
	useragent = require('useragent'),
	AliasResolver = require('./aliases');

var aliasResolver = new AliasResolver([
		function(name) {
			return polyfills.aliases[name] || [name];
		}
	]);

app.get(/^\/polyfill\.(\w+)/, function(req, res) {
	var ua = useragent.lookup(req.header('user-agent'));
	var requestedPolyfills = getRequestPolyfills(req);
	var readableUAString = ua.family + ' ' + ua.major +'.' + ua.minor + '.' + ua.patch;

	var explainerComment = [
		req.originalUrl,
		'Detected ' + readableUAString
	];

	var polyFills = [];

	if (requestedPolyfills.fileExtension === 'js') {
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


		explainerComment.push(polyfillInfo.name + ' - Reason TODO (LICENSE TODO)');
		polyFills.push(polyfill.file);
	});


	var builtExplainerComment = '/* ' + explainerComment.join('\n * ') + '\n */\n';
	var builtPolyfillString = polyFills.join('\n');
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
		defaultPolyfills: aliasResolver.resolve(defaultPolyfills),
		fileExtension: req.params[0]
	};
}

function parseQueryString(name) {
	var nameAndFlags = name.split('|');
	return {
		flags: nameAndFlags.slice(1),
		name: nameAndFlags[0]
	};
}
