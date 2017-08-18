/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('dir()', function () {
		proclaim.doesNotThrow(function () {
			console.dir();
		});
	});

});
