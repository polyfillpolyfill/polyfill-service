/* global describe, it */

var assert  = require('assert');
var polyfillio = require('../../../lib/index');

describe("polyfillio", function() {
	describe(".getPolyfills(features)", function() {

		it("should remove features not appropriate for the current UA", function() {
			return polyfillio.getPolyfills({
				features: {
					'Array.prototype.map': { flags:[] }
				},
				uaString: 'chrome/38'
			}).then(function(polyfillSet) {
				assert.deepEqual(polyfillSet, {});
			});
		});

		it("should respect the always flag", function() {
			return polyfillio.getPolyfills({
				features: {
					'Array.prototype.map': { flags:['always'] }
				},
				uaString: 'chrome/38'
			}).then(function(polyfillSet) {
				assert.deepEqual(polyfillSet, {
					'Array.prototype.map': { flags:['always'], polyfillVariant:'default' }
				});
			});
		});

		it("should include dependencies", function() {
			return polyfillio.getPolyfills({
				features: {
					'Element.prototype.placeholder': { flags: [] }
				},
				uaString: 'ie/8'
			}).then(function(polyfillSet) {
				assert.deepEqual(polyfillSet, {
					'Element.prototype.placeholder': { flags:[], polyfillVariant:'default' },
					'Object.defineProperty': { flags:[], aliasOf: ['Element.prototype.placeholder'], polyfillVariant:'ie8' },
					'Element': { flags: [], aliasOf: ['Element.prototype.placeholder', 'document.querySelector'], polyfillVariant: 'ie8' },
					'document.querySelector': { flags:[], aliasOf: ['Element.prototype.placeholder'], polyfillVariant:'default' },
					'Document': { flags: [], aliasOf: ['document.querySelector'], polyfillVariant: 'ie8' }
				});
			});
		});

		it("should choose the right variant", function() {
			return polyfillio.getPolyfills({
				features: {
					'Math.sign': { flags: [] }
				},
				uaString: 'ie/7'
			}).then(function(polyfillSet) {
				assert.deepEqual(polyfillSet, {
					'Math.sign': { flags:[], polyfillVariant:'plus' }
				});
			});
		});

		it("should return no polyfills for unknown UA unless unknown is set", function() {

			return Promise.all([

				// Without unknown, no polyfills
				polyfillio.getPolyfills({
					features: {'Math.sign': { flags: [] }},
					uaString: ''
				}).then(function(polyfillSet) {
					assert.deepEqual(polyfillSet, {});
				}),

				// With unknown=polyfill, default variant polyfills
				polyfillio.getPolyfills({
					features: {'Math.sign': { flags: [] }},
					unknown: 'polyfill',
					uaString: ''
				}).then(function(polyfillSet) {
					assert.deepEqual(polyfillSet, {
						'Math.sign': { flags:[], polyfillVariant:'default' }
					});
				}),

				// With unknown=polyfill, default variant polyfills (UA not specified)
				polyfillio.getPolyfills({
					features: {'Math.sign': { flags: [] }},
					unknown: 'polyfill',
				}).then(function(polyfillSet) {
					assert.deepEqual(polyfillSet, {
						'Math.sign': { flags:[], polyfillVariant:'default' }
					});
				})
			]);

		});

		it("should understand the 'all' alias", function() {
			return polyfillio.getPolyfills({
				features: {
					'all': { flags: [] }
				},
				uaString: 'ie/7'
			}).then(function(polyfillSet) {
				assert(Object.keys(polyfillSet).length > 0);
			});
		});
	});

	/*
	// TODO: Not sure how to test this reliably - need a mock polyfill source?
	describe('.getPolyfillstring', function() {

		it('should include the non-gated source when a feature-detect is unavailable', function() {
		});
	});
	*/
});
