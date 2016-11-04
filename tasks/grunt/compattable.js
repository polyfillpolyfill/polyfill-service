'use strict';
const _ = require('lodash');

// All elements of A (this) that also belong to B (other)
function intersection(a, b) {
	return new Set(Array.from(b).filter(value => a.has(value)));
};

// Relative complement of this (A) and other (B)
// Returns the set of objects in other (B) but not in this (A)
function difference(a, b) {
	return new Set(Array.from(b).filter(value => !a.has(value)));
};


module.exports = function(grunt) {
	const fs = require('fs');
	const path = require('path');
	const testResultsPath = path.join(__dirname, '../../test/results');
	const file = path.join(testResultsPath, 'results.json');
	const compatFile = path.join(__dirname, '/../../docs/assets/compat.json');

	grunt.registerTask('compattable', 'Create a compatibility table', function() {
		const done = this.async();
		fs.readFile(file, (err, filedata) => {
			grunt.log.writeln('Reading test result data');
			if (err && err.code !== 'ENOENT') {
				throw err;
			}

			const compat = filedata ? JSON.parse(filedata) : {};

			const builtCompatTable = {};

			Object.keys(compat).forEach(browserName => {
				const versions = compat[browserName];
				Object.keys(versions).forEach(version => {
					const testResults = versions[version];
					if (!testResults.all || !testResults.control) {
						throw new Error("Missing test results for " + browserName + "/" + version);
					}

					const allTests = new Set(Array.from(testResults.control.testedSuites));
					const failedNative = new Set(Array.from(testResults.control.failingSuites));
					const failedPolyfilled = new Set(Array.from(testResults.all.failingSuites));

					const missing = intersection(failedNative, failedPolyfilled);
					const polyfilled = difference(failedPolyfilled, failedNative);
					const native = difference(failedNative, allTests);

					function buildData(support) {
						return function(feature) {
							if (!builtCompatTable[feature]) {
								builtCompatTable[feature] = {};
							}

							if (!builtCompatTable[feature][browserName]) {
								builtCompatTable[feature][browserName] = {};
							}

							builtCompatTable[feature][browserName][version] = support;
						};
					};

					native.forEach(buildData('native'));
					polyfilled.forEach(buildData('polyfilled'));
					missing.forEach(buildData('missing'));
				});
			});

			// HACK: Where on earth is '1' coming from?!?
			if (builtCompatTable['1']) {
				delete builtCompatTable['1'];
			}

			fs.readFile(compatFile, (err, filedata) => {

				fs.writeFile(compatFile, JSON.stringify(_.merge(JSON.parse(filedata),builtCompatTable), null, 2), err => {
					if (err) {
						throw err;
					}

					grunt.log.oklns("Updated compat.json");
					done(true);

				});
			});
		});
	});
};
