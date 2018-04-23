/* eslint-env node */
'use strict';

var fs = require('fs');
var diff = require('diff');
var process = require('process');
var path = require('path');

var polyfill = fs.readFileSync(path.join(__dirname, './polyfill.js'), 'utf8');
var patch = fs.readFileSync(path.join(__dirname, './patch.jsdiff'), 'utf8');

var patched = diff.applyPatch(polyfill, patch);

if (patched === false) {process.exit(1);}
fs.writeFileSync(path.join(__dirname, './polyfill.js'), patched);
