'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const existsSync = require('exists-sync');
function md5 (contents) {
	return crypto.createHash('md5').update(contents).digest('hex');
}

function loadSource(polyfillPaths) {
	const polyfills = polyfillPaths.map((polyfill) => fs.readFileSync(polyfill));
	return polyfills.join('');
}

const installPolyfill = function(grunt, polyfillOutputFolder, { module, paths:polyfillSourcePaths, postinstall }) {
	const polyfillOutputPath = path.join(polyfillOutputFolder, 'polyfill.js');
	const polyfillAlreadyExists = existsSync(polyfillOutputPath);

	polyfillSourcePaths = polyfillSourcePaths || [''];
	polyfillSourcePaths = polyfillSourcePaths.map(polyfillPath => path.join(module, polyfillPath));
	console.log(polyfillSourcePaths);
	polyfillSourcePaths = polyfillSourcePaths.map(path => require.resolve(path));

	grunt.log.writeln(`Creating polyfill for ${path.basename(polyfillOutputFolder)}:
	importing polyfill/s from ${polyfillSourcePaths.map(p => path.relative(__dirname, p)).join(',\n')}`);
	const newPolyfill = loadSource(polyfillSourcePaths);

	if (polyfillAlreadyExists) {
		const currentPolyfill = fs.readFileSync(polyfillOutputPath);
		const currentPolyfillHash = md5(currentPolyfill);
		const newPolyfillHash = md5(newPolyfill);

		if (newPolyfillHash === currentPolyfillHash) {
			grunt.log.writeln('Polyfill has not changed.');
		} else {
			grunt.log.writeln('Polyfill has changed. Deleting old polyfill.');
			fs.unlinkSync(polyfillOutputPath);
			fs.writeFileSync(polyfillOutputPath, newPolyfill);
		}
  } else {
		fs.writeFileSync(polyfillOutputPath, newPolyfill);
	}

	if (postinstall) {
		grunt.log.writeln('Running update task');
		require(path.resolve(polyfillOutputFolder, postinstall))(grunt);
	}

	grunt.log.writeln('Polyfill imported successfully');

};

module.exports = function(grunt) {

	grunt.registerMultiTask('updatelibrary', 'Update polyfills imported from external libraries', function() {
		this.files.forEach(function (file) {
			const configs = file.src.map(src => Object.assign({src}, {
				config: JSON.parse(fs.readFileSync(src)),
			}));
			configs.filter(function(config) {
				return 'install' in config.config;
			}).forEach(function(config){
				const polyfillDirectory = path.resolve(__dirname, path.relative(__dirname, path.dirname(config.src)));
				installPolyfill(grunt, polyfillDirectory, config.config.install);
				grunt.log.writeln('-------------');
			});
		});

		grunt.log.writeln('Polyfills updated successfully');
	});
};
