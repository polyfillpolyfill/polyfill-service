/* eslint-env mocha, browser */
/* global proclaim */

it('is an alias to Array.prototype.includes', function () {
	proclaim.deepEqual(Array.prototype.contains, Array.prototype.includes);
});
