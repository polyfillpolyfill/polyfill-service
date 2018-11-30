"use strict";

const fs = require('fs');
const path = require('path');
const execa = require('execa');

function directoriesWithFiles(directory) {
	// Recursively discover all subfolders which contain files and produce a flattened list.
	const isFile = pathName => fs.lstatSync(pathName).isFile();
	const isDirectory = pathName => fs.lstatSync(pathName).isDirectory();
	const directoryHasFiles = pathName => isDirectory(pathName) && fs.readdirSync(pathName).map(fileName => path.join(pathName, fileName)).filter(isFile).length > 0;
	let results = [];
	for (const item of fs.readdirSync(directory)) {
		const joined = path.join(directory, item);
		if (isDirectory(joined)) {
			results = results
				.concat(directoriesWithFiles(joined))
				.concat(directoryHasFiles(joined) ? joined : []);
		}
	}
	return results;
}
const polyfillsDirectory = path.join(__dirname, '../../polyfills');
const polyfillDirectories = directoriesWithFiles(polyfillsDirectory);
const polyfillDirectoriesWhichHaveTests = polyfillDirectories.filter(directory => fs.readdirSync(directory).includes('tests.js'));

(async function () {
	let feature;
	try {
		for (feature of polyfillDirectoriesWhichHaveTests) {
			console.log(`Testing ${feature}`);
			const result = execa('karma', ['start', path.join(__dirname, 'karma-browserstack.conf.js'), `--feature=${feature}`]);
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
