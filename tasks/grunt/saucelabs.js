'use strict';

const path = require('path');
const wd = require('wd');
const denodeify = require('denodeify');
const readFile = denodeify(require('graceful-fs').readFile);
const writeFile = denodeify(require('graceful-fs').writeFile);
const testResultsPath = path.join(__dirname, '../../test/results');
const testResultsFile = path.join(testResultsPath, 'results.json');
const SauceTunnel = require('sauce-tunnel');
const mkdirp = denodeify(require('mkdirp'));
const cli = require('cli-color');
const pollTick = 1000;
const testBrowserTimeout = 60000;
const sauceConnectPort = 4445;

const useragentToSauce = {
	'chrome/54': ['chrome', '54.0', 'Windows 10'],
	'chrome/48': ['chrome', '48.0', 'Windows 7'],
	'chrome/46': ['chrome', '46.0', 'Windows 7'],
	'chrome/42': ['chrome', '42.0', 'Windows 7'],
	'chrome/40': ['chrome', '40.0', 'OS X 10.11'],
	'chrome/35': ['chrome', '35.0', 'OS X 10.11'],
	'chrome/30': ['chrome', '30.0', 'Windows 7'],
	'firefox/49': ['firefox', '49.0', 'OS X 10.11'],
	'firefox/44': ['firefox', '44.0', 'Linux'],
	'firefox/42': ['firefox', '42.0', 'Linux'],
	'firefox/41': ['firefox', '41', 'Linux'],
	'firefox/33': ['firefox', '33', 'Linux'],
	'firefox/30': ['firefox', '30', 'OSX 10.11'],
	'firefox/20': ['firefox', '20', 'Linux'],
	'ie/14': ['microsoftedge', '14', 'Windows 10'],
	'ie/13': ['MicrosoftEdge', '13.10586', 'Windows 10'],
	'ie/11': ['internet explorer', '11', 'Windows 10'],
	'ie/10': ['internet explorer', '10', 'Windows 7'],
	'ie/9': ['internet explorer', '9', 'Windows 7'],
	'ie/8': ['internet explorer', '8', 'Windows XP'],
	'ie/7': ['internet explorer', '7', 'Windows XP'],
	'ie/6': ['internet explorer', '6', 'Windows XP'],
	'safari/9': ['safari', '9.0', 'OSX 10.11'],
	'safari/8': ['safari', '8.0', 'OSX 10.10'],
	'safari/5.1': ['safari', '5.1', 'Windows 7'],
	'android/5.1': ['android', '5.1', 'linux', 'Android Emulator'],
	'android/4.4': ['android', '4.4', 'linux', 'Android Emulator'],
	'android/4.3': ['android', '4.3', 'linux', 'Android Emulator'],
	'android/4.2': ['android', '4.2', 'linux', 'Android Emulator'],
	'android/4.1': ['android', '4.1', 'linux', 'Android Emulator'],
	'ios_saf/9.1': ['iphone', '9.1', 'OS X 10.10', 'iPhone 6'],
	'ios_saf/9.2': ['iphone', '9.2', 'OS X 10.10', 'iPhone 6 Plus']
};
const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

const whitespace = ' '.repeat(200);
const rightPad = (str, len) => (str+whitespace).slice(0, len);

const readResultsFrom = filePath => {
	return readFile(filePath, 'UTF-8')
		.then(data => JSON.parse(data))
		.catch(err => {
			// No problem if file does not exist
			if (err.code === 'ENOENT') {
				return {};
			}
			throw err;
		})
	;
};

const printProgress = (jobs, overwrite) => {
	const lineLen = 80;
	const barLen = 25;
	const out = ['', cli.bold.white('Running tests:')];
	jobs.forEach(job => {
		const prefix = ' • ' + rightPad(job.ua, 10) + ' ' + rightPad(job.mode, 8) + ' ';
		let msg = '';
		if (job.state === 'complete') {
			if (job.results.failed) {
				msg = cli.red('✘ '+ job.results.total + ' tests, ' + job.results.failed + ' failures');
			} else {
				msg = cli.green('✓ ' + job.results.total + ' tests');
			}
			msg += '  ' + job.duration + 's';
		} else if (job.state === 'error') {
			msg = cli.red('⚠️  ' + job.results);
		} else {
			if (job.state === 'running') {
				const doneFrac = (job.results.runnerCompletedCount/job.results.runnerCount);
				const bar = '['+('█'.repeat(Math.ceil(doneFrac*barLen)))+('░'.repeat(Math.floor((1-doneFrac)*barLen)))+']  ' + job.results.runnerCompletedCount+'/'+job.results.runnerCount;
				const errStr = (job.results.failed) ? cli.red('  ✘ ' + job.results.failed) : '';
				msg = bar + errStr;
			} else {
				msg = job.state;
			}
			if (job.state !== 'ready') {
				const timeWaiting = Math.floor((Date.now() - job.lastUpdateTime) / 1000);
				msg += (timeWaiting > 5) ? cli.yellow('  🕒  '+timeWaiting+'s') : '';
			}
		}
		out.push(prefix + msg);
	});
	process.stdout.write(out.map(str => rightPad(str, lineLen)).join('\n')+'\n');
	if (overwrite) {
		process.stdout.write(cli.move.lines(-out.length));
	}
};

const openTunnel = tunnel => {
	return new Promise(resolve => {
		tunnel.start(tunnelStatus => {
			if (tunnelStatus !== true) {
				throw new Error("Failed to open tunnel");
			}
			resolve();
		});
	});
};
const closeTunnel = tunnel => {
	return denodeify(tunnel.stop.bind(tunnel))().then(() => console.log("Tunnel closed"));
};

class TestJob {

	constructor (url, mode, ua, sessionName, creds) {
		this.browser = wd.promiseRemote("127.0.0.1", sauceConnectPort, creds.username, creds.key);
		this.mode = mode;
		this.url = url;
		this.results = null;
		this.lastUpdateTime = 0;
		this.duration = 0;
		this.ua = ua;
		this.sessionName = sessionName;
		this.setState('ready');
	}

	pollForResults() {
		return this.browser.eval('window.global_test_results || window.global_test_progress')
			.then(browserdata => {
				if (browserdata && browserdata.state === 'complete') {
					this.browser.quit();
					this.results = browserdata;
					this.duration = Math.floor((Date.now() - this.startTime) / 1000);
					this.setState('complete');
					return this;
				} else if (this.lastUpdateTime && this.lastUpdateTime < (Date.now() - testBrowserTimeout)) {
					throw new Error('Timed out at \'' + this.state + '\'');
				} else {
					if (browserdata && browserdata.state === 'running') {
						if (!this.results || browserdata.runnerCompletedCount > this.results.runnerCompletedCount) {
							this.results = browserdata;
							this.lastUpdateTime = Date.now();
						}
						this.setState('running');
					}

					// Recurse
					return wait(pollTick).then(() => this.pollForResults());
				}
			})
		;
	}

	run() {
		const sauceUA = useragentToSauce[this.ua];

		// See https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options
		const wdConf = {
			"name": this.sessionName,
			"browserName": sauceUA[0],
			"version": sauceUA[1],
			"platform": sauceUA[2],
			"deviceName": sauceUA[3] || null,
			"recordVideo": true,
			"recordScreenshots": true,
			"tunnelIdentifier": this.sessionName
		};

		this.setState('initialising browser');
		this.startTime = Date.now();

		return Promise.resolve()
			.then(() => this.browser.init(wdConf).then(() => this.setState('started')))
			.then(() => this.browser.get(this.url).then(() => this.setState('loaded URL')))
			.then(() => this.browser.refresh().then(() => this.setState('refreshed')))
			.then(() => wait(pollTick).then(() => this.setState('waiting for results')))
			.then(() => this.pollForResults())
			.catch(e => {
				this.browser.quit();
				this.results = e;
				this.setState('error');
				return this;
			})
		;
	}

	setState(newState) {
		this.state = newState;
		this.lastUpdateTime = Date.now();
	}

	getResultSummary() {
		if (!this.results) throw new Error('Results not available yet');
		return {
			passed: this.results.passed,
			failed: this.results.failed,
			failingSuites: this.results.failingSuites ? Object.keys(this.results.failingSuites) : [],
			testedSuites: Array.from(this.results.testedSuites)
		};
	}

	getResultsURL() {
		return 'https://saucelabs.com/tests/' + this.browser.sessionID;
	}
}



module.exports = function(grunt) {

	grunt.registerMultiTask('saucelabs', 'Perform tests on Sauce', function() {

		if (!process.env.SAUCE_USER_NAME || !process.env.SAUCE_API_KEY) {
			grunt.fail.warn(new Error('SAUCE_USER_NAME and SAUCE_API_KEY must be set in the environment to run tests on Sauce Labs.  For more information about how to set this up or for alternative methods of testing, see https://polyfill.io/v2/docs/contributing/testing'));
		}
		const sauceCreds = { username: process.env.SAUCE_USER_NAME, key: process.env.SAUCE_API_KEY };

		const gruntDone = this.async();
		const options = this.options({
			browsers: [],
			urls: {},
			concurrency: 3,
			continueOnFail: false
		});
		let testResults = {};
		let jobs = [];

		const tunnelId = 'ci:' + (process.env.TRAVIS_BUILD_NUMBER || 'null') + '_' + (new Date()).toISOString();
		const tunnel = new SauceTunnel(sauceCreds.username, sauceCreds.key, tunnelId);

		console.log("Sauce tunnel name: " + tunnelId);

		Promise.resolve()

			// Load existing test results
			.then(() => mkdirp(testResultsPath))
			.then(() => {
				readResultsFrom(testResultsFile)
				.then(r => {
					testResults = r;
				});
			})

			// Figure out which jobs need to be run, create them
			.then(() => {
				let existingCount = 0;
				jobs = options.browsers.reduce((out, ua) => out.concat(Object.keys(options.urls).reduce((out, mode) => {
					const url = options.urls[mode];
					try {
						testResults[ua][mode].length;
						existingCount++;
					} catch(e) {
						out.push((new TestJob(url, mode, ua, tunnelId, sauceCreds)));
					}
					return out;
				}, [])), []);

				if (!jobs.length) {
					console.log("Nothing to do");
					return gruntDone();
				} else if (existingCount) {
					console.log(existingCount + ' results already available.  To rerun these tests, delete the results.json file.');
				}
			})

			.then(() => openTunnel(tunnel))

			// Run jobs within concurrency limits
			.then(() => new Promise(resolve => {
				const results = [];
				const writeQueue = [];
				const cliFeedbackTimer = setInterval(() => printProgress(jobs, true), pollTick);
				let resolvedCount = 0;
				function pushJob() {
					results.push(jobs[results.length].run().then(job => {
						if (job.state === 'complete') {
							const [family, version] = job.ua.split('/');
							if (testResults[family] === undefined) testResults[family] = {};
							if (testResults[family][version] === undefined) testResults[family][version] = {};
							testResults[family][version][job.mode] = job.getResultSummary();
							const output = JSON.stringify(testResults, null, 2);
							writeQueue.push(writeFile(testResultsFile, output));
						}
						resolvedCount++;
						if (results.length < jobs.length) {
							pushJob();
						} else if (resolvedCount === jobs.length) {
							clearTimeout(cliFeedbackTimer);
							printProgress(jobs, false);
							Promise.all(writeQueue).then(() => resolve(testResults));
						}
						return job;
					}).catch(e => console.log(e.stack || e)));
				}
				for (let i=0, s = options.concurrency; i<s; i++) {
					pushJob();
				}
			}))

			.then(() => closeTunnel(tunnel))

			.then(() => {
				const totalFailureCount = jobs.reduce((out, job) => out + (job.state === 'complete' ? job.results.failed : 1), 0);
				if (totalFailureCount) {
					console.log(cli.bold.white('\nFailures:'));
					jobs.forEach(job => {
						if (job.results && job.results.failed) {
							console.log(' • '+job.ua+' ('+job.mode+') [' + job.getResultsURL() + ']');
							Object.keys(job.results.failingSuites).forEach(feature => {
								const url = options.urls[job.mode].replace(/test\/director/, 'test/tests')+'&feature='+feature;
								console.log('    -> '+feature);
								console.log('       '+url);
							});
						} else if (job.state !== 'complete') {
							console.log(' • ' + job.ua+' ('+job.mode+'): ' + cli.red(job.results || 'No results'));
						}
					});
					console.log('');
				}
				gruntDone(options.continueOnFail ? null : !totalFailureCount);
			})

			.catch(e => {
				console.log(e.stack || e);
			})
		;
	});
};
