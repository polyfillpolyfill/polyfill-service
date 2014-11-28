it('Should be able to remove whitespace from the beginning and end of a string', function(){
	var str = '	   blah    ';
	var expected = 'blah';
	expect(str.trim()).to.equal(expected);
})
