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
	});

	describe(".isUnknown", function() {
		it("should resolve false for user agents we have a baseline version for", function() {
			assert.equal(new UA("ie/6").isUnknown(), true);
			assert.equal(new UA("ie/7").isUnknown(), false);
			assert.equal(new UA("ie/8").isUnknown(), false);
			assert.equal(new UA("ie/9").isUnknown(), false);
			assert.equal(new UA("ie/10").isUnknown(), false);
			assert.equal(new UA("ie/11").isUnknown(), false);
			assert.equal(new UA("ie/12").isUnknown(), false);
			assert.equal(new UA("ie/13").isUnknown(), false);
			assert.equal(new UA("ie/14").isUnknown(), false);


			assert.equal(new UA("ie_mob/7").isUnknown(), true);
			assert.equal(new UA("ie_mob/8").isUnknown(), false);
			assert.equal(new UA("ie_mob/9").isUnknown(), false);
			assert.equal(new UA("ie_mob/10").isUnknown(), false);
			assert.equal(new UA("ie_mob/11").isUnknown(), false);
			assert.equal(new UA("ie_mob/12").isUnknown(), false);
			assert.equal(new UA("ie_mob/13").isUnknown(), false);

			assert.equal(new UA("chrome/1").isUnknown(), false);
			assert.equal(new UA("chrome/2").isUnknown(), false);
			assert.equal(new UA("chrome/20").isUnknown(), false);
			assert.equal(new UA("chrome/30").isUnknown(), false);
			assert.equal(new UA("chrome/35").isUnknown(), false);
			assert.equal(new UA("chrome/40").isUnknown(), false);
			assert.equal(new UA("chrome/52").isUnknown(), false);

			assert.equal(new UA("safari/3").isUnknown(), true);
			assert.equal(new UA("safari/4").isUnknown(), false);
			assert.equal(new UA("safari/5").isUnknown(), false);
			assert.equal(new UA("safari/6").isUnknown(), false);
			assert.equal(new UA("safari/7").isUnknown(), false);
			assert.equal(new UA("safari/8").isUnknown(), false);
			assert.equal(new UA("safari/9").isUnknown(), false);

			assert.equal(new UA("ios_saf/3").isUnknown(), true);
			assert.equal(new UA("ios_saf/4").isUnknown(), false);
			assert.equal(new UA("ios_saf/5").isUnknown(), false);
			assert.equal(new UA("ios_saf/6").isUnknown(), false);
			assert.equal(new UA("ios_saf/7").isUnknown(), false);
			assert.equal(new UA("ios_saf/8").isUnknown(), false);
			assert.equal(new UA("ios_saf/9").isUnknown(), false);

			assert.equal(new UA("ios_chr/3").isUnknown(), true);
			assert.equal(new UA("ios_chr/4").isUnknown(), false);
			assert.equal(new UA("ios_chr/5").isUnknown(), false);
			assert.equal(new UA("ios_chr/6").isUnknown(), false);
			assert.equal(new UA("ios_chr/7").isUnknown(), false);
			assert.equal(new UA("ios_chr/8").isUnknown(), false);
			assert.equal(new UA("ios_chr/9").isUnknown(), false);

			assert.equal(new UA("firefox/48.0").isUnknown(), false);
			assert.equal(new UA("firefox/47.0").isUnknown(), false);
			assert.equal(new UA("firefox/46.0").isUnknown(), false);
			assert.equal(new UA("firefox/33.1").isUnknown(), false);
			assert.equal(new UA("firefox/31.0").isUnknown(), false);
			assert.equal(new UA("firefox/30.0").isUnknown(), false);
			assert.equal(new UA("firefox/29.0").isUnknown(), false);
			assert.equal(new UA("firefox/28.0").isUnknown(), false);
			assert.equal(new UA("firefox/21.0").isUnknown(), false);
			assert.equal(new UA("firefox/20.0").isUnknown(), false);
			assert.equal(new UA("firefox/19.0").isUnknown(), false);
			assert.equal(new UA("firefox/18.0").isUnknown(), false);
			assert.equal(new UA("firefox/17.0").isUnknown(), false);
			assert.equal(new UA("firefox/16.0").isUnknown(), false);
			assert.equal(new UA("firefox/15.0").isUnknown(), false);
			assert.equal(new UA("firefox/10.0").isUnknown(), false);
			assert.equal(new UA("firefox/9.0").isUnknown(), false);
			assert.equal(new UA("firefox/8.0").isUnknown(), false);
			assert.equal(new UA("firefox/7.0").isUnknown(), false);
			assert.equal(new UA("firefox/6.0").isUnknown(), false);
			assert.equal(new UA("firefox/5.0").isUnknown(), false);
			assert.equal(new UA("firefox/4.0").isUnknown(), false);
			assert.equal(new UA("firefox/3.6").isUnknown(), false);
			assert.equal(new UA("firefox/3.5").isUnknown(), true);
			assert.equal(new UA("firefox/3.0").isUnknown(), true);
			assert.equal(new UA("firefox/2.0").isUnknown(), true);
			assert.equal(new UA("firefox/1.5").isUnknown(), true);
			assert.equal(new UA("firefox/1.0").isUnknown(), true);
			assert.equal(new UA("firefox/0.1").isUnknown(), true);

			assert.equal(new UA("firefox_mob/48.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/47.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/46.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/45.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/38.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/37.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/36.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/35.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/28.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/27.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/26.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/25.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/18.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/10.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/9.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/8.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/7.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/6.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/5.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/4.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/3.6").isUnknown(), true);
			assert.equal(new UA("firefox_mob/3.5").isUnknown(), true);
			assert.equal(new UA("firefox_mob/3.0").isUnknown(), true);
			assert.equal(new UA("firefox_mob/2.0").isUnknown(), true);
			assert.equal(new UA("firefox_mob/1.5").isUnknown(), true);
			assert.equal(new UA("firefox_mob/1.0").isUnknown(), true);
			assert.equal(new UA("firefox_mob/0.1").isUnknown(), true);

			assert.equal(new UA("opera/10").isUnknown(), true);
			assert.equal(new UA("opera/11").isUnknown(), false);
			assert.equal(new UA("opera/12").isUnknown(), false);
			assert.equal(new UA("opera/15").isUnknown(), false);
			assert.equal(new UA("opera/16").isUnknown(), false);
			assert.equal(new UA("opera/17").isUnknown(), false);
			assert.equal(new UA("opera/18").isUnknown(), false);
			assert.equal(new UA("opera/19").isUnknown(), false);
			assert.equal(new UA("opera/20").isUnknown(), false);
			assert.equal(new UA("opera/21").isUnknown(), false);
			assert.equal(new UA("opera/22").isUnknown(), false);
			assert.equal(new UA("opera/23").isUnknown(), false);
			assert.equal(new UA("opera/24").isUnknown(), false);
			assert.equal(new UA("opera/25").isUnknown(), false);
			assert.equal(new UA("opera/26").isUnknown(), false);
			assert.equal(new UA("opera/27").isUnknown(), false);
			assert.equal(new UA("opera/28").isUnknown(), false);
			assert.equal(new UA("opera/29").isUnknown(), false);
			assert.equal(new UA("opera/30").isUnknown(), false);
			assert.equal(new UA("opera/31").isUnknown(), false);
			assert.equal(new UA("opera/32").isUnknown(), false);
			assert.equal(new UA("opera/33").isUnknown(), false);
			assert.equal(new UA("opera/34").isUnknown(), false);
			assert.equal(new UA("opera/35").isUnknown(), false);
			assert.equal(new UA("opera/36").isUnknown(), false);
			assert.equal(new UA("opera/37").isUnknown(), false);
			assert.equal(new UA("opera/38").isUnknown(), false);
			assert.equal(new UA("opera/39").isUnknown(), false);

			assert.equal(new UA("android/2.0").isUnknown(), true);
			assert.equal(new UA("android/3.0").isUnknown(), false);
			assert.equal(new UA("android/3.1").isUnknown(), false);
			assert.equal(new UA("android/3.2").isUnknown(), false);
			assert.equal(new UA("android/4.0").isUnknown(), false);
			assert.equal(new UA("android/4.1").isUnknown(), false);
			assert.equal(new UA("android/4.4").isUnknown(), false);
			assert.equal(new UA("android/5").isUnknown(), false);
			assert.equal(new UA("android/5.1").isUnknown(), false);

			assert.equal(new UA("op_mob/9").isUnknown(), true);
			assert.equal(new UA("op_mob/10").isUnknown(), false);
			assert.equal(new UA("op_mob/11").isUnknown(), false);
			assert.equal(new UA("op_mob/12").isUnknown(), false);
			assert.equal(new UA("op_mob/24").isUnknown(), false);
			assert.equal(new UA("op_mob/32").isUnknown(), false);
			assert.equal(new UA("op_mob/33").isUnknown(), false);

			assert.equal(new UA("op_mini/4").isUnknown(), true);
			assert.equal(new UA("op_mini/5").isUnknown(), false);

			assert.equal(new UA("bb/5").isUnknown(), true);
			assert.equal(new UA("bb/6").isUnknown(), false);
			assert.equal(new UA("bb/7").isUnknown(), false);
			assert.equal(new UA("bb/8").isUnknown(), false);
			assert.equal(new UA("bb/9").isUnknown(), false);
			assert.equal(new UA("bb/10").isUnknown(), false);

			assert.equal(new UA("samsung_mob/3").isUnknown(), true);
			assert.equal(new UA("samsung_mob/4").isUnknown(), false);
		});
	});
});
