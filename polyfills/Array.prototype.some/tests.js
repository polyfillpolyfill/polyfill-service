
beforeEach(function() {
	this.array = [0, 2, 4, 6, 8, 10, 12, 14];
});

it("Should accept a function with three parameters: the value of the element, the index of the element and the object being traversed", function() {
	var array = this.array;

	array.some(function(value, index, object) {
		expect(object).to.be(array);
		expect(object[index]).to.be(value);
		return false;
	});
});

it("Should accept an optional 'this' argument as its second argument which becomes the 'this' value for the function argument", function() {
	var mockThis = { foo: "bar" };
	var array = this.array;

	array.some(function(value) {
		expect(this).to.be(mockThis);
		expect(this.foo).to.be(mockThis.foo);
		return false;
	}, mockThis);
});

it("Should pass a reference to the array as the third parameter to the function argument", function() {
	var array = [10];

	array.some(function(value, index, object) {
		object[0] = 100;
		return false;
	});

	expect(array[0]).to.be(100);
});
