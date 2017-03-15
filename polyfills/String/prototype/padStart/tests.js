/* eslint-env mocha, browser*/
/* global proclaim, it */

it('has correct instance', function () {
	proclaim.isInstanceOf(String.prototype.padStart, Function);
});

it('has correct argument length', function () {
	proclaim.equal(String.prototype.padStart.length, 2);
});

it('works with strings', function () {
	proclaim.equal('a'.padStart(0, 'a'), 'a');
	proclaim.equal('a'.padStart(1, 'a'), 'a');
	proclaim.equal('a'.padStart(5, 'a'), 'aaaaa');
	proclaim.equal('a'.padStart(5, 'bc'), 'bcbca');
	proclaim.equal('a'.padStart(5, 'bcdef'), 'bcdea');
});
