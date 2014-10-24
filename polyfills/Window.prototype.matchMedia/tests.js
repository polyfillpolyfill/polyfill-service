it("should match screen", function() {
	var mql = window.matchMedia('screen');
	expect(mql.matches).to.be(true);
});

it("should return a MediaQueryList that has a media property representing the media query string", function() {
	var mql = window.matchMedia('screen');
	expect(mql.media).to.be('screen');
});
