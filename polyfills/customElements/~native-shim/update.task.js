/* eslint-env node */

// Minify the file with Babili, since we do not want to transpile from
// ES6 -> ES5 since Uglify can't handle that yet

const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const babel = require('babel-core');

const polyfillPath = join(__dirname, 'polyfill.js');

const sourceFile = readFileSync(polyfillPath);
const transpiled = babel.transform(sourceFile, {
	presets: ['babili']
});

// Only evaluate the code if it can handle ES6 and the polyfill hasn't been loaded
// If `CustomElementRegistry` is defined, then the browser has native element support
const outputCode = `window.customElements && CustomElementRegistry && eval("${transpiled.code}");`;

writeFileSync(polyfillPath, outputCode);
