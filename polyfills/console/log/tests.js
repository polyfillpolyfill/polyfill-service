describe('console', function () {

	it('log()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.log();
		}).not.to.throwException();
	});

});
