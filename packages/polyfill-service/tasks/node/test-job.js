"use strict";

const wd = require("wd");
const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

module.exports = class TestJob {
	constructor(url, mode, ua, sessionName, creds, testBrowserTimeout, pollTick, testProvider, useLocalTunnel) {
		this.testProvider = testProvider;
		this.browser = wd.promiseRemote(this.testProvider.host, this.testProvider.port, creds.username, creds.key);
		this.mode = mode;
		this.url = url;
		this.results = null;
		this.lastUpdateTime = 0;
		this.duration = 0;
		this.ua = ua;
		this.sessionName = sessionName;
		this.testBrowserTimeout = testBrowserTimeout;
		this.pollTick = pollTick;
		this.useLocalTunnel = useLocalTunnel;
		this.setState("ready");
	}

	pollForResults() {
		return this.browser.safeEval("window.global_test_results || window.global_test_progress").then(browserdata => {
			if (browserdata && browserdata.state === "complete") {
				this.browser.quit();
				this.results = browserdata;
				this.duration = Math.floor((Date.now() - this.startTime) / 1000);
				this.setState("complete");
				return this;
			} else if (this.lastUpdateTime && this.lastUpdateTime < Date.now() - this.testBrowserTimeout) {
				throw new Error("Timed out at '" + this.state + "'");
			} else {
				if (browserdata && browserdata.state === "running") {
					if (!this.results || browserdata.runnerCompletedCount > this.results.runnerCompletedCount) {
						this.results = browserdata;
						this.lastUpdateTime = Date.now();
					}
					this.setState("running");
				}

				// Recurse
				return wait(this.pollTick).then(() => this.pollForResults());
			}
		});
	}

	async run() {
		// BrowserStack options https://www.browserstack.com/automate/capabilities
		const wdConf = Object.assign(
			{
				name: this.sessionName,
				"browserstack.local": this.useLocalTunnel
			},
			this.testProvider.useragentToBrowserObj(this.ua)
		);

		this.setState("initialising browser");
		this.startTime = Date.now();

		try {
			await this.browser.init(wdConf);
			await this.setState("started");
			await this.browser.get(this.url);
			await this.setState("loaded URL");
			await wait(this.pollTick);
			await this.setState("polling for results");
			await this.pollForResults();
			return this;
		} catch (e) {
			await this.browser.quit();
			this.results = e;
			this.setState("error");
			return this;
		}
	}

	setState(newState) {
		this.state = newState;
		this.lastUpdateTime = Date.now();
	}

	getResultSummary() {
		if (!this.results) throw new Error("Results not available yet");
		return {
			passed: this.results.passed,
			failed: this.results.failed,
			failingTests: this.results.tests,
			failingSuites: this.results.failingSuites ? Object.keys(this.results.failingSuites) : [],
			testedSuites: Array.from(this.results.testedSuites)
		};
	}
};
