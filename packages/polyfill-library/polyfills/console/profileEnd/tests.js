/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('profileEnd()', function () {
		proclaim.doesNotThrow(function () {
			console.profileEnd();
		});
	});

});
