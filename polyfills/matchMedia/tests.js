it("should match screen", function() {
	var mql = window.matchMedia('screen');
	expect(mql.matches).to.be(true);
});

it("should ignore 'only'", function() {
	var mql = window.matchMedia('only screen');
	expect(mql.matches).to.be(true);
});

it("should return a MediaQueryList that has a media property representing the media query string", function() {
	var mql = window.matchMedia('screen');
	expect(mql.media).to.be('screen');
});

it("should generate valid Javascript for multiple dimensions", function() {
	expect(function() {
		window.matchMedia('(min-width: 1px) and (max-width: 1000px)');
	}).not.to.throwException();
});

it("should generate valid Javascript for dppx", function() {
	expect(function() {
		window.matchMedia('(min-resolution: 2dppx)');
	}).not.to.throwException();
});
