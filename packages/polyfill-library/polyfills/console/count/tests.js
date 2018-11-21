/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('count()', function () {
		proclaim.doesNotThrow(function () {
			console.count();
		});
	});

});
