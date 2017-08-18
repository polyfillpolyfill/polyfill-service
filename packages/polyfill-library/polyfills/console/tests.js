/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('is an object', function () {
		proclaim.isInstanceOf(console, Object);
	});

});
