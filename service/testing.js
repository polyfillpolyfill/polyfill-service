var fs = require('fs'),
	path = require('path');

/**
 * Modes:
 *   control:  All test, no polyfills
 *   all:      All tests, all polyfills
 *   targeted: UA targeted tests, UA targeted polyfills
 */

function createDirectorEndpoint(polyfillio) {
	return function (req, res) {
		var uaString = req.query.ua || req.header('user-agent');
		var mode = req.query.mode || 'all';
		var sendAllTests = false;

		if (mode === 'all' || mode === 'control') {
			sendAllTests = true;
		}

		var director = require('handlebars').compile(
			fs.readFileSync(path.join(__dirname, '/../test/browser/director.html'), { encoding: 'UTF-8' })
		);

		var allFeatures = polyfillio.getAllPolyfills().map(function(polyfillName) {
			return { name: polyfillName, flags: sendAllTests ?  ['always'] : [] };
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
			testFeaturesList: JSON.stringify(featureNameList)
		}));
	};
}

function createTestEndpoint(polyfillio) {
	return function(req, res) {
		var base = path.join(__dirname, '/../polyfills');
		var mode = req.query.mode  || 'all';
		var polyfilldata = [];
		var uaString = req.query.ua || req.header('user-agent');
		var features = [];

		// if sendAllTests = false  tests are targeted by UA instead.
		var sendAllTests = false;
		var targetPolyfills = false;
		var sendPolyfills = false;

		switch (mode) {
			case 'all':
				sendAllTests = true;
				sendPolyfills = true;
				break;
			case 'control':
				sendAllTests = true;
				sendPolyfills = false;
				break;
			case 'targeted':
				targetPolyfills = true;
				sendPolyfills = true;
				break;
		}

		// Get all the tests that should be run.
		features = polyfillio.getAllPolyfills().map(function(polyfillName) {
			return { name: polyfillName, flags: sendAllTests ? ['always']  : []};
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
		var polyfillFeatures = [];

		if (sendPolyfills) {
			// Polyfill data now contains all the tests that should be run. Next
			// figure out what we should polyfill
			var polyfillFlags = targetPolyfills ? [] : ['always'];
			var stringFlags = "";

			if (polyfillFlags.length > 0) {
				stringFlags = "|" + polyfillFlags.join('|');
			}

			var featuresToPolyfill = polyfilldata.map(function(feature) {
				return {
					name: feature.feature,
					flags: polyfillFlags
				};
			});

			polyfillFeatures = polyfillio.getPolyfills({
				uaString: uaString,
				features: featuresToPolyfill
			}).map(function(feature) {
				return feature.name + stringFlags;
			});

		}

		var runner = require('handlebars').compile(fs.readFileSync(path.join(__dirname, '/../test/browser/runner.html'), {encoding: 'UTF-8'}));
		res.set('Cache-Control', 'no-cache');
		res.send(runner({
			loadPolyfill: sendPolyfills,
			features: polyfilldata,
			polyfillFeatures: polyfillFeatures
		}));
	};
}

module.exports = {
	createDirectorEndpoint: createDirectorEndpoint,
	createTestEndpoint: createTestEndpoint
};
