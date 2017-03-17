'use strict';

const fs = require('fs');
const diff = require('diff');

const polyfill = fs.readFileSync('./polyfill.js', 'utf8');
const patch = fs.readFileSync('./patch.jsdiff', 'utf8');

const patched = diff.applyPatch(polyfill, patch);
fs.writeFileSync('./polyfill.js', patched);
