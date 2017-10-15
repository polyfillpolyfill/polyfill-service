/* eslint-env mocha, browser*/
/* global proclaim, it */

describe('IntersectionObserverEntry', function () {
	it('adds IntersectionObserverEntry to window', function () {
		proclaim.ok('IntersectionObserverEntry' in window);
	});
});
