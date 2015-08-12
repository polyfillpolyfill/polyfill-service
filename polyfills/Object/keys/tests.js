it('has correct instance', function () {
	expect(Object.keys).to.be.a(Function);
});

it('has correct argument length', function () {
	expect(Object.keys.length).to.be(1);
});

it('works with objects', function () {
	expect(Object.keys({}).length).to.be(0);

	expect(Object.keys({
		foo: true
	}).length).to.be(1);

	expect(Object.keys({
		foo: true,
		bar: false
	}).length).to.be(2);
});

it('works with objects containing otherwise non-enumerable keys', function () {
	expect(Object.keys({
		toString: function () {}
	}).length).to.be(1);

	expect(Object.keys({
		constructor: 0,
		hasOwnProperty: 0,
		isPrototypeOf: 0,
		propertyIsEnumerable: 0,
		toString: 0,
		toLocaleString: 0,
		valueOf: 0
	}).length).to.be(7);
});
