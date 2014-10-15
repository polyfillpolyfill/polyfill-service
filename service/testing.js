var fs = require('fs'),
	path = require('path');

function createDirectorEndpoint(polyfillio) {
	return function (req, res) {
		var uaString = req.query.ua || req.header('user-agent');
		var mode = req.query.mode || 'control';

		var director = require('handlebars').compile(
			fs.readFileSync(path.join(__dirname, '/../test/browser/director.html'), {encoding: 'UTF-8'})
		);

		var allFeatures = polyfillio.getAllPolyfills().map(function(polyfillName) {
			return { name: polyfillName, flags: req.query.configuredonly ?  [] : ['always'] };
		});

		var featureNameList = polyfillio.getPolyfills({
			uaString: uaString,
			features: allFeatures
		}).map(function(feature) {
			return feature.name;
		});

		res.set('Content-Type', 'text/html');
		res.set('Cache-Control', 'no-cache');

		res.send(director({
			featuresList: JSON.stringify(featureNameList)
		}));
	};
}

function createTestEndpoint(polyfillio) {
	return function(req, res) {
		var base = path.join(__dirname, '/../polyfills');
		var polyfilldata = [];
		var uaString = req.query.ua || req.header('user-agent');
		var features = [];

		features = polyfillio.getAllPolyfills().map(function(polyfillName) {
			return { name: polyfillName, flags: req.query.configuredonly ?  [] : ['always'] };
		});

		var featureList = polyfillio.getPolyfills({
			uaString: uaString,
			features: features
		});

		featureList.forEach(function (feature) {
			var featureName = feature.name;
			var polyfillPath = path.join(base, featureName);

			if (!req.query.feature || req.query.feature === featureName) {
				var detectFile = path.join(polyfillPath, '/detect.js');
				var testFile = path.join(polyfillPath, '/tests.js');
				polyfilldata.push({
					feature: featureName,
					detect: fs.existsSync(detectFile) ? fs.readFileSync(detectFile, {encoding: 'utf-8'}).trim() : false,
					tests: fs.existsSync(testFile) ? fs.readFileSync(testFile) : false
				});
			}
		});

		var runner = require('handlebars').compile(fs.readFileSync(path.join(__dirname, '/../test/browser/runner.html'), {encoding: 'UTF-8'}));
		res.set('Cache-Control', 'no-cache');
		res.send(runner({
			loadPolyfill: !req.query.nopolyfill,
			features: polyfilldata
		}));
	};
}

module.exports = {
	createDirectorEndpoint: createDirectorEndpoint,
	createTestEndpoint: createTestEndpoint
};
