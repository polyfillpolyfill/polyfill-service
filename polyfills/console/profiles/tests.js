/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('profiles()', function () {
		proclaim.doesNotThrow(function () {
			console.profiles();
		});
	});

});
