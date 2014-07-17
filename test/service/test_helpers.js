var assert = require('assert');
var helpers = require('../../service/helpers');

describe("#parseRequestedPolyfills(polyfillList, additionalFlags)", function() {
	it("should transform a simple querystring, contaning comma separated values to a list of polyfills with flags", function() {
		var querystring = "poly1|gated,poly2|always";
		var polys = helpers.parseRequestedPolyfills(querystring);
		assert.equal(2, polys.length);
		assert.equal("poly1", polys[0].name);
		assert.equal("poly2", polys[1].name);

		assert.deepEqual(["gated"], polys[0].flags);
		assert.deepEqual(["always"], polys[1].flags);
	});

	it("should add additional flags to each polyfill object returned if additional flags are specified", function() {
		var querystring = "poly1|always,poly2|always";
		var polys = helpers.parseRequestedPolyfills(querystring, ["gated"]);

		assert.equal(2, polys.length);
		assert.deepEqual(["always", "gated"], polys[0].flags);
		assert.deepEqual(["always", "gated"], polys[1].flags);
	});
});
