describe('console', function () {

	it('groupEnd()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.groupEnd();
		}).not.to.throwException();
	});

});
