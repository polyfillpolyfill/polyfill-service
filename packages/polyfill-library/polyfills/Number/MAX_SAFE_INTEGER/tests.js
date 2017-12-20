/* eslint-env mocha, browser */
/* global proclaim */

it('should have max safe integer defined', function() {
	proclaim.isDefined(Number.MAX_SAFE_INTEGER);
});


it('should be correct value', function() {
	proclaim.equal(Number.MAX_SAFE_INTEGER, Math.pow(2, 53) - 1);
});

xit('should not be enumerable', function() {
	if (Number.propertyIsEnumerable) {
		proclaim.equal(Number.propertyIsEnumerable('MAX_SAFE_INTEGER'), false);
	} else {
		this.skip();
	}
});
