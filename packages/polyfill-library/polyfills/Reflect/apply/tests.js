/* eslint-env mocha */
/* globals proclaim, Reflect */

it('is a function', function () {
	proclaim.isFunction(Reflect.apply);
});

it('Callable', function () {
	function foo(baz) {
		return this.toString() + ':bar:' + baz;
	}

	proclaim.equal(Reflect.apply(foo, 'foo', ['qux']), 'foo:bar:qux');
});
