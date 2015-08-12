it('has correct instance', function () {
	expect(String.prototype.endsWith).to.be.a(Function);
});

it('has correct argument length', function () {
	expect(String.prototype.endsWith.length).to.be(1);
});

it('works with strings', function () {
	expect('a'.endsWith('aa')).to.be(false);
	expect('a'.endsWith('ab')).to.be(false);
	expect('aa'.endsWith('a')).to.be(true);
	expect('ab'.endsWith('a')).to.be(false);
	expect('ab'.endsWith('ab')).to.be(true);
	expect('ab'.endsWith('b')).to.be(true);
});
