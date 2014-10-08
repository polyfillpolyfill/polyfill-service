function callbackfn1(val, idx, obj) {
	return val > 10;
}

function callbackfn2(val, idx, obj) {
	return val > 11;
}


it('is a function', function() {
	expect(Array.prototype.every).to.be.a('function')
});

it('applies test correctly for an array-like objects', function() {

	var obj = {
		0: 12,
		1: 11,
		2: 1,  // Not considered since length indicates an array that doesn't include this element
		length: 2
	};

	expect(Array.prototype.every.call(obj, callbackfn1)).to.be(true);
	expect(Array.prototype.every.call(obj, callbackfn2)).to.be(false);
});

it('applies test correctly to arrays', function() {
	var obj = [12, 11];
	expect(Array.prototype.every.call(obj, callbackfn1)).to.be(true);
	expect(Array.prototype.every.call(obj, callbackfn2)).to.be(false);
});
