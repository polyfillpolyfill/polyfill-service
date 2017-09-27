/* eslint-env mocha, browser */
/* global proclaim */

it("Should has a length of 1", function() {
	proclaim.equal(Object.freeze.length, 1);
});

var hasES6ObjectFreeze = true;
try {
	Object.freeze(1);
} catch (e) {
	hasES6ObjectFreeze = false;
}

var ifHasES6ObjectFreeze = hasES6ObjectFreeze ? it : xit;

ifHasES6ObjectFreeze("Should not throw a TypeError if called with undefined", function() {
	var obj = undefined;
	proclaim.doesNotThrow(function() { Object.freeze(obj); });
	proclaim.deepEqual(Object.freeze(obj), obj);
});

ifHasES6ObjectFreeze("Should not throw a TypeError if called with null", function () {
	var obj = null;
	proclaim.doesNotThrow(function() { Object.freeze(obj); });
	proclaim.deepEqual(Object.freeze(obj), obj);
});

ifHasES6ObjectFreeze("Should not throw a TypeError if called with a boolean primitive", function() {
	var obj = true;
	proclaim.doesNotThrow(function() { Object.freeze(obj); });
	proclaim.deepEqual(Object.freeze(obj), obj);
});

ifHasES6ObjectFreeze("Should not throw a TypeError if called with a number primitive", function() {
	var obj = 100;
	proclaim.doesNotThrow(function() { Object.freeze(obj); });
	proclaim.deepEqual(Object.freeze(obj), obj);
});

ifHasES6ObjectFreeze("Should not throw a TypeError if called with an array primitive", function() {
	var obj = [];
	proclaim.doesNotThrow(function() { Object.freeze(obj); });
	proclaim.deepEqual(Object.freeze(obj), obj);
});

ifHasES6ObjectFreeze("Should not throw a TypeError if called with a string primitive", function() {
	var obj = '';
	proclaim.doesNotThrow(function() { Object.freeze(obj); });
	proclaim.deepEqual(Object.freeze(obj), obj);
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
