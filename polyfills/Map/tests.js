/* eslint-env mocha, browser */
/* global proclaim */

var o, generic, callback;

beforeEach(function() {
	if ('Map' in window) o = new Map();
	generic = {};
	callback = function () {};
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

it ("can be pre-populated", function() {
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

it("implements .size()", function () {
	proclaim.equal(o.size, 0);
	o.set("a", "a");
	proclaim.equal(o.size, 1);
	o["delete"]("a"); // Use square-bracket syntax to avoid a reserved word in old browsers
	proclaim.equal(o.size, 0);
});

it("implements .has()", function () {
	proclaim.equal(o.has(callback), false);
	o.set(callback, generic);
	proclaim.equal(o.has(callback), true);
});

it("implements .get()", function () {
	o.set(callback, generic);
	proclaim.equal(o.get(callback, 123), generic);
	proclaim.equal(o.get(callback), generic);
});

it("implements .set()", function () {
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
	proclaim.doesNotThrow(function() {
		o.set("key", o);
	});
});

it("exhibits correct iterator behaviour", function () {
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

it("implements .forEach()", function () {
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
	o.set(1, '1');
	o.set(2, '2');
	o.set(3, '3');
	o.clear();
	proclaim.equal(o.size, 0);
});

it("allows set after clear", function(){
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
