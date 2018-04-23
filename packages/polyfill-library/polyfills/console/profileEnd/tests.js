/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('profileEnd()', function () {
		proclaim.doesNotThrow(function () {
			console.profileEnd();
		});
	});

});
