describe('console', function () {

	it('timeline()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.timeline();
		}).not.to.throwException();
	});

});
