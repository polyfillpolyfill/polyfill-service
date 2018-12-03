/* eslint-env mocha, browser */
/* global proclaim, WeakMap, Symbol */

it('is a function', function () {
	proclaim.isFunction(WeakMap);
});

it('has correct argument length', function () {
	proclaim.arity(WeakMap, 0);
});

it('has correct name', function() {
	proclaim.hasName(WeakMap, 'WeakMap');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(window, 'WeakMap');
});

it("has valid constructor", function () {
	proclaim.isInstanceOf(new WeakMap, WeakMap);
	proclaim.isInstanceOf(new WeakMap(), WeakMap);
	proclaim.equal((new WeakMap()).constructor, WeakMap);
	proclaim.equal((new WeakMap()).constructor.name, "WeakMap");
	if ("__proto__" in {}) {
		proclaim.equal((new WeakMap).__proto__.isPrototypeOf(new WeakMap()), true);
		proclaim.equal((new WeakMap).__proto__ === WeakMap.prototype, true);
	}

	proclaim.throws(function () {
		WeakMap();
	}, TypeError);
});

it('has get, set, delete, and has functions', function() {
	proclaim.isFunction(WeakMap.prototype['get']);
	proclaim.isFunction(WeakMap.prototype['set']);
	proclaim.isFunction(WeakMap.prototype['delete']);
	proclaim.isFunction(WeakMap.prototype['has']);
});
it('should perform as expected', function() {
	var wm = new WeakMap();
	var o1 = {};
	var o2 = function(){};
	var o3 = window;
	wm.set(o1, 37);
	proclaim.equal(wm.get(o1), 37);

	wm.set(o1, o2);
	wm.set(o3, undefined);
	proclaim.deepEqual(wm.get(o1), o2);

	// `wm.get({})` should return undefined, because there is no value for the object on wm
	proclaim.equal(wm.get({}), undefined);

	// `wm.get(o3)` should return undefined, because that is the set value
	proclaim.equal(wm.get(o3), undefined);

	proclaim.equal(wm.has(o1), true);
	proclaim.equal(wm.has({}), false);

	// Ensure that delete returns true/false indicating if the value was removed
	proclaim.equal(wm['delete'](o1), true);
	proclaim.equal(wm['delete']({}), false);

	proclaim.equal(wm.get(o1), undefined);
	proclaim.equal(wm.has(o1), false);
});

// Fails in IE11, supported in the polyfill
it('should be chainable', function() {
	var wm = new WeakMap();
	var o1 = {};
	var o2 = function(){};
	wm.set(o1, 37).set(o2, 'aoeui');
	proclaim.equal(wm.get(o2), 'aoeui');
});

// Ealy native implementations do not support this, polyfill does
it('should be possible to prepopulate the map', function() {
	var o1 = {};
	var wm = new WeakMap([
		[o1, 12],
		[function(){}, 'foo'],
		[window]
	]);

	proclaim.equal(wm.get(window), undefined);
	proclaim.equal(wm.get(o1), 12);
});

if ('freeze' in Object) {
	it('supports frozen objects', function () {
		var f = Object.freeze({});
		var map = new WeakMap();
		map.set(f, 42);
		proclaim.isTrue(map.has(f));
		proclaim.strictEqual(map.get(f), 42);
		map['delete'](f);
    proclaim.isFalse(map.has(f));
    proclaim.isUndefined(map.get(f));
	});
}

if ('Symbol' in window && 'iterator' in Symbol && typeof [][Symbol.iterator] === 'function') {
	it('supports iterables', function () {
		var arr = [];
		var done = false;
		arr[Symbol.iterator] = function () {
			done = true;
			return [][Symbol.iterator].call(this);
		};
		new WeakMap(arr);
		proclaim.isTrue(done);
	});
}

it('WeakMap.prototype.delete', function () {
	proclaim.isFunction(WeakMap.prototype['delete']);
	proclaim.arity(WeakMap.prototype['delete'], 1);
	proclaim.isNotEnumerable(WeakMap.prototype, 'delete');
	var a = {};
	var b = {};
	var M = new WeakMap();
	M.set(a, 42);
	M.set(b, 21);
	proclaim.isTrue(M.has(a));
	proclaim.isTrue(M.has(b));
	M['delete'](a);
	proclaim.isFalse(M.has(a));
	proclaim.isTrue(M.has(b));
	proclaim.isFalse(M['delete'](1));
});

it('WeakMap.prototype.get', function () {
	var M = new WeakMap();
	var a = {};
	proclaim.isFunction(WeakMap.prototype.get);
	proclaim.hasName(WeakMap.prototype.get, 'get');
	proclaim.arity(WeakMap.prototype.get, 1);
	proclaim.isNotEnumerable(WeakMap.prototype, 'get');
	proclaim.isUndefined(M.get({}));
	M.set(a, 42);
	proclaim.strictEqual(M.get(a), 42);
	M['delete'](a);
	proclaim.isUndefined(M.get(a));
	proclaim.isUndefined(M.get(1));
});

it('WeakMap.prototype.has', function () {
	var M = new WeakMap();
	var a = {};
	proclaim.isFunction(WeakMap.prototype.has);
	proclaim.hasName(WeakMap.prototype.has, 'has');
	proclaim.arity(WeakMap.prototype.has, 1);
	proclaim.isNotEnumerable(WeakMap.prototype, 'has');
	proclaim.isFalse(M.has({}));
	M.set(a, 42);
	proclaim.isTrue(M.has(a));
	M['delete'](a);
	proclaim.isFalse(M.has(a));
	proclaim.isFalse(M.has(1));
});

it('WeakMap.prototype.set', function () {
	var a = {};
	var wmap = new WeakMap();
	proclaim.isFunction(WeakMap.prototype.set);
	proclaim.hasName(WeakMap.prototype.set, 'set');
	proclaim.arity(WeakMap.prototype.set, 2);
	proclaim.isNotEnumerable(WeakMap.prototype, 'set');
	wmap.set(a, 42);
	proclaim.strictEqual(wmap.get(a), 42);
	proclaim.throws(function () {
		new WeakMap().set(42, 42);
	}, TypeError);
	proclaim.deepEqual(wmap.set({}, 1), wmap);
});

if (typeof Symbol != 'undefined' && 'toStringTag' in Symbol) {
	it('WeakMap.prototype[Symbol.toStringTag]', function () {
		proclaim.strictEqual(WeakMap.prototype[Symbol.toStringTag], 'WeakMap');
	});
}
