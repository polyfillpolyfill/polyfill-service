/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.lastIndexOf);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.lastIndexOf, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.lastIndexOf, 'lastIndexOf');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'lastIndexOf');
});

it('is a function', function() {
	proclaim.isInstanceOf(Array.prototype.lastIndexOf, Function);
});

it('takes 1 argument', function() {
	proclaim.equal(Array.prototype.lastIndexOf.length, 1);
});

it('returns -1 when no match is found', function() {
	proclaim.equal(Array.prototype.lastIndexOf.call([], 3), -1);
	proclaim.equal(Array.prototype.lastIndexOf.call([], null), -1);
	proclaim.equal(Array.prototype.lastIndexOf.call([], undefined), -1);
	proclaim.equal(Array.prototype.lastIndexOf.call(['foo'], 'bar'), -1);
});

it('returns the index when a match is found', function() {
	proclaim.equal(Array.prototype.lastIndexOf.call(['foo'], 'foo'), 0);
	proclaim.equal(Array.prototype.lastIndexOf.call([3,4], 4), 1);
});

it('finds only the last occurence', function() {
	proclaim.equal(Array.prototype.lastIndexOf.call(['foo', 'bar', 'bar', 'bar'], 'bar'), 3);
});

it('works on array-like objects', function() {
	proclaim.equal(Array.prototype.lastIndexOf.call({0:5,1:6,length:2}, 6), 1);
	proclaim.equal(Array.prototype.lastIndexOf.call({0:5,1:6,2:7,length:2}, 7), -1);
});

it('does not find nested arrays', function() {
	proclaim.equal(Array.prototype.lastIndexOf.call([1,2,[3,3]], [3,3]), -1);
});
