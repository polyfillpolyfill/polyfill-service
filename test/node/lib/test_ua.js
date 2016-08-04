var assert = require('assert');
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

		it("should resolve edge mobile to the ie family", function() {
			var test = UA.normalize("Mozilla/5.0 (Windows Phone 10.0;  Android 4.2.1; Nokia; Lumia 520) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.10130");
			assert.equal(test, "ie/12.10130.0");
		});

		it("should resolve Facebook iOS App to the version of iOS it is running within", function() {
			var test = UA.normalize("Mozilla/5.0 (iPad; CPU OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10A523 [FBAN/FBIOS;FBAV/6.0.1;FBBV/180945;FBDV/iPad2,1;FBMD/iPad;FBSN/iPhone OS;FBSV/6.0.1;FBSS/1; FBCR/;FBID/tablet;FBLC/en_US;FBOP/1]");
			assert.equal(test, "ios_saf/6.0.0");

			var test = UA.normalize("Mozilla/5.0 (iPad; CPU OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B329 [FBAN/FBIOS;FBAV/6.0.2;FBBV/183159;FBDV/iPad3,1;FBMD/iPad;FBSN/iPhone OS;FBSV/6.1.3;FBSS/2; FBCR/;FBID/tablet;FBLC/en_US;FBOP/1]");
			assert.equal(test, "ios_saf/6.1.0");

			var test = UA.normalize("Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B329 [FBAN/FBIOS;FBAV/6.0.2;FBBV/183159;FBDV/iPhone4,1;FBMD/iPhone;FBSN/iPhone OS;FBSV/6.1.3;FBSS/2; FBCR/AT&T;FBID/phone;FBLC/en_US;FBOP/1]");
			assert.equal(test, "ios_saf/6.1.0");
		});
	});
});
