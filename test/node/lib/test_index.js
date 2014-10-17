var assert  = require('assert');
var polyfillio = require('../../../lib/index');

describe("#getPolyfills(features)", function() {

	it("should remove features not appropriate for the current UA", function() {
		assert.deepEqual(polyfillio.getPolyfills({
			features: {
				'Array.prototype.map': { flags:[] }
			},
			uaString: 'chrome/38'
		}), {});
	});

	it("should respect the always flag", function() {
		assert.deepEqual(polyfillio.getPolyfills({
			features: {
				'Array.prototype.map': { flags:['always'] }
			},
			uaString: 'chrome/38'
		}), {
			'Array.prototype.map': { flags:['always'], polyfillVariant:'default' }
		});
	});

	it("should include dependencies", function() {
		assert.deepEqual(polyfillio.getPolyfills({
			features: {
				'Array.from': { flags: [] }
			},
			uaString: 'ie/7'
		}), {
			'Array.from': { flags:[], polyfillVariant:'default' },
			'Array.prototype.map': { flags:[], aliasOf: ['Array.from'], polyfillVariant:'default' }
		});
	});

	it("should choose the right variant", function() {
		assert.deepEqual(polyfillio.getPolyfills({
			features: {
				'Math.sign': { flags: [] }
			},
			uaString: 'ie/7'
		}), {
			'Math.sign': { flags:[], polyfillVariant:'plus' }
		});
	});
});

describe('#getPolyfillString', function() {

	it('should include the non-gated source when a feature-detect is unavailable', function() {
		// TODO: Not sure how to test this reliably - need a mock polyfill source?
	});
})
