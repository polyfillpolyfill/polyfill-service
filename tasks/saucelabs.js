'use strict';

var promiseTimeout = function(time) {
	return new Promise(function (resolve, reject) {
		setTimeout(function() {
			resolve();
		}, time);
	});
};

module.exports = function(grunt) {

	var wd = require('wd');
	var Batch = require('batch');
	var SauceTunnel = require('sauce-tunnel');
	var mkdirp = require('mkdirp');
	var path = require('path');
	var fs = require('fs');
	var testResultsPath = path.join(__dirname, '../test/results');
	var UA = require('../lib/UA');

	var pollTick = 1000;
	var retryLimit = 50;
	var sauceConnectPort = 4445;

	grunt.registerMultiTask('saucelabs', 'Perform tests on Sauce', function() {
		var gruntDone = this.async();
		var nameSuffix = process.env.TRAVIS_BUILD_NUMBER ? "-travis-build:" + process.env.TRAVIS_BUILD_NUMBER : ':' + (new Date()).toUTCString();
		var tunnel;
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

		options.browsers = options.browsers.map(function(b) {
			return {browserName:b[0], version:b[1], platform:b[2]};
		});


		var batch = new Batch();
		batch.concurrency(options.concurrency);
		batch.throws(false);

		// Create a new job to pass into the Batch runner, returns a function
		function newTestJob(url, urlName, conf) {
			return function testJob() {

				// Variadic like console.log(...);
				function log() {
					var leader = (new Date()).toString() + ' ' + conf.browserName + "/" + conf.version + ": ";
					var args = Array.prototype.slice.call(arguments);
					args.unshift(leader);
					grunt.log.writeln.apply(grunt.log, args);
				}

				var browser = wd.promiseRemote("127.0.0.1", sauceConnectPort, options.username, options.key);

				function waitOnResults() {
					return browser.eval('window.global_test_results || window.remainingCount');
				}
				function processResults(data) {
					var remainingCount = null;
					var retryCount = 0;

					// Result polling code
					if (typeof data !== 'object' || data === null) {
						if (retryCount > retryLimit) {
							log('Timed out');
							browser.quit();
							throw new Error('Timeout waiting on ' + conf.browserName + '/' +conf.version);
						}

						if (typeof data === 'number' && data !== remainingCount) {
							remainingCount = data;
							retryCount = 0;
							log(remainingCount + ' test pages remaining');
						} else {
							retryCount++;
							log('no changes, waiting');
						}

						// Recurse waitOnResults and processResults
						return promiseTimeout(pollTick).then(waitOnResults).then(processResults);
					}

					log("results received (" + data.passed + " passed, " + data.failed + " failed), closing remote browser");

					// Close the browser as soon as we have the
					// results.  No need to keep it hanging around
					// until the rest of the job is complete.
					browser.quit();
					log("Browser closing");

					return {
						id: browser.sessionID,
							browserName: conf.browserName,

							version: conf.version,
							urlName: urlName,
							results: data
					};
				}

				log("requested browser");

				return browser.init(conf).then(function() {
					log("browser launched");

					return browser.get(url).then(function() {
						return browser.refresh();
					}).then(function() {
						log("kicked");

						// Once refreshed, wait `pollTick` before continuing
						return promiseTimeout(pollTick);
					}).then(waitOnResults).then(processResults);
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
						cb((filedata && filedata.length) ? JSON.parse(filedata) : {});
					});
				}
			});
		}

		function writeResultsFile(data) {
			var file = path.join(testResultsPath, 'results.json');
			var output = JSON.stringify(data, null, 2);
			console.log('Wrote '+output.length+' bytes to result file');
			fs.writeFile(file, output, function(err) {
				if (err) {
					grunt.warn(err);
					throw err;
				}
			});
		}


		grunt.log.writeln("travis_fold:start:Sauce test progress");
		grunt.log.writeln("Sauce job name: "+options.name);
		readResultsFile(function(testResults) {
			var noop = true;

			options.browsers.forEach(function(conf) {
				conf['name'] = options.name;
				conf['record-video'] = options.video;
				conf['record-screenshots'] = options.screenshots;
				conf['tunnel-identifier'] = tunnelId;
				if (options.tags) conf['tags'] = options.tags;
				if (options.build) conf['build'] = options.build;

				Object.keys(options.urls).forEach(function(urlName) {
					var url = options.urls[urlName], state;
					try {
						testResults[UA.normalizeName(conf.browserName)][conf.version][urlName].length;
						state = 'skipped - data already in result file';
					} catch(e) {
						batch.push(function(done) {
							var testJob = newTestJob(url, urlName, conf);
							testJob().then(function(data) {
								done(null, data);
							}).catch(function(e) {
								done(e);
							});
						});

						state = 'queued';
						noop = false;
					}
					grunt.log.writeln(conf.browserName + ' ' + conf.version + ' (' + urlName + ' mode): ' + state);
				});
			});

			if (noop) {
				grunt.log.writeln("Nothing to do");
				return gruntDone();
			}

			grunt.log.writeln('Opening tunnel to Sauce Labs');
			tunnel = new SauceTunnel(options.username, options.key, tunnelId, true);
			tunnel.start(function(status) {

				var cumFailCount = 0;

				grunt.log.writeln("Tunnel Started");
				if (status !== true)  {
					gruntDone(status);
				}

				grunt.log.writeln("Starting test jobs");

				batch.on('progress', function(e) {
					if (e.error) {
						throw e.error;
					}

					if (e.value.browserName) {
						var browserName = UA.normalizeName(e.value.browserName) || e.value.browserName;

						if (!testResults[browserName]) {
							testResults[browserName] = {};
						}

						if (!testResults[browserName][e.value.version]) {
							testResults[browserName][e.value.version]	= {};
						}

						testResults[browserName][e.value.version][e.value.urlName] = {
							passed: e.value.results.passed,
							failed: e.value.results.failed,
							failingSuites: e.value.results.failingSuites ? Object.keys(e.value.results.failingSuites) : [],
							testedSuites: e.value.results.testedSuites
						};
						cumFailCount += e.value.results.failed;
						writeResultsFile(testResults);
					}

					// Pending count appears to have an off by one error
					grunt.log.writeln("Progress (browsers): " + e.complete + ' / ' + e.total + ' (' + (e.pending-1) + ' browsers remaining, ' + cumFailCount + ' test failures so far)');
				});


				batch.end(function(err, jobresults) {
					grunt.log.writeln('All jobs complete');
					tunnel.stop(function() {
						var passingUAs = [];
						var failed = false;
						grunt.log.writeln('Sauce tunnel stopped');
						grunt.log.writeln("travis_fold:end:Sauce test progress");
						grunt.log.writeln("Failed tests:");
						jobresults.forEach(function(job) {
							if (!job.results) {
								grunt.warn('No results reported for '+ job.browserName+'/'+job.version+' '+job.urlName);
								return true;
							}
							if (job.results.failed) {
								grunt.log.writeln(' - '+job.browserName+' '+job.version+' (Sauce results: https://saucelabs.com/tests/' + job.id+')');
								if (job.results.failingSuites) {
									Object.keys(job.results.failingSuites).forEach(function(feature) {
										var url = options.urls[job.urlName].replace(/test\/director/, 'test/tests')+'&feature='+feature;
										grunt.log.writeln('    -> '+feature);
										grunt.log.writeln('       '+url);
									});
								}
								failed = true;
							} else {
								passingUAs.push(job.browserName+'/'+job.version);
							}
						});
						if (!failed) {
							grunt.log.writeln(' - None!');
						}
						if (passingUAs.length) {
							grunt.log.writeln('Browsers tested with no failures: '+passingUAs.join(', '));
						}

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
