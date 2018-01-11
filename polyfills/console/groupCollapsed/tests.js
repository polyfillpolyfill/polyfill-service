/* eslint-env mocha, browser */
/* global proclaim */

describe('console', function () {

	it('groupCollapsed()', function () {
		proclaim.doesNotThrow(function () {
			console.groupCollapsed();
		});
	});

});
