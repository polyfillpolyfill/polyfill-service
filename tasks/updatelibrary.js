'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const _ = require('lodash');
const existsSync = require('exists-sync');
function hash (contents) {
	return crypto.createHash('md5').update(contents).digest('hex');
}

function sum (a, b) {
	return a + b;
}

function constructPolyfill(polyfillPaths) {
	const polyfills = polyfillPaths.map(_.ary(fs.readFileSync, 1));
	return polyfills.reduce(sum, '');
}

const installPolyfill = function(polyfillOutputFolder, module, polyfillSourcePaths) {
	const polyfillOutputPath = path.join(polyfillOutputFolder, 'polyfill.js');
	const polyfillAlreadyExists = existsSync(polyfillOutputPath);

	polyfillSourcePaths = polyfillSourcePaths || [''];
	polyfillSourcePaths = polyfillSourcePaths.map(polyfillPath => path.join(module, polyfillPath))
	polyfillSourcePaths = polyfillSourcePaths.map(path => require.resolve(path));

	console.log(`Importing polyfill/s from ${polyfillSourcePaths.join(',')}`);
	const newPolyfill = constructPolyfill(polyfillSourcePaths);

	if (polyfillAlreadyExists) {
		const currentPolyfill = fs.readFileSync(polyfillOutputPath);
		const currentPolyfillHash = hash(currentPolyfill);
		const newPolyfillHash = hash(newPolyfill);

		if (newPolyfillHash === currentPolyfillHash) {
			console.log('Polyfill has not changed.');
			return;
		} else {
			console.log('Polyfill has changed. Deleting old polyfill.');
			fs.unlinkSync(polyfillOutputPath);
		}
  }

	fs.writeFileSync(polyfillOutputPath, newPolyfill);
	console.log('Polyfill imported successfully');

};

module.exports = function(grunt) {

	grunt.registerMultiTask('updatelibrary', 'Update Polyfill imported from external libraries', function() {
		this.files.forEach(function (file) {
			const configs = file.src.map(src => Object.assign({src}, {
				config: JSON.parse(fs.readFileSync(src)),
			}));
			configs.filter(function(config) {
				return typeof config.config.module === 'string';
			}).forEach(function(config){
				const polyfillDirectory = path.resolve(__dirname, path.relative(__dirname, path.dirname(config.src)));
				installPolyfill(polyfillDirectory, config.config.module, config.config.paths);
				grunt.log.writeln('-------------');
				if (config.config.postinstall) {
					require(path.resolve(polyfillDirectory, config.config.postinstall))();
				}
			});
		});

		grunt.log.writeln('Polyfills updated successfully');
	});
};
