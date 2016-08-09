/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('console', function () {

	it('dir()', function () {
		proclaim.doesNotThrow(function () {
			console.dirxml(document.body); // argument requied for IE11
		});
	});

});
