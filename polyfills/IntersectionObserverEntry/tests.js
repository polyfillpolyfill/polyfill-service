/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('IntersectionObserverEntry', function () {
	it('has an isIntersecting property', function () {
		proclaim.ok('isIntersecting' in IntersectionObserverEntry.prototype);
	});
});