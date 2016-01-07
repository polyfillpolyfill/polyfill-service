describe('console', function () {

	it('markTimeline()', function () {
		expect(function () {
			console.markTimeline();
		}).not.to.throwException();
	});

});
