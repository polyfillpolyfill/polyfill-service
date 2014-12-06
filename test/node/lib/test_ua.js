var assert  = require('assert');
var UA = require('../../../lib/UA');

describe("UA", function() {
	describe(".normalize", function() {

		it("should resolve user agents of core supported browsers", function() {
			var test = UA.normalize("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36");
			assert.equal(test, "chrome/39.0.0");
		});

		it("should resolve user agents of browsers that map all versions to a constant", function() {
			var phantom = UA.normalize("Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.0 Safari/534.34");
			assert.equal(phantom, "safari/5.0.0");
		});

		it("should resolve user agents of browsers with granular version mapping", function() {
			var yandex = UA.normalize("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 YaBrowser/14.10.2062.12057 Safari/537.36");
			assert.equal(yandex, "chrome/37.0.0");
		});

	});
});
