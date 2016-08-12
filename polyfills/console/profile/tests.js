/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('profile()', function () {
		proclaim.doesNotThrow(function () {
			console.profile();
		});
	});

});
