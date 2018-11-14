"use strict";

global.Promise = require("bluebird");
// Enable long stack traces
Promise.config({
	longStackTraces: true
});

// By default, promises fail silently if you don't attach a .catch() handler to them.
//This tool keeps track of unhandled rejections globally. If any remain unhandled at the end of your process, it logs them to STDERR and exits with code 1.
const loudRejection = require("loud-rejection");
// Install the unhandledRejection listeners
loudRejection();

const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
	path: path.join(__dirname, "../../.env")
});
const fs = require("fs-extra");
const argv = require("minimist")(process.argv.slice(2));
const cli = require("cli-color");
const _ = require("lodash");
const UA = require("./../../../polyfill-library/lib/UA");
const TestJob = require("./test-job");

// Grab all the browsers from BrowserStack which are officially supported by the polyfil service.
const browsers = require("./browsers.json").filter(uaString => new UA(uaString).meetsBaseline());

const printProgress = (function() {
	let previousPrint;
	return jobs => {
		const out = ["-".repeat(80)];
		let readyCount = 0;
		jobs.forEach(job => {
			let msg = "";
			switch (job.state) {
				case "complete": {
					if (job.results.failed) {
						msg = cli.red(`✘ ${job.results.total} tests, ${job.results.failed} failures`);
					} else {
						msg = cli.green(`✓ ${job.results.total} tests`);
					}
					msg += `  ${job.duration} seconds to complete`;
					break;
				}
				case "error": {
					msg = cli.red(`⚠️  ${job.results}`);
					break;
				}
				case "ready": {
					readyCount += 1;
					break;
				}
				case "running": {
					msg = job.results.runnerCompletedCount + "/" + job.results.runnerCount;
					if (job.results.failed) {
						msg += cli.red("  ✘ " + job.results.failed);
					}
					const timeWaiting = Math.floor((Date.now() - job.lastUpdateTime) / 1000);
					if (timeWaiting > 5) {
						msg += cli.yellow("  🕒  " + timeWaiting + "s");
					}
					break;
				}
				default: {
					msg = job.state;
					const timeWaiting = Math.floor((Date.now() - job.lastUpdateTime) / 1000);
					if (timeWaiting > 5) {
						msg += cli.yellow("  🕒  " + timeWaiting + "s");
					}
				}
			}
			if (msg) {
				out.push(` • Browser: ${job.ua.padEnd(" ", 20)} Testing mode: ${job.mode.padEnd(" ", 8)} ${msg}`);
			}
		});
		if (readyCount) {
			out.push(" + " + readyCount + " job(s) queued");
		}
		const print = out.join("\n") + "\n";
		if (previousPrint !== print) {
			process.stdout.write(print);
		}
		previousPrint = print;
	};
})();

(async function() {
	try {
		const testResultsFile = path.join(__dirname, "../../test/results", "results.json");
		const testResults = {};
		const testProvider = require("./browserstack");
		const pollTick = 100;
		const testBrowserTimeout = 60000;
		const serviceHost = process.env.BROWSER_TEST_HOST || "http://localhost:3000";
		const useLocalTunnel = new URL(serviceHost).hostname === "localhost";
		const mode = ["all", "targeted", "control"].filter(x => x in argv)[0] || "targeted";
		const concurrency = Number.parseInt(process.env.BROWSER_TEST_CONCURRENCY || 5, 10);
		const url = serviceHost + "/test/director?mode=" + mode;
		const tunnelId = "build:" + (process.env.CIRCLE_BUILD_NUM || process.env.NODE_ENV || "null") + "_" + new Date().toISOString();
		const jobs = browsers.map(browser => new TestJob(url, mode, browser, tunnelId, testProvider.creds, testBrowserTimeout, pollTick, testProvider, useLocalTunnel));
		const tunnel = useLocalTunnel ? testProvider.tunnel(useLocalTunnel) : undefined;

		if (useLocalTunnel) {
			await tunnel.openTunnel();
		}

		const cliFeedbackTimer = setInterval(() => printProgress(jobs), pollTick);
		// Run jobs within concurrency limits
		await new Promise((resolve, reject) => {
			const results = [];
			let resolvedCount = 0;
			function pushJob() {
				results.push(
					jobs[results.length]
						.run()
						.then(job => {
							if (job.state === "complete") {
								const [family, version] = job.ua.split("/");
								_.set(testResults, [family, version, job.mode], job.getResultSummary());
							}
							resolvedCount++;
							if (results.length < jobs.length) {
								pushJob();
							} else if (resolvedCount === jobs.length) {
								resolve();
							}
							return job;
						})
						.catch(e => {
							console.log(e.stack || e);
							reject(e);
						})
				);
			}
			for (let i = 0; i < concurrency && i < jobs.length; i++) {
				pushJob();
			}
		});

		await fs.outputJSON(testResultsFile, testResults);
		clearTimeout(cliFeedbackTimer);
		printProgress(jobs);

		if (useLocalTunnel) {
			await tunnel.closeTunnel().then(() => console.log("Tunnel closed"));
		}

		const totalFailureCount = jobs.reduce((out, job) => out + (job.state === "complete" ? job.results.failed : 1), 0);
		if (totalFailureCount) {
			console.log(cli.bold.white("\nFailures:"));
			jobs.forEach(job => {
				if (job.results && job.results.tests) {
					job.results.tests.forEach(test => {
						console.log(" - " + job.ua + ":");
						console.log("    -> " + test.name);
						console.log("       " + url.replace(/test\/director/, "test/tests") + "&feature=" + test.failingSuite);
						console.log("       " + test.message);
					});
				} else if (job.state !== "complete") {
					console.log(" • " + job.ua + " (" + job.mode + "): " + cli.red(job.results || "No results"));
				}
			});
			console.log("");
			throw new Error("Failures detected");
		}
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
		process.exit(1);
	}
})();
