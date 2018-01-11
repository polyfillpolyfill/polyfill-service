/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('timelineEnd()', function () {
		proclaim.doesNotThrow(function () {
			console.timelineEnd();
		});
	});

});
