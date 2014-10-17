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

	var pollTick = 1000;
	var retryLimit = 10;
	var sauceConnectPort = 4445;

	grunt.registerMultiTask('saucelabs', 'Perform tests on Sauce', function() {
		var gruntDone = this.async();
		var nameSuffix = process.env.TRAVIS_BUILD_NUMBER ? "-travis-build:" + process.env.TRAVIS_BUILD_NUMBER : ':' + (new Date()).toUTCString();
		var tunnelId = 'SauceTunnel-' + nameSuffix;

		if (!process.env.SAUCE_USER_NAME || !process.env.SAUCE_API_KEY) {
			gruntDone(new Error('SAUCE_USER_NAME and SAUCE_API_KEY must be set in the environment'));
		}

		var options = this.options({
			name: 'grunt-test' + nameSuffix,
			build: null,
			username: process.env.SAUCE_USER_NAME,
			key: process.env.SAUCE_API_KEY,
			browsers: [],
			url: {},
			concurrency: 3,
			tags: [],
			video: true,
			screenshots: true,
			cibuild: false
		});


		var batch = new Batch();
		batch.concurrency(options.concurrency);

		var tunnel = new SauceTunnel(options.username, options.key, tunnelId, true);

		// Create a new job to pass into the Batch runner, returns a function
		function newTestJob(url, urlName, conf) {
			return function testJob(done) {

				// Variadic like console.log(...);
				function log() {
					var leader = conf.browserName + "/" + conf.version + ": ";
					var args = Array.prototype.slice.call(arguments);
					args.unshift(leader);
					console.log.apply(null, args);
				}

				log("started job");

				var browser = wd.remote("127.0.0.1", sauceConnectPort, options.username, options.key);

				log("requested browser");

				browser.init(conf, function() {

					log("browser launched");

					browser.get(url, function(err) {
						var refreshed = false;
						var remainingCount = null;
						var retryCount = 0;

						if (err) {
							log(err);
							return done(err);
						}

						browser.refresh(function() {
							refreshed = true;
							log("kicked");
							setTimeout(waitOnResults, pollTick);
						});

						// Wait until results are available
						function waitOnResults() {
							browser.eval('{ results: window.global_test_results, remainingCount: window.remainingCount }', function(err, data) {

								if (!data.results) {
									if (data.remainingCount !== remainingCount) {
										remainingCount = data.remainingCount;
										retryCount = 0;
										log(remainingCount + ' test pages remaining');
									} else if (retryCount > retryLimit) {
										browser.quit();
										log('Timed out');
										done(null, { status: 'failed', uaString: data ? data.uaString || '??' : '??', id: browser.sessionID, name: conf.browserName, version: conf.version, failed: '??', total: '??'});
									} else {
										retryCount++;
										setTimeout(waitOnResults, pollTick);
									}
									return;
								}

								log("Results received, closing remote browser");

								// Close the browser as soon as we have the
								// results.  No need to keep it hanging around
								// until the rest of the job is complete.
								browser.quit();

								process.nextTick(function() {
									var status = 'passed';

									// Always show on Sauce as passed if not a cibuild
									if (!options.cibuild) {
										status = 'passed'
									} else {
										status = data.results && (data.results.failed > 0) ? 'failed' : 'passed';
									}

									done(null, {
										status: status,
										id: browser.sessionID,
										name: conf.browserName,
										version: conf.version,
										failed: data.results.failed || '??',
										total: data.results.total,
										uaString: data.results.uaString
									});
								});

								request({
									method: "PUT",
									uri: ["https://", options.username, ":", options.key, "@saucelabs.com/rest", "/v1/", options.username, "/jobs/", browser.sessionID].join(''),
									headers: {'Content-Type': 'application/json'},
									body: JSON.stringify({
										'custom-data': { custom: data },
										'passed': !data.results.failed
									})
								}, function (e, res, body) {
									if (!options.cibuild) {
										mkdirp(testResultsPath, function(err) {
											if (err) {
												throw err;
											}

											var file = path.join(testResultsPath, 'results.json');

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
													passed: data.results.passed,
													failed: data.results.failed,
													failingSuites: Object.keys(data.results.failingSuites),
													testedSuites: data.results.testedSuites
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
						};
					});
				});
			};
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
				console.log('Adding batch job for '+options.name+', '+urlName+' on '+conf.browserName+' '+conf.version);
			});
		});

		grunt.log.writeln('Opening tunnel to Sauce Labs');
		tunnel.start(function(status) {

			grunt.log.writeln("Tunnel Started");
			if (status !== true)  {
				gruntDone(status);
			}

			grunt.log.writeln("Starting test jobs");
			batch.end(function(err, status) {
				console.log("Jobs complete - stopping tunnel");
				tunnel.stop(function() {
					console.log('Sauce tunnel stopped');
					if (err) {
						gruntDone(err);
						return;
					}
					if (!options.cibuild) {
						gruntDone(null, true);
						return;
					}


					var failed = false;
					console.log("Failed tests:")
					status.forEach(function(state) {
						if (state.status === 'failed') {
							failed = true;
							console.log("--");
							console.log("Useragent string: ", state.uaString);
							console.log(state.name + "/" + state.version, ':', state.failed + '/' + state.total + ' failed - ' + 'https://saucelabs.com/tests/' + state.id);
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
