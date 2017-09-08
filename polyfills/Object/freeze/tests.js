/* eslint-env mocha, browser */
/* global proclaim */

it("Should has a length of 1", function() {
	proclaim.equal(Object.freeze.length, 1);
});

it("Should not throw a TypeError if called with undefined", function() {
	proclaim.doesNotThrow(function() { Object.freeze(undefined); });
});

it("Should not throw a TypeError if called with null", function () {
	proclaim.doesNotThrow(function() { Object.freeze(null); });
});

it("Should not throw a TypeError if called with a boolean primitive", function() {
	proclaim.doesNotThrow(function() { Object.freeze(true); });
});

it("Should not throw a TypeError if called with a number primitive", function() {
	proclaim.doesNotThrow(function() { Object.freeze(100); });
});

it("Should not throw a TypeError if called with an array primitive", function() {
	proclaim.doesNotThrow(function() { Object.freeze([]); });
});

it("Should not throw a TypeError if called with a string primitive", function() {
	proclaim.doesNotThrow(function() { Object.freeze(''); });
});

it("Should not throw a TypeError if called with a function", function() {
	proclaim.doesNotThrow(function() {
		Object.freeze(function(){});
	});
});

it("Should return the object called with", function () {
	var obj = {};
	proclaim.deepEqual(Object.freeze(obj), obj);
});
