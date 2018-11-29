/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Date.prototype.toISOString);
});

it('has correct arity', function () {
	proclaim.arity(Date.prototype.toISOString, 0);
});

it('has correct name', function () {
	proclaim.hasName(Date.prototype.toISOString, 'toISOString');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Date.prototype, 'toISOString');
});

it("should handle zero values for hours, minutes and seconds", function() {

	// 1 Dec 2014 00:00:00
	var date = new Date(1417392000000);
	proclaim.equal(date.toISOString(), "2014-12-01T00:00:00.000Z");
});

it('should handle leap years', function() {

	// 29 Feb 2016 12:01:01
	var date = new Date(1456747261000);
	proclaim.equal(date.toISOString(), "2016-02-29T12:01:01.000Z");
});

it('should handle millisecond accuracy', function() {

	// 1 Dec 2014 00:00:00:123
	var date = new Date(1417392000123);
	proclaim.equal(date.toISOString(), "2014-12-01T00:00:00.123Z");
});
