/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('log()', function () {
		proclaim.doesNotThrow(function () {
			console.log();
		});
	});

});
