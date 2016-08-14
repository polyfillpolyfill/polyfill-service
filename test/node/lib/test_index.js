/* global describe, it */

var assert  = require('proclaim');
var polyfillio = require('../../../lib/index');
const vm = require('vm');
const extract = require('comment-parser');

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
					'Array.prototype.map': { flags:['always'] }
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
					'Element.prototype.placeholder': { flags:[] },
					'Object.defineProperty': { flags:[], aliasOf: ['Element.prototype.placeholder'] },
					'document.querySelector': { flags:[], aliasOf: ['Element.prototype.placeholder'] },
					'Element': { flags: [], aliasOf: ['Element.prototype.placeholder', 'document.querySelector'] },
					'Document': { flags: [], aliasOf: ['Element', 'Element.prototype.placeholder', 'document.querySelector'] }
				});
			});
		});

		it("should not include unused dependencies", function() {
			return polyfillio.getPolyfills({
				features: {
					'Promise': { flags: [] }
				},
				uaString: 'chrome/45'
			}).then(function(polyfillSet) {
				assert.deepEqual(polyfillSet, {});
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
						'Math.sign': { flags:[] }
					});
				}),

				// With unknown=polyfill, default variant polyfills (UA not specified)
				polyfillio.getPolyfills({
					features: {'Math.sign': { flags: [] }},
					unknown: 'polyfill',
				}).then(function(polyfillSet) {
					assert.deepEqual(polyfillSet, {
						'Math.sign': { flags:[] }
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

		it("should respect the excludes option", function() {
			return Promise.all([
				polyfillio.getPolyfills({
					features: {
						'fetch': { flags:[] }
					},
					uaString: 'chrome/30'
				}).then(function(polyfillSet) {
					assert.deepEqual(polyfillSet, {
						fetch: { flags: [] },
						Promise: { flags: [], aliasOf: [ 'fetch' ] },
						setImmediate: { flags: [], aliasOf: [ 'Promise', 'fetch' ] }
					});
				}),
				polyfillio.getPolyfills({
					features: {
						'fetch': { flags:[] }
					},
					excludes: ["Promise", "non-existent-feature"],
					uaString: 'chrome/30'
				}).then(function(polyfillSet) {
					assert.deepEqual(polyfillSet, {
						fetch: { flags: [] }
					});
				})
			]);
		});
	});

	/*
	// TODO: Not sure how to test this reliably - need a mock polyfill source?
	describe('.getPolyfillstring', function() {

		it('should include the non-gated source when a feature-detect is unavailable', function() {
		});
	});
	*/

	describe('.getDetectString', function() {

		it('should exist', function() {
		});

		it('should be a function', function() {
		});

		it('should have argument length of 1', function() {
		});

		it('should throw if not passed an object with a `features` property', function() {
		});

		it('should return valid js', function() {
		});

		describe("should understand all the aliases that the service has defined", function() {
			/**
			 * This list is not exhaustive. These tests should really be within the test_aliases.js file.
			 */
			/**
			 * This is not nice but, I can't think of a better way to test it.
			 * Value is the length of and empty bundle.
			 * E.G. "(function(undefined) { var featuresToPolyfill = [];  return featuresToPolyfill;}).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});".length;
			 */
			const smallestLengthOfBundle = 207;
			it("should understand the 'all' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'all': { flags: [] }
					}
				}).then(function(polyfillSet) {
					console.log(1111, new vm.Script(polyfillSet).runInNewContext());
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});

			it("should understand the 'es6' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'es6': { flags: [] }
					}
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});

			it("should understand the 'modernizr:es6array' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'modernizr:es6array': { flags: [] }
					}
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});

			it("should understand the 'blissfuljs' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'blissfuljs': { flags: [] }
					}
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});

			it("should understand the 'default' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'default': { flags: [] }
					}
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});

			it("should understand the 'es5' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'es5': { flags: [] }
					}
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});

			it("should understand the 'dom4' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'dom4': { flags: [] }
					}
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});

			it("should understand the 'PageVisibility' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'PageVisibility': { flags: [] }
					}
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});
		});

		/**
		 * This currently fails, I think this is due to a bug in /lib/aliases.js
		 */
		xit('should add unknown features to a comment block', function() {
			return polyfillio.getDetectString({
					features: {
						'this_feature_does_not_exist': { flags: [] }
					}
				}).then(function(polyfillSet) {
					assert(extract(polyfillSet)[0].description.includes('this_feature_does_not_exist'));
				});
		});

		it('should add known features\' detection code into returned bundle', function() {
			// Need to mock polyfills.
		});

		it('should initialise an empty array named `featuresToPolyfill` within the bundle', function() {
			return polyfillio.getDetectString({
					features: {
						'this_feature_does_not_exist': { flags: [] }
					}
				}).then(function(polyfillSet) {
					assert(polyfillSet.includes('var featuresToPolyfill = []'));
				});
		});

		it('should add the name of each feature to polyfill to the array returned', function() {
			/**
			 * We are testing it is the array named featuresToPolyfill by
			 * relying on the features tested previously. If a feature's
			 * not detected in the users' system it's name will be added to the
			 * featuresToPolyfill array. Because of this fact, if we request a feature
			 * we know is going to be added to the featuresToPolyfill array, we can
			 * test that this feature exists within the array returned by the bundle,
			 * thereby giving us a high level of certainty that the returned array is
			 * the same as the array named featuresToPolyfill.
			 */
			return polyfillio.getDetectString({
					features: {
						'Event.focusin': { flags: [] }
					}
				}).then(function(polyfillSet) {
					const returnedValue = new vm.Script(polyfillSet).runInNewContext();
					assert(Array.isArray(returnedValue));
					assert(returnedValue.includes('Event.focusin'));
				});
		});

		xit('should execute callback function provided by user, with an array containing the names of each feature requiring a polyfill', function() {
		});
	});
});

// new vm.Script("(function(undefined) { var featuresToPolyfill = []; if (!('Symbol' in this && 'iterator' in this.Symbol && !!Array.prototype[Symbol.iterator] && !!Array.prototype.values && (Array.prototype[Symbol.iterator] === Array.prototype.values))) { featuresToPolyfill.push('Array.prototype.values')}if (!('Symbol' in this)) { featuresToPolyfill.push('Symbol')} return featuresToPolyfill}).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});").runInNewContext()
