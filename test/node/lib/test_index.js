/* global describe, it */
'use strict';

const assert = require('proclaim');
const polyfillio = require('../../../lib/index');
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

		it('should be a function', function() {
			assert.isFunction(polyfillio.getDetectString);
		});

		it('should have argument length of 1', function() {
			assert.equal(polyfillio.getDetectString.length, 1);
		});

		it('should return valid js', function() {
			return polyfillio.getDetectString({callback: 'hello'})
			.then(detectString => {
				assert.doesNotThrow(function(){
					new vm.Script(detectString).runInNewContext({hello:Function});
				});
			});
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
					},
					callback: 'hello'
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});

			it("should understand the 'es6' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'es6': { flags: [] }
					},
					callback: 'hello'
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});

			it("should understand the 'modernizr:es6array' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'modernizr:es6array': { flags: [] }
					},
					callback: 'hello'
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});

			it("should understand the 'blissfuljs' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'blissfuljs': { flags: [] }
					},
					callback: 'hello'
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});

			it("should understand the 'default' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'default': { flags: [] }
					},
					callback: 'hello'
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});

			it("should understand the 'es5' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'es5': { flags: [] }
					},
					callback: 'hello'
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});

			it("should understand the 'dom4' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'dom4': { flags: [] }
					},
					callback: 'hello'
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});

			it("should understand the 'PageVisibility' alias", function() {
				return polyfillio.getDetectString({
					features: {
						'PageVisibility': { flags: [] }
					},
					callback: 'hello'
				}).then(function(polyfillSet) {
					assert(polyfillSet.length > smallestLengthOfBundle);
				});
			});
		});

		/**
		 * This currently fails, I think this is due to a bug in /lib/aliases.js
		 */
		it('should add unknown features to a comment block', function() {
			return polyfillio.getDetectString({
					features: {
						'this_feature_does_not_exist': { flags: [] }
					},
					callback: 'hello'
				}).then(function(polyfillSet) {
					assert(extract(polyfillSet)[0].description.includes('this_feature_does_not_exist'));
				});
		});

		xit('should add known features\' detection code into returned bundle', function() {
			// Need to mock polyfills.
		});

		it('should initialise an empty array named `featuresToPolyfill` within the bundle', function() {
			return polyfillio.getDetectString({
					features: {
						'this_feature_does_not_exist': { flags: [] }
					},
					callback: 'hello'
				}).then(function(polyfillSet) {
					assert(polyfillSet.includes('var featuresToPolyfill = []'));
				});
		});

		it('should execute callback function provided, with an array containing the names of each feature requiring a polyfill', function() {
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
					},
					callback: 'hello'
				}).then(function(polyfillSet) {
					new vm.Script(polyfillSet).runInNewContext({
						hello: function (missingFeatures) {
							assert(Array.isArray(missingFeatures));
							assert(missingFeatures.includes('Event.focusin'));
						}
					});
				});
		});
	});
});
