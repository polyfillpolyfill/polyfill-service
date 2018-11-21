/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('debug()', function () {
		proclaim.doesNotThrow(function () {
			console.debug();
		});
	});

});
