/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('is an object', function () {
		proclaim.isInstanceOf(console, Object);
	});

});
