/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('timeline()', function () {
		proclaim.doesNotThrow(function () {
			console.timeline();
		});
	});

});
