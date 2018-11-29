/* eslint-env mocha, browser */
/* global proclaim, Set, Symbol */

it('is a function', function () {
	proclaim.isFunction(Set);
});

it('has correct arity', function () {
	proclaim.arity(Set, 0);
});

it('has correct name', function () {
	proclaim.hasName(Set, 'Set');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(window, 'Set');
});

describe('Set', function() {

		it("has valid constructor", function () {
			proclaim.isInstanceOf(new Set, Set);
			proclaim.isInstanceOf(new Set(), Set);
			proclaim.equal((new Set()).constructor, Set);
			proclaim.equal((new Set()).constructor.name, "Set");
			if ("__proto__" in {}) {
				proclaim.equal((new Set).__proto__.isPrototypeOf(new Set()), true);
				proclaim.equal((new Set).__proto__ === Set.prototype, true);
			}
		});

		it ("can be pre-populated", function() {
			var s = new Set([1,2]);
			proclaim.equal(s.has(1), true);
			proclaim.equal(s.has(2), true);
			proclaim.equal(s.has(3), false);
			proclaim.equal(s.size, 2);
			var copy = new Set(s);
			proclaim.equal(copy.has(1), true);
			proclaim.equal(copy.has(2), true);
			proclaim.equal(copy.has(3), false);
			proclaim.equal(copy.size, 2);
		});

		it("implements .size()", function () {
			var o = new Set();
			proclaim.equal(o.size, 0);
			o.add("a");
			proclaim.equal(o.size, 1);
			o["delete"]("a"); // Use square-bracket syntax to avoid a reserved word in old browsers
			proclaim.equal(o.size, 0);
		});

		it("implements .has()", function () {
			var o = new Set();
			var callback = function () {};
			proclaim.equal(o.has(callback), false);
			o.add(callback);
			proclaim.equal(o.has(callback), true);
		});

		it("implements .add()", function () {
			var o = new Set();
			proclaim.equal(o.add(NaN), o);
			proclaim.equal(o.has(NaN), true);
		});

		it("implements .delete()", function () {
			var o = new Set();
			var generic = {};
			var callback = function () {};
			o.add(callback);
			o.add(generic);
			o.add(o);
			proclaim.equal(o.has(callback), true);
			proclaim.equal(o.has(generic), true);
			proclaim.equal(o.has(o), true);
			o["delete"](callback);
			o["delete"](generic);
			o["delete"](o);
			proclaim.equal(o.has(callback), false);
			proclaim.equal(o.has(generic), false);
			proclaim.equal(o.has(o), false);
			proclaim.equal(o["delete"](o), false);
			o.add(o);
			proclaim.equal(o["delete"](o), true);
		});

		it("exhibits correct iterator behaviour", function () {
			var o = new Set();
			// test that things get returned in insertion order as per the specs
			o = new Set(["1", "2", "3"]);
			var values = o.values();
			var v = values.next();
			proclaim.equal(v.value, "1");
			o['delete']("2");
			v = values.next();
			proclaim.equal(v.value, "3");
			// insertion of previously-removed item goes to the end
			o.add("2");
			v = values.next();
			proclaim.equal(v.value, "2");
			// when called again, new iterator starts from beginning
			var entriesagain = o.entries();
			proclaim.equal(entriesagain.next().value[0], "1");
			proclaim.equal(entriesagain.next().value[0], "3");
			proclaim.equal(entriesagain.next().value[0], "2");
			// after a iterator is finished, don't return any more elements
			v = values.next();
			proclaim.equal(v.done, true);
			v = values.next();
			proclaim.equal(v.done, true);
			o.add("4");
			values.next();
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

		it('Set.prototype.keys is an alias to Set.prototype.values', function() {
			proclaim.strictEqual(Set.prototype.keys, Set.prototype.values);
		});

		if ('Symbol' in window && 'iterator' in Symbol) {
			it('Set.prototype[Symbol.iterator] is an alias to Set.prototype.values', function () {
				proclaim.strictEqual(Set.prototype[Symbol.iterator], Set.prototype.values);
			});

			it("implements iterable for all iterators", function () {
				var o = new Set([1,2,3]);
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
				proclaim.equal(k.value, 1);
				k = keysIterator.next();
				proclaim.equal(k.value, 2);
				k = keysIterator.next();
				proclaim.equal(k.value, 3);
				k = keysIterator.next();
				proclaim.equal(k.done, true);

				var entriesIterator = o.entries()[Symbol.iterator]();
				proclaim.isObject(entriesIterator);
				var e = entriesIterator.next();
				proclaim.deepEqual(e.value, [1,1]);
				e = entriesIterator.next();
				proclaim.deepEqual(e.value, [2,2]);
				e = entriesIterator.next();
				proclaim.deepEqual(e.value, [3,3]);
				e = entriesIterator.next();
				proclaim.equal(e.done, true);
			});
		}

		it("implements .forEach()", function () {
			var o = new Set(), i = 0;
			o.add("val 0");
			o.add("val 1");
			o.forEach(function (value, sameValue, obj) {
				proclaim.equal(value, "val " + i++);
				proclaim.equal(value, sameValue);
				proclaim.equal(obj, o);
				// even if dropped, keeps looping
				o["delete"](value);
			});
			proclaim.equal(o.size, 0);
		});

		it("implements .entries()", function () {
			var o, entries, current;

			// Iterator is correct when first item is deleted
			o = new Set([1, 2, 3]);
			o["delete"](1);
			entries = o.entries();
			current = entries.next();
			proclaim.equal(false, current.done);
			proclaim.equal(2, current.value[0]);
			current = entries.next();
			proclaim.equal(false, current.done);
			proclaim.equal(3, current.value[0]);
			current = entries.next();
			proclaim.equal(true, current.done);
			proclaim.equal("undefined", typeof current.value);

			// Iterator is correct when middle item is deleted
			o = new Set([1, 2, 3]);
			o["delete"](2);
			entries = o.entries();
			current = entries.next();
			proclaim.equal(false, current.done);
			proclaim.equal(1, current.value[0]);
			current = entries.next();
			proclaim.equal(false, current.done);
			proclaim.equal(3, current.value[0]);
			current = entries.next();
			proclaim.equal(true, current.done);
			proclaim.equal("undefined", typeof current.value);

			// Iterator is correct when last item is deleted
			o = new Set([1, 2, 3]);
			o["delete"](3);
			entries = o.entries();
			current = entries.next();
			proclaim.equal(false, current.done);
			proclaim.equal(1, current.value[0]);
			current = entries.next();
			proclaim.equal(false, current.done);
			proclaim.equal(2, current.value[0]);
			current = entries.next();
			proclaim.equal(true, current.done);
			proclaim.equal("undefined", typeof current.value);
		});

		it("supports mutations during forEach loops", function () {
			var o = new Set(["0","1","2"]), seen = [];
			o.forEach(function (value, valueAgain, obj) {
				seen += ','+value;
				proclaim.equal(obj, o);
				proclaim.equal(value, valueAgain);
				// mutations work as expected
				if (value === "1") {
					o['delete']("0"); // remove from before current index
					o['delete']("2"); // remove from after current index
					o.add("3"); // insertion
				} else if (value === "3") {
					o.add("0"); // insertion at the end
				}
			});
			proclaim.equal(seen, ",0,1,3,0");
		});

		it("implements .clear()", function(){
			var o = new Set();
			o.add('1');
			o.add('2');
			o.add('3');
			o.clear();
			proclaim.equal(o.size, 0);
		});
	});
