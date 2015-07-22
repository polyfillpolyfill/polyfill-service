/*global describe, it, expect*/

it('returns properties of a simple object', function () {
	expect(Object.getOwnPropertyNames({foo:42})).to.eql(["foo"]);
});

it('does not include properties inherited from a prototype', function () {
	var A = function() { this.foo = true; };
	A.prototype = {bar: true};
	var a = new A();
	expect(Object.getOwnPropertyNames(a)).to.eql(["foo"]);
});
