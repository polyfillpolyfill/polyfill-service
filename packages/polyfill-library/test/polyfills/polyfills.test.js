/* eslint-env mocha */

"use strict";

const proclaim = require('proclaim');
const fs = require('fs');
const path = require('path');
const spdxLicenseList = require('spdx-license-list');
const semver = require("semver");
const {
	URL
} = require('url');

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
const polyfillDirectoryToName = pathName => path.relative(polyfillsDirectory, pathName).replace(/(\/|\\)/g, '.');
const polyfillNames = polyfillDirectories.map(polyfillDirectoryToName);

for (const polyfillDirectory of polyfillDirectories) {
	const name = polyfillDirectoryToName(polyfillDirectory);
	describe(name, function () {
		const configFilePath = path.join(polyfillDirectory, 'config.json');
		it('has a config file', function () {
			proclaim.isTrue(fs.existsSync(configFilePath), `Expected configuration for ${name} polyfill to exist at ${configFilePath} but no file was found.`);
		});
		it('is valid JSON', function () {
			proclaim.doesNotThrow(function () {
				JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
			});
		});
		describe('config file', function () {
			const config = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
			it('has a licence field which contains a valid licence', function () {
				proclaim.include(config, 'license', `Expected configuration for ${name} polyfill (${configFilePath}) to have a licence field but none was found.`);
				proclaim.isString(config.license);
				proclaim.doesNotInclude(config, 'licence');
				// We allow CC0-1.0 and WTFPL as they are GPL compatible.
				// https://www.gnu.org/licenses/license-list.html#WTFPL
				// https://www.gnu.org/licenses/license-list.en.html#CC0
				if (config.license !== 'CC0-1.0' && config.license !== 'WTFPL') {
                    proclaim.include(spdxLicenseList, config.license, `The license for ${name} is ${config.license} which is not on the SPDX list of licenses ( https://spdx.org/licenses/ ).`);
					proclaim.isTrue(spdxLicenseList[config.license].osiApproved, `The license for ${name} is ${config.license} (${spdxLicenseList[config.license].name}) which is not OSI approved.`);
				}
			});
			it('has a browsers field which contains only browsers supported by the service', function () {
				proclaim.include(config, 'browsers');
				proclaim.isObject(config.browsers);
				for (const [browser, range] of Object.entries(config.browsers)) {
					if (!semver.validRange(range)) {
						throw new Error(`${name} contains an invalid SemVer range for ${browser}.`);
					}
				}
			});
			if ('aliases' in config) {
				it('has an aliases field', function () {
					proclaim.include(config, 'aliases', `Expected configuration for ${name} polyfill (${configFilePath}) to have an aliases field but none was found.`);
					proclaim.isArray(config.aliases);
					// TODO: Should we have a strict set of aliases?
				});
			}
			it('has an dependencies field and all dependencies exist', function () {
				proclaim.include(config, 'dependencies', `Expected configuration for ${name} polyfill (${configFilePath}) to have a dependencies field but none was found.`);
				proclaim.isArray(config.dependencies);
				for (const dependency of config.dependencies) {
					proclaim.include(polyfillNames, dependency, `${name} depends on ${dependency}, which does not exist within the polyfill-service. Recommended to either add the missing polyfill or remove the dependency.`);
				}
				proclaim.isTrue(config.dependencies.length === (new Set(config.dependencies)).size, `${name} contains duplicate dependencies. Dependencies should only be included once.`);
			});
			if ('repo' in config) {
				it('has a repo field', function () {
					proclaim.include(config, 'repo', `Expected configuration for ${name} polyfill (${configFilePath}) to have an repo field but none was found.`);
					proclaim.isString(config.repo);
					proclaim.doesNotThrow(function () {
						new URL(config.repo);
					}, `Expected configuration for ${name} polyfill (${configFilePath}) to have an repo field which is a URL but found: ${config.repo}.`);
					// TODO: Should return a 200 status code?
				});
			}
			if (!name.startsWith('_')) {
				it('has a docs field', function () {
					proclaim.include(config, 'docs', `Expected configuration for ${name} polyfill (${configFilePath}) to have an docs field but none was found.`);
					proclaim.isString(config.docs);
					proclaim.doesNotThrow(function () {
						new URL(config.docs);
					});
					// TODO: Should return a 200 status code?
				});
			}
			if ('spec' in config) {
				it('has a spec field', function () {
					proclaim.include(config, 'spec', `Expected configuration for ${name} polyfill (${configFilePath}) to have an spec field but none was found.`);
					proclaim.isString(config.spec);
					proclaim.doesNotThrow(function () {
						new URL(config.spec);
					});
					// TODO: Should return a 200 status code?
				});
			}
			if ('notes' in config) {
				it('has a notes field', function () {
					proclaim.include(config, 'notes', `Expected configuration for ${name} polyfill (${configFilePath}) to have an notes field but none was found.`);
					proclaim.isArray(config.notes);
					for (const note of config.notes) {
						proclaim.isString(note);
					}
				});
			}
			// config.build.minify
			// config.test.ci
			// config.install.module
			// config.install.paths
			// config.install.postinstall
		});
		it('has a polyfill file');
		it('has a detect file');
		it('has a tests file');
	});
}
