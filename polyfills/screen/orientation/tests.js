/* eslint-env mocha, browser */
/* global proclaim */

it('returns an object', function () {
	proclaim.isInstanceOf(window.screen.orientation, Object);
});

it('has type property', function () {
	var valid = {'landscape-primary': 1, 'landscape-secondary':1, 'portrait-primary':1, 'portrait-secondary':1};
	proclaim.equal(window.screen.orientation.type && valid[window.screen.orientation.type], true);
});

it('has angle property', function () {
	proclaim.isTypeOf(window.screen.orientation.angle, 'number');
});
