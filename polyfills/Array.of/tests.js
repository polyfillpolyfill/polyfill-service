it('is a function', function() {
	expect(Array.of).to.be.a('function')
});

it('creates an array from two strings', function() {
	var test = Array.of('foo', 'bar');
	expect(test).to.be.an('array');
	expect(test.length).to.be(2);
	expect(test[0]).to.be('foo');
	expect(test[1]).to.be('bar');
});

it('creates an array from a single integer argument', function() {
	var test = Array.of(3);
	expect(test).to.be.an('array');
	expect(test.length).to.be(1);
	expect(test[0]).to.be(3);
});
