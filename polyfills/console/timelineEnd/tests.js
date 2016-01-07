describe('console', function () {

	it('timelineEnd()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.timelineEnd();
		}).not.to.throwException();
	});

});
