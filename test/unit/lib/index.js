/* eslint-env mocha */

"use strict";

const assert = require('proclaim');
const sinon = require('sinon');
const mockery = require('mockery');
const setsToArrays = require('../../utils/sets_to_arrays');

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
		fs = require('../mock/graceful-fs.mock');
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

	});

	describe('exports', () => {
		beforeEach(() => {
			polyfillio = require('../../../lib/index');
		});

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
		beforeEach(() => {
			polyfillio = require('../../../lib/index');
		});

		it('calls and returns sourceslib.listPolyfills() without passing argument', () => {
			sourceslib.listPolyfills.returns('return value for sourceslib.listPolyfills');
			assert.equal(polyfillio.listAllPolyfills('test'), 'return value for sourceslib.listPolyfills');
			assert.calledOnce(sourceslib.listPolyfills);
			assert.neverCalledWith(sourceslib.listPolyfills, 'test');
		});
	});

	describe('.describePolyfill()', () => {
		beforeEach(() => {
			polyfillio = require('../../../lib/index');
		});

		it('calls and returns sourceslib.getPolyfillMetaSync() with passed argument', () => {
			sourceslib.getPolyfillMetaSync.returns('return value for sourceslib.getPolyfillMetaSync');
			return polyfillio.describePolyfill('test')
				.then(result => {
					assert.equal(result, 'return value for sourceslib.getPolyfillMetaSync');
					assert.calledOnce(sourceslib.getPolyfillMetaSync);
					assert.calledWithExactly(sourceslib.getPolyfillMetaSync, 'test');
				})
			;
		});
	});

	describe('.normalizeUserAgent()', () => {
		beforeEach(() => {
			polyfillio = require('../../../lib/index');
		});

		it('calls and returns UA.normalize() with passed argument and UA', () => {
			UA.normalize.returns('return value for UA.normalize');
			assert.equal(polyfillio.normalizeUserAgent('test'), 'return value for UA.normalize');
			assert.calledOnce(UA.normalize);
			assert.calledWithExactly(UA.normalize, 'test');
		});
	});

	describe('.getPolyfills()', () => {

		describe('when options.features contains the `all` feature', () => {
			beforeEach(() => {
				polyfillio = require('../../../lib/index');
			});

			it('resolves to all polyfills', () => {

				assert.notCalled(sourceslib.listPolyfillsSync);

				return polyfillio.getPolyfills({}).then(() => {
					// Second argument to createAliasResolver contains the aliasAll function we are testing
					const aliasAll = createAliasResolver.firstCall.args[1];

					aliasAll('all');
					assert.calledOnce(sourceslib.listPolyfillsSync);
				});
			});
		});

		describe('when options.features does not contains the `all` feature', () => {
			beforeEach(() => {
				polyfillio = require('../../../lib/index');
			});

			it('does not return all polyfills', () => {

				assert.notCalled(sourceslib.listPolyfillsSync);

				return polyfillio.getPolyfills({}).then(() => {
					// Second argument to createAliasResolver contains the aliasAll function we are testing
					const aliasAll = createAliasResolver.firstCall.args[1];

					aliasAll('es6');
					assert.notCalled(sourceslib.listPolyfillsSync);
				});
			});
		});

		describe('when options.uaString is not set', () => {
			beforeEach(() => {
				polyfillio = require('../../../lib/index');
			});

			it('calls UA with options.uAString set to an empty string', () => {
				const options = {};
				return polyfillio.getPolyfills(options).then(() => {
					assert.calledWithExactly(UA, '');
				});
			});
		});

		describe('when options.uaString is set', () => {
			beforeEach(() => {
				polyfillio = require('../../../lib/index');
			});

			it('calls UA with options.uAString', () => {
				const options = {
					uaString: 'chrome/38'
				};
				return polyfillio.getPolyfills(options).then(() => {
					assert.calledWithExactly(UA, 'chrome/38');
				});
			});
		});

		describe('when options.features has no flags set', () => {

			it('calls `resolveAliases` function with features object, giving each feature an empty Set of flags', () => {
				const resolveAliasesStub = sinon.stub().returnsArg(0);
				const resolveDependenciesStub = sinon.stub().returnsArg(0);
				createAliasResolver.onCall(0).returns(resolveAliasesStub);
				createAliasResolver.onCall(1).returns(resolveDependenciesStub);
				polyfillio = require('../../../lib/index');

				const options = {
					features: {
						'Array.prototype.map': {}
					},
					uaString: 'chrome/38'
				};

				return polyfillio.getPolyfills(options).then(() => {
					assert.calledWithExactly(resolveAliasesStub, {
						'Array.prototype.map': {
							flags: new Set()
						}
					});
				});
			});
		});

		describe('when options.features has some flags set as an Array', () => {
			it('calls `resolveAliases` function with features object, giving each feature which is missing flags an empty Set of flags', () => {
				const resolveAliasesStub = sinon.stub().returnsArg(0);
				const resolveDependenciesStub = sinon.stub().returnsArg(0);
				createAliasResolver.onCall(0).returns(resolveAliasesStub);
				createAliasResolver.onCall(1).returns(resolveDependenciesStub);
				polyfillio = require('../../../lib/index');

				const options = {
					features: {
						'Array.prototype.map': {
							flags: ['always']
						},
						'Promise': {}
					},
					uaString: 'chrome/38'
				};

				return polyfillio.getPolyfills(options).then(() => {
					assert.calledWithExactly(resolveAliasesStub, {
						'Array.prototype.map': {
							flags: new Set(['always'])
						},
						'Promise': {
							flags: new Set()
						}
					});
				});
			});
		});

		describe('when options.features has some flags set as a Set', () => {
			it('calls `resolveAliases` function with features object, giving each feature which is missing flags an empty Set of flags', () => {
				const resolveAliasesStub = sinon.stub().returnsArg(0);
				const resolveDependenciesStub = sinon.stub().returnsArg(0);
				createAliasResolver.onCall(0).returns(resolveAliasesStub);
				createAliasResolver.onCall(1).returns(resolveDependenciesStub);
				polyfillio = require('../../../lib/index');

				const options = {
					features: {
						'Array.prototype.map': {
							flags: new Set('always')
						},
						'Promise': {}
					},
					uaString: 'chrome/38'
				};

				return polyfillio.getPolyfills(options).then(() => {
					assert.calledWithExactly(resolveAliasesStub, {
						'Array.prototype.map': {
							flags: new Set('always')
						},
						'Promise': {
							flags: new Set()
						}
					});
				});
			});
		});

		it("should remove features not appropriate for the current UA", () => {
			const resolveAliasesStub = sinon.stub().returns({
				'Array.prototype.map': {
					flags: new Set()
				}
			});
			const resolveDependenciesStub = sinon.stub().returns({
				'Array.prototype.map': {
					flags: new Set()
				}
			});
			createAliasResolver.onCall(0).returns(resolveAliasesStub);
			createAliasResolver.onCall(1).returns(resolveDependenciesStub);

			sourceslib.getPolyfillMetaSync.returns({
				"browsers": {
					"ie": "6 - 8"
				}
			});
			UA.mockUAInstance.getFamily.returns('ie');
			UA.mockUAInstance.satisfies.returns(false);

			polyfillio = require('../../../lib/index');

			const options = {
				features: {
					'Array.prototype.map': {}
				},
				uaString: 'ie/9'
			};

			return polyfillio.getPolyfills(options).then(result => {
				assert.deepEqual(setsToArrays(result), {});
			});
		});

		it("should respect the always flag", () => {
			const resolveAliasesStub = sinon.stub().returns({
				'Array.prototype.map': {
					flags: new Set(['always'])
				}
			});
			const resolveDependenciesStub = sinon.stub().returns({
				'Array.prototype.map': {
					flags: new Set(['always'])
				}
			});
			createAliasResolver.onCall(0).returns(resolveAliasesStub);
			createAliasResolver.onCall(1).returns(resolveDependenciesStub);

			sourceslib.getPolyfillMetaSync.returns({
				"browsers": {
					"ie": "6 - 8"
				}
			});
			UA.mockUAInstance.getFamily.returns('ie');
			UA.mockUAInstance.satisfies.returns(false);

			polyfillio = require('../../../lib/index');

			const input = {
				features: {
					'Array.prototype.map': {
						flags: new Set(['always'])
					}
				},
				uaString: 'ie/9'
			};
			const expectedResult = {
				'Array.prototype.map': {
					flags: ['always']
				}
			};
			return polyfillio.getPolyfills(input).then(result => {
				assert.deepEqual(setsToArrays(result), expectedResult);
			});
		});

		it("should include dependencies", () => {
			const resolveAliasesStub = sinon.stub().returns({
				'Array.prototype.map': {
					flags: new Set()
				}
			});

			createAliasResolver.onCall(0).returns(resolveAliasesStub);
			createAliasResolver.onCall(1).returnsArg(0);

			sourceslib.getPolyfillMetaSync.withArgs('Element.prototype.placeholder').returns({
				"dependencies": ["setImmediate", "Array.isArray", "Event"]
			});

			polyfillio = require('../../../lib/index');

			const input = {
				features: {
					'Element.prototype.placeholder': {
						flags: new Set()
					}
				},
				uaString: 'ie/8'
			};

			return polyfillio.getPolyfills(input).then(() => {
				const resolveDependencies = createAliasResolver.secondCall.args[0];
				assert.deepEqual(resolveDependencies('Element.prototype.placeholder'), [
					"setImmediate",
					"Array.isArray",
					"Event",
					"Element.prototype.placeholder"
				]);
			});
		});
	});
});
