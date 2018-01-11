/* eslint-env mocha, browser */
/* global proclaim */

it("has valid constructor", function () {
	proclaim.isInstanceOf(new WeakMap, WeakMap);
	proclaim.isInstanceOf(new WeakMap(), WeakMap);
	proclaim.equal((new WeakMap()).constructor, WeakMap);
	proclaim.equal((new WeakMap()).constructor.name, "WeakMap");
	if ("__proto__" in {}) {
		proclaim.equal((new WeakMap).__proto__.isPrototypeOf(new WeakMap()), true);
		proclaim.equal((new WeakMap).__proto__ === WeakMap.prototype, true);
	}
});

it('has get, set, delete, and has functions', function() {
	proclaim.notEqual(WeakMap.prototype['get'], undefined);
	proclaim.notEqual(WeakMap.prototype['set'], undefined);
	proclaim.notEqual(WeakMap.prototype['delete'], undefined);
	proclaim.notEqual(WeakMap.prototype['has'], undefined);
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

// IE <= 8 does not allow invocation of delete as a property of an object using dot notation
it.skip('should allow use of dot notation for delete method', function() {
	var wm = new WeakMap();
	var o1 = {};
	wm.set(o1, 37);
	//wm.delete(o1);  // Causes an error during parse in IE<=8, which will prevent other tests from running even though this test is marked as skipped!
	proclaim.equal(wm.has(o1), false);
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
