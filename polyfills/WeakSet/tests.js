it('should be instantiable', function(){
	function nameOf(fn) {
		return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
	}
	expect(nameOf(WeakSet)).to.be('WeakSet');
	expect(typeof (new WeakSet)).to.be('object');
});

it('has add, delete and has methods', function(){
	expect(WeakSet.prototype['add']).to.not.be(undefined);
	expect(WeakSet.prototype['delete']).to.not.be(undefined);
	expect(WeakSet.prototype['has']).to.not.be(undefined);
});

it('should perform as expected', function() {
	var a = new WeakSet, b = {}, c = function(){}, d = window, e = {};
	var set = new WeakSet;

	set.add(a);
	set.add(b);
	set.add(c)
	set.add(d);

	expect(set.has(a)).to.be(true);
	expect(set.has(b)).to.be(true);
	expect(set.has(c)).to.be(true);
	expect(set.has(d)).to.be(true);
	expect(set.has(e)).to.be(false);

	expect(set['delete'](b)).to.be(true);
	expect(set['delete'](c)).to.be(true);
	expect(set['delete'](d)).to.be(true);
	expect(set['delete'](e)).to.be(false);

	expect(set.has(a)).to.be(true);
	expect(set.has(b)).to.be(false);
	expect(set.has(c)).to.be(false);
	expect(set.has(d)).to.be(false);
	expect(set.has(e)).to.be(false);
});

it('should be chainable', function() {
	var ws = new WeakSet();
	var o1 = {};
	var o2 = function(){};
	ws.add(o1).add(o2);
	expect(ws.has(o2)).to.be(true);
})

// IE <= 8 does not allow invocation of delete as a property of an object using dot notation
it.skip('should allow use of dot notation for delete method', function() {
	var ws = new WeakSet();
	var o1 = {};
	ws.add(o1);
	//ws.delete(o1);  // Causes an error during parse in IE<=8, which will prevent other tests from running even though this test is marked as skipped!
	expect(ws.has(o1)).to.be(false);
})

// Early native implementations do not support this, polyfill does
it('should be possible to prepopulate the set', function() {
	var o1 = {};
	var ws = new WeakSet([
		o1,
		function(){},
		window,
		{}
	]);

	expect(ws.has({})).to.be(false);
	expect(ws.has(o1)).to.be(true);
	expect(ws.has(window)).to.be(true);
});
