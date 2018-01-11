'use strict';

const fs = require('fs');
const path = require('path');
const denodeify = require('denodeify');
const glob = denodeify(require('glob'));
const crypto = require('crypto');
const existsSync = require('exists-sync');

const cwd = path.join(__dirname, '../../');
const globOptions = { cwd: cwd };

const md5 = contents => crypto.createHash('md5').update(contents).digest('hex');

const loadSource = polyfillPaths => {
	return polyfillPaths.map(p => fs.readFileSync(p)).join('');
};

const installPolyfill = config => {
    const polyfillOutputFolder = path.dirname(config.src);
	const polyfillOutputPath = path.join(polyfillOutputFolder, 'polyfill.js');
	const polyfillAlreadyExists = existsSync(polyfillOutputPath);

	const polyfillSourcePaths = (config.install.paths || [''])
        .map(p => require.resolve(path.join(config.install.module, p)))
    ;
	const newPolyfill = loadSource(polyfillSourcePaths);

	const logPrefix = path.basename(polyfillOutputFolder) + ': ';
	if (polyfillAlreadyExists) {
		const currentPolyfillHash = md5(fs.readFileSync(polyfillOutputPath));
		const newPolyfillHash = md5(newPolyfill);
		if (newPolyfillHash === currentPolyfillHash) {
			console.log(logPrefix + 'No change');
            return;
		} else {
			console.log(logPrefix + 'Polyfill updated, replacing old version');
			fs.unlinkSync(polyfillOutputPath);
		}
    } else {
        console.log(logPrefix + 'New polyfill');
    }

    polyfillSourcePaths.map(p => console.log('  from '+path.relative(cwd, p)));
    fs.writeFileSync(polyfillOutputPath, newPolyfill);

	if (config.install.postinstall) {
		console.log(' * Running module-specific update task ' + config.install.postinstall);
		require(path.resolve(polyfillOutputFolder, config.install.postinstall));
	}
};

console.log('Updating third-party polyfills...');
glob('polyfills/**/config.json', globOptions)
    .then(files => {
        files
			.map(src => {
				try {
					return Object.assign({ src }, JSON.parse(fs.readFileSync(src)));
				} catch (e) {
					throw new Error('Failed on ' + src + '. Error: ' + e);
				}
			})
            .filter(config => 'install' in config)
            .forEach(installPolyfill);
        ;
    })
    .then(() => console.log('Polyfills updated successfully'))
    .catch(e => {
        console.log(e);
        process.exit(1);
    })
;
