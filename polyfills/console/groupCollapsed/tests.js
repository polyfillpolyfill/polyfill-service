describe('console', function () {

	it('groupCollapsed()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.groupCollapsed();
		}).not.to.throwException();
	});

});
