/* eslint-env mocha, browser */
/* global proclaim */

it("has valid constructor", function () {
	proclaim.isInstanceOf(new WeakSet, WeakSet);
	proclaim.isInstanceOf(new WeakSet(), WeakSet);
	proclaim.equal((new WeakSet()).constructor, WeakSet);
	proclaim.equal((new WeakSet()).constructor.name, "WeakSet");
	if ("__proto__" in {}) {
		proclaim.equal((new WeakSet).__proto__.isPrototypeOf(new WeakSet()), true);
		proclaim.equal((new WeakSet).__proto__ === WeakSet.prototype, true);
	}
});

it('should be instantiable', function(){
	function nameOf(fn) {
		return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
	}
	proclaim.equal(nameOf(WeakSet), 'WeakSet');
	proclaim.isTypeOf(new WeakSet, 'object');
});

it('has add, delete and has methods', function(){
	proclaim.notEqual(WeakSet.prototype['add'], undefined);
	proclaim.notEqual(WeakSet.prototype['delete'], undefined);
	proclaim.notEqual(WeakSet.prototype['has'], undefined);
});

it('should perform as expected', function() {
	var a = new WeakSet, b = {}, c = function(){}, d = window, e = {};
	var set = new WeakSet;

	set.add(a);
	set.add(b);
	set.add(c);
	set.add(d);

	proclaim.equal(set.has(a), true);
	proclaim.equal(set.has(b), true);
	proclaim.equal(set.has(c), true);
	proclaim.equal(set.has(d), true);
	proclaim.equal(set.has(e), false);

	proclaim.equal(set['delete'](b), true);
	proclaim.equal(set['delete'](c), true);
	proclaim.equal(set['delete'](d), true);
	proclaim.equal(set['delete'](e), false);

	proclaim.equal(set.has(a), true);
	proclaim.equal(set.has(b), false);
	proclaim.equal(set.has(c), false);
	proclaim.equal(set.has(d), false);
	proclaim.equal(set.has(e), false);
});

it('should be chainable', function() {
	var ws = new WeakSet();
	var o1 = {};
	var o2 = function(){};
	ws.add(o1).add(o2);
	proclaim.equal(ws.has(o2), true);
});

// IE <= 8 does not allow invocation of delete as a property of an object using dot notation
it.skip('should allow use of dot notation for delete method', function() {
	var ws = new WeakSet();
	var o1 = {};
	ws.add(o1);
	//ws.delete(o1);  // Causes an error during parse in IE<=8, which will prevent other tests from running even though this test is marked as skipped!
	proclaim.equal(ws.has(o1), false);
});

// Early native implementations do not support this, polyfill does
it('should be possible to prepopulate the set', function() {
	var o1 = {};
	var ws = new WeakSet([
		o1,
		function(){},
		window,
		{}
	]);

	proclaim.equal(ws.has({}), false);
	proclaim.equal(ws.has(o1), true);
	proclaim.equal(ws.has(window), true);
});
