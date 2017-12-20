/* eslint-env mocha, browser */
/* global proclaim */

describe('IntersectionObserverEntry', function () {
	it('has an isIntersecting property', function () {
		proclaim.ok('isIntersecting' in IntersectionObserverEntry.prototype);
	});
});
