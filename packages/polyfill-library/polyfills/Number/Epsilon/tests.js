/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is correct type', function () {
	proclaim.isTypeOf(Number.EPSILON, 'number');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Number, 'EPSILON');
});

it('is 2^-52', function () {
	proclaim.equal(Number.EPSILON, 2.2204460492503130808472633361816e-16);
});

it('1 is not equal to 1 + EPSILON', function () {
	proclaim.notStrictEqual(1, 1 + Number.EPSILON);
});
 it('1 is equal to 1 + EPSILON / 2', function () {
	proclaim.strictEqual(1, 1 + Number.EPSILON / 2);
});