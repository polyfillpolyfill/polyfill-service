/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('groupEnd()', function () {
		proclaim.doesNotThrow(function () {
			console.groupEnd();
		});
	});

});
