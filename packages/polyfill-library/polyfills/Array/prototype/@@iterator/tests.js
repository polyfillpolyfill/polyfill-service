/* eslint-env mocha */
/* globals proclaim, Symbol */

it('is an alias to Array.prototype.values', function () {
	proclaim.deepEqual(Array.prototype[Symbol.iterator], Array.prototype.values);
});
