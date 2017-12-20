/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('group()', function () {
		proclaim.doesNotThrow(function () {
			console.group();
		});
	});

});
