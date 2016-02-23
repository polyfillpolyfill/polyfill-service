describe('console', function () {

	it('warn()', function () {
		expect(console.memory).to.be.ok;
		expect(function () {
			console.warn();
		}).not.to.throwException();
	});

});
