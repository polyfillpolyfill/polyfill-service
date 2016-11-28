/* global describe, it */

const assert = require('proclaim');
const setsToArrays = require('../../utils/sets_to_arrays');

const polyfillio = require('../../../lib/index');

describe("polyfillio", () => {
	describe(".getPolyfills(features)", () => {

		it("should remove features not appropriate for the current UA", () => {
			const input = {
				features: {
					'Array.prototype.map': {}
				},
				uaString: 'chrome/38'
			};
			return polyfillio.getPolyfills(input).then(result => assert.deepEqual(setsToArrays(result), {}));
		});

		it("should respect the always flag", () => {
			const input = {
				features: {
					'Array.prototype.map': { flags: new Set(['always']) }
				},
				uaString: 'chrome/38'
			};
			const expectedResult = {
				'Array.prototype.map': { flags:['always'] }
			};
			return polyfillio.getPolyfills(input).then(result => assert.deepEqual(setsToArrays(result), expectedResult));
		});

		it("should include dependencies", () => {
			const input = {
				features: {
					'Element.prototype.placeholder': { flags: new Set() }
				},
				uaString: 'ie/8'
			};
			const expectedResult = {
				'Element.prototype.placeholder': { flags:[] },
				'Object.defineProperty': { flags:[], aliasOf: ['Element.prototype.placeholder'] },
				'document.querySelector': { flags:[], aliasOf: ['Element.prototype.placeholder'] },
				'Element': { flags: [], aliasOf: ['Element.prototype.placeholder', 'document.querySelector'] },
				'Document': { flags: [], aliasOf: ['Element', 'Element.prototype.placeholder', 'document.querySelector'] }
			};
			return polyfillio.getPolyfills(input).then(result => assert.deepEqual(setsToArrays(result), expectedResult));
		});

		it("should not include unused dependencies", () => {
			const input = {
				features: {
					'Promise': {}
				},
				uaString: 'chrome/45'
			};
			return polyfillio.getPolyfills(input).then(result => assert.deepEqual(setsToArrays(result), {}));
		});

		it("should return no polyfills for unknown UA unless unknown is set", () => {
			return Promise.all([

				// Without `unknown`, no polyfills for unrecognised UA
				polyfillio.getPolyfills({
					features: {'Math.sign': {}},
					uaString: ''
				}).then(result => assert.deepEqual(setsToArrays(result), {})),

				// With unknown=polyfill, all requested polyfills are included
				polyfillio.getPolyfills({
					features: {'Math.sign': {}},
					unknown: 'polyfill',
					uaString: ''
				}).then(result => assert.deepEqual(setsToArrays(result), {
					'Math.sign': { flags:[] }
				})),

				// ... even when `uaString` param is missing entirely
				polyfillio.getPolyfills({
					features: {'Math.sign': {}},
					unknown: 'polyfill',
				}).then(result => assert.deepEqual(setsToArrays(result), {
					'Math.sign': { flags:[] }
				}))
			]);
		});

		it("should understand the 'all' alias", () => {
			return polyfillio.getPolyfills({
				features: {
					'all': { flags: [] }
				},
				uaString: 'ie/7'
			}).then(result => assert(Object.keys(result).length > 0));
		});

		it("should respect the excludes option", () => {
			return Promise.all([
				polyfillio.getPolyfills({
					features: {
						'fetch': {}
					},
					uaString: 'chrome/30'
				}).then(result => assert.deepEqual(setsToArrays(result), {
					fetch: { flags: [] },
					Promise: { flags: [], aliasOf: [ 'fetch' ] },
					setImmediate: { flags: [], aliasOf: [ 'Promise', 'fetch' ] }
				})),
				polyfillio.getPolyfills({
					features: {
						'fetch': {}
					},
					excludes: ["Promise", "non-existent-feature"],
					uaString: 'chrome/30'
				}).then(result => assert.deepEqual(setsToArrays(result), {
					fetch: { flags: [] }
				}))
			]);
		});
	});

	describe('.getPolyfillString', () => {

		it('should produce different output when gated flag is enabled', () => {
			return Promise.all([
				polyfillio.getPolyfillString({
					features: { default: {} },
					uaString: 'chrome/30'
				}),
				polyfillio.getPolyfillString({
					features: { default: { flags: new Set(['gated']) } },
					uaString: 'chrome/30'
				})
			]).then(results => {
				assert.notEqual(setsToArrays(results[0]), setsToArrays(results[1]));
			});
		});

		it('should support streaming output', done => {
			const ReadableStream = require('stream').Readable;
			const buf = [];
			const s = polyfillio.getPolyfillString({
				features: { default: {} },
				uaString: 'chrome/30',
				stream: true,
				minify: false
			});
			assert.instanceOf(s, ReadableStream);
			s.on('data', chunk => buf.push(chunk));
			s.on('end', () => {
				const bundle = buf.join('');
				assert.include(bundle, 'Polyfill service');
				assert.include(bundle, "function(undefined)");
				done();
			});
		});

	});
});
