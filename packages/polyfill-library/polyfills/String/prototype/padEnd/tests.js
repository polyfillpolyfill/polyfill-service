/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(String.prototype.padEnd, Function);
});

it('has correct argument length', function () {
	proclaim.equal(String.prototype.padEnd.length, 1);
});

it('works with strings', function () {
	proclaim.equal('a'.padEnd(-1, 'a'), 'a');
	proclaim.equal('a'.padEnd(0, 'a'), 'a');
	proclaim.equal('a'.padEnd(1, 'a'), 'a');
	proclaim.equal('a'.padEnd(5, 'a'), 'aaaaa');
	proclaim.equal('a'.padEnd(5, 'bc'), 'abcbc');
	proclaim.equal('a'.padEnd(5, 'bcdef'), 'abcde');
	proclaim.equal('a'.padEnd(5, 5), 'a5555');
	proclaim.equal('a'.padEnd(5, { nil: 0 }), 'a[obj');
	proclaim.equal('a'.padEnd(5, [0, 1, 2]), 'a0,1,');
	proclaim.equal('a'.padEnd(10, [0, "hello!", 2]), 'a0,hello!,');
	proclaim.equal('a'.padEnd(10), 'a         ');
});
