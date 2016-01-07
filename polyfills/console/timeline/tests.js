describe('console', function () {

	it('timeline()', function () {
		expect(function () {
			console.timeline();
		}).not.to.throwException();
	});

});
