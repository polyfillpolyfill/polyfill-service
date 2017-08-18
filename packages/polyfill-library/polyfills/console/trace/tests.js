/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('trace()', function () {
		proclaim.doesNotThrow(function () {
			console.trace();
		});
	});

});
