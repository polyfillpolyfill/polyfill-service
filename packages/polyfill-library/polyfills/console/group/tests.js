/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('group()', function () {
		proclaim.doesNotThrow(function () {
			console.group();
		});
	});

});
