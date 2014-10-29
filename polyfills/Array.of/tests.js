it('has correct instance', function () {
	expect(Array.of).to.be.a(Function);
});

it('has correct name', function () {
	expect(nameOf(Array.of)).to.be('of');
});

it('has correct argument length', function () {
	expect(Array.of.length).to.be(0);
});

describe('returns an array with', function () {
	var array, object;

	it('three strings', function () {
		array = Array.of('a', 'b', 'c');

		expect(array).to.be.an(Array);
		expect(array.length).to.be(3);
		expect(array[0]).to.be('a');
		expect(array[1]).to.be('b');
		expect(array[2]).to.be('c');
	});

	it('an integer', function () {
		array = Array.of(3);

		expect(array).to.be.an(Array);
		expect(array.length).to.be(1);
		expect(array[0]).to.be(3);
	});

	it('an object', function () {
		object = { length: 3 };
		array = Array.of(object);

		expect(array).to.be.an(Array);
		expect(array.length).to.be(1);
		expect(array[0]).to.be(object);
	});
});
