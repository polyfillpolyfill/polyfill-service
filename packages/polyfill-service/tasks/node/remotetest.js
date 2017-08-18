'use strict';

require('dotenv').config();

const path = require('path');
const wd = require('wd');
const denodeify = require('denodeify');
const readFile = denodeify(require('graceful-fs').readFile);
const writeFile = denodeify(require('graceful-fs').writeFile);
const testResultsPath = path.join(__dirname, '../../test/results');
const testResultsFile = path.join(testResultsPath, 'results.json');
const mkdirp = denodeify(require('mkdirp'));
const argv = require('minimist')(process.argv.slice(2));
const cli = require('cli-color');
const pollTick = 1000;
const testBrowserTimeout = 60000;
const testProvider = require('./' + ((['browserstack', 'saucelabs'].includes(argv.provider) && argv.provider) || 'browserstack'));


const browserSets = {
	"quick": [
		'chrome/58',
		'firefox/53',
		'ie/15',
		'ie/11',
		'ie/8',
		'android/4.4',
		'safari/10',
	],
	"ci": [
		'chrome/58',
		'chrome/48',
		'firefox/53',
		'firefox/49',
		'firefox/44',
		'ie/15',
		'ie/13',
		'ie/11',
		'ie/10',
		'ie/9',
		'ie/8',
		'ie/7',
		'safari/10',
		'safari/9',
		'safari/8',
		'android/4.4'
	],
	"full": [
		'chrome/58',
		'chrome/48',
		'chrome/46',
		'chrome/42',
		'chrome/40',
		'chrome/35',
		'firefox/53',
		'firefox/49',
		'firefox/44',
		'firefox/42',
		'firefox/41',
		'firefox/33',
		'firefox/30',
		'ie/15',
		'ie/14',
		'ie/13',
		'ie/11',
		'ie/10',
		'ie/9',
		'ie/8',
		'ie/7',
		'safari/10',
		'safari/9',
		'safari/8',
		'safari/7',
		'safari/6',
		'safari/5.1',
		'android/7.1',
		'android/7',
		'android/6',
		'android/5.1',
		'android/5',
		'android/4.4',
		// 'android/4.3', // Not working correctly on BrowserStack or SauceLabs
		// 'android/4.2', // Not working correctly on BrowserStack or SauceLabs
		'ios_saf/10.3',
		'ios_saf/9.1',
		'ios_saf/8',
		'ios_saf/7',
		'ios_saf/6',
		'ios_saf/5',
		'ios_saf/4'
	]
};

const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

const whitespace = ' '.repeat(200);
const rightPad = (str, len) => (str + whitespace).slice(0, len);

const readResultsFrom = filePath => {
	return readFile(filePath, 'UTF-8')
		.then(data => JSON.parse(data))
		.catch(err => {
			// No problem if file does not exist
			if (err.code === 'ENOENT') {
				return {};
			}
			throw err;
		});
};

const printProgress = (jobs, overwrite) => {
	const lineLen = 80;
	const barLen = 25;
	const out = [''];
	let readyCount = 0;
	jobs.forEach(job => {
		const prefix = ' • ' + rightPad(job.ua, 10) + ' ' + rightPad(job.mode, 8) + ' ';
		let msg = '';
		if (job.state === 'complete') {
			if (!job.outputComplete) {
				if (job.results.failed) {
					msg = cli.red('✘ ' + job.results.total + ' tests, ' + job.results.failed + ' failures');
				} else {
					msg = cli.green('✓ ' + job.results.total + ' tests');
				}
				msg += '  ' + job.duration + 's';
				process.stdout.write(rightPad(prefix + msg, lineLen) + '\n');
				msg = null;
				job.outputComplete = true;
			}
		} else if (job.state === 'error') {
			msg = cli.red('⚠️  ' + job.results);
		} else if (job.state === 'ready') {
			readyCount++;
		} else {
			if (job.state === 'running') {
				const doneFrac = (job.results.runnerCompletedCount / job.results.runnerCount);
				const bar = '[' + ('█'.repeat(Math.ceil(doneFrac * barLen))) + ('░'.repeat(Math.floor((1 - doneFrac) * barLen))) + ']  ' + job.results.runnerCompletedCount + '/' + job.results.runnerCount;
				const errStr = (job.results.failed) ? cli.red('  ✘ ' + job.results.failed) : '';
				msg = bar + errStr;
			} else {
				msg = job.state;
			}
			const timeWaiting = Math.floor((Date.now() - job.lastUpdateTime) / 1000);
			msg += (timeWaiting > 5) ? cli.yellow('  🕒  ' + timeWaiting + 's') : '';
		}
		if (msg) out.push(prefix + msg);
	});
	if (readyCount) {
		out.push(' + ' + readyCount + ' job(s) queued');
	}
	process.stdout.write(out.map(str => rightPad(str, lineLen)).join('\n') + '\n');
	if (overwrite) {
		process.stdout.write(cli.move.lines(-out.length));
	}
};

class TestJob {

	constructor(url, mode, ua, sessionName, creds) {
		this.browser = wd.promiseRemote(testProvider.host, testProvider.port, creds.username, creds.key);
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
			});
	}

	run() {

		// Sauce Labs options https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options
		// BrowserStack options https://www.browserstack.com/automate/capabilities
		const wdConf = Object.assign({
			"name": this.sessionName,
			"recordVideo": true,
			"recordScreenshots": true,
			"tunnelIdentifier": this.sessionName,
			'browserstack.local': true,
			'browserstack.debug': true
		}, testProvider.useragentToBrowserObj[this.ua]);

		this.setState('initialising browser');
		this.startTime = Date.now();

		return Promise.resolve()
			.then(() => this.browser.init(wdConf).then(() => this.setState('started')))
			.then(() => this.browser.get(this.url).then(() => this.setState('loaded URL')))
			.then(() => this.browser.refresh().then(() => this.setState('refreshed')))
			.then(() => wait(pollTick).then(() => this.setState('polling for results')))
			.then(() => this.pollForResults())
			.catch(e => {
				this.browser.quit();
				this.results = e;
				this.setState('error');
				return this;
			});
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
}

const serviceHost = 'http://127.0.0.1:' + (process.env.PORT || 3000);
const options = {
	browserSet: argv.set || 'quick',
	modes: ['all', 'targeted', 'control'].filter(x => x in argv),
	concurrency: argv.concurrency || 3,
	continueOnFail: argv.continueOnFail
};
options.browsers = browserSets[options.browserSet];
options.urls = options.modes.reduce((out, mode) => {
	out[mode] = serviceHost + '/test/director?mode=' + mode;
	return out;
}, {});

let testResults = {};
let jobs = [];

const tunnelId = 'build:' + (process.env.CIRCLE_BUILD_NUM || process.env.NODE_ENV || 'null') + '_' + (new Date()).toISOString();
const tunnel = testProvider.tunnel(tunnelId);

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
			} catch (e) {
				out.push((new TestJob(url, mode, ua, tunnelId, testProvider.creds)));
			}
			return out;
		}, [])), []);

		if (!jobs.length) {
			console.log("Nothing to do");
			process.exit(0);
		} else if (existingCount) {
			console.log(existingCount + ' results already available.  To rerun these tests, delete the results.json file.');
		}
	})

	.then(() => tunnel.openTunnel())

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
		for (let i = 0, s = options.concurrency; i < s; i++) {
			pushJob();
		}
	}))

	.then(() => tunnel.closeTunnel().then(() => console.log("Tunnel closed")))

	.then(() => {
		const totalFailureCount = jobs.reduce((out, job) => out + (job.state === 'complete' ? job.results.failed : 1), 0);
		if (totalFailureCount) {
			console.log(cli.bold.white('\nFailures:'));
			jobs.forEach(job => {
				if (job.results && job.results.failed) {
					console.log(' - ' + job.ua + ':');
					Object.keys(job.results.failingSuites).forEach(feature => {
						const url = options.urls[job.mode].replace(/test\/director/, 'test/tests') + '&feature=' + feature;
						console.log('    -> ' + feature);
						console.log('       ' + url);
					});
				} else if (job.state !== 'complete') {
					console.log(' • ' + job.ua + ' (' + job.mode + '): ' + cli.red(job.results || 'No results'));
				}
			});
			console.log('');
		}
		if (!options.continueOnFail && totalFailureCount) {
			throw new Error('Failures detected');
		}
	})

	.catch(e => {
		console.log(e.stack || e);
		process.exit(1);
	});
