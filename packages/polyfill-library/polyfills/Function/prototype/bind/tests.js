/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Function.prototype.bind);
});

it('has correct arity', function () {
	proclaim.arity(Function.prototype.bind, 1);
});

it('has correct name', function () {
	proclaim.hasName(Function.prototype.bind, 'bind');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Function.prototype, 'bind');
});

it("Should be able to return a function with 'this' bound to the specified value", function(done){
	var thisVal = {foo:'bar'};
	var func = function(){
		proclaim.deepEqual(this, thisVal);
		done();
	};
	var testFunc = func.bind(thisVal);
	testFunc();
});

it("Handles new BoundFunction", function(done) {
	var thisVal = {foo:'bar'};
	function MyClass(){
		proclaim.notDeepEqual(this, thisVal);
		done();
	};
	var MyClassThing = MyClass.bind(thisVal);
	new MyClassThing();
});

it('Should be able to return a function with the given arguments bound', function(done){
	var thisVal = {foo:'bar'};
	var func = function(arg1, arg2){
		proclaim.deepEqual(this, thisVal);
		proclaim.equal(arg1, 'foo');
		proclaim.equal(arg2, 'bar');
		done();
	};
	var testFunc = func.bind(thisVal, 'foo');
	testFunc('bar');
});
