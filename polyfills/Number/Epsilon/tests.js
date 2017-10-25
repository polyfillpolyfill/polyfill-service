/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is correct type', function () {
	proclaim.isTypeOf(Number.EPSILON, 'number');
});

it('is 2^-52', function () {
	proclaim.equal(Number.EPSILON, 2.2204460492503130808472633361816e-16);
});

it('not enumerable', function () {
	proclaim.equal(Object.prototype.propertyIsEnumerable.call(Number, 'EPSILON'), false);
});

it('not writable', function () {
	var NumberEPSILON = Number.EPSILON;
	Number.EPSILON = 1;
	proclaim.strictEqual(Number.EPSILON, NumberEPSILON);
	proclaim.notEqual(Number.EPSILON, 1);
});
