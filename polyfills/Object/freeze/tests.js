/* eslint-env mocha, browser */
/* global proclaim */

it("Should has a length of 1", function() {
	proclaim.equal(Object.freeze.length, 1);
});

it("Should throw a TypeError if called with undefined", function() {
	proclaim.throws(function() { Object.freeze(undefined); }, TypeError);
});

it("Should throw a TypeError if called with null", function () {
	proclaim.throws(function() { Object.freeze(null); }, TypeError);
});

it("Should throw a TypeError if called with a boolean primitive", function() {
	proclaim.throws(function() { Object.freeze(true); }, TypeError);
});

it("Should throw a TypeError if called with a number primitive", function() {
	proclaim.throws(function() { Object.freeze(100); }, TypeError);
});

it("Should throw a TypeError if called with an array primitive", function() {
	proclaim.throws(function() { Object.freeze([]); }, TypeError);
});

it("Should throw a TypeError if called with a string primitive", function() {
	proclaim.throws(function() { Object.freeze(''); }, TypeError);
});

it("Should throw a TypeError if called with a function", function() {
	proclaim.throws(function() {
		Object.freeze(function(){});
	});
});

it("Should return an the object called with", function () {
	var obj = {};
	proclaim.deepEqual(Object.freeze(obj), obj);
});
