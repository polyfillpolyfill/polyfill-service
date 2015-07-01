it("should handle zero values for hours, minutes and seconds", function() {

	// 1 Dec 2014 00:00:00
	var date = new Date(1417392000000);
	expect(date.toISOString()).to.equal("2014-12-01T00:00:00.000Z");
});

it('should handle leap years', function() {

	// 29 Feb 2016 12:01:01
	var date = new Date(1456747261000);
	expect(date.toISOString()).to.equal("2016-02-29T12:01:01.000Z");
});

it('should handle millisecond accuracy', function() {

	// 1 Dec 2014 00:00:00:123
	var date = new Date(1417392000123);
	expect(date.toISOString()).to.equal("2014-12-01T00:00:00.123Z");
})
