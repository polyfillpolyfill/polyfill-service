/* eslint-env mocha */

/* globals proclaim, Reflect */

function MyClass(a, b, c, d, e, f, g) {
	this.sum = (a || 0) +
		(b || 0) +
		(c || 0) +
		(d || 0) +
		(e || 0) +
		(f || 0) +
		(g || 0)
}

it('is a function', function () {
	proclaim.isFunction(Reflect.construct);
});

it('2 args', function () {
	var i1 = new MyClass(1, 2);
	var i2 = Reflect.construct(MyClass, [1, 2]);

	proclaim.equal(i1.sum, i2.sum);
});

it('7 args', function () {
	var i1 = new MyClass(1, 2, 3, 4, 5, 6, 7);
	var i2 = Reflect.construct(MyClass, [1, 2, 3, 4, 5, 6, 7]);

	proclaim.equal(i1.sum, i2.sum);
});
