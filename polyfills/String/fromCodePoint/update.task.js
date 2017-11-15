/* eslint-env node */
'use strict';

const fs = require('fs');
const diff = require('diff');
const path = require('path');

const polyfill = fs.readFileSync(path.join(__dirname, './polyfill.js'), 'utf8');
const patch = fs.readFileSync(path.join(__dirname, './patch.jsdiff'), 'utf8');

const patched = diff.applyPatch(polyfill, patch);

if (patched === false) {
	throw new Error('patch did not apply cleanly');
}
fs.writeFileSync(path.join(__dirname, './polyfill.js'), patched);
