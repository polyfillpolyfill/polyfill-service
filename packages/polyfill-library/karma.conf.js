"use strict";

const path = require('path');
const karmaPolyfillLibraryPlugin = require('./karma-polyfill-library-plugin');
const globby = require('globby');

const proclaim = path.resolve(require.resolve('proclaim'));

function getBrowsersFor(feature) {
	const UA = require('./lib/UA');

	// Grab all the browsers from BrowserStack which are officially supported by the polyfil service.
	const browserlist = require("./../polyfill-service/tasks/node/browsers.json");
	const browserstackBrowsers = require('./../polyfill-service/tasks/node/browserstackBrowsers.json');

	const browsersWeSupport = browserlist.filter(uaString => new UA(uaString).meetsBaseline());
	const browsersWeSupportForThisFeature = browsersWeSupport.filter(uaString => {
		const meta = require(path.resolve(__dirname, 'polyfills', feature, 'config.json'));
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

function generateKarmaConfigTestFiles(config) {
	let features = config.features;
	features = features.split(',');
	features = features.map(feature => feature.trim());
	features = features.map(feature => feature.replace(/\./g, path.sep));
	features = features.map(feature => path.join(__dirname, './polyfills', feature, 'tests.js'));

	const featureTests = globby.sync(features);

	return featureTests.map(createKarmaFileObject);
}

function createKarmaFileObject(filePattern) {
	return {
		pattern: filePattern,
		included: true,
		served: true,
		watched: false
	};
}

module.exports = function (config) {
	if (!config.features) {
		console.error('Missing the `--features` flag. `--features` needs to be set to the names of the features being tested. E.G. `npm run test-feature -- --features=Array.from,Array.prototype.forEach`');
		process.exit(1);
	}

	config.set({
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,
		browserDisconnectTimeout: 60 * 1000, // default 2000
		browserDisconnectTolerance: 5, // default 0
		browserNoActivityTimeout: 60 * 1000, // default 10000
		browserSocketTimeout: 60 * 1000, // default 20000
		// enable / disable colors in the output (reporters and logs)
		colors: true,
		// list of files / patterns to load in the browser
		files: [
			proclaim,
			...generateKarmaConfigTestFiles(config)
		],

		beforeMiddleware: ['polyfill-library'],
		
		// We need to add mocha after polyfill-library to ensure that the scripts loaded in the browser are in the correct order.
		// TODO: This is really a bug in the Symbol polyfill that we should fix, which is that it adds enumerable properties onto Object.prototype which gets exposed in `for (var o in {})`.
		frameworks: [
			"polyfill-library",
			"mocha"
		],
		reporters: ['mocha'],
		mochaReporter: {
			output: 'minimal'
		},

		// web server port
		port: 9876,

		plugins: [
			'karma-mocha',
			'karma-mocha-reporter',
			karmaPolyfillLibraryPlugin,
			'karma-summary-optional-console-reporter'
		],
		logLevel: config.LOG_WARN,
		client: {
			mocha: {
			  opts: 'mocha.opts',
			  // change Karma's debug.html to the mocha web reporter so we can see the test results in page instead of in the console
			  reporter: 'html'
			}
		},
		// Run the tests inside a new window instead of in an iFrame
		useIframe: false
	});

	if (config.browserstack) {
		let features = config.features.split(',');
		features = features.map(feature => feature.trim());
		const browsers = getBrowsersFor(features[0].replace(/\./g, path.sep));
		config.set(Object.assign(config,{
			// if true, Karma captures browsers, runs the tests and exits
			singleRun: true,
			plugins: config.plugins.concat([
				'karma-browserstack-launcher'
			]),
			browserStack: {
				startTunnel: true
			},
			reporters: config.reporters.concat(['summary-optional-console', 'BrowserStack']),
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
		}));
	}
};
