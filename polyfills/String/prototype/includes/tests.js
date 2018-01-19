/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(String.prototype.includes, Function);
});

// TODO: Add more tests.
