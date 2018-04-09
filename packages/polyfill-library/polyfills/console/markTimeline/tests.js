/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('markTimeline()', function () {
		proclaim.doesNotThrow(function () {
			console.markTimeline();
		});
	});

});
