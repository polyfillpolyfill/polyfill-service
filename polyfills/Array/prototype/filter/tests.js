var expectTypeError = function (e) {
  expect(e).to.be.a(TypeError);
}
var stringsOnly = function(val, idx, obj) {
	return (typeof val == 'string');
};

it('is a function', function() {
	expect(Array.prototype.filter).to.be.a('function')
});

it('takes 1 argument', function() {
	expect(Array.prototype.filter.length).to.be(1)
});

it('throws a TypeError when applied to non-array-like types', function() {
	expect(function() {
		Array.prototype.filter.call(undefined)
	}).to.throwException(expectTypeError);
	expect(function() {
		Array.prototype.filter.call(null)
	}).to.throwException(expectTypeError);
});

it('correctly filters an array', function() {
	expect(Array.prototype.filter.call(['foo', 'bar'], stringsOnly)).to.eql(['foo','bar']);
	expect(Array.prototype.filter.call([7, 'foo', 42, 'bar'], stringsOnly)).to.eql(['foo','bar']);
	expect(Array.prototype.filter.call([42,43,44], stringsOnly)).to.eql([]);
});
