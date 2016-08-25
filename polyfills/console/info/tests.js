/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('info()', function () {
		proclaim.doesNotThrow(function () {
			console.info();
		});
	});

});
