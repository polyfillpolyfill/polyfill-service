/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('debug()', function () {
		proclaim.doesNotThrow(function () {
			console.debug();
		});
	});

});
