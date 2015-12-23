describe('console', function () {

	it('markTimeline()', function () {
		expect(console).to.be.ok;
		expect(function () {
			console.markTimeline();
		}).not.to.throwException();
	});

});
