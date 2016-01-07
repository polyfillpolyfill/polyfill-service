describe('console', function () {

	it('assert()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.assert();
		}).not.to.throwException();
	});

});
