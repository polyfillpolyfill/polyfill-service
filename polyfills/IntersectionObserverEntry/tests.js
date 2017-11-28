/* eslint-env mocha, browser */
/* global proclaim */

describe('IntersectionObserverEntry', function () {
	it('adds IntersectionObserverEntry to window', function () {
		proclaim.ok('IntersectionObserverEntry' in window);
	});
});
