describe('console', function () {

	it('timelineEnd()', function () {
		expect(function () {
			console.timelineEnd();
		}).not.to.throwException();
	});

});
