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
			username: process.env.SAUCE_USER_NAME,
			key: process.env.SAUCE_API_KEY,
			browsers: [],
			url: {},
			concurrency: 3,
			tags: [],
			video: false,
			screenshots: false,
			cibuild: false
		});


		var batch = new Batch();
		batch.concurrency(options.concurrency);

		var tunnel = new SauceTunnel(options.username, options.key, tunnelId, true);


		// Create a new job to pass into the Batch runner, returns a function
		function newTestJob(url, urlName, conf) {
			return function testJob(done) {

				// initialize remote connection to Sauce Labs
				var sauceConnectPort = 4445;
				var browser = wd.remote("127.0.0.1", sauceConnectPort, options.username, options.key);

				browser.init(conf, function() {

					browser.get(url, function(err) {

						if (err) {
							console.log(err);
							return done(err);
						}

						// Wait until results are available
						setTimeout(function waitOnResults() {

							browser.eval('window.global_test_results', function(err, data) {

								if (!data) {
									browser.refresh(function(err) {
										setTimeout(waitOnResults, 1500);
									});

									return;
								}

								if (err) {
									console.log(err);
									return done(err);
								}

								browser.quit();
								process.nextTick(function() {
									if (!options.cibuild) {
										done(null, { status: 'ok' });
									} else {
										done(null, {
											status: data.failed > 0 ? 'failed' : 'passed',
											id: browser.sessionID,
											name: conf.browserName,
											version: conf.version
										});
									}
								});

								request({
									method: "PUT",
									uri: ["https://", options.username, ":", options.key, "@saucelabs.com/rest", "/v1/", options.username, "/jobs/", browser.sessionID].join(''),
									headers: {'Content-Type': 'application/json'},
									body: JSON.stringify({
										'custom-data': { custom: data },
										'passed': !data.failed
									})
								}, function (err, res, body) {
									if (!options.cibuild) {
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
														console.log(err);
														throw err;
													}
												});
											});
										});
									}
								});
							});
						}, 5000);
					});
				});
			};
		}

		grunt.log.writeln('Opening tunnel to Sauce Labs');
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
					var failed = false;
					console.log("Failed tests:")
					status.forEach(function(state) {
						if (state.status === 'failed') {
							failed = true;
							console.log(state.name, "/", state.version, ': https://saucelabs.com/tests/' + state.id);
						}
					});

					if (!failed) {
						console.log("No failed tests");
					}

					gruntDone(!failed, failed);
				});
			});
		});
	});
};
