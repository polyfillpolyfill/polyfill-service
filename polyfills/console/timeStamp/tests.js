describe('console', function () {

	it('timeStamp()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.timeStamp();
		}).not.to.throwException();
	});

});
