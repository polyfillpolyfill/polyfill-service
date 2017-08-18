/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('exception()', function () {
		proclaim.doesNotThrow(function () {
			console.exception();
		});
	});

});
