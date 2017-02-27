/* eslint-env mocha */

"use strict";

const assert = require('proclaim');
const mockery = require('mockery');

require('sinon-as-promised');

describe("polyfillio", () => {
	const packageMock = {};
	let fs;
	let path;
	let tsort;
	let createAliasResolver;
	let UA;
	let sourceslib;
	let handlebars;
	let lodash;
	let streamFromPromise;
	let lazystream;
	let from2String;
	let merge2;
	let streamToString;

	let polyfillio;


	beforeEach(() => {
		fs = require('../mock/fs.mock');
		mockery.registerMock('graceful-fs', fs);

		path = require('../mock/path.mock');
		mockery.registerMock('path', path);

		tsort = require('../mock/tsort.mock');
		mockery.registerMock('tsort', tsort);

		createAliasResolver = require('../mock/aliases.mock');
		mockery.registerMock('./aliases', createAliasResolver);

		UA = require('../mock/ua.mock');
		mockery.registerMock('./UA', UA);

		sourceslib = require('../mock/sources.mock');
		mockery.registerMock('./sources', sourceslib);

		mockery.registerMock('package', packageMock);

		handlebars = require('../mock/handlebars.mock');
		mockery.registerMock('handlebars', handlebars);

		lodash = require('../mock/lodash.mock');
		mockery.registerMock('lodash', lodash);

		streamFromPromise = require('../mock/stream-from-promise.mock');
		mockery.registerMock('stream-from-promise', streamFromPromise);

		lazystream = require('../mock/lazystream.mock');
		mockery.registerMock('lazystream', lazystream);

		from2String = require('../mock/from2-string.mock');
		mockery.registerMock('from2-string', from2String);

		merge2 = require('../mock/merge2.mock');
		mockery.registerMock('merge2', merge2);

		streamToString = require('../mock/stream-to-string.mock');
		mockery.registerMock('stream-to-string', streamToString);

		polyfillio = require('../../../lib/index');

	});

	describe('exports', () => {
		it('exports an object', () => {
			assert.isObject(polyfillio);
		});

		it('describePolyfill is an exported function', () => {
			assert.isFunction(polyfillio.describePolyfill);
		});

		it('listAllPolyfills is an exported function', () => {
			assert.isFunction(polyfillio.listAllPolyfills);
		});

		it('getPolyfills is an exported function', () => {
			assert.isFunction(polyfillio.getPolyfills);
		});

		it('getPolyfillString is an exported function', () => {
			assert.isFunction(polyfillio.getPolyfillString);
		});

		it('normalizeUserAgent is an exported function', () => {
			assert.isFunction(polyfillio.normalizeUserAgent);
		});
	});

	describe('.listAllPolyfills()', () => {
		it('calls and returns sourceslib.listPolyfills() without passing argument', () => {
			sourceslib.listPolyfills.returns('return value for sourceslib.listPolyfills');
			assert.equal(polyfillio.listAllPolyfills('test'), 'return value for sourceslib.listPolyfills');
			assert.calledOnce(sourceslib.listPolyfills);
			assert.neverCalledWith(sourceslib.listPolyfills, 'test');
		});
	});

	describe('.describePolyfill()', () => {
		it('calls and returns sourceslib.describePolyfill() with passed argument', () => {
			sourceslib.getPolyfill.returns('return value for sourceslib.getPolyfill');
			assert.equal(polyfillio.describePolyfill('test'), 'return value for sourceslib.getPolyfill');
			assert.calledOnce(sourceslib.getPolyfill);
			assert.calledWithExactly(sourceslib.getPolyfill, 'test');
		});
	});

	describe('.normalizeUserAgent()', () => {
		it('calls and returns UA.normalize() with passed argument and UA', () => {
			UA.normalize.returns('return value for UA.normalize');
			assert.equal(polyfillio.normalizeUserAgent('test'), 'return value for UA.normalize');
			assert.calledOnce(UA.normalize);
			assert.calledWithExactly(UA.normalize, 'test');
		});
	});
});
