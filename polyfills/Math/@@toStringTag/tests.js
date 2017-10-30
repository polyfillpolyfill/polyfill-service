/* eslint-env mocha, browser*/
/* global proclaim, it */

it('has correct value', function () {
	proclaim.strictEqual(Math[Symbol.toStringTag], 'Math');
});
