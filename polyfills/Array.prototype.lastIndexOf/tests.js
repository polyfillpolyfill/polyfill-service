var expectTypeError = function (e) {
  expect(e).to.be.a(TypeError);
}

it('is a function', function() {
	expect(Array.prototype.lastIndexOf).to.be.a('function')
});

it('takes 1 argument', function() {
	expect(Array.prototype.lastIndexOf.length).to.be(1)
});

it('throws a TypeError when applied to non-array-like types', function() {
	expect(function() {
		Array.prototype.lastIndexOf.call(undefined);
	}).to.throwException(expectTypeError);
	expect(function() {
		Array.prototype.lastIndexOf.call(null);
	}).to.throwException(expectTypeError);
});

it('returns -1 when no match is found', function() {
	expect(Array.prototype.lastIndexOf.call([], 3)).to.be(-1);
	expect(Array.prototype.lastIndexOf.call([], null)).to.be(-1);
	expect(Array.prototype.lastIndexOf.call([], undefined)).to.be(-1);
	expect(Array.prototype.lastIndexOf.call(['foo'], 'bar')).to.be(-1);
});

it('returns the index when a match is found', function() {
	expect(Array.prototype.lastIndexOf.call(['foo'], 'foo')).to.be(0);
	expect(Array.prototype.lastIndexOf.call([3,4], 4)).to.be(1);
});

it('finds only the last occurence', function() {
	expect(Array.prototype.lastIndexOf.call(['foo', 'bar', 'bar', 'bar'], 'bar')).to.be(3);
});

it('works on array-like objects', function() {
	expect(Array.prototype.lastIndexOf.call({0:5,1:6,length:2}, 6)).to.be(1);
	expect(Array.prototype.lastIndexOf.call({0:5,1:6,2:7,length:2}, 7)).to.be(-1);
});

it('does not find nested arrays', function() {
	expect(Array.prototype.lastIndexOf.call([1,2,[3,3]], [3,3])).to.be(-1);
});
