/* eslint-env mocha, browser */
/* global proclaim */

it('should have min safe integer defined', function() {
	proclaim.isDefined(Number.MIN_SAFE_INTEGER);
});


it('should be correct value', function() {
	proclaim.equal(Number.MIN_SAFE_INTEGER, -Math.pow(2, 53) + 1);
});

xit('should not be enumerable', function() {
	if (Number.propertyIsEnumerable) {
		proclaim.equal(Number.propertyIsEnumerable('MIN_SAFE_INTEGER'), false);
	} else {
		this.skip();
	}
});
