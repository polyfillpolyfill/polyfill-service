/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('timeline()', function () {
		proclaim.doesNotThrow(function () {
			console.timeline();
		});
	});

});
