/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('timeStamp()', function () {
		proclaim.doesNotThrow(function () {
			console.timeStamp();
		});
	});

});
