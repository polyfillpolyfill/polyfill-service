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

const installPolyfill = _.restParam(function(polyfillOutputFolder, polyfillSourcePaths) {
	const polyfillOutputPath = path.join(polyfillOutputFolder, 'polyfill.js');
	const polyfillAlreadyExists = existsSync(polyfillOutputPath);
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

});

module.exports = installPolyfill;
