var assert = require('assert');
var PolyfillSet = require('../../../service/PolyfillSet');

describe("#fromQueryParam(polyfillList, additionalFlags)", function() {
	it("should transform a simple querystring, contaning comma separated values to a list of polyfills with flags", function() {
		var querystring = "poly1|gated,poly2|always";
		var polys = PolyfillSet.fromQueryParam(querystring);
		assert.equal(2, polys.get().length);
		assert.equal("poly1", polys.get()[0].name);
		assert.equal("poly2", polys.get()[1].name);

		assert.deepEqual(["gated"], polys.get()[0].flags);
		assert.deepEqual(["always"], polys.get()[1].flags);
	});

	it("should add additional flags to each polyfill object returned if additional flags are specified", function() {
		var querystring = "poly1|always,poly2|always";
		var polys = PolyfillSet.fromQueryParam(querystring, ["gated"]);

		assert.equal(2, polys.get().length);
		assert.deepEqual(["always", "gated"], polys.get()[0].flags);
		assert.deepEqual(["always", "gated"], polys.get()[1].flags);
	});
});
