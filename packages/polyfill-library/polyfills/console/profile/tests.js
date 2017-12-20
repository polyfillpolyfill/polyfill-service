/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('profile()', function () {
		proclaim.doesNotThrow(function () {
			console.profile();
		});
	});

});
