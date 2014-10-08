var vals = [], idxs = [];
var expectTypeError = function (e) {
  expect(e).to.be.a(TypeError);
}
var iterator = function(val, idx, arr) {
	vals.push(val);
	idxs.push(idx);
}

it('is a function', function() {
	expect(Array.prototype.forEach).to.be.a('function')
});

it('takes 1 argument', function() {
	expect(Array.prototype.forEach.length).to.be(1)
});

it('throws a TypeError when applied to non-array-like types', function() {
	expect(function() {
		Array.prototype.forEach.call(undefined)
	}).to.throwException(expectTypeError);
	expect(function() {
		Array.prototype.forEach.call(null)
	}).to.throwException(expectTypeError);
});

it('iterates an array', function() {
	vals = idxs = [];
	Array.prototype.forEach.call([1,2,3], iterator);
	expect(vals).to.eql([1,2,3]);
	expect(idxs).to.eql([0,1,2]);
});

it('iterates an array-like object', function() {
	vals = idxs = [];
	Array.prototype.forEach.call({0:1,1:2,2:3,length:2}, iterator);
	expect(vals).to.eql([1,2]);
	expect(idxs).to.eql([0,1]);
});

