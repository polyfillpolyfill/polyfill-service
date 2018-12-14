"use strict";

const path = require('path');
const execa = require('execa');
const globby = require('globby');

(async function () {
	let feature;
	try {
		// This turns ./polyfills/Array/from/tests.js into Array.from, which is the format that the Karma config accepts in the `--features` flag.
		const polyfillsWhichHaveTests = await globby(['polyfills/**/tests.js', '!polyfills/__dist'], { transform: (entry) => entry.replace('polyfills/', '').replace('/tests.js','').replace(/\//g, '.') });
		for (feature of polyfillsWhichHaveTests) {
			console.log(`Testing ${feature}`);
			const result = execa('karma', ['start', path.join(__dirname, '../../', 'karma.conf.js'), `--browserstack`, `--features=${feature}`]);
			result.stdout.pipe(process.stdout);
			result.stderr.pipe(process.stderr);
			await result;
		}
	} catch (err) {
		console.log(`Errors found testing ${feature}`);
		console.error(err.stderr || err.stdout);
		console.log(`Errors found testing ${feature}`);
		process.exit(1);
	}
}());
