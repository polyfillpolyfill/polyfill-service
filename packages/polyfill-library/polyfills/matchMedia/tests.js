/* eslint-env mocha, browser */
/* global proclaim */

it("should define MediaQueryList in window", function() {
	proclaim.ok(Object.prototype.hasOwnProperty.call(window, 'MediaQueryList'));
});

it("should match screen", function() {
	var mql = window.matchMedia('screen');
	proclaim.equal(mql.matches, true);
});

it("should ignore 'only'", function() {
	var mql = window.matchMedia('only screen');
	proclaim.equal(mql.matches, true);
});

it("should return a MediaQueryList that has a media property representing the media query string", function() {
	var mql = window.matchMedia('screen');
	proclaim.equal(mql.media, 'screen');
});

it("should generate valid Javascript for multiple dimensions", function() {
	proclaim.doesNotThrow(function() {
		window.matchMedia('(min-width: 1px) and (max-width: 1000px)');
	});
});

it("should generate valid Javascript for dppx", function() {
	proclaim.doesNotThrow(function() {
		window.matchMedia('(min-resolution: 2dppx)');
	});
});
