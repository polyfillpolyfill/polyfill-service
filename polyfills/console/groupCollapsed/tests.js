describe('console', function () {

	it('groupCollapsed()', function () {
		expect(function () {
			console.groupCollapsed();
		}).not.to.throwException();
	});

});
