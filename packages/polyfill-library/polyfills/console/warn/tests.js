/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('warn()', function () {
		proclaim.doesNotThrow(function () {
			console.warn();
		});
	});

});
