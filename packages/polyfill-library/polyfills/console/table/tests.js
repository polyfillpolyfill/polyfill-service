/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('table()', function () {
		proclaim.doesNotThrow(function () {
			console.table();
		});
	});

});
