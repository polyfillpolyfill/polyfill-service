"use strict";

function getBrowsersFor(feature) {
	const path = require('path');
	const UA = require('./../../lib/UA');

	// Grab all the browsers from BrowserStack which are officially supported by the polyfil service.
	const browserlist = require("./../../../polyfill-service/tasks/node/browsers.json");
	const browserstackBrowsers = require('./../../../polyfill-service/tasks/node/browserstackBrowsers.json');

	const browsersWeSupport = browserlist.filter(uaString => new UA(uaString).meetsBaseline());
	const browsersWeSupportForThisFeature = browsersWeSupport.filter(uaString => {
		const meta = require(path.resolve(process.cwd(), feature, 'config.json'));
		const ua = new UA(uaString);
		const isBrowserMatch = meta.browsers && meta.browsers[ua.getFamily()] && ua.satisfies(meta.browsers[ua.getFamily()]);
		return isBrowserMatch;
	});

	function useragentToBrowserObj(browserWithVersion) {
		const [browser, version] = browserWithVersion.split("/");
		const browserObj = browserstackBrowsers.find(browserObject => {
			if (browser === browserObject.os && version === browserObject.os_version) {
				return true;
			} else if (browser === browserObject.browser && version === browserObject.browser_version) {
				return true;
			} else {
				return false;
			}
		});

		if (browserObj) {
			return Object.assign({
				name: browserWithVersion.replace(/\//g, '-').replace(/\./g, '_'),
				base: 'BrowserStack'
			}, browserObj);
		} else {
			throw new Error(`Browser: ${browser} with version ${version} was not found on BrowserStack.`);
		}
	}

	const browsersWeSupportInBrowserStack = browsersWeSupportForThisFeature.map(useragentToBrowserObj).reduce(function (acc, cur) {
		acc[cur.name] = cur;
		return acc;
	}, {});

	return browsersWeSupportInBrowserStack;
}

module.exports = function (config) {
	if (!config.feature) {
		console.error('The polyfill-library test-runner requires `--feature` to be set to the path of the feature being tested. E.G. `npm run test-feature -- --feature=./polyfills/Array/from`');
		process.exit(1);
	}
	require('./karma-default-config')(config);

	const browsers = getBrowsersFor(config.feature);

	config.set({
		browserStack: {
			startTunnel: true
		},
		reporters: ['mocha', 'summary-optional-console', 'BrowserStack'],
		summaryOptionalConsoleReporter: {
			// 'failed', 'skipped' or 'all'
			show: 'failed',
			// Limit the spec label to this length
			specLength: 50,
			// Show an 'all' column as a summary
			overviewColumn: false,
			// Print console log/error messages
			consoleLogs: true,
			// Print a summary line for each browser
			browserSummary: true
		},
		concurrency: 5,

		customLaunchers: browsers,

		browsers: Object.keys(browsers)
	});
};
