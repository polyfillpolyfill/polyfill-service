/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('count()', function () {
		proclaim.doesNotThrow(function () {
			console.count();
		});
	});

});
