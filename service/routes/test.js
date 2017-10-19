/* Endpoints for running the test framework */

'use strict';

const polyfillio = require('../../lib');
const express = require('express');
const fs = require('graceful-fs');
const path = require('path');
const denodeify = require('denodeify');
const readFile = denodeify(fs.readFile);

const router = express.Router(); // eslint-disable-line new-cap

/**
 * Modes:
 *   control:  All features are allowed, tests served, no polyfills
 *   all:      All features are allowed, tests and polyfills both served
 *   targeted: Only targeted features are allowed, tests and polyfills both served
 */

function createEndpoint(type, polyfillio) {
	const templateSrc = fs.readFileSync(path.join(__dirname, '/../../test/browser/', type + '.html.handlebars'), {encoding: 'UTF-8'});
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
					return polyfillio.describePolyfill(featureName)
						.then(config => {
							if (config.isTestable && config.isPublic) {
								let testsPromise = Promise.resolve([]);
								if (config.hasTests) {
									const baseDir = path.join(__dirname, '../../polyfills');
									const testFile = path.join(baseDir, config.baseDir, '/tests.js');
									testsPromise = readFile(testFile);
								}
								return testsPromise.then(tests => ({
									feature: featureName,
									detect: config.detectSource ? config.detectSource : false,
									tests
								}));
							}
						})
					;
				}));
			})
			.then(polyfilldata => {

				polyfilldata = polyfilldata.filter(obj => !!obj);
				polyfilldata.sort(function(a,b) {
					return (a.feature > b.feature) ? -1 : 1;
				});

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

router.use('/libs/mocha', express.static(path.dirname(require.resolve('mocha'))));
router.use('/libs/proclaim', express.static(path.dirname(require.resolve('proclaim'))));

router.get(/\/director\/?$/, createEndpoint('director', polyfillio));
router.get(/\/tests?\/?$/, createEndpoint('runner', polyfillio));

module.exports = router;
