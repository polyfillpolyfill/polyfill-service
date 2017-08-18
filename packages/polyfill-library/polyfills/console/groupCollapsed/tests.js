/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('groupCollapsed()', function () {
		proclaim.doesNotThrow(function () {
			console.groupCollapsed();
		});
	});

});
