/* eslint-env mocha, browser */
/* global proclaim */

it('is an alias to String.prototype.includes', function () {
	proclaim.deepEqual(String.prototype.contains, String.prototype.includes);
});
