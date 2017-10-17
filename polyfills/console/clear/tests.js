/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('clear()', function () {
		proclaim.doesNotThrow(function () {
			console.clear();
		});
	});

});
