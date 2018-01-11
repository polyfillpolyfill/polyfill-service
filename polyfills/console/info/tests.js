/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('info()', function () {
		proclaim.doesNotThrow(function () {
			console.info();
		});
	});

});
