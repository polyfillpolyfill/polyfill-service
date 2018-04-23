/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.indexOf);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.indexOf, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.indexOf, 'indexOf');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Array.prototype, 'indexOf');
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
