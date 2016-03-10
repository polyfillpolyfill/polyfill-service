describe('console', function () {

	it('groupEnd()', function () {
		expect(function () {
			console.groupEnd();
		}).not.to.throwException();
	});

});
