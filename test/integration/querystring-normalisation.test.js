/* eslint-env mocha */
"use strict";

const assert = require("proclaim");
const request = require("supertest");

const host = require("./helpers").host;

describe("Querystring normalising", function() {
	context('compute-at-edge service', function() {
		describe("Default values", function() {
			it("should set features to 'default'", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes")
					.then(response => {
						assert.deepStrictEqual(response.body.features, "default");
					});
			});
			it("should set excludes to ''", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes")
					.then(response => {
						assert.deepStrictEqual(response.body.excludes, "");
					});
			});
			it("should set rum to '0'", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes")
					.then(response => {
						assert.deepStrictEqual(response.body.rum, "0");
					});
			});
			it("should set unknown to 'polyfill'", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes")
					.then(response => {
						assert.deepStrictEqual(response.body.unknown, "polyfill");
					});
			});
			it("should set flags to ''", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes")
					.then(response => {
						assert.deepStrictEqual(response.body.flags, "");
					});
			});
			it("should set version to ''", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes")
					.then(response => {
						assert.deepStrictEqual(response.body.version, "");
					});
			});
			it("should set callback to ''", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes")
					.then(response => {
						assert.deepStrictEqual(response.body.callback, "");
					});
			});
			it("should set compression to 'br' if Accept-Encoding contains 'br'", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes")
					.set("Accept-Encoding", "br")
					.then(response => {
						assert.deepStrictEqual(response.body.compression, "br");
					});
			});
			it("should set compression to 'gzip' if Accept-Encoding contains 'gzip' and User-Agent is not IE6", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes")
					.set("Accept-Encoding", "gzip")
					.then(response => {
						assert.deepStrictEqual(response.body.compression, "gzip");
					});
			});
			it("should set compression to '' if Accept-Encoding contains 'gzip' and User-Agent is IE6", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes")
					.set("Accept-Encoding", "gzip")
					.set("User-Agent", "MSIE 6")
					.then(response => {
						assert.deepStrictEqual(response.body.compression, "");
					});
			});
			it("should set compression to '' if Accept-Encoding is not 'br' or 'gzip' ", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes")
					.set("Accept-Encoding", "identity")
					.then(response => {
						assert.deepStrictEqual(response.body.compression, "");
					});
			});
			it("should set ua to the normalised user-agent", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes")
					.then(response => {
						assert.deepStrictEqual(response.body.ua, "other/0.0.0");
					});
			});
			it("should set ua to the normalised user-agent", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes")
					.set("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.220 Safari/537.36")
					.then(response => {
						assert.deepStrictEqual(response.body.ua, "chrome/65.0.0");
					});
			});
		});

		it("uses features if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?features=a,b%2Cc&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.deepStrictEqual(response.body.features, "a,b,c");
				});
		});
		it("uses excludes if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?excludes=a%2Cb,c&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.deepStrictEqual(response.body.excludes, "a,b,c");
				});
		});
		it("uses rum if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?rum=1&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.deepStrictEqual(response.body.rum, "1");
				});
		});
		it("uses unknown if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?unknown=ignore&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.deepStrictEqual(response.body.unknown, "ignore");
				});
		});
		it("uses flags if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?flags=always&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.deepStrictEqual(response.body.flags, "always");
				});
		});
		it("uses version if set to a version in the service (3.25.1)", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?version=3.25.1&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.deepStrictEqual(response.body.version, "3.25.1");
				});
		});
		it("uses version if set to a version in the service (3.27.4)", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?version=3.27.4&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.deepStrictEqual(response.body.version, "3.27.4");
				});
		});
		it("uses callback if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?callback=ready&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.deepStrictEqual(response.body.callback, "ready");
				});
		});
		it("uses compression if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?compression=quack&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.deepStrictEqual(response.body.compression, "quack");
				});
		});
		it("uses ua if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?ua=carrot/1.2.3&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.deepStrictEqual(response.body.ua, "carrot/1.2.3");
				});
		});

		it("should sort features parameter", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?features=fetch,atob%2CIntersectionObserver&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.deepStrictEqual(response.body.features, "IntersectionObserver,atob,fetch");
				});
		});

		it("should sort excludes parameter", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?excludes=Map,Array.from%2CSymbol,atob&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.deepStrictEqual(response.body.excludes, "Array.from,Map,Symbol,atob");
				});
		});
	});

	context('vcl service', function() {
		describe("Default values", function() {
			it("should set features to 'default'", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no")
					.then(response => {
						assert.deepStrictEqual(response.body.features, "default");
					});
			});
			it("should set excludes to ''", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no")
					.then(response => {
						assert.deepStrictEqual(response.body.excludes, "");
					});
			});
			it("should set rum to '0'", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no")
					.then(response => {
						assert.deepStrictEqual(response.body.rum, "0");
					});
			});
			it("should set unknown to 'polyfill'", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no")
					.then(response => {
						assert.deepStrictEqual(response.body.unknown, "polyfill");
					});
			});
			it("should set flags to ''", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no")
					.then(response => {
						assert.deepStrictEqual(response.body.flags, "");
					});
			});
			it("should set version to ''", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no")
					.then(response => {
						assert.deepStrictEqual(response.body.version, "");
					});
			});
			it("should set callback to ''", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no")
					.then(response => {
						assert.deepStrictEqual(response.body.callback, "");
					});
			});
			it("should set compression to 'br' if Accept-Encoding contains 'br'", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no")
					.set("Accept-Encoding", "br")
					.then(response => {
						assert.deepStrictEqual(response.body.compression, "br");
					});
			});
			it("should set compression to 'gzip' if Accept-Encoding contains 'gzip' and User-Agent is not IE6", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no")
					.set("Accept-Encoding", "gzip")
					.then(response => {
						assert.deepStrictEqual(response.body.compression, "gzip");
					});
			});
			it("should set compression to '' if Accept-Encoding contains 'gzip' and User-Agent is IE6", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no")
					.set("Accept-Encoding", "gzip")
					.set("User-Agent", "MSIE 6")
					.then(response => {
						assert.deepStrictEqual(response.body.compression, "");
					});
			});
			it("should set compression to '' if Accept-Encoding is not 'br' or 'gzip' ", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no")
					.set("Accept-Encoding", "identity")
					.then(response => {
						assert.deepStrictEqual(response.body.compression, "");
					});
			});
			it("should set ua to the normalised user-agent", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no")
					.then(response => {
						assert.deepStrictEqual(response.body.ua, "other/0.0.0");
					});
			});
			it("should set ua to the normalised user-agent", function() {
				return request(host)
					.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no")
					.set("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.220 Safari/537.36")
					.then(response => {
						assert.deepStrictEqual(response.body.ua, "chrome/65.0.0");
					});
			});
		});

		it("uses features if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?features=a,b%2Cc&use-compute-at-edge-backend=no")
				.then(response => {
					assert.deepStrictEqual(response.body.features, "a,b,c");
				});
		});
		it("uses excludes if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?excludes=a%2Cb,c&use-compute-at-edge-backend=no")
				.then(response => {
					assert.deepStrictEqual(response.body.excludes, "a,b,c");
				});
		});
		it("uses rum if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?rum=1&use-compute-at-edge-backend=no")
				.then(response => {
					assert.deepStrictEqual(response.body.rum, "1");
				});
		});
		it("uses unknown if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?unknown=ignore&use-compute-at-edge-backend=no")
				.then(response => {
					assert.deepStrictEqual(response.body.unknown, "ignore");
				});
		});
		it("uses flags if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?flags=always&use-compute-at-edge-backend=no")
				.then(response => {
					assert.deepStrictEqual(response.body.flags, "always");
				});
		});
		it("uses version if set to a version in the service (3.25.1)", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?version=3.25.1&use-compute-at-edge-backend=no")
				.then(response => {
					assert.deepStrictEqual(response.body.version, "3.25.1");
				});
		});
		it("uses version if set to a version in the service (3.27.4)", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?version=3.27.4&use-compute-at-edge-backend=no")
				.then(response => {
					assert.deepStrictEqual(response.body.version, "3.27.4");
				});
		});
		it("uses callback if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?callback=ready&use-compute-at-edge-backend=no")
				.then(response => {
					assert.deepStrictEqual(response.body.callback, "ready");
				});
		});
		it("uses compression if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?compression=quack&use-compute-at-edge-backend=no")
				.then(response => {
					assert.deepStrictEqual(response.body.compression, "quack");
				});
		});
		it("uses ua if set", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?ua=carrot/1.2.3&use-compute-at-edge-backend=no")
				.then(response => {
					assert.deepStrictEqual(response.body.ua, "carrot/1.2.3");
				});
		});

		it("should sort features parameter", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?features=fetch,atob%2CIntersectionObserver&use-compute-at-edge-backend=no")
				.then(response => {
					assert.deepStrictEqual(response.body.features, "IntersectionObserver,atob,fetch");
				});
		});

		it("should sort excludes parameter", function() {
			return request(host)
				.get("/v3/normalise_querystring_parameters_for_polyfill_bundle?excludes=Map,Array.from%2CSymbol,atob&use-compute-at-edge-backend=no")
				.then(response => {
					assert.deepStrictEqual(response.body.excludes, "Array.from,Map,Symbol,atob");
				});
		});
	});
});
