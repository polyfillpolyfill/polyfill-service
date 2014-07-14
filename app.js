var polyfillio = require('./index'),
	express = require('express'),
	app = express();

'use strict';

var aliasResolver = AliasResolver.createDefault(polyfillio.aliases),
	port = 3000;


app.get(/^\/__about$/, function(req, res) {
	res.send("__about");
});

app.get(/^\/v1\/polyfill(\.\w+)(\.\w+)?/, function(req, res) {

	var firstParameter = req.params[0].toLowerCase(),
		minified =  firstParameter === '.min',
		fileExtension = minified ? req.params[1].toLowerCase() : firstParameter,
		maybePolyfills   = parseRequestedPolyfills(req.query.maybe || '', ['maybe']),
		defaultPolyfills = parseRequestedPolyfills(req.query["default"] || '');

	var polyfill = polyfillio.getPolyfills({
		polyfills: maybePolyfills.concat(defaultPolyfills) ,
		extension: fileExtension,
		minify: minified,
		uaString: req.header('user-agent'),
		url: req.originalUrl
	});

	if (fileExtension === '.js') {
		res.set('Content-Type', 'application/javascript');
	} else {
		res.set('Conent-Type', 'text/css');
	}

	res.set('Vary', 'User-Agent');
	res.send(polyfill);
});


app.listen(port);

function parseRequestedPolyfills(polyfillList, additionalFlags) {
	var list = polyfillList.split(',').filter(function(x) { return x.length; });
	additionalFlags = additionalFlags || [];

	return list.map(function parsePolyfillInfo(name) {
		var nameAndFlags = name.split('|');
		return {
			flags:   nameAndFlags.slice(1).concat(additionalFlags),
			name:    nameAndFlags[0],
			aliasOf: nameAndFlags[0]
		};
	});
}

