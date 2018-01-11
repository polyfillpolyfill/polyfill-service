/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('timeEnd()', function () {
		proclaim.doesNotThrow(function () {
			console.time('testTimeEnd');
			console.timeEnd('testTimeEnd');
		});
	});

});
