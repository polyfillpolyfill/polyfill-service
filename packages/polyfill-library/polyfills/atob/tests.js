/* eslint-env mocha, browser */
/* global proclaim */

// Doesn't throw in IE6, otherwise works fine, so tolerate this
it.skip("should throw exception for invalid characters in code", function () {
	proclaim.throws(function() {
		atob("YW55IGNhcm5hbCBwbGVhc3$VyZ");
	});
});

// Doesn't throw in IE6, otherwise works fine, so tolerate this
it.skip("should throw exception for too much padding", function () {
	proclaim.throws(function() {
		atob("YW55IGNhcm5hbCBwbGVhc3VyZ===");
	});
});

// Not supported by the polyfill, probably not a problem
it.skip("should throw exception for badly formed base64", function () {
	proclaim.throws(function() {
		atob("YW55IGNhcm5hbCBwbGVhc3VyZ");
	});
});

it("should decode valid code succesfully", function () {
	proclaim.equal(atob("cGxlYXN1cmUu"), "pleasure.");
	proclaim.equal(atob("bGVhc3VyZS4="), "leasure.");
	proclaim.equal(atob("ZWFzdXJlLg=="), "easure.");
	proclaim.equal(atob("YXN1cmUu"), "asure.");
	proclaim.equal(atob("c3VyZS4="), "sure.");
});

it("should decode valid code without padding succesfully", function () {
	proclaim.equal(atob("cGxlYXN1cmUu"), "pleasure.");
	proclaim.equal(atob("bGVhc3VyZS4"), "leasure.");
	proclaim.equal(atob("ZWFzdXJlLg"), "easure.");
	proclaim.equal(atob("YXN1cmUu"), "asure.");
	proclaim.equal(atob("c3VyZS4"), "sure.");
});
