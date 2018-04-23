/* eslint-env mocha, browser */
/* global proclaim */

it('returns the name "Function" for Function', function () {
	proclaim.equal(Function.name, 'Function');
});

it('returns an empty string for Function.prototype', function () {
	proclaim.equal(
		(
			Function.prototype.name === '' ||
			// For "android/4.4" configuration only:
			Function.prototype.name === 'Empty'
		),
		true
	);
});

it('returns the name "Function" for Function.prototype.constructor', function () {
	proclaim.equal(Function.prototype.constructor.name, 'Function');
});

it('returns the name of named function declarations', function () {
	function foo() {}

	proclaim.equal(foo.name, 'foo');
});

it('returns the name of named function expressions', function () {
	proclaim.equal((function bar() {}).name, 'bar');
});

it('returns the name of named function expressions that are assigned to variables', function () {
	var foo = function bar() {};

	proclaim.equal(foo.name, 'bar');
});

it('returns an empty string for anonymous function expressions', function () {
	proclaim.equal((function () {}).name, '');
});

it('returns the name "anonymous" for functions created with the Function constructor', function () {
	var fn = new Function('');

	proclaim.equal(
		(
			fn.name === 'anonymous' ||
			// For "android/4.4" configuration only:
			fn.name === ''
		),
		true
	);
});
