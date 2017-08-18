/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('timelineEnd()', function () {
		proclaim.doesNotThrow(function () {
			console.timelineEnd();
		});
	});

});
