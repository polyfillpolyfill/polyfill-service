var assert = require('assert');
var PolyfillSet = require('../../../service/PolyfillSet');

describe('PolyfillSet', function () {
	describe(".fromQueryParam(polyfillList, additionalFlags)", function() {

		it("should transform a simple querystring, contaning comma separated values to a list of polyfills with flags", function() {
			var querystring = "poly1|gated,poly2|always";
			assert.deepEqual(PolyfillSet.fromQueryParam(querystring).get(), {
				poly1: { flags: ['gated'] },
				poly2: { flags: ['always'] }
			});
		});

		it("should add additional flags to each polyfill object returned if additional flags are specified", function() {
			var querystring = "poly1|always,poly2|always";
			assert.deepEqual(PolyfillSet.fromQueryParam(querystring, ["gated"]).get(), {
				poly1: { flags: ['always', 'gated'] },
				poly2: { flags: ['always', 'gated'] }
			});
		});
	});

	describe('#stringify()', function () {
		it('should be a reversible process', function () {
			var querystring = "poly1|gated,poly2|always";
			assert.equal(PolyfillSet.fromQueryParam(querystring).stringify(), querystring);
		});
	});
});
