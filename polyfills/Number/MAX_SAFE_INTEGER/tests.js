/* eslint-env mocha, browser */
/* global proclaim */

it('should have max safe integer defined', function() {
	proclaim.isDefined(Number.MAX_SAFE_INTEGER);
});


it('should be correct value', function() {
	proclaim.equal(Number.MAX_SAFE_INTEGER, Math.pow(2, 53) - 1);
});

it('should not be enumerable', function() {
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Number.MAX_SAFE_INTEGER));
});
