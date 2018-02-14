/* eslint-env mocha */
/* globals proclaim */

it('is an alias to Array.prototype.values', function () {
	proclaim.deepEqual(Array.prototype[Symbol.iterator], Array.prototype.values);
});
