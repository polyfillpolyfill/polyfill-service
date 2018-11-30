"use strict";

module.exports = function (config) {
	async function respondWithPolyfillBundle(request, response) {
		const PolyfillLibrary = require("../../lib/index.js");
		const polyfillio = new PolyfillLibrary();
		const params = {
			features: {
				[config.feature.split('polyfills/')[1].replace(/\//g, '.')]: {
					flags: new Set()
				}
			},
			minify: false,
			stream: false,
			uaString: request.headers["user-agent"]
		};
		const bundle = await polyfillio.getPolyfillString(params);
		response.setHeader("Content-Type", "application/javascript; charset=utf-8");

		response.writeHead(200);
		response.end(bundle);
	}
	const path = require('path');
	config.set({
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: path.resolve(process.cwd(), config.feature),

		browserDisconnectTimeout: 60 * 1000, // default 2000
		browserDisconnectTolerance: 3, // default 0
		browserNoActivityTimeout: 60 * 1000, // default 10000

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// list of files / patterns to load in the browser
		files: [
			"polyfill.js",
			"https://cdn.jsdelivr.net/npm/proclaim@3.6.0/lib/proclaim.js",
			"tests.js"
		],

		frameworks: ["mocha"],

		// web server port
		port: 9876,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,
		plugins: [
			'karma-mocha',
			'karma-mocha-reporter',
			'karma-browserstack-launcher',
			'karma-summary-optional-console-reporter',
			{
				'middleware:polyfillBundle': ['factory', function polyfillBundleMiddlewareFactory( /* config */ ) {
					return async function polyfillBundleMiddleWare(request, response, next) {
						if (!request.url.startsWith('/base/polyfill.js')) {
							next();
						} else {
							await respondWithPolyfillBundle(request, response);
						}
					};
				}]
			}
		],
		mochaReporter: {
			output: 'minimal'
		},
		reporters: ['mocha'],
		beforeMiddleware: ['polyfillBundle']
	});
};
