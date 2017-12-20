/* eslint-env mocha */
"use strict";

const assert = require('proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/sources', () => {
	let aliases;
	let denodeify;
	let fs;
	let sources;
	let process;
	let consoleMock;
	let pathMock;

	beforeEach(() => {
		denodeify = require('../mock/denodeify.mock');
		mockery.registerMock('denodeify', denodeify);

		fs = require('../mock/graceful-fs.mock');
		mockery.registerMock('graceful-fs', fs);
		fs.readdirSync.returns([]);

		process = require('../mock/process.mock');
		mockery.registerMock('process', process);

		consoleMock = require('../mock/console.mock');
		mockery.registerMock('console', consoleMock);

		pathMock = require('../mock/path.mock');
		mockery.registerMock('path', pathMock);

		aliases = {};
		mockery.registerMock('../polyfills/__dist/aliases.json', aliases);
	});

	it('exports an object', () => {
		sources = require('../../../lib/sources');
		assert.isObject(sources);
	});

	it('has a polyfillExistsSync method', () => {
		sources = require('../../../lib/sources');
		assert.isFunction(sources.polyfillExistsSync);
	});

	it('has a getPolyfillMetaSync method', () => {
		sources = require('../../../lib/sources');
		assert.isFunction(sources.getPolyfillMetaSync);
	});

	it('has a listPolyfillsSync method', () => {
		sources = require('../../../lib/sources');
		assert.isFunction(sources.listPolyfillsSync);
	});

	it('has a listPolyfills method', () => {
		sources = require('../../../lib/sources');
		assert.isFunction(sources.listPolyfills);
	});

	it('has a getConfigAliasesSync method', () => {
		sources = require('../../../lib/sources');
		assert.isFunction(sources.getConfigAliasesSync);
	});

	it('has a streamPolyfillSource method', () => {
		sources = require('../../../lib/sources');
		assert.isFunction(sources.streamPolyfillSource);
	});

	it('has a getPolyfill method', () => {
		sources = require('../../../lib/sources');
		assert.isFunction(sources.getPolyfill);
	});

	it('reads the polyfill directory', () => {
		pathMock.join.returnsArg(1);
		sources = require('../../../lib/sources');
		assert.calledWithExactly(fs.readdirSync, '../polyfills/__dist');
	});

	it('filters out json files from the polyfill directory', () => {
		const spy = sinon.spy(Array.prototype, 'filter');
		sources = require('../../../lib/sources');
		spy.restore();
		assert.equal(spy.lastCall.args[0]('aliases.json'), false);
		assert.equal(spy.lastCall.args[0]('example.json'), false);
	});

	it('catches errors when reading the polyfill directory, logs a friendly error message and exits', () => {
		const error = new Error;
		fs.readdirSync.throws(error);
		assert.doesNotThrow(() => require('../../../lib/sources'));
		assert.calledOnce(consoleMock.log);
		assert.calledWithExactly(process.exit, 1);
	});

	describe('sources.polyfillExistsSync()', () => {
		it('returns true if polyfill exists', () => {
			fs.readdirSync.returns(['featureToPolyfill']);
			sources = require('../../../lib/sources');
			assert.equal(sources.polyfillExistsSync('featureToPolyfill'), true);
		});

		it('returns false if polyfill exists', () => {
			fs.readdirSync.returns(['featureToPolyfill']);
			sources = require('../../../lib/sources');
			assert.equal(sources.polyfillExistsSync('Array.from'), false);
		});
	});

	describe('sources.listPolyfills()', () => {
		it('returns a promise which resolves with an array containing names for each polyfilled feature', () => {
			fs.readdirSync.returns(['Array.from', 'Symbol']);
			sources = require('../../../lib/sources');
			return sources.listPolyfills().then(polyfills => assert.deepEqual(polyfills, ['Array.from', 'Symbol']));
		});
	});

	describe('sources.getConfigAliasesSync()', () => {
		it('returns an array of polyfills which are under the alias', () => {
			const polyfills = ["Array.from", "Array.of", "Map", "Object.assign", "Object.is", "Promise", "Set", "Symbol", "WeakMap", "WeakSet"];
			aliases["es6"] = polyfills;
			sources = require('../../../lib/sources');
			assert.deepEqual(sources.getConfigAliasesSync('es6'), polyfills);
		});

		it('returns a promise which resolves to undefined if alias does not exist', () => {
			const polyfills = ["Array.from", "Array.of", "Map", "Object.assign", "Object.is", "Promise", "Set", "Symbol", "WeakMap", "WeakSet"];
			aliases["es6"] = polyfills;
			sources = require('../../../lib/sources');
			assert.isUndefined(sources.getConfigAliasesSync('es7'));
		});
	});

	describe('sources.getPolyfill()', () => {
		it('returns a promise which resolves to null if the polyfill does not exist', () => {
			fs.readdirSync.returns(['Array.from']);
			sources = require('../../../lib/sources');
			return sources.getPolyfill('Array.of').then(polyfill => assert.equal(polyfill, null));
		});

		it('retrieves polyfill from polyfill folder', () => {
			const arrayFromPolyfill = {
				"aliases": ["es6"],
				"browsers": {
					"chrome": "<45"
				},
				"dependencies": ["Object.defineProperty"]
			};
			fs.readFile.resolves(JSON.stringify(arrayFromPolyfill));
			denodeify.returns(fs.readFile);
			fs.readdirSync.returns(['Array.from']);
			pathMock.join.withArgs('../polyfills/__dist', 'Array.from', 'raw.js').returns('../polyfills/__dist/Array.from/raw.js');
			pathMock.join.withArgs('../polyfills/__dist', 'Array.from', 'min.js').returns('../polyfills/__dist/Array.from/min.js');
			pathMock.join.returnsArg(1);

			sources = require('../../../lib/sources');

			return sources.getPolyfill('Array.from').then(() => {
				assert.calledWithExactly(fs.readFile, '../polyfills/__dist/Array.from/min.js', 'utf-8');
				assert.calledWithExactly(fs.readFile, '../polyfills/__dist/Array.from/raw.js', 'utf-8');
			});
		});

		it('adds polyfill name to polyfill object', () => {
			const arrayFromPolyfill = {
				"aliases": ["es6"],
				"browsers": {
					"chrome": "<45"
				},
				"dependencies": ["Object.defineProperty"]
			};
			fs.readFile.resolves(JSON.stringify(arrayFromPolyfill));
			denodeify.returns(fs.readFile);
			fs.readdirSync.returns(['Array.from']);

			sources = require('../../../lib/sources');

			return sources.getPolyfill('Array.from').then(polyfill => {
				assert.equal(polyfill.name, 'Array.from');
				delete polyfill.name;
				assert.deepEqual(polyfill, {
					minSource: JSON.stringify(arrayFromPolyfill),
					rawSource: JSON.stringify(arrayFromPolyfill)
				});
			});
		});
	});

	describe('sources.getPolyfillMetaSync()', () => {
		const metadata = {
			"aliases": ["es6"],
			"browsers": {
				"chrome": "<45"
			},
			"dependencies": ["Object.defineProperty"],
			"spec": "https://tc39.github.io/ecma262/#sec-array.from",
			"docs": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from"
		};

		beforeEach(() => {
			fs.readdirSync.returns(['Array.from']);
			fs.readFileSync.returns(JSON.stringify(metadata));
		});

		it('returns the metadata for a feature if it exists', () => {
			sources = require('../../../lib/sources');
			assert.deepEqual(sources.getPolyfillMetaSync('Array.from'), metadata);
		});

		it('returns undefined for a feature if it does not exist', () => {
			sources = require('../../../lib/sources');
			assert.isUndefined(sources.getPolyfillMetaSync('Array.of'));
		});
	});

	describe('sources.listPolyfillsSync()', () => {
		it('returns an array containing names for each polyfilled feature', () => {
			fs.readdirSync.returns(['Array.from', 'Symbol']);
			sources = require('../../../lib/sources');
			assert.deepEqual(sources.listPolyfillsSync(), ['Array.from', 'Symbol']);
		});
	});

	describe('sources.streamPolyfillSource()', () => {
		it('returns a read-stream', () => {
			pathMock.join.resetHistory();
			pathMock.join.withArgs('../polyfills/__dist', 'Array.from', 'min.js').returns('../polyfills/__dist/Array.from/min.js');
			pathMock.join.returnsArg(1);

			sources = require('../../../lib/sources');
			sources.streamPolyfillSource('Array.from', 'min');
			assert.calledWithExactly(fs.createReadStream, '../polyfills/__dist/Array.from/min.js',
				{ encoding: 'UTF-8' });
		});
	});
});
