/* eslint-env mocha */
'use strict';

const proclaim = require('proclaim');
const UA = require('../../../lib/UA');

describe("UA", () => {
	describe(".normalize", () => {

		it("should resolve user agents of core supported browsers", () => {
			const test = UA.normalize("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36");
			proclaim.equal(test, "chrome/39.0.0");
		});

		it("should resolve user agents of browsers that map all versions to a constant", () => {
			const phantom = UA.normalize("Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.0 Safari/534.34");
			proclaim.equal(phantom, "safari/5.0.0");
		});

		it("should resolve user agents of browsers with granular version mapping", () => {
			const yandex = UA.normalize("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 YaBrowser/14.10.2062.12057 Safari/537.36");
			proclaim.equal(yandex, "chrome/37.0.0");
		});

		it("should resolve edge mobile to the ie family", () => {
			const test = UA.normalize("Mozilla/5.0 (Windows Phone 10.0;  Android 4.2.1; Nokia; Lumia 520) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.10130");
			proclaim.equal(test, "ie/12.10130.0");
		});

		it("should resolve wkwebview to the iOS family", () => {
			const test = UA.normalize("Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Mobile/14D27");
			proclaim.equal(test, "ios_saf/10.2.0");
		});

		it("should resolve Facebook iOS App to the version of iOS it is running within", () => {
			let test = UA.normalize("Mozilla/5.0 (iPad; CPU OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10A523 [FBAN/FBIOS;FBAV/6.0.1;FBBV/180945;FBDV/iPad2,1;FBMD/iPad;FBSN/iPhone OS;FBSV/6.0.1;FBSS/1; FBCR/;FBID/tablet;FBLC/en_US;FBOP/1]");
			proclaim.equal(test, "ios_saf/6.0.0");

			test = UA.normalize("Mozilla/5.0 (iPad; CPU OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B329 [FBAN/FBIOS;FBAV/6.0.2;FBBV/183159;FBDV/iPad3,1;FBMD/iPad;FBSN/iPhone OS;FBSV/6.1.3;FBSS/2; FBCR/;FBID/tablet;FBLC/en_US;FBOP/1]");
			proclaim.equal(test, "ios_saf/6.1.0");

			test = UA.normalize("Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B329 [FBAN/FBIOS;FBAV/6.0.2;FBBV/183159;FBDV/iPhone4,1;FBMD/iPhone;FBSN/iPhone OS;FBSV/6.1.3;FBSS/2; FBCR/AT&T;FBID/phone;FBLC/en_US;FBOP/1]");
			proclaim.equal(test, "ios_saf/6.1.0");
		});
	});

	describe(".isUnknown", () => {
		it("should resolve false for user agents we have a baseline version for", () => {
			proclaim.equal(new UA("ie/6").isUnknown(), true);
			proclaim.equal(new UA("ie/7").isUnknown(), false);
			proclaim.equal(new UA("ie/14").isUnknown(), false);


			proclaim.equal(new UA("ie_mob/7").isUnknown(), true);
			proclaim.equal(new UA("ie_mob/8").isUnknown(), false);
			proclaim.equal(new UA("ie_mob/13").isUnknown(), false);

			proclaim.equal(new UA("chrome/1").isUnknown(), false);
			proclaim.equal(new UA("chrome/20").isUnknown(), false);
			proclaim.equal(new UA("chrome/30").isUnknown(), false);
			proclaim.equal(new UA("chrome/35").isUnknown(), false);
			proclaim.equal(new UA("chrome/40").isUnknown(), false);
			proclaim.equal(new UA("chrome/52").isUnknown(), false);

			proclaim.equal(new UA("safari/3").isUnknown(), true);
			proclaim.equal(new UA("safari/4").isUnknown(), false);

			proclaim.equal(new UA("safari/9").isUnknown(), false);

			proclaim.equal(new UA("ios_saf/3").isUnknown(), true);
			proclaim.equal(new UA("ios_saf/4").isUnknown(), false);
			proclaim.equal(new UA("ios_saf/9").isUnknown(), false);

			proclaim.equal(new UA("ios_chr/3").isUnknown(), true);
			proclaim.equal(new UA("ios_chr/4").isUnknown(), false);
			proclaim.equal(new UA("ios_chr/9").isUnknown(), false);

			proclaim.equal(new UA("firefox/48.0").isUnknown(), false);
			proclaim.equal(new UA("firefox/3.6").isUnknown(), false);
			proclaim.equal(new UA("firefox/3.5").isUnknown(), true);
			proclaim.equal(new UA("firefox/3.0").isUnknown(), true);
			proclaim.equal(new UA("firefox/2.0").isUnknown(), true);
			proclaim.equal(new UA("firefox/1.5").isUnknown(), true);
			proclaim.equal(new UA("firefox/1.0").isUnknown(), true);
			proclaim.equal(new UA("firefox/0.1").isUnknown(), true);

			proclaim.equal(new UA("firefox_mob/48.0").isUnknown(), false);
			proclaim.equal(new UA("firefox_mob/4.0").isUnknown(), false);
			proclaim.equal(new UA("firefox_mob/3.6").isUnknown(), true);
			proclaim.equal(new UA("firefox_mob/3.5").isUnknown(), true);
			proclaim.equal(new UA("firefox_mob/3.0").isUnknown(), true);
			proclaim.equal(new UA("firefox_mob/2.0").isUnknown(), true);
			proclaim.equal(new UA("firefox_mob/1.5").isUnknown(), true);
			proclaim.equal(new UA("firefox_mob/1.0").isUnknown(), true);
			proclaim.equal(new UA("firefox_mob/0.1").isUnknown(), true);

			proclaim.equal(new UA("opera/10").isUnknown(), true);
			proclaim.equal(new UA("opera/11").isUnknown(), false);
			proclaim.equal(new UA("opera/39").isUnknown(), false);

			proclaim.equal(new UA("android/2.0").isUnknown(), true);
			proclaim.equal(new UA("android/3.0").isUnknown(), false);
			proclaim.equal(new UA("android/5").isUnknown(), false);
			proclaim.equal(new UA("android/5.1").isUnknown(), false);

			proclaim.equal(new UA("op_mob/9").isUnknown(), true);
			proclaim.equal(new UA("op_mob/10").isUnknown(), false);
			proclaim.equal(new UA("op_mob/33").isUnknown(), false);

			proclaim.equal(new UA("op_mini/4").isUnknown(), true);
			proclaim.equal(new UA("op_mini/5").isUnknown(), false);

			proclaim.equal(new UA("bb/5").isUnknown(), true);
			proclaim.equal(new UA("bb/6").isUnknown(), false);
			proclaim.equal(new UA("bb/10").isUnknown(), false);

			proclaim.equal(new UA("samsung_mob/3").isUnknown(), true);
			proclaim.equal(new UA("samsung_mob/4").isUnknown(), false);
		});
	});
});
