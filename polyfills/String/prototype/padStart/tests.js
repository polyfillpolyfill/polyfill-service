/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(String.prototype.padStart, Function);
});

it('has correct argument length', function () {
	proclaim.equal(String.prototype.padStart.length, 1);
});

it('works with strings', function () {
	proclaim.equal('a'.padStart(-1, 'a'), 'a');
	proclaim.equal('a'.padStart(0, 'a'), 'a');
	proclaim.equal('a'.padStart(1, 'a'), 'a');
	proclaim.equal('a'.padStart(5, 'a'), 'aaaaa');
	proclaim.equal('a'.padStart(5, 'bc'), 'bcbca');
	proclaim.equal('a'.padStart(5, 'bcdef'), 'bcdea');
	proclaim.equal('a'.padStart(5, 5), '5555a');
	proclaim.equal('a'.padStart(5, { nil: 0 }), '[obja'); // String(x:Object) = [object Object]
	proclaim.equal('a'.padStart(5, [0, 1, 2]), '0,1,a'); // String(x:Array)  = x.toString()
	proclaim.equal('a'.padStart(10, [0, "hello!", 2]), '0,hello!,a');
	proclaim.equal('a'.padStart(10), '         a');
});
