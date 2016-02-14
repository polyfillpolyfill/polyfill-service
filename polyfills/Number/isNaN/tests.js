it('has correct instance', function () {
	expect(Number.isNaN).to.be.a(Function);
});

it('has correct argument length', function () {
	expect(Number.isNaN.length).to.be(1);
});

describe('returns true with', function () {
	it('numbers', function () {
		expect(Number.isNaN(NaN)).to.be(true);
	});
	it('numbers', function () {
		expect(Number.isNaN(Number.NaN)).to.be(true);
	});
	it('numbers', function () {
		expect(Number.isNaN(0/0)).to.be(true);
	});		
});

describe('returns false with', function () {
	it('numbers', function () {
		expect(Number.isNaN("NaN")).to.be(false);
	});
	it('numbers', function () {
		expect(Number.isNaN(undefined)).to.be(false);
	});
	it('numbers', function () {
		expect(Number.isNaN({})).to.be(false);
	});		
	it('numbers', function () {
		expect(Number.isNaN("blabla")).to.be(false);
	});
	it('numbers', function () {
		expect(Number.isNaN(true)).to.be(false);
	});
	it('numbers', function () {
		expect(Number.isNaN(37)).to.be(false);
	});
	it('numbers', function () {
		expect(Number.isNaN("37")).to.be(false);
	});	
});
