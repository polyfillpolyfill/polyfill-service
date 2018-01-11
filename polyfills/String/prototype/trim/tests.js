/* eslint-env mocha, browser */
/* global proclaim */

it('Should be able to remove whitespace from the beginning and end of a string', function(){
	var str = '	   blah    ';
	var expected = 'blah';
	proclaim.equal(str.trim(), expected);
});
