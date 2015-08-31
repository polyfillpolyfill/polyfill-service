var fs = require('fs');
var path = require('path');

/**
 * Modes:
 *   control:  All features are allowed, tests served, no polyfills
 *   all:      All features are allowed, tests and polyfills both served
 *   targeted: Only targeted features are allowed, tests and polyfills both served
 */

function createEndpoint(type, polyfillio) {
	var templateSrc = fs.readFileSync(path.join(__dirname, '/../test/browser/', type + '.html.handlebars'), {encoding: 'UTF-8'});
	var template = require('handlebars').compile(templateSrc);

	return function(req, res) {
		var mode = req.query.mode  || 'all';
		var uaString = req.query.ua || req.header('user-agent');
		var featureListPromise;

		// Get the feature set for this test runner.  If in 'targeted' mode, allow filtering on UA, else force the feature to be included
		if (mode === 'targeted') {
			featureListPromise = polyfillio.getPolyfills({ uaString: uaString, features: {all: {flags: []}} }).then(function(set) {
				return Object.keys(set);
			});
		} else {
			featureListPromise = polyfillio.listAllPolyfills();
		}

		featureListPromise
			.then(function(featuresList) {

				// Filter for querystring args
				featuresList = featuresList.filter(function(featureName) {
					return (!req.query.feature || req.query.feature === featureName);
				});

				// Fetch configs for all the features to be tested
				var polyfillSet = {};
				return Promise.all(featuresList.map(function(featureName) {
					return polyfillio.describePolyfill(featureName).then(function(config) {
						polyfillSet[featureName] = config;
					});
				})).then(function() {
					return polyfillSet;
				});
			})
			.then(function(polyfillSet) {
				var polyfilldata = [];

				// Eliminate those that are not testable or not public
				Object.keys(polyfillSet).forEach(function(featureName) {
					var config = polyfillSet[featureName];
					var detectFile = path.join(config.baseDir, '/detect.js');
					var testFile = path.join(config.baseDir, '/tests.js');
					var isTestable = !('test' in config && 'ci' in config.test && config.test.ci === false);
					var isPublic = featureName.indexOf('_') !== 0;

					if (!isTestable || !isPublic) return true;

					polyfilldata.push({
						feature: featureName,
						detect: fs.existsSync(detectFile) ? fs.readFileSync(detectFile, {encoding: 'utf-8'}).trim() : false,
						tests: fs.existsSync(testFile) ? fs.readFileSync(testFile) : false
					});
				});

				res.set('Cache-Control', 'no-store');
				res.send(template({
					loadPolyfill: (mode !== 'control'),
					forceAlways: (mode !== 'targeted'),
					features: polyfilldata,
					mode: mode
				}));
			})
			.catch(function(err) {
				console.log(err.stack || err);
			})
		;
	};
}

module.exports = {
	createEndpoint: createEndpoint
};
