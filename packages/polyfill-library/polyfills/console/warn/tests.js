/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('warn()', function () {
		proclaim.doesNotThrow(function () {
			console.warn();
		});
	});

});
