/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(String.prototype.endsWith, Function);
});

it('has correct argument length', function () {
	proclaim.equal(String.prototype.endsWith.length, 1);
});

it('works with strings', function () {
	proclaim.equal('a'.endsWith('aa'), false);
	proclaim.equal('a'.endsWith('ab'), false);
	proclaim.equal('aa'.endsWith('a'), true);
	proclaim.equal('ab'.endsWith('a'), false);
	proclaim.equal('ab'.endsWith('ab'), true);
	proclaim.equal('ab'.endsWith('b'), true);
});
