/* eslint-env mocha */
"use strict";

const assert = require("proclaim");
const request = require("supertest");

const host = require("./helpers").host;

describe("Querystring normalising", function() {
	describe("Default values", function() {
		it("should set features to 'default'", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
				.then(res => {
					assert.deepStrictEqual(res.body.features, "default");
				});
		});
		it("should set excludes to ''", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
				.then(res => {
					assert.deepStrictEqual(res.body.excludes, "");
				});
		});
		it("should set rum to '0'", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
				.then(res => {
					assert.deepStrictEqual(res.body.rum, "0");
				});
		});
		it("should set unknown to 'polyfill'", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
				.then(res => {
					assert.deepStrictEqual(res.body.unknown, "polyfill");
				});
		});
		it("should set flags to ''", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
				.then(res => {
					assert.deepStrictEqual(res.body.flags, "");
				});
		});
		it("should set version to ''", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
				.then(res => {
					assert.deepStrictEqual(res.body.version, "");
				});
		});
		it("should set callback to ''", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
				.then(res => {
					assert.deepStrictEqual(res.body.callback, "");
				});
		});
		it("should set compression to 'br' if Accept-Encoding contains 'br'", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
				.set("Accept-Encoding", "br")
				.then(res => {
					assert.deepStrictEqual(res.body.compression, "br");
				});
		});
		it("should set compression to 'gzip' if Accept-Encoding contains 'gzip' and User-Agent is not IE6", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
				.set("Accept-Encoding", "gzip")
				.then(res => {
					assert.deepStrictEqual(res.body.compression, "gzip");
				});
		});
		it("should set compression to '' if Accept-Encoding contains 'gzip' and User-Agent is IE6", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
				.set("Accept-Encoding", "gzip")
				.set("User-Agent", "MSIE 6")
				.then(res => {
					assert.deepStrictEqual(res.body.compression, "");
				});
		});
		it("should set compression to '' if Accept-Encoding is not 'br' or 'gzip' ", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
				.set("Accept-Encoding", "identity")
				.then(res => {
					assert.deepStrictEqual(res.body.compression, "");
				});
		});
		it("should set ua to the normalised user-agent", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
				.then(res => {
					assert.deepStrictEqual(res.body.ua, "other%2F0.0.0");
				});
		});
		it("should set ua to the normalised user-agent", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle")
				.set("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.220 Safari/537.36")
				.then(res => {
					assert.deepStrictEqual(res.body.ua, "chrome%2F65.0.0");
				});
		});
	});

	it("uses features if set", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?features=a,b%2Cc")
			.then(res => {
				assert.deepStrictEqual(res.body.features, "a%2Cb%2Cc");
			});
	});
	it("uses excludes if set", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?excludes=a%2Cb,c")
			.then(res => {
				assert.deepStrictEqual(res.body.excludes, "a%2Cb%2Cc");
			});
	});
	it("uses rum if set", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?rum=1")
			.then(res => {
				assert.deepStrictEqual(res.body.rum, "1");
			});
	});
	it("uses unknown if set", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?unknown=ignore")
			.then(res => {
				assert.deepStrictEqual(res.body.unknown, "ignore");
			});
	});
	it("uses flags if set", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?flags=always")
			.then(res => {
				assert.deepStrictEqual(res.body.flags, "always");
			});
	});
	it("uses version if set to a version in the service (3.25.1)", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?version=3.25.1")
			.then(res => {
				assert.deepStrictEqual(res.body.version, "3.25.1");
			});
	});
	it("uses version if set to a version in the service (3.25.3)", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?version=3.25.3")
			.then(res => {
				assert.deepStrictEqual(res.body.version, "3.25.3");
			});
	});
	it("uses version if set to a version in the service (3.27.4)", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?version=3.27.4")
			.then(res => {
				assert.deepStrictEqual(res.body.version, "3.27.4");
			});
	});
	it("uses callback if set", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?callback=ready")
			.then(res => {
				assert.deepStrictEqual(res.body.callback, "ready");
			});
	});
	it("uses compression if set", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?compression=quack")
			.then(res => {
				assert.deepStrictEqual(res.body.compression, "quack");
			});
	});
	it("uses ua if set", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?ua=carrot/1.2.3")
			.then(res => {
				assert.deepStrictEqual(res.body.ua, "carrot%2F1.2.3");
			});
	});

	it("should sort features parameter", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?features=fetch,atob%2CIntersectionObserver")
			.then(res => {
				assert.deepStrictEqual(res.body.features, "IntersectionObserver%2Catob%2Cfetch");
			});
	});

	it("should sort excludes parameter", function() {
		return request(host)
			.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?excludes=Map,Array.from%2CSymbol,atob")
			.then(res => {
				assert.deepStrictEqual(res.body.excludes, "Array.from%2CMap%2CSymbol%2Catob");
			});
	});
});
