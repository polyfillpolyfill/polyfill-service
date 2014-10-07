'use strict';

module.exports = function(grunt) {

	var wd = require('wd');
	var Batch = require('batch');
	var request = require('request');
	var SauceTunnel = require('sauce-tunnel');
	var mkdirp = require('mkdirp');
	var path = require('path');
	var fs = require('fs');
	var testResultsPath = path.join(__dirname, '../test/results');
	var UA = require('../lib/UA');

	grunt.registerMultiTask('saucelabs', 'Perform tests on Sauce', function() {
		var gruntDone = this.async();
		var nameSuffix = process.env.TRAVIS_BUILD_NUMBER ? "-travis-build:" + process.env.TRAVIS_BUILD_NUMBER : ':' + (new Date()).toUTCString();
		var tunnelId = 'SauceTunnel-' + nameSuffix;

		var options = this.options({
			name: 'grunt-test' + nameSuffix,
			build: null,
			user: process.env.SAUCE_USER_NAME,
			key: process.env.SAUCE_API_KEY,
			browsers: [],
			url: {},
			concurrency: 3,
			tags: [],
			video: false,
			screenshots: false
		});


		var batch = new Batch();
		batch.concurrency(options.concurrency);

		var tunnel = new SauceTunnel(options.user, options.key, tunnelId, true);

		grunt.log.writeln('Opening tunnel to Sauce Labs');

		// Create a new job to pass into the Batch runner, returns a function
		function newTestJob(url, urlName, conf) {
			return function testJob(done) {

				// initialize remote connection to Sauce Labs
				var sauceConnectPort = 4445;
				var browser = wd.remote("127.0.0.1", sauceConnectPort, options.user, options.key);

				grunt.log.writeln('Initialising browser %s %s %s', conf.browserName, conf.version, conf.platform);
				browser.init(conf, function() {
					grunt.log.writeln('Running %s %s %s', conf.browserName, conf.version, conf.platform);

					grunt.log.writeln('Open %s', url);
					browser.get(url, function(err) {
						var retries = 0;
						if (err) return done(err);

						// Wait until results are available
						(function waitOnResults() {
							if (retries > 5) {
								done('Could not run on browser ' + conf.browserName + ', ' + conf.version);
								return;
							}

							browser.eval('window.global_test_results', function(err, data) {

								if (!data) {
									browser.refresh(function(err) {
										retries++;
										setTimeout(waitOnResults, 1500);
									});

									return;
								}

								if (err) return done(err);

								browser.quit();
								process.nextTick(function() { done(null, true); });

								request({
									method: "PUT",
									uri: ["https://", options.user, ":", options.key, "@saucelabs.com/rest", "/v1/", options.user, "/jobs/", browser.sessionID].join(''),
									headers: {'Content-Type': 'application/json'},
									body: JSON.stringify({
										'custom-data': { custom: data },
										'passed': !data.failed
									})
								}, function (err, res, body) {
									mkdirp(testResultsPath, function(err) {
										if (err) {
											throw err;
										}

										var file = path.join(testResultsPath, 'results.json')

										fs.readFile(file, function(err, filedata) {
											if (err) {
												// If ENOENT, continue as
												// writeFile will create
												// it
												if (err.code !== 'ENOENT') {
													throw err;
												}
											}

											var testResults  = filedata ? JSON.parse(filedata) : {};
											var browserName = UA.normalizeName(conf.browserName) || conf.browserName;

											if (!testResults[browserName]) {
												testResults[browserName] = {};
											}

											if (!testResults[browserName][conf.version]) {
												testResults[browserName][conf.version]	= {};
											}

											testResults[browserName][conf.version][urlName] = {
												passed: data.passed,
												failed: data.failed,
												failingSuites: Object.keys(data.failingSuites),
												testedSuites: data.testedSuites
											};

											fs.writeFile(file, JSON.stringify(testResults, null, 2), function(err) {
												if (err) {
													throw err;
												}
											});
										});
									});
								});
							});
						}());
					});
				});
			};
		}

		tunnel.start(function(status) {

			grunt.log.writeln("Tunnel Started");
			if (status !== true)  {
				gruntDone(status);
			}


			options.browsers.forEach(function(conf) {
				conf['name'] = options.name;
				conf['record-video'] = options.video;
				conf['record-screenshots'] = options.screenshots;
				conf['tunnel-identifier'] = tunnelId;
				if (options.tags) conf['tags'] = options.tags;
				if (options.build) conf['build'] = options.build;

				Object.keys(options.urls).forEach(function(urlName) {
					var url = options.urls[urlName];
					batch.push(newTestJob(url, urlName, conf));
				});
			});

			grunt.log.writeln("Starting test jobs");
			batch.end(function(err, status) {
				tunnel.stop(function() {
					gruntDone(null, true);
				});
			});
		});
	});
};
