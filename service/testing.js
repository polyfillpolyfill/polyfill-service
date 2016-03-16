'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Modes:
 *   control:  All features are allowed, tests served, no polyfills
 *   all:      All features are allowed, tests and polyfills both served
 *   targeted: Only targeted features are allowed, tests and polyfills both served
 */

function createEndpoint(type, polyfillio) {
	const templateSrc = fs.readFileSync(path.join(__dirname, '/../test/browser/', type + '.html.handlebars'), {encoding: 'UTF-8'});
	const template = require('handlebars').compile(templateSrc);

	return (req, res) => {
		const mode = req.query.mode || 'all';
		const uaString = req.query.ua || req.header('user-agent');
		let featureListPromise;

		// Get the feature set for this test runner.  If in 'targeted' mode, allow filtering on UA, else force the feature to be included
		if (mode === 'targeted') {
			featureListPromise = polyfillio.getPolyfills({uaString, features: {all: {flags: []}} }).then(set => Object.keys(set));
		} else {
			featureListPromise = polyfillio.listAllPolyfills();
		}

		featureListPromise
			.then(featuresList => {

				// Filter for querystring args
				featuresList = featuresList.filter(featureName => (!req.query.feature || req.query.feature === featureName));

				// Fetch polyfill configs for all the features to be tested
				return Promise.all(featuresList.map(featureName => {
					return polyfillio.describePolyfill(featureName).then(config => ({[featureName]: config}) );
				})).then(featureObjs => Object.assign({}, ...featureObjs));
			})
			.then(polyfillSet => {

				// Eliminate those that are not testable or not public
				const polyfilldata = Object.keys(polyfillSet).reduce((acc, featureName) => {
					const baseDir = path.join(__dirname, '../polyfills');
					const config = polyfillSet[featureName];
					const detectFile = path.join(baseDir, config.baseDir, '/detect.js');
					const testFile = path.join(baseDir, config.baseDir, '/tests.js');
					const isTestable = !('test' in config && 'ci' in config.test && config.test.ci === false);
					const isPublic = featureName.indexOf('_') !== 0;

					if (isTestable && isPublic) {
						acc.push({
							feature: featureName,
							detect: fs.existsSync(detectFile) ? fs.readFileSync(detectFile, {encoding: 'utf-8'}).trim() : false,
							tests: fs.existsSync(testFile) ? fs.readFileSync(testFile) : false
						});
					}
					return acc;
				}, []);

				res.set('Cache-Control', 'no-store');
				res.send(template({
					loadPolyfill: (mode !== 'control'),
					forceAlways: (mode !== 'targeted'),
					features: polyfilldata,
					mode: mode
				}));
			})
			.catch(err => {
				console.log(err.stack || err);
			})
		;
	};
}

module.exports = {
	createEndpoint: createEndpoint
};
