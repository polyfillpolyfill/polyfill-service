'use strict';

const useragentToSauce = {
	'chrome/48': ['chrome', '48.0', 'Windows 7'],
	'chrome/46': ['chrome', '46.0', 'Windows 7'],
	'chrome/42': ['chrome', '42.0', 'Windows 7'],
	'chrome/40': ['chrome', '40.0', 'OS X 10.11'],
	'chrome/35': ['chrome', '35.0', 'OS X 10.11'],
	'chrome/30': ['chrome', '30.0', 'Windows 7'],
	'firefox/44': ['firefox', '44.0', 'Linux'],
	'firefox/42': ['firefox', '42.0', 'Linux'],
	'firefox/41': ['firefox', '41', 'Linux'],
	'firefox/33': ['firefox', '33', 'Linux'],
	'firefox/30': ['firefox', '30', 'OSX 10.11'],
	'firefox/20': ['firefox', '20', 'Linux'],
	'ie/13': ['MicrosoftEdge', '13.10586', 'Windows 10'],
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

const promiseTimer = function(time) {
	return new Promise(resolve => setTimeout(resolve, time));
};

module.exports = function(grunt) {

	const wd = require('wd');
	const Batch = require('batch');
	const SauceTunnel = require('sauce-tunnel');
	const mkdirp = require('mkdirp');
	const path = require('path');
	const fs = require('fs');
	const testResultsPath = path.join(__dirname, '../test/results');

	const pollTick = 1000;
	const retryLimit = 50;
	const sauceConnectPort = 4445;

	grunt.registerMultiTask('saucelabs', 'Perform tests on Sauce', function() {
		const gruntDone = this.async();
		const nameSuffix = process.env.TRAVIS_BUILD_NUMBER ? "-travis-build:" + process.env.TRAVIS_BUILD_NUMBER : ':' + (new Date()).toUTCString();
		let tunnel;
		const tunnelId = 'SauceTunnel' + nameSuffix;

		if (!process.env.SAUCE_USER_NAME || !process.env.SAUCE_API_KEY) {
			grunt.fail.warn(new Error('SAUCE_USER_NAME and SAUCE_API_KEY must be set in the environment'));
		}

		const options = this.options({
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

		options.browsers = options.browsers.map(b => {
			const ua = b.split('/');
			const sauce = useragentToSauce[b];
			console.log(b);
			const def = { browserName:ua[0], browserVersion:ua[1], sauce: {
				browserName: sauce[0],
				version: sauce[1],
				platform: sauce[2]
			}};
			if (sauce[3]) def['sauce']['deviceName'] = sauce[3];
			return def;
		});

		const batch = new Batch();
		batch.concurrency(options.concurrency);
		batch.throws(false);

		// Create a new job to pass into the Batch runner, returns a function
		function runTestJob(url, urlName, ua) {

			// Variadic like console.log(...);
			function log() {
				const leader = (new Date()).toString() + ' ' + ua.browserName + "/" + ua.browserVersion + ": ";
				const args = Array.prototype.slice.call(arguments);
				args.unshift(leader);
				grunt.log.writeln.apply(grunt.log, args);
			}

			const browser = wd.promiseRemote("127.0.0.1", sauceConnectPort, options.username, options.key);
			const conf = Object.assign({
				"name": options.name,
				"record-video": options.video,
				"record-screenshots": options.screenshots,
				"tunnel-identifier": tunnelId
			}, ua.sauce);
			if (options.tags && options.tags.length) conf['tags'] = options.tags;
			if (options.build) conf['build'] = options.build;

			let remainingCount = null;
			let retryCount = 0;

			function waitOnResults() {
				return browser.eval('window.global_test_results || window.remainingCount');
			}
			function processResults(data) {

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

			return browser.init(conf).then(() => {
				log("browser launched");

				return browser
					.get(url)
					.then(() => browser.refresh())
					.then(() => {
						log("kicked");

						// Once refreshed, wait `pollTick` before continuing
						return promiseTimer(pollTick);
					})
					.then(waitOnResults)
					.then(processResults)
				;
			});
		}

		function readResultsFile(cb) {
			const file = path.join(testResultsPath, 'results.json');
			mkdirp(testResultsPath, err => {
				if (err) {
					grunt.warn('Cannot write test results - '+testResultsPath+' cannot be written');
					cb({});
				} else {
					fs.readFile(file, (err, filedata) => {
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
			const file = path.join(testResultsPath, 'results.json');
			const output = JSON.stringify(data, null, 2);
			console.log('Wrote '+output.length+' bytes to result file');
			fs.writeFile(file, output, err => {
				if (err) {
					grunt.warn(err);
					throw err;
				}
			});
		}


		grunt.log.writeln("travis_fold:start:Sauce test progress");
		grunt.log.writeln("Sauce job name: "+options.name);
		readResultsFile(testResults => {
			let noop = true;

			options.browsers.forEach(ua => {
				Object.keys(options.urls).forEach(urlName => {
					const url = options.urls[urlName];
					let state;
					try {
						testResults[ua.browserName][ua.browserVersion][urlName].length;
						state = 'skipped - data already in result file';
					} catch(e) {
						batch.push(done => {
							runTestJob(url, urlName, ua)
								.then(data => done(null, data))
								.catch(e => {
									console.log(e.stack || e);
									done(e);
								})
							;
						});
						state = 'queued';
						noop = false;
					}
					grunt.log.writeln(ua.browserName + '/' + ua.browserVersion + ' (' + urlName + ' mode): ' + state);
				});
			});

			if (noop) {
				grunt.log.oklns("Nothing to do");
				return gruntDone();
			}

			grunt.log.writeln('Opening tunnel to Sauce Labs');
			tunnel = new SauceTunnel(options.username, options.key, tunnelId, true);
			tunnel.start(status => {

				let cumFailCount = 0;

				grunt.log.writeln("Tunnel Started");
				if (status !== true) {
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
							testedSuites: Array.from(e.value.results.testedSuites)
						};
						cumFailCount += e.value.results.failed;
						writeResultsFile(testResults);
					}

					// Pending count appears to have an off by one error
					grunt.log.writeln("Progress (browsers): " + e.complete + ' / ' + e.total + ' (' + (e.pending-1) + ' browsers remaining, ' + cumFailCount + ' test failures so far)');
				});


				batch.end((err, jobresults) => {
					grunt.log.writeln('All jobs complete');
					tunnel.stop(() => {
						const passingUAs = [];
						let failed = false;
						grunt.log.writeln('Sauce tunnel stopped');
						grunt.log.writeln("travis_fold:end:Sauce test progress");
						grunt.log.writeln("Failed tests:");
						jobresults.forEach(job => {
							if (!job.results) {
								grunt.warn('No results reported for '+ job.ua.browserName+'/'+job.ua.browserVersion+' '+job.urlName);
								return true;
							}
							if (job.results.failed) {
								grunt.log.writeln(' - '+job.ua.browserName+' '+job.ua.browserVersion+' (Sauce results: https://saucelabs.com/tests/' + job.id+')');
								if (job.results.failingSuites) {
									Object.keys(job.results.failingSuites).forEach(feature => {
										const url = options.urls[job.urlName].replace(/test\/director/, 'test/tests')+'&feature='+feature;
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

						process.nextTick(() => {

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
