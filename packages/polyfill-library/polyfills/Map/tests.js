/* eslint-env mocha */
/* globals proclaim, Map, Symbol */

it('is a function', function () {
	proclaim.isFunction(Map);
});

it('has correct arity', function () {
	proclaim.arity(Map, 0);
});

it('has correct name', function () {
	proclaim.hasName(Map, 'Map');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(window, 'Map');
});

var arePropertyDescriptorsSupported = function() {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', {
			enumerable: false,
			value: obj
		});
		/* eslint-disable no-unused-vars, no-restricted-syntax */
		for (var _ in obj) {
			return false;
		}
		/* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { // this is IE 8.
		return false;
	}
};

var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

describe('Map', function () {

	if (supportsDescriptors) {
		it('has no enumerable properties on the prototype', function () {
			for (var _ in Map.prototype) {
				proclaim.isTrue(false, 'Expected no enumerable properties, found ' + _ + ' was enumerable');
			}
		});

		it('has no enumerable properties on the instance', function () {
			var o = new Map();
			for (var _ in o) {
				proclaim.isTrue(false, 'Expected no enumerable properties, found ' + _ + ' was enumerable');
			}
		});

		var hasGetOwnPropertyDescriptor = 'getOwnPropertyDescriptor' in Object && typeof Object.getOwnPropertyDescriptor === 'function';
		if (hasGetOwnPropertyDescriptor) {
			it('has correct descriptors defined for Map', function () {
				var descriptor = Object.getOwnPropertyDescriptor(window, 'Map');

				proclaim.isTrue(descriptor.configurable);
				try {
					proclaim.isFalse(descriptor.enumerable);
				} catch (e) {
					// Safari 5.1 sets the property to true.
					proclaim.isTrue(descriptor.enumerable);
				}
				proclaim.isTrue(descriptor.writable);
				proclaim.doesNotInclude(descriptor, 'get');
				proclaim.doesNotInclude(descriptor, 'set');
				proclaim.isFunction(descriptor.value);
			});
			it('has correct descriptors defined for Map.name', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map, 'name');

				try {
					proclaim.isTrue(descriptor.configurable);
				} catch (e) {
					// Safari 8 sets the name property with correct value but also to be non-configurable
					proclaim.isFalse(descriptor.configurable);
				}
				proclaim.isFalse(descriptor.enumerable);
				proclaim.isFalse(descriptor.writable);
				proclaim.doesNotInclude(descriptor, 'get');
				proclaim.doesNotInclude(descriptor, 'set');
				proclaim.equal(descriptor.value, 'Map');
			});
			it('has correct descriptors defined for Map.prototype', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map, 'prototype');

				proclaim.isFalse(descriptor.configurable);
				proclaim.isFalse(descriptor.enumerable);
				try {
					proclaim.isFalse(descriptor.writable);
				} catch (e) {
					// Safari 5.1 sets the property to true.
					proclaim.isTrue(descriptor.writable);
				}
				proclaim.doesNotInclude(descriptor, 'get');
				proclaim.doesNotInclude(descriptor, 'set');
				proclaim.ok(descriptor.value);
			});
			it('has correct descriptors defined for Map.prototype.size', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map.prototype, 'size');

				proclaim.isTrue(descriptor.configurable);
				proclaim.isFalse(descriptor.enumerable);
				proclaim.doesNotInclude(descriptor.writable);
				proclaim.ok(descriptor.get);
				proclaim.isUndefined(descriptor.set);
				proclaim.include(descriptor, 'set');
				proclaim.doesNotInclude(descriptor, 'value');
			});
			it('has correct descriptors defined for Map.prototype.get', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map.prototype, 'get');

				proclaim.isTrue(descriptor.configurable);
				proclaim.isFalse(descriptor.enumerable);
				proclaim.isTrue(descriptor.writable);
				proclaim.doesNotInclude(descriptor, 'get');
				proclaim.doesNotInclude(descriptor, 'set');
				proclaim.ok(descriptor.value);
			});
			it('has correct descriptors defined for Map.prototype.set', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map.prototype, 'set');

				proclaim.isTrue(descriptor.configurable);
				proclaim.isFalse(descriptor.enumerable);
				proclaim.isTrue(descriptor.writable);
				proclaim.doesNotInclude(descriptor, 'get');
				proclaim.doesNotInclude(descriptor, 'set');
				proclaim.ok(descriptor.value);
			});
			it('has correct descriptors defined for Map.prototype.has', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map.prototype, 'has');

				proclaim.isTrue(descriptor.configurable);
				proclaim.isFalse(descriptor.enumerable);
				proclaim.isTrue(descriptor.writable);
				proclaim.doesNotInclude(descriptor, 'get');
				proclaim.doesNotInclude(descriptor, 'set');
				proclaim.ok(descriptor.value);
			});
			it('has correct descriptors defined for Map.prototype.delete', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map.prototype, 'delete');

				proclaim.isTrue(descriptor.configurable);
				proclaim.isFalse(descriptor.enumerable);
				proclaim.isTrue(descriptor.writable);
				proclaim.doesNotInclude(descriptor, 'get');
				proclaim.doesNotInclude(descriptor, 'set');
				proclaim.ok(descriptor.value);
			});
			it('has correct descriptors defined for Map.prototype.clear', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map.prototype, 'clear');

				proclaim.isTrue(descriptor.configurable);
				proclaim.isFalse(descriptor.enumerable);
				proclaim.isTrue(descriptor.writable);
				proclaim.doesNotInclude(descriptor, 'get');
				proclaim.doesNotInclude(descriptor, 'set');
				proclaim.ok(descriptor.value);
			});
			it('has correct descriptors defined for Map.prototype.values', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map.prototype, 'values');

				proclaim.isTrue(descriptor.configurable);
				proclaim.isFalse(descriptor.enumerable);
				proclaim.isTrue(descriptor.writable);
				proclaim.doesNotInclude(descriptor, 'get');
				proclaim.doesNotInclude(descriptor, 'set');
				proclaim.ok(descriptor.value);
			});
			it('has correct descriptors defined for Map.prototype.keys', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map.prototype, 'keys');

				proclaim.isTrue(descriptor.configurable);
				proclaim.isFalse(descriptor.enumerable);
				proclaim.isTrue(descriptor.writable);
				proclaim.doesNotInclude(descriptor, 'get');
				proclaim.doesNotInclude(descriptor, 'set');
				proclaim.ok(descriptor.value);
			});
			it('has correct descriptors defined for Map.prototype[Symbol.iterator]', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map.prototype, Symbol.iterator);

				proclaim.isTrue(descriptor.configurable);
				proclaim.isFalse(descriptor.enumerable);
				proclaim.isTrue(descriptor.writable);
				proclaim.doesNotInclude(descriptor, 'get');
				proclaim.doesNotInclude(descriptor, 'set');
				proclaim.ok(descriptor.value);
			});
			it('has correct descriptors defined for Map.prototype.entries', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map.prototype, 'entries');

				proclaim.isTrue(descriptor.configurable);
				proclaim.isFalse(descriptor.enumerable);
				proclaim.isTrue(descriptor.writable);
				proclaim.doesNotInclude(descriptor, 'get');
				proclaim.doesNotInclude(descriptor, 'set');
				proclaim.ok(descriptor.value);
			});
			it('has correct descriptors defined for Map.prototype.forEach', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map.prototype, 'forEach');

				proclaim.isTrue(descriptor.configurable);
				proclaim.isFalse(descriptor.enumerable);
				proclaim.isTrue(descriptor.writable);
				proclaim.doesNotInclude(descriptor, 'get');
				proclaim.doesNotInclude(descriptor, 'set');
				proclaim.ok(descriptor.value);
			});
			it('has correct descriptors defined for Map.prototype.constructor', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map.prototype, 'constructor');

				proclaim.isTrue(descriptor.configurable);
				proclaim.isFalse(descriptor.enumerable);
				proclaim.isTrue(descriptor.writable);
				proclaim.doesNotInclude(descriptor, 'get');
				proclaim.doesNotInclude(descriptor, 'set');
				proclaim.ok(descriptor.value);
			});
			it('has correct descriptors defined for Map[Symbol.species]', function () {
				var descriptor = Object.getOwnPropertyDescriptor(Map, Symbol.species);

				proclaim.isTrue(descriptor.configurable);
				proclaim.isFalse(descriptor.enumerable);
				proclaim.doesNotInclude(descriptor, 'writable');
				proclaim.include(descriptor, 'get');
				proclaim.include(descriptor, 'set');
				proclaim.isUndefined(descriptor.set);
				proclaim.doesNotInclude(descriptor, 'value');
			});
		}
	}

	describe('constructor', function () {
		it('has 0 length', function () {
			proclaim.equal(Map.length, 0);
		});

		it('throws error if called without NewTarget set. I.E. Called as a normal function and not a constructor', function () {
			proclaim.throws(function () {
				Map(); // eslint-disable-line new-cap
			});
		});

		it("has valid constructor", function () {
			proclaim.isInstanceOf(new Map, Map);
			proclaim.isInstanceOf(new Map(), Map);
			proclaim.equal((new Map()).constructor, Map);
			proclaim.equal((new Map()).constructor.name, "Map");
			if ("__proto__" in {}) {
				proclaim.equal((new Map).__proto__.isPrototypeOf(new Map()), true);
				proclaim.equal((new Map).__proto__ === Map.prototype, true);
			}
		});

		it("can be pre-populated with an array", function () {
			var a = 1;
			var b = {};
			var c = new Map();
			var m = new Map([[1,1], [b,2], [c, 3]]);
			proclaim.equal(m.has(a), true);
			proclaim.equal(m.has(b), true);
			proclaim.equal(m.has(c), true);
			proclaim.equal(m.size, 3);

			var d = new Map(m);
			proclaim.equal(d.has(a), true);
			proclaim.equal(d.has(b), true);
			proclaim.equal(d.has(c), true);
			proclaim.equal(d.size, 3);
		});

		it("can be pre-populated with the arguments object", function () {
			var a = 1;
			var b = {};
			var c = new Map();
			var m = (function () {
				return new Map(arguments);
			}([1, 1], [b, 2], [c, 3]));
			proclaim.equal(m.has(a), true);
			proclaim.equal(m.has(b), true);
			proclaim.equal(m.has(c), true);
			proclaim.equal(m.size, 3);

			var d = new Map(m);
			proclaim.equal(d.has(a), true);
			proclaim.equal(d.has(b), true);
			proclaim.equal(d.has(c), true);
			proclaim.equal(d.size, 3);
		});

		if ('Symbol' in window && 'iterator' in Symbol) {
			it("can be pre-populated with custom iterable", function () {
				var count = 0;
				var a = {};
				a[Symbol.iterator] = function () {
					return {
						next: function () {
							if (count === 5) {
								return { done: true };
							}
							return {
								done: false,
								value: [count, count++]
							};
						}
					};
				};
				var m = new Map(a);
				proclaim.equal(m.has(0), true);
				proclaim.equal(m.has(1), true);
				proclaim.equal(m.has(2), true);
				proclaim.equal(m.has(3), true);
				proclaim.equal(m.has(4), true);
				proclaim.equal(m.size, 5);
			});
		}
	});

	describe('Map.prototype.clear', function () {
		it('has 0 length', function () {
			proclaim.equal(Map.prototype.clear.length, 0);
		});

		it('throws a TypeError if `this` is not an Object', function () {
			proclaim.throws(function () {
				Map.prototype.clear.call('');
			}, TypeError);
			proclaim.throws(function () {
				Map.prototype.clear.call(1);
			}, TypeError);
			proclaim.throws(function () {
				Map.prototype.clear.call(true);
			}, TypeError);
			proclaim.throws(function () {
				Map.prototype.clear.call(/ /);
			}, TypeError);
			proclaim.throws(function () {
				Map.prototype.clear.call(null);
			}, TypeError);
			proclaim.throws(function () {
				Map.prototype.clear.call(undefined);
			}, TypeError);
		});

		it('throws a TypeError if `this` is not an a Map Object', function () {
			proclaim.throws(function () {
				Map.prototype.clear.call([]);
			}, TypeError);
			proclaim.throws(function () {
				Map.prototype.clear.call({});
			}, TypeError);
		});

		// TODO: Need to test the fact that the existing [[MapData]] List is preserved because
		// there may be existing Map Iterator objects that are suspended midway through iterating over that List.

	});

	describe('Map.prototype.delete', function () {
		it('has 1 length', function () {
			proclaim.equal(Map.prototype['delete'].length, 1);
		});

		it('throws a TypeError if `this` is not an Object', function () {
			proclaim.throws(function () {
				Map.prototype['delete'].call('');
			}, TypeError);
			proclaim.throws(function () {
				Map.prototype['delete'].call(1);
			}, TypeError);
			proclaim.throws(function () {
				Map.prototype['delete'].call(true);
			}, TypeError);
			proclaim.throws(function () {
				Map.prototype['delete'].call(/ /);
			}, TypeError);
			proclaim.throws(function () {
				Map.prototype['delete'].call(null);
			}, TypeError);
			proclaim.throws(function () {
				Map.prototype['delete'].call(undefined);
			}, TypeError);
		});

		it('throws a TypeError if `this` is not an a Map Object', function () {
			proclaim.throws(function () {
				Map.prototype['delete'].call([]);
			}, TypeError);
			proclaim.throws(function () {
				Map.prototype['delete'].call({});
			}, TypeError);
		});

		it('returns false if key was not in map', function () {
			var map = new Map();
			proclaim.isFalse(map['delete']('k'));
		});

		it('returns true if key was in map', function () {
			var map = new Map();
			map.set('k', 1);
			proclaim.isTrue(map['delete']('k'));
		});
	});

	it("implements .size()", function () {
		var o = new Map();
		proclaim.equal(o.size, 0);
		o.set("a", "a");
		proclaim.equal(o.size, 1);
		o["delete"]("a"); // Use square-bracket syntax to avoid a reserved word in old browsers
		proclaim.equal(o.size, 0);
	});

	it("implements .has()", function () {
		var o = new Map();
		var generic = {};
		var callback = function () {};
		proclaim.equal(o.has(callback), false);
		o.set(callback, generic);
		proclaim.equal(o.has(callback), true);
	});

	it("implements .get()", function () {
		var o = new Map();
		var generic = {};
		var callback = function () {};
		o.set(callback, generic);
		proclaim.equal(o.get(callback, 123), generic);
		proclaim.equal(o.get(callback), generic);
	});

	it("implements .set()", function () {
		var o = new Map();
		var generic = {};
		var callback = function () {};
		o.set(callback, generic);
		proclaim.equal(o.get(callback), generic);
		o.set(callback, callback);
		proclaim.equal(o.get(callback), callback);
		o.set(callback, o);
		proclaim.equal(o.get(callback), o);
		o.set(o, callback);
		proclaim.equal(o.get(o), callback);
		o.set(NaN, generic);
		proclaim.ok(o.has(NaN));
		proclaim.equal(o.get(NaN), generic);
		o.set("key", undefined);
		proclaim.ok(o.has("key"));
		proclaim.equal(o.get("key"), undefined);

		proclaim.ok(!o.has(-0));
		proclaim.ok(!o.has(0));
		o.set(-0, callback);
		proclaim.ok(o.has(-0));
		proclaim.ok(o.has(0));
		proclaim.equal(o.get(-0), callback);
		proclaim.equal(o.get(0), callback); // Native impl fails in IE11
		o.set(0, generic);
		proclaim.ok(o.has(-0));
		proclaim.ok(o.has(0));
		proclaim.equal(o.get(-0), generic);
		proclaim.equal(o.get(0), generic);
	});

	it("implements .delete()", function () {
		var o = new Map();
		var generic = {};
		var callback = function () {};
		o.set(callback, generic);
		o.set(generic, callback);
		o.set(o, callback);
		proclaim.equal(o.has(callback) && o.has(generic) && o.has(o), true);
		o["delete"](callback);
		o["delete"](generic);
		o["delete"](o);
		proclaim.equal(!o.has(callback) && !o.has(generic) && !o.has(o), true);
		proclaim.ok(o["delete"](o) === false);
		o.set(o, callback);
		proclaim.ok(o["delete"](o));
	});

	it("does not throw an error when a non-object key is used", function () {
		var o = new Map();
		proclaim.doesNotThrow(function() {
			o.set("key", o);
		});
	});

	it("exhibits correct iterator behaviour", function () {
		var o = new Map();
		// test that things get returned in insertion order as per the specs
		o = new Map([["1", 1], ["2", 2], ["3", 3]]);
		var keys = o.keys();
		var values = o.values();
		var k = keys.next();
		var v = values.next();
		proclaim.equal(k.value, "1");
		proclaim.equal(v.value, 1);
		o['delete']("2");
		k = keys.next();
		v = values.next();
		proclaim.equal(k.value, "3");
		proclaim.equal(v.value, 3);
		// insertion of previously-removed item goes to the end
		o.set("2", 2);
		k = keys.next();
		v = values.next();
		proclaim.equal(k.value, "2");
		proclaim.equal(v.value, 2);
		// when called again, new iterator starts from beginning
		var entriesagain = o.entries();
		proclaim.equal(entriesagain.next().value[0], "1");
		proclaim.equal(entriesagain.next().value[0], "3");
		proclaim.equal(entriesagain.next().value[0], "2");
		// after a iterator is finished, don't return any more elements
		k = keys.next();
		v = values.next();
		proclaim.equal(k.done, true);
		proclaim.equal(v.done, true);
		k = keys.next();
		v = values.next();
		proclaim.equal(k.done, true);
		proclaim.equal(v.done, true);
		o.set("4", 4);
		k = keys.next();
		v = values.next();
		proclaim.equal(k.done, true);
		proclaim.equal(v.done, true);
		// new element shows up in iterators that didn't yet finish
		proclaim.equal(entriesagain.next().value[0], "4");
		proclaim.equal(entriesagain.next().done, true);
		// value is present but undefined when done is true, so that Array.from and other noncompliant
		// interfaces recognize it as a valid iterator
		var lastResult = entriesagain.next();
		proclaim.equal(lastResult.done, true);
		proclaim.ok(lastResult.hasOwnProperty('value'));
		proclaim.equal(lastResult.value, void 0);
	});

	if ('Symbol' in window && 'iterator' in Symbol) {
		it('Map.prototype[Symbol.iterator] is an alias to Map.prototype.entries', function () {
			proclaim.strictEqual(Map.prototype[Symbol.iterator], Map.prototype.entries);
		});

		it("implements iterable for all iterators", function () {
			var o = new Map([["1", 1], ["2", 2], ["3", 3]]);
			var valuesIterator = o.values()[Symbol.iterator]();
			proclaim.isObject(valuesIterator);
			var v = valuesIterator.next();
			proclaim.equal(v.value, 1);
			v = valuesIterator.next();
			proclaim.equal(v.value, 2);
			v = valuesIterator.next();
			proclaim.equal(v.value, 3);
			v = valuesIterator.next();
			proclaim.equal(v.done, true);

			var keysIterator = o.keys()[Symbol.iterator]();
			proclaim.isObject(keysIterator);
			var k = keysIterator.next();
			proclaim.equal(k.value, "1");
			k = keysIterator.next();
			proclaim.equal(k.value, "2");
			k = keysIterator.next();
			proclaim.equal(k.value, "3");
			k = keysIterator.next();
			proclaim.equal(k.done, true);

			var entriesIterator = o.entries()[Symbol.iterator]();
			proclaim.isObject(entriesIterator);
			var e = entriesIterator.next();
			proclaim.deepEqual(e.value, [1,"1"]);
			e = entriesIterator.next();
			proclaim.deepEqual(e.value, [2,"2"]);
			e = entriesIterator.next();
			proclaim.deepEqual(e.value, [3,"3"]);
			e = entriesIterator.next();
			proclaim.equal(e.done, true);
		});
	}

	it("implements .forEach()", function () {
		var o = new Map();
		var o = new Map();
		o.set("key 0", 0);
		o.set("key 1", 1);
		o.forEach(function (value, key, obj) {
			proclaim.equal(key, "key " + value);
			proclaim.equal(obj, o);
			// even if dropped, keeps looping
			o["delete"](key);
		});
		proclaim.equal(o.size, 0);
	});

	it("supports mutations during forEach loops", function () {
		var o = new Map();
		var o = new Map([["0", 0], ["1", 1], ["2", 2]]), seen = [];
		o.forEach(function (value, key, obj) {
			seen += ','+value;
			proclaim.equal(obj, o);
			proclaim.equal(""+value, key);
			// mutations work as expected
			if (value === 1) {
				o['delete']("0"); // remove from before current index
				o['delete']("2"); // remove from after current index
				o.set("3", 3); // insertion
			} else if (value === 3) {
				o.set("0", 0); // insertion at the end
			}
		});
		proclaim.equal(seen, ",0,1,3,0");
	});

	it("implements .clear()", function(){
		var o = new Map();
		var o = new Map();
		o.set(1, '1');
		o.set(2, '2');
		o.set(3, '3');
		o.clear();
		proclaim.equal(o.size, 0);
	});

	it("allows set after clear", function(){
		var o = new Map();
		var o = new Map();
		o.set(1, '1');
		o.clear();
		proclaim.equal(o.size, 0);
		o.set(2, '2');
		proclaim.equal(o.size, 1);
		proclaim.equal(o.get(2), '2');
	});

	// https://github.com/Financial-Times/polyfill-service/issues/1299
	it("does not call callback if all items are deleted", function () {
		var x = new Map();
		x.set(42, 'hi');
		x["delete"](42);
		var executed = false;
		x.forEach(function () {
			executed = true;
		});

		proclaim.equal(executed, false);
	});

	// https://github.com/Financial-Times/polyfill-service/issues/1299
	it("calls callback correct number of times when items were deleted from map", function () {
		var x = new Map();
		x.set(42, 'hi');
		x.set(43, 'bye');
		x["delete"](43);
		var callCount = 0;
		x.forEach(function () {
			callCount = callCount + 1;
		});

		proclaim.equal(callCount, 1);

		var z = new Map();
		z.set(42, 'hi');
		z.set(43, 'bye');
		z.set(44, 'bye');
		z.set(45, 'bye');
		z.set(46, 'bye');
		z.set(47, 'bye');
		z["delete"](43);
		z["delete"](44);
		z["delete"](45);
		z["delete"](46);
		z["delete"](47);
		callCount = 0;
		z.forEach(function () {
			callCount = callCount + 1;
		});

		proclaim.equal(callCount, 1);
	});
});
