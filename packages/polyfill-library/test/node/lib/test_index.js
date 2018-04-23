/* eslint-env mocha */
'use strict';
const assert = require('proclaim');
const setsToArrays = require('../../utils/sets_to_arrays');

const Polyfillio = require('../../../lib/index');
const polyfillio = new Polyfillio;

describe("polyfillio", () => {
	describe(".getPolyfills(features)", () => {

		it("should not include unused dependencies", () => {
			const input = {
				features: {
					'Promise': {}
				},
				uaString: 'chrome/45'
			};
			return polyfillio.getPolyfills(input).then(result => assert.deepEqual(setsToArrays(result), {}));
		});

		it("should return no polyfills for unknown UA when unknown is not set", () => {
			// Without `unknown`, no polyfills for unrecognised UA
			return polyfillio.getPolyfills({
				features: {
					'Math.sign': {}
				},
				uaString: ''
			}).then(result => assert.deepEqual(setsToArrays(result), {}));
		});

		it("should return polyfills for unknown UA when unknown is set to `polyfill`", () => {
			// With unknown=polyfill, all requested polyfills are included
			return polyfillio.getPolyfills({
				features: {
					'Math.sign': {}
				},
				unknown: 'polyfill',
				uaString: ''
			}).then(result => assert.deepEqual(setsToArrays(result), {
				'Math.sign': {
					flags: []
				},
				"Object.defineProperty": {
					"aliasOf": [
						"Math.sign",
						"_ESAbstract.CreateMethodProperty"
					],
					"flags": []
				},
				"_ESAbstract.CreateMethodProperty": {
					"aliasOf": [
						"Math.sign"
					],
					"flags": []
				}
			}));
		});

		it("should return polyfills for unknown UA when unknown is set to `polyfill` and `uaString` param is not set", () => {
				// ... even when `uaString` param is missing entirely
				return polyfillio.getPolyfills({
					features: {
						'Math.sign': {}
					},
					unknown: 'polyfill',
				}).then(result => assert.deepEqual(setsToArrays(result), {
					'Math.sign': {
						flags: []
					},
					"Object.defineProperty": {
						"aliasOf": [
							"Math.sign",
							"_ESAbstract.CreateMethodProperty"
						],
						"flags": []
					},
					"_ESAbstract.CreateMethodProperty": {
						"aliasOf": [
							"Math.sign"
						],
						"flags": []
					}
				}));
		});

		it("should understand the 'all' alias", () => {
			return polyfillio.getPolyfills({
				features: {
					'all': {
						flags: []
					}
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
					fetch: {
						flags: []
					},
					Promise: {
						flags: [],
						aliasOf: ['fetch']
					}
				})),
				polyfillio.getPolyfills({
					features: {
						'fetch': {}
					},
					excludes: ["Promise", "non-existent-feature"],
					uaString: 'chrome/30'
				}).then(result => assert.deepEqual(setsToArrays(result), {
					fetch: {
						flags: []
					}
				}))
			]);
		});
	});

	describe('.getPolyfillString', () => {

		it('should produce different output when gated flag is enabled', () => {
			return Promise.all([
				polyfillio.getPolyfillString({
					features: {
						default: {}
					},
					uaString: 'chrome/30'
				}),
				polyfillio.getPolyfillString({
					features: {
						default: {
							flags: new Set(['gated'])
						}
					},
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
				features: {
					default: {}
				},
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
