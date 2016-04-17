var o, generic, callback;

beforeEach(function() {
	if ('Map' in window) o = new Map();
	generic = {};
	callback = function () {};
})

it("has valid constructor", function () {
	expect(new Map).to.be.a(Map);
	expect(new Map()).to.be.a(Map);
	var a = 1;
	var b = {};
	var c = new Map();
	var m = new Map([[1,1], [b,2], [c, 3]]);
	expect(m.has(a)).to.be(true);
	expect(m.has(b)).to.be(true);
	expect(m.has(c)).to.be(true);
	expect(m.size).to.equal(3);
	if ("__proto__" in {}) {
		expect((new Map).__proto__.isPrototypeOf(new Map())).to.be(true);
		expect((new Map).__proto__ === Map.prototype).to.be(true);
	}
});

it("implements .size()", function () {
	expect(o.size).to.be(0);
	o.set("a", "a");
	expect(o.size).to.be(1);
	o["delete"]("a"); // Use square-bracket syntax to avoid a reserved word in old browsers
	expect(o.size).to.be(0);
});

it("implements .has()", function () {
	expect(o.has(callback)).to.be(false);
	o.set(callback, generic);
	expect(o.has(callback)).to.be(true);
});

it("implements .get()", function () {
	o.set(callback, generic);
	expect(o.get(callback, 123)).to.be(generic);
	expect(o.get(callback)).to.be(generic);
});

it("implements .set()", function () {
	o.set(callback, generic);
	expect(o.get(callback)).to.be(generic);
	o.set(callback, callback);
	expect(o.get(callback)).to.be(callback);
	o.set(callback, o);
	expect(o.get(callback)).to.be(o);
	o.set(o, callback);
	expect(o.get(o)).to.be(callback);
	o.set(NaN, generic);
	expect(o.has(NaN));
	expect(o.get(NaN)).to.be(generic);
	o.set("key", undefined);
	expect(o.has("key"));
	expect(o.get("key")).to.be(undefined);

	expect(!o.has(-0));
	expect(!o.has(0));
	o.set(-0, callback);
	expect(o.has(-0));
	expect(o.has(0));
	expect(o.get(-0)).to.be(callback);
	expect(o.get(0)).to.be(callback);
	o.set(0, generic);
	expect(o.has(-0));
	expect(o.has(0));
	expect(o.get(-0)).to.be(generic);
	expect(o.get(0)).to.be(generic);
});

it("implements .delete()", function () {
	o.set(callback, generic);
	o.set(generic, callback);
	o.set(o, callback);
	expect(o.has(callback) && o.has(generic) && o.has(o)).to.be(true);
	o["delete"](callback);
	o["delete"](generic);
	o["delete"](o);
	expect(!o.has(callback) && !o.has(generic) && !o.has(o)).to.be(true);
	expect(o["delete"](o) === false);
	o.set(o, callback);
	expect(o["delete"](o));
});

it("does not throw an error when a non-object key is used", function () {
	expect(function() {
		o.set("key", o);
	}).to.not.throwError();
});

it("exhibits correct iterator behaviour", function () {
	// test that things get returned in insertion order as per the specs
	o = new Map([["1", 1], ["2", 2], ["3", 3]]);
	var keys = o.keys();
	var values = o.values();
	var k = keys.next()
	var v = values.next();
	expect(k.value).to.be("1");
	expect(v.value).to.be(1);
	o.delete("2");
	k = keys.next();
	v = values.next();
	expect(k.value).to.be("3");
	expect(v.value).to.be(3);
	// insertion of previously-removed item goes to the end
	o.set("2", 2);
	k = keys.next()
	v = values.next();
	expect(k.value).to.be("2");
	expect(v.value).to.be(2);
	// when called again, new iterator starts from beginning
	var entriesagain = o.entries();
	expect(entriesagain.next().value[0]).to.be("1");
	expect(entriesagain.next().value[0]).to.be("3");
	expect(entriesagain.next().value[0]).to.be("2");
	// after a iterator is finished, don't return any more elements
	k = keys.next();
	v = values.next();
	expect(k.done).to.be(true);
	expect(v.done).to.be(true);
	k = keys.next();
	v = values.next();
	expect(k.done).to.be(true);
	expect(v.done).to.be(true);
	o.set("4", 4);
	k = keys.next();
	v = values.next();
	expect(k.done).to.be(true);
	expect(v.done).to.be(true);
	// new element shows up in iterators that didn't yet finish
	expect(entriesagain.next().value[0]).to.be("4");
	expect(entriesagain.next().done).to.be(true);
});

it("implements .forEach()", function () {
	var o = new Map(), i;
	o.set("key 0", 0);
	o.set("key 1", 1);
	if ("forEach" in o) {
		o.forEach(function (value, key, obj) {
			expect(key).to.be("key " + value);
			expect(obj).to.be(o);
			// even if dropped, keeps looping
			o["delete"](key);
		});
		expect(o.size).to.be(0);
	}
});

it("supports mutations during forEach loops", function () {
	var o = new Map([["0", 0], ["1", 1], ["2", 2]]), seen = [];
	o.forEach(function (value, key, obj) {
		seen.push(value);
		expect(obj).to.be(o);
		expect(""+value).to.be(key);
		// mutations work as expected
		if (value === 1) {
			o.delete("0"); // remove from before current index
			o.delete("2"); // remove from after current index
			o.set("3", 3); // insertion
		} else if (value === 3) {
			o.set("0", 0); // insertion at the end
		}
	});
	expect(JSON.stringify(seen)).to.be(JSON.stringify([0, 1, 3, 0]));
});

it("implements .clear()", function(){
	var o = new Map();
	o.set(1, '1');
	o.set(2, '2');
	o.set(3, '3');
	o.clear();
	expect(o.size).to.be(0);
});
