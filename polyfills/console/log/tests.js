/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('log()', function () {
		proclaim.doesNotThrow(function () {
			console.log();
		});
	});

});
