/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('table()', function () {
		proclaim.doesNotThrow(function () {
			console.table();
		});
	});

});
