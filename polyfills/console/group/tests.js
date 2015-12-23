describe('console', function () {

	it('group()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.group();
		}).not.to.throwException();
	});

});
