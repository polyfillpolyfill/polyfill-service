/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('timeStamp()', function () {
		proclaim.doesNotThrow(function () {
			console.timeStamp();
		});
	});

});
