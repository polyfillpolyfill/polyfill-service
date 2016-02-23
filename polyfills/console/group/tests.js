describe('console', function () {

	it('group()', function () {
		expect(function () {
			console.group();
		}).not.to.throwException();
	});

});
