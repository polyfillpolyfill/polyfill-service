/* eslint-env mocha, browser*/
/* global proclaim, it */

it('has correct instance', function () {
	proclaim.isInstanceOf(String.prototype.padEnd, Function);
});

it('has correct argument length', function () {
	proclaim.equal(String.prototype.padEnd.length, 2);
});

it('works with strings', function () {
	proclaim.equal('a'.padEnd(0, 'a'), 'a');
	proclaim.equal('a'.padEnd(1, 'a'), 'a');
	proclaim.equal('a'.padEnd(5, 'a'), 'aaaaa');
	proclaim.equal('a'.padEnd(5, 'bc'), 'abcbc');
	proclaim.equal('a'.padEnd(5, 'bcdef'), 'abcde');
});
