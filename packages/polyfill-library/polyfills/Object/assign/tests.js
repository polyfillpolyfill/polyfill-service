/* eslint-env mocha, browser */
/* global proclaim */

it('has the correct length', function() {
	proclaim.deepEqual(Object.assign.length, 2);
});

it('throws when target is not an object', function() {
	proclaim.throws(function () {
		Object.assign(null);
	}, TypeError);

	proclaim.throws(function () {
		Object.assign(undefined);
	}, TypeError);
});

it('Object properties are assigned to target in ascending index order', function () {
	proclaim.deepEqual(Object.assign({ foo: 0 }, { bar: 1 }), {
		foo: 0,
		bar: 1
	});
});

it('Ignores null and undefined sources', function () {
	proclaim.deepEqual(Object.assign({ foo: 0 }, null, undefined), { foo: 0 });

	proclaim.deepEqual(Object.assign({ foo: 0 }, null, undefined, { bar: 1 }, null), {
		foo: 0,
		bar: 1
	});
});

it('throws on null or undefined targets', function() {
	proclaim.throws(function () {
		Object.assign(null, {});
	});

	proclaim.throws(function () {
		Object.assign(undefined, {});
	});

	proclaim.throws(function () {
		Object.assign(undefined, undefined);
	});
});

it('supports multiple sources, overriding previous copies of the same property', function() {
	proclaim.deepEqual(Object.assign({foo: 0}, {bar: 1}, {bar: 2}), {
		foo: 0,
		bar: 2
	});
});

it('does not iterate prototype properties', function() {
	var Bar = function () {};
	Bar.prototype.foo = 2;
	var bar = new Bar();
	bar.baz = 1;

	proclaim.deepEqual(Object.assign({foo: 1}, bar), {
		foo: 1,
		baz: 1
	});
});

it('returns the target object', function() {
	var target = {};
	var returned = Object.assign(target, {foo: 1});
	proclaim.deepEqual(returned, target);
});

it('converts primitives as the target into Objects', function() {
	var target = Object.assign(true, {foo: 'bar'});
	var booleanObject = Object(true);
	booleanObject.foo = 'bar';
	proclaim.deepEqual(target, booleanObject);
});

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { // this is IE 8.
		return false;
	}
};
var ifSupportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported() ? it : xit;

it('works as expected', function () {
	var foo, str, ref$, O, string, i$, x$, len$;
	foo = {
		q: 1
	};
	proclaim.strictEqual(foo, Object.assign(foo, {
		bar: 2
	}), 'assign return target');
	proclaim.strictEqual(foo.bar, 2, 'assign define properties');
	proclaim.deepEqual(Object.assign({}, {
		q: 1
	}, {
		w: 2
	}), {
		q: 1,
		w: 2
	});
	proclaim.deepEqual(Object.assign({}, 'qwe'), {
		0: 'q',
		1: 'w',
		2: 'e'
	});
	proclaim.throws(function(){
		return Object.assign(null, {
			q: 1
		});
	}, TypeError);
	proclaim.throws(function(){
		return Object.assign(void 8, {
			q: 1
		});
	}, TypeError);
	str = Object.assign('qwe', {
		q: 1
	});
	proclaim.strictEqual(typeof str, 'object');
	proclaim.strictEqual(String(str), 'qwe');
	proclaim.strictEqual(str.q, 1);
	string = 'abcdefghijklmnopqrst';
    O = {};
    for (i$ = 0, len$ = (ref$ = string.split('')).length; i$ < len$; ++i$) {
      x$ = ref$[i$];
      O[x$] = x$;
    }
    proclaim.strictEqual(Object.keys(Object.assign({}, O)).join(''), string);
});
 ifSupportsDescriptors('works as expected', function () {
	var foo, c, d, D, ref$, O;
	foo = {
		q: 1
	};
	foo = {
		baz: 1
	};
	Object.assign(foo, Object.defineProperty({}, 'bar', {
		get: function () {
			return this.baz + 1;
		}
	}));
	proclaim.ok(foo.bar === void 8, "assign don't copy descriptors");
	if ('Symbol' in window) {
		c = Symbol('c');
		d = Symbol('d');
		D = (ref$ = {
			a: 'a'
		}, ref$[c] = 'c', ref$);
		Object.defineProperty(D, 'b', {
			value: 'b'
		});
		Object.defineProperty(D, d, {
			value: 'd'
		});
		O = Object.assign({}, D);
		proclaim.strictEqual(O.a, 'a', 'a');
		proclaim.strictEqual(O.b, void 8, 'b');
		proclaim.strictEqual(O[c], 'c', 'c');
		proclaim.strictEqual(O[d], void 8, 'd');
	}
	try {
		proclaim.strictEqual(Function('return Object.assign({b: 1}, {get a(){delete this.b;},b: 2})')().b, 1);
	} catch (e$) { }
	try {
		proclaim.strictEqual(Function('return Object.assign({b: 1}, {get a(){Object.defineProperty(this, "b", {value:4,enumerable:false});},b: 2})')().b, 1);
	} catch (e$) { }
 });
