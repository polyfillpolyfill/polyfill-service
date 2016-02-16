'use strict';

var useragentToSauce = {
	'chrome/46': ['chrome', '46', 'Windows 7'],
	'chrome/42': ['chrome', '42', 'Windows 7'],
	'chrome/35': ['chrome', '35', 'OSX 10.11'],
	'chrome/30': ['chrome', '30', 'Windows 7'],
	'firefox/41': ['firefox', '41', 'Linux'],
	'firefox/33': ['firefox', '33', 'Linux'],
	'firefox/30': ['firefox', '30', 'OSX 10.11'],
	'firefox/20': ['firefox', '20', 'Linux'],
	'ie/12': ['microsoftedge', '20.10240', 'Windows 10'],
	'ie/11': ['internet explorer', '11', 'Windows 10'],
	'ie/10': ['internet explorer', '10', 'Windows 7'],
	'ie/9': ['internet explorer', '9', 'Windows 7'],
	'ie/8': ['internet explorer', '8', 'Windows XP'],
	'ie/7': ['internet explorer', '7', 'Windows XP'],
	'ie/6': ['internet explorer', '6', 'Windows XP'],
	'safari/9': ['safari', '9.0', 'OSX 10.11'],
	'safari/8': ['safari', '8.0', 'OSX 10.10'],
	'safari/5.1': ['safari', '5.1', 'Windows 7'],
	'android/4.4': ['android', '4.4', 'linux', 'Android Emulator'],
	'android/4.3': ['android', '4.3', 'linux', 'Android Emulator'],
	'android/4.2': ['android', '4.2', 'linux', 'Android Emulator'],
	'android/4.1': ['android', '4.1', 'linux', 'Android Emulator'],
	'ios_saf/9.1': ['iphone', '9.1', 'OS X 10.10', 'iPhone 6'],
	'ios_saf/9.2': ['iphone', '9.2', 'OS X 10.10', 'iPhone 6 Plus']
};

var promiseTimer = function(time) {
	return new Promise(function (resolve) {
		setTimeout(function() {
			resolve();
		}, time);
	});
};

var toArray = function (obj) {
	if (!obj) return [];
	return Array.isArray(obj) ? obj : Object.keys(obj).map(function(k) { return obj[k]; });
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
		var tunnelId = 'SauceTunnel' + nameSuffix;

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
			var ua = b.split('/');
			var sauce = useragentToSauce[b];
			var def = { browserName:ua[0], browserVersion:ua[1], sauce: {
				browserName: sauce[0],
				version: sauce[1],
				platform: sauce[2]
			}};
			if (sauce[3]) def['sauce']['deviceName'] = sauce[3];
			return def;
		});

		var batch = new Batch();
		batch.concurrency(options.concurrency);
		batch.throws(false);

		// Create a new job to pass into the Batch runner, returns a function
		function newTestJob(url, urlName, ua) {
			return function testJob() {

				// Variadic like console.log(...);
				function log() {
					var leader = (new Date()).toString() + ' ' + ua.browserName + "/" + ua.browserVersion + ": ";
					var args = Array.prototype.slice.call(arguments);
					args.unshift(leader);
					grunt.log.writeln.apply(grunt.log, args);
				}

				var browser = wd.promiseRemote("127.0.0.1", sauceConnectPort, options.username, options.key);
				var conf = Object.assign({
					"name": options.name,
					"record-video": options.video,
					"record-screenshots": options.screenshots,
					"tunnel-identifier": tunnelId
				}, ua.sauce);
				if (options.tags && options.tags.length) conf['tags'] = options.tags;
				if (options.build) conf['build'] = options.build;

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
							throw new Error('Timeout waiting on ' + ua.browserName + '/' +ua.browserVersion);
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
						return promiseTimer(pollTick).then(waitOnResults).then(processResults);
					}

					log("results received (" + data.passed + " passed, " + data.failed + " failed), closing remote browser");

					// Close the browser as soon as we have the
					// results.  No need to keep it hanging around
					// until the rest of the job is complete.
					browser.quit();
					log("Browser closing");

					return {
						id: browser.sessionID,
						ua: ua,
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
						return promiseTimer(pollTick);
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

			options.browsers.forEach(function(ua) {
				Object.keys(options.urls).forEach(function(urlName) {
					var url = options.urls[urlName], state;
					try {
						testResults[ua.browserName][ua.browserVersion][urlName].length;
						state = 'skipped - data already in result file';
					} catch(e) {
						batch.push(function(done) {
							var testJob = newTestJob(url, urlName, ua);
							testJob().then(function(data) {
								done(null, data);
							}).catch(function(e) {
								console.log(e.stack || e);
								done(e);
							});
						});

						state = 'queued';
						noop = false;
					}
					grunt.log.writeln(ua.browserName + '/' + ua.browserVersion + ' (' + urlName + ' mode): ' + state);
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

					if (e.value.ua) {
						if (!testResults[e.value.ua.browserName]) {
							testResults[e.value.ua.browserName] = {};
						}

						if (!testResults[e.value.ua.browserName][e.value.ua.browserVersion]) {
							testResults[e.value.ua.browserName][e.value.ua.browserVersion]	= {};
						}

						testResults[e.value.ua.browserName][e.value.ua.browserVersion][e.value.urlName] = {
							passed: e.value.results.passed,
							failed: e.value.results.failed,
							failingSuites: e.value.results.failingSuites ? Object.keys(e.value.results.failingSuites) : [],
							testedSuites: toArray(e.value.results.testedSuites)
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
								grunt.warn('No results reported for '+ job.ua.browserName+'/'+job.ua.browserVersion+' '+job.urlName);
								return true;
							}
							if (job.results.failed) {
								grunt.log.writeln(' - '+job.ua.browserName+' '+job.ua.browserVersion+' (Sauce results: https://saucelabs.com/tests/' + job.id+')');
								if (job.results.failingSuites) {
									Object.keys(job.results.failingSuites).forEach(function(feature) {
										var url = options.urls[job.urlName].replace(/test\/director/, 'test/tests')+'&feature='+feature;
										grunt.log.writeln('    -> '+feature);
										grunt.log.writeln('       '+url);
									});
								}
								failed = true;
							} else {
								passingUAs.push(job.ua.browserName+'/'+job.ua.browserVersion);
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
