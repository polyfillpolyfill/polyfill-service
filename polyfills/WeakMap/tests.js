it('has get, set, delete, and has functions', function() {
	expect(WeakMap.prototype['get']).to.not.be(undefined);
	expect(WeakMap.prototype['set']).to.not.be(undefined);
	expect(WeakMap.prototype['delete']).to.not.be(undefined);
	expect(WeakMap.prototype['has']).to.not.be(undefined);
});
it('should perform as expected', function() {
	var wm = new WeakMap();
	var o1 = {};
	var o2 = function(){};
	var o3 = window;
	wm.set(o1, 37);
	expect(wm.get(o1)).to.be(37);

	wm.set(o1, o2);
	wm.set(o3, undefined);
	expect(wm.get(o1)).to.eql(o2);

	// `wm.get({})` should return undefined, because there is no value for the object on wm
	expect(wm.get({})).to.be(undefined);

	// `wm.get(o3)` should return undefined, because that is the set value
	expect(wm.get(o3)).to.be(undefined);

	expect(wm.has(o1)).to.be(true);
	expect(wm.has({})).to.be(false);

	// Ensure that delete returns true/false indicating if the value was removed
	expect(wm['delete'](o1)).to.be(true);
	expect(wm['delete']({})).to.be(false);

	expect(wm.get(o1)).to.be(undefined);
	expect(wm.has(o1)).to.be(false);
});

// Fails in IE11, supported in the polyfill
it('should be chainable', function() {
	var wm = new WeakMap();
	var o1 = {};
	var o2 = function(){};
	wm.set(o1, 37).set(o2, 'aoeui');
	expect(wm.get(o2)).to.be('aoeui');
})

// IE <= 8 does not allow invocation of delete as a property of an object using dot notation
it.skip('should allow use of dot notation for delete method', function() {
	var wm = new WeakMap();
	var o1 = {};
	wm.set(o1, 37);
	//wm.delete(o1);  // Causes an error during parse in IE<=8, which will prevent other tests from running even though this test is marked as skipped!
	expect(wm.has(o1)).to.be(false);
})

// Ealy native implementations do not support this, polyfill does
it('should be possible to prepopulate the map', function() {
	var o1 = {};
	var wm = new WeakMap([
		[o1, 12],
		[function(){}, 'foo'],
		[window]
	]);

	expect(wm.get(window)).to.be(undefined);
	expect(wm.get(o1)).to.be(12);
});
