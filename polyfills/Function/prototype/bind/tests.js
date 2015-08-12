
it("Should be able to return a function with 'this' bound to the specified value", function(done){
	var thisVal = {foo:'bar'};
	var func = function(){
		expect(this).to.equal(thisVal);
		done();
	};
	var testFunc = func.bind(thisVal);
	testFunc();
});

it('Should be able to return a function with the given arguments bound', function(done){
	var thisVal = {foo:'bar'};
	var func = function(arg1, arg2){
		expect(this).to.equal(thisVal);
		expect(arg1).to.equal('foo');
		expect(arg2).to.equal('bar');
		done();
	};
	var testFunc = func.bind(thisVal, 'foo');
	testFunc('bar');
});
