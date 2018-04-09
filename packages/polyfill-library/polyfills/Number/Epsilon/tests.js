/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is correct type', function () {
	proclaim.isTypeOf(Number.EPSILON, 'number');
});

it('is 2^-52', function () {
	proclaim.equal(Number.EPSILON, 2.2204460492503130808472633361816e-16);
});
