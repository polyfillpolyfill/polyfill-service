/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function() {
	proclaim.isInstanceOf(Array.prototype.indexOf, Function);
});

it('takes 1 argument', function() {
	proclaim.equal(Array.prototype.indexOf.length, 1);
});

it('returns -1 when no match is found', function() {
	proclaim.equal(Array.prototype.indexOf.call([], 3), -1);
	proclaim.equal(Array.prototype.indexOf.call([], null), -1);
	proclaim.equal(Array.prototype.indexOf.call([], undefined), -1);
	proclaim.equal(Array.prototype.indexOf.call(['foo'], 'bar'), -1);
});

it('returns the index when a match is found', function() {
	proclaim.equal(Array.prototype.indexOf.call(['foo'], 'foo'), 0);
	proclaim.equal(Array.prototype.indexOf.call([3,4], 4), 1);
});

it('finds only the first occurence', function() {
	proclaim.equal(Array.prototype.indexOf.call(['foo', 'bar', 'bar', 'bar'], 'bar'), 1);
});

it('works on array-like objects', function() {
	proclaim.equal(Array.prototype.indexOf.call({0:5,1:6,length:2}, 6), 1);
	proclaim.equal(Array.prototype.indexOf.call({0:5,1:6,2:7,length:2}, 7), -1);
});

it('does not find nested arrays', function() {
	proclaim.equal(Array.prototype.indexOf.call([1,2,[3,3]], [3,3]), -1);
});
