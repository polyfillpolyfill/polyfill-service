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

it('throws an error when the arg is undefined or null', function() {
	expect(function () {
		Object.getOwnPropertyNames(undefined);
	}).to.throwException();
	expect(function () {
		Object.getOwnPropertyNames(null);
	}).to.throwException();
});

// This is the polyfill behaviour but the native impl in IE 9+ throws instead
it.skip('returns an empty array for booleans and numbers', function() {
	expect(Object.getOwnPropertyNames(true)).to.eql([]);
	expect(Object.getOwnPropertyNames(42)).to.eql([]);
});

// This is the polyfill behaviour but the native impl in IE 9+ throws instead
it.skip('splits a string into an array', function() {

	// In Chrome the length property is returned at the end, in FF at the beginning.  Our polyfill adds it to the end
	expect(Object.getOwnPropertyNames('foo')).to.eql(['0', '1', '2', 'length']);
});

