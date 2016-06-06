
it("Should return the name of a named function expression", function(done){
	expect(function foo() {}.name).to.equal('foo');
});
