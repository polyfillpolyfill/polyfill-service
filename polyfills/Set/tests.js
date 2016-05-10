var o, generic, callback;

beforeEach(function() {
	if ('Set' in window) o = new Set();
	generic = {};
	callback = function () {};
})

it("has valid constructor", function () {
	expect(new Set).to.be.a(Set);
	expect(new Set()).to.be.a(Set);
	if ("__proto__" in {}) {
		expect((new Set).__proto__.isPrototypeOf(new Set())).to.be(true);
		expect((new Set).__proto__ === Set.prototype).to.be(true);
	}
});

it ("can be pre-populated", function() {
    var s = new Set([1,2]);
	expect(s.has(1)).to.be(true);
	expect(s.has(2)).to.be(true);
	expect(s.has(3)).to.be(false);
	expect(s.size).to.equal(2);
});

it("implements .size()", function () {
	expect(o.size).to.be(0);
	o.add("a");
	expect(o.size).to.be(1);
	o["delete"]("a"); // Use square-bracket syntax to avoid a reserved word in old browsers
	expect(o.size).to.be(0);
});

it("implements .has()", function () {
	expect(o.has(callback)).to.be(false);
	o.add(callback);
	expect(o.has(callback)).to.be(true);
});

it("implements .add()", function () {
	expect(o.add(NaN)).to.be(o);
	expect(o.has(NaN)).to.be(true);
});

it("implements .delete()", function () {
    o.add(callback);
    o.add(generic);
    o.add(o);
    expect(o.has(callback)).to.be(true);
    expect(o.has(generic)).to.be(true);
    expect(o.has(o)).to.be(true);
    o["delete"](callback);
    o["delete"](generic);
    o["delete"](o);
    expect(o.has(callback)).to.be(false);
    expect(o.has(generic)).to.be(false);
    expect(o.has(o)).to.be(false);
    expect(o["delete"](o)).to.be(false);
    o.add(o);
    expect(o["delete"](o)).to.be(true);
});

it("exhibits correct iterator behaviour", function () {
	// test that things get returned in insertion order as per the specs
	o = new Set(["1", "2", "3"]);
	var values = o.values();
	var v = values.next();
	expect(v.value).to.be("1");
	o['delete']("2");
	v = values.next();
	expect(v.value).to.be("3");
	// insertion of previously-removed item goes to the end
	o.add("2");
	v = values.next();
	expect(v.value).to.be("2");
	// when called again, new iterator starts from beginning
	var entriesagain = o.entries();
	expect(entriesagain.next().value[0]).to.be("1");
	expect(entriesagain.next().value[0]).to.be("3");
	expect(entriesagain.next().value[0]).to.be("2");
	// after a iterator is finished, don't return any more elements
	v = values.next();
	expect(v.done).to.be(true);
	v = values.next();
	expect(v.done).to.be(true);
	o.add("4");
	v = values.next();
	// new element shows up in iterators that didn't yet finish
	expect(entriesagain.next().value[0]).to.be("4");
	expect(entriesagain.next().done).to.be(true);
});

it("implements .forEach()", function () {
	var o = new Set(), i = 0;
	o.add("val 0");
	o.add("val 1");
	o.forEach(function (value, sameValue, obj) {
		expect(value).to.be("val " + i++);
		expect(value).to.be(sameValue);
		expect(obj).to.be(o);
		// even if dropped, keeps looping
		o["delete"](value);
	});
	expect(o.size).to.be(0);
});

it("supports mutations during forEach loops", function () {
	var o = new Set(["0","1","2"]), seen = [];
	o.forEach(function (value, valueAgain, obj) {
		seen += ','+value;
		expect(obj).to.be(o);
		expect(value).to.be(valueAgain);
		// mutations work as expected
		if (value === "1") {
			o['delete']("0"); // remove from before current index
			o['delete']("2"); // remove from after current index
			o.add("3"); // insertion
		} else if (value === "3") {
			o.add("0"); // insertion at the end
		}
	});
	expect(seen).to.be(",0,1,3,0");
});

it("implements .clear()", function(){
	var o = new Set();
	o.add('1');
	o.add('2');
	o.add('3');
	o.clear();
	expect(o.size).to.be(0);
});
