/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('clear()', function () {
		proclaim.doesNotThrow(function () {
			console.clear();
		});
	});

});
