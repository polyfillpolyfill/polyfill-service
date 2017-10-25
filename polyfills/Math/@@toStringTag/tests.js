/* eslint-env mocha, browser*/
/* global proclaim, it */

it('has correct value', function () {
	proclaim.strictEqual(Math[Symbol.toStringTag], 'Math');
});

it('is not writable', function () {
	var a = Math[Symbol.toStringTag];
	Math[Symbol.toStringTag] = 1;
	proclaim.strictEqual(Math[Symbol.toStringTag], a);
	proclaim.notEqual(Math[Symbol.toStringTag], 1);
});

it('is not enumerable', function () {
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Number, 'EPSILON'));
});
