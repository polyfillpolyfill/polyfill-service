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

	describe('exported property/properties', () => {
		it('an object', () => {
			assert.isFunction(require('../../../lib/index'));
		});
	});

	describe('constructed instance', () => {
		beforeEach(() => {
			const Polyfillio = require('../../../lib/index');
			polyfillio = new Polyfillio;
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
		it('calls and returns sourceslib.instance.listPolyfills() without passing argument', () => {
			const Polyfillio = require('../../../lib/index');
			polyfillio = new Polyfillio;
			sourceslib.instance.listPolyfills.resolves('return value for sourceslib.instance.listPolyfills');
			return polyfillio.listAllPolyfills('test').then(result => {
				assert.equal(result, 'return value for sourceslib.instance.listPolyfills');
				assert.calledOnce(sourceslib.instance.listPolyfills);
				assert.neverCalledWith(sourceslib.instance.listPolyfills, 'test');
			});
		});
	});

	describe('.describePolyfill()', () => {
		it('calls and returns sourceslib.instance.getPolyfillMeta() with passed argument', () => {
			const Polyfillio = require('../../../lib/index');
			const polyfillio = new Polyfillio;

			sourceslib.instance.getPolyfillMeta.resolves('return value for sourceslib.instance.getPolyfillMeta');
			return polyfillio.describePolyfill('test')
				.then(result => {
					assert.equal(result, 'return value for sourceslib.instance.getPolyfillMeta');
					assert.calledOnce(sourceslib.instance.getPolyfillMeta);
					assert.calledWithExactly(sourceslib.instance.getPolyfillMeta, 'test');
				});
		});
	});

	describe('.normalizeUserAgent()', () => {
		it('calls and returns UA.normalize() with passed argument and UA', () => {
			const Polyfillio = require('../../../lib/index');
			polyfillio = new Polyfillio;
			UA.normalize.returns('return value for UA.normalize');
			assert.equal(polyfillio.normalizeUserAgent('test'), 'return value for UA.normalize');
			assert.calledOnce(UA.normalize);
			assert.calledWithExactly(UA.normalize, 'test');
		});
	});

	describe('.getOptions(opts)', () => {
		it('returns the default options if called without any arguments', () => {
			const Polyfillio = require('../../../lib/index');
			const polyfillio = new Polyfillio;
			assert.deepStrictEqual(polyfillio.getOptions(), {
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {},
				excludes: [],
				rum: false
			});
		});

		it('does not assign a default value if the property exists in the argument', () => {
			const Polyfillio = require('../../../lib/index');
			const polyfillio = new Polyfillio;
			assert.deepStrictEqual(polyfillio.getOptions({}), {
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {},
				excludes: [],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				uaString: 'example'
			}), {
				uaString: 'example',
				minify: true,
				unknown: 'polyfill',
				features: {},
				excludes: [],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				minify: false
			}), {
				uaString: '',
				minify: false,
				unknown: 'polyfill',
				features: {},
				excludes: [],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				unknown: 'ignore'
			}), {
				uaString: '',
				minify: true,
				unknown: 'ignore',
				features: {},
				excludes: [],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				features: {
					'Array.of': {}
				}
			}), {
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {
					'Array.of': {
						flags: new Set
					}
				},
				excludes: [],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				excludes: ['Array.of']
			}), {
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {},
				excludes: ['Array.of'],
				rum: false
			});
			assert.deepStrictEqual(polyfillio.getOptions({
				rum: true
			}), {
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {},
				excludes: [],
				rum: true
			});
		});

		it('converts feature flag Arrays into Sets', () => {
			const Polyfillio = require('../../../lib/index');
			const polyfillio = new Polyfillio;
			assert.deepStrictEqual(polyfillio.getOptions({
				features: {
					'Array.from': {
						flags: ['a', 'b', 'c']
					}
				}
			}), {
				uaString: '',
				minify: true,
				unknown: 'polyfill',
				features: {
					'Array.from': {
						flags: new Set(['a', 'b', 'c'])
					}
				},
				excludes: [],
				rum: false
			});
		});
	});

	describe('.getPolyfills()', () => {

		describe('when options.features contains the `all` feature', () => {
			it('resolves to all polyfills', () => {
				const Polyfillio = require('../../../lib/index');
				polyfillio = new Polyfillio;

				assert.notCalled(sourceslib.instance.listPolyfills);

				return polyfillio.getPolyfills({}).then(() => {
					// Second argument to createAliasResolver contains the aliasAll function we are testing
					const aliasAll = createAliasResolver.firstCall.args[1];

					aliasAll('all');
					assert.calledOnce(sourceslib.instance.listPolyfills);
				});
			});
		});

		describe('when options.features does not contains the `all` feature', () => {
			it('does not return all polyfills', () => {
				const Polyfillio = require('../../../lib/index');
				polyfillio = new Polyfillio;

				assert.notCalled(sourceslib.instance.listPolyfills);

				return polyfillio.getPolyfills({}).then(() => {
					// Second argument to createAliasResolver contains the aliasAll function we are testing
					const aliasAll = createAliasResolver.firstCall.args[1];

					aliasAll('es6');
					assert.notCalled(sourceslib.instance.listPolyfills);
				});
			});
		});

		describe('when options.uaString is not set', () => {
			it('calls UA with options.uAString set to an empty string', () => {
				const Polyfillio = require('../../../lib/index');
				polyfillio = new Polyfillio;
				const options = {};
				return polyfillio.getPolyfills(options).then(() => {
					assert.calledWithExactly(UA, '');
				});
			});
		});

		describe('when options.uaString is set', () => {
			it('calls UA with options.uAString', () => {
				const Polyfillio = require('../../../lib/index');
				polyfillio = new Polyfillio;
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
				const Polyfillio = require('../../../lib/index');
				polyfillio = new Polyfillio;

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
				const Polyfillio = require('../../../lib/index');
				polyfillio = new Polyfillio;

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
				const Polyfillio = require('../../../lib/index');
				polyfillio = new Polyfillio;;

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

			sourceslib.instance.getPolyfillMeta.resolves({
				"browsers": {
					"ie": "6 - 8"
				}
			});
			UA.mockUAInstance.getFamily.returns('ie');
			UA.mockUAInstance.satisfies.returns(false);

			const Polyfillio = require('../../../lib/index');
			polyfillio = new Polyfillio;;

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

			sourceslib.instance.getPolyfillMeta.resolves({
				"browsers": {
					"ie": "6 - 8"
				}
			});
			UA.mockUAInstance.getFamily.returns('ie');
			UA.mockUAInstance.satisfies.returns(false);

			const Polyfillio = require('../../../lib/index');
			polyfillio = new Polyfillio;;

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

			sourceslib.instance.getPolyfillMeta.withArgs('Element.prototype.placeholder').resolves({
				"dependencies": ["setImmediate", "Array.isArray", "Event"]
			});

			const Polyfillio = require('../../../lib/index');
			polyfillio = new Polyfillio;

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
				return resolveDependencies('Element.prototype.placeholder').then(dependencies => assert.deepEqual(dependencies, [
					"setImmediate",
					"Array.isArray",
					"Event",
					"Element.prototype.placeholder"
				]));
			});
		});
	});
});
