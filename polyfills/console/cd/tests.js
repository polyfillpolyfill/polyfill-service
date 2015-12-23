describe('console', function () {

	it('cd()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.cd();
		}).not.to.throwException();
	});

});
