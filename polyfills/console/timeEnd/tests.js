describe('console', function () {

	it('timeEnd()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.timeEnd();
		}).not.to.throwException();
	});

});
