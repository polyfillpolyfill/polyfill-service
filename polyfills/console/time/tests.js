describe('console', function () {

	it('time()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.time();
		}).not.to.throwException();
	});

});
