/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('profiles()', function () {
		proclaim.doesNotThrow(function () {
			console.profiles();
		});
	});

});
