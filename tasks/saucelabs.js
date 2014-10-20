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
					var leader = (new Date()).toString() + ' ' + conf.browserName + "/" + conf.version + ": ";
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
							browser.eval('window.global_test_results ||  window.remainingCount', function(err, data) {

								if (typeof data !== 'object') {
									if (retryCount > retryLimit) {
										log('Timed out');
										browser.quit();
										done(null, { status: 'failed', uaString: (typeof data == 'object') ? (data.uaString || '??') : '??', id: browser.sessionID, name: conf.browserName, version: conf.version, failed: '??', total: '??'});
									} else {
										if (typeof data === 'number' && data !== remainingCount) {
											remainingCount = data;
											retryCount = 0;
											log(remainingCount + ' test pages remaining');
										} else {
											retryCount++;
											log('no changes, waiting');
										}
										setTimeout(waitOnResults, pollTick);
									}
									return;
								}

								log("results received, closing remote browser");

								// Close the browser as soon as we have the
								// results.  No need to keep it hanging around
								// until the rest of the job is complete.
								browser.quit();

								process.nextTick(function() {
									done(null, {
										id: browser.sessionID,
										browserName: conf.browserName,
										version: conf.version,
										urlName: urlName,
										results: data
									});
								});

								request({
									method: "PUT",
									uri: ["https://", options.username, ":", options.key, "@saucelabs.com/rest", "/v1/", options.username, "/jobs/", browser.sessionID].join(''),
									headers: {'Content-Type': 'application/json'},
									body: JSON.stringify({
										'custom-data': { custom: data },
										'passed': !data.failed
									})
								});
							});
						};
					});
				});
			};
		}

		function readResultsFile(cb) {
			var file = path.join(testResultsPath, 'results.json');
			mkdirp(testResultsPath, function(err) {
				if (err) {
					grunt.warn('Cannot write test results - '+testResultsPath+' cannot be written');
					cb({});
				} else {
					fs.readFile(file, function(err, filedata) {
						if (err) {
							// If ENOENT, continue as writeFile will create it later
							if (err.code !== 'ENOENT') {
								throw err;
							}
						}
						cb(filedata ? JSON.parse(filedata) : {});
					});
				}
			});
		}

		function writeResultsFile(data) {
			var file = path.join(testResultsPath, 'results.json');
			fs.writeFile(file, JSON.stringify(data, null, 2), function(err) {
				if (err) {
					console.log(err);
					throw err;
				}
			});
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

		readResultsFile(function(testResults) {

			grunt.log.writeln('Opening tunnel to Sauce Labs');
			tunnel.start(function(status) {

				grunt.log.writeln("Tunnel Started");
				if (status !== true)  {
					gruntDone(status);
				}

				grunt.log.writeln("Starting test jobs");
				batch.end(function(err, jobresults) {
					tunnel.stop(function() {
						var passingUAs = [];
						var failed = false;
						grunt.log.writeln('Sauce tunnel stopped');
						if (err) {
							gruntDone(err);
							return;
						}
						grunt.log.writeln("Failed tests:")
						jobresults.forEach(function(job) {
							if (job.results.failed && job.results.failingSuites) {
								grunt.log.writeln(' - '+job.browserName+' '+job.version+' (Sauce results: https://saucelabs.com/tests/' + job.id+')')
								Object.keys(job.results.failingSuites).forEach(function(feature) {
									var url = options.urls[job.urlName].replace(/test\/director/, 'test/tests')+'&feature='+feature;
									grunt.log.writeln('    -> '+feature);
									grunt.log.writeln('       '+url);
								});
								failed = true;
							} else {
								passingUAs.push(job.browserName+'/'+job.version);
							}

							var browserName = UA.normalizeName(job.browserName) || job.browserName;

							if (!testResults[browserName]) {
								testResults[browserName] = {};
							}

							if (!testResults[browserName][job.version]) {
								testResults[browserName][job.version]	= {};
							}

							testResults[browserName][job.version][job.urlName] = {
								passed: job.results.passed,
								failed: job.results.failed,
								failingSuites: job.results.failingSuites ? Object.keys(job.results.failingSuites) : [],
								testedSuites: job.results.testedSuites
							};
						});
						if (passingUAs.length) {
							console.log('No failures in: '+passingUAs.join(', '));
						}

						writeResultsFile(testResults);

						process.nextTick(function() {

							// Always report the grunt task as successful if not running as CI
							if (!options.cibuild) {
								gruntDone(null, true);
							} else {
								gruntDone(!failed, failed);
							}
						});
					});
				});
			});
		});
	});
};
