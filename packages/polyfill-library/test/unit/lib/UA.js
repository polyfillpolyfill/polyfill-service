/* eslint-env mocha */

"use strict";

const assert = require('proclaim');
const sinon = require('sinon');
const semver = require('semver');
const mockery = require('mockery');

describe("lib/UA", function () {
	let useragent;
	let UA;
	let lruCache;

	beforeEach(() => {
		useragent = require('useragent');
		UA = require('../../../lib/UA');
		lruCache = require('../mock/lru-cache.mock');
		mockery.registerMock('lru-cache', lruCache);
	});

	it('exports a UA constructor', () => {
		assert.isFunction(UA);
		assert.isFunction(UA.prototype.getFamily);
		assert.isFunction(UA.prototype.getVersion);
		assert.isFunction(UA.prototype.satisfies);
		assert.isFunction(UA.prototype.getBaseline);
		assert.isFunction(UA.prototype.meetsBaseline);
		assert.isFunction(UA.prototype.isUnknown);
		assert.isFunction(UA.normalize);
		assert.isFunction(UA.getBaselines);
	});

	describe('UA("uastring")', () => {
		it('this.ua is a useragent Agent object', () => {
			const ua = new UA("");
			assert.isInstanceOf(ua.ua, useragent.Agent);
		});

		describe('removes iOS webview browsers from uastring', () => {
			let spy;

			beforeEach(() => {
				spy = sinon.spy(String.prototype, 'replace');
			});

			afterEach(() => {
				spy.restore();
			});

			it('firefox for iOS', () => {
				const firefoxIOS = "Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4";
				const iOS = "Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko)  Mobile/12F69 Safari/600.1.4";
				new UA(firefoxIOS);
				assert.calledOn(spy, firefoxIOS);
				assert.equal(spy.returned(iOS), true);
			});

			it('chrome for iOS', () => {
				const chromeIOS = "Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en-gb) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3";
				const iOS = "Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en-gb) AppleWebKit/534.46.0 (KHTML, like Gecko)  Mobile/9B206 Safari/7534.48.3";
				new UA(chromeIOS);
				assert.calledOn(spy, chromeIOS);
				assert.equal(spy.returned(iOS), true);
			});

			it('opera for iOS', () => {
				const operaIOS = "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) OPiOS/8.0.2.80660 Mobile/11D257 Safari/9537.53";
				const iOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko)  Mobile/11D257 Safari/9537.53';
				new UA(operaIOS);
				assert.calledOn(spy, operaIOS);
				assert.equal(spy.returned(iOS), true);
			});
		});

		describe('removes Electron browsers from uastring to enable them to report as Chrome', () => {
			let spy;

			beforeEach(() => {
				spy = sinon.spy(String.prototype, 'replace');
			});

			afterEach(() => {
				spy.restore();
			});

			it('Electron for OS X', () => {
				const electron = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) WELLMessenger/1.1.0 Chrome/53.0.2785.143 Electron/1.4.13 Safari/537.36";
				const chrome = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) WELLMessenger/1.1.0 Chrome/53.0.2785.143 Safari/537.36";
				new UA(electron);
				assert.calledOn(spy, electron);
				assert.equal(spy.returned(chrome), true);
			});

			it('Electron for Windows', () => {
				const electron = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) WELLMessenger/1.1.0 Chrome/53.0.2785.143 Electron/1.4.13 Safari/537.36";
				const chrome = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) WELLMessenger/1.1.0 Chrome/53.0.2785.143 Safari/537.36";
				new UA(electron);
				assert.calledOn(spy, electron);
				assert.equal(spy.returned(chrome), true);
			});
		});

		describe('removes Facebook in-app browsers from uastring', () => {
			let spy;

			beforeEach(() => {
				spy = sinon.spy(String.prototype, 'replace');
			});

			afterEach(() => {
				spy.restore();
			});

			it('Facebook for iOS', () => {
				const facebook = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13C75 [FBAN/FBIOS;FBAV/46.0.0.54.156;FBBV/18972819;FBDV/iPhone8,1;FBMD/iPhone;FBSN/iPhone OS;FBSV/9.2;FBSS/2; FBCR/Telenor;FBID/phone;FBLC/nb_NO;FBOP/5]";
				const expected = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13C75";
				new UA(facebook);
				assert.calledOn(spy, facebook);
				assert.equal(spy.returned(expected), true);
			});

			it('Facebook for Android, using Chrome browser', () => {
				const facebook = "Mozilla/5.0 (Linux; Android 4.4.2; SCH-I535 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36 [FBAN/FB4A;FBAV/20.0.0.25.15;]";
				const expected = "Mozilla/5.0 (Linux; Android 4.4.2; SCH-I535 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36";
				new UA(facebook);
				assert.calledOn(spy, facebook);
				assert.equal(spy.returned(expected), true);
			});
		});

		describe('this.ua', () => {
			context('when given a normalized ua', () => {
				it('constructs a new useragent.Agent', () => {
					const ie = new UA("ie/11.3.0");
					assert.equal(ie.ua.family, 'ie');
					assert.equal(ie.ua.toVersion(), '11.3.0');
					assert.isInstanceOf(ie.ua, useragent.Agent);
				});

				it('assigns 0 to minor and patch versions if ommitted', () => {
					const ie = new UA("ie/11");
					assert.equal(ie.ua.toVersion(), '11.0.0');
				});

			});
		});

		describe('this.ua.family', () => {
			it('uses browser family name if no alias found', () => {
				const firefox = new UA("Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.12) Gecko/20101027 Ubuntu/10.04 (lucid) Firefox/3.6.12");
				assert.equal(firefox.ua.family, 'firefox');

				const safari = new UA("Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; en-us) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0.2 Safari/533.18.5");
				assert.equal(safari.ua.family, 'safari');

				const android = new UA("Mozilla/5.0 (Linux; U; Android 3.0.1; en-us; GT-P7510 Build/HRI83) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13");
				assert.equal(android.ua.family, 'android');

				const chrome = new UA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36");
				assert.equal(chrome.ua.family, 'chrome');
			});

			it('uses alias for browser family name if alias exists', () => {
				const opera = new UA("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.10 Safari/537.36 OPR/27.0.1689.22 (Edition developer)");
				assert.equal(opera.ua.family, 'chrome');

				const blackberryWebKit = new UA("Mozilla/5.0 (BB10; Touch) AppleWebKit/537.3+ (KHTML, like Gecko) Version/10.0.9.388 Mobile Safari/537.3+");
				assert.equal(blackberryWebKit.ua.family, "bb");

				const blackberry = new UA("Mozilla/5.0 (BlackBerry; U; BlackBerry 9930; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.362 Mobile Safari/534.11+");
				assert.equal(blackberry.ua.family, "bb");

				// const blackberry = new UA("BlackBerry8520/5.0.0.592 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/168");
				// assert.equal(blackberry.ua.family, "BlackBerry");

				const palemoon = new UA("Mozilla/5.0 (Windows NT 5.1; rv:2.0) Gecko/20110407 Firefox/4.0.3 PaleMoon/4.0.3");
				assert.equal(palemoon.ua.family, "firefox");

				const firefoxMobile = new UA("Mozilla/5.0 (Android 5.0; Tablet; rv:41.0) Gecko/41.0 Firefox/41.0");
				assert.equal(firefoxMobile.ua.family, "firefox_mob");

				const firefoxBeta = new UA("Mozilla/5.0 (X11; Linux i686 (x86_64); rv:2.0b4) Gecko/20100818 Firefox/4.0b4");
				assert.equal(firefoxBeta.ua.family, "firefox");

				const mozillaDeveloperPreview = new UA("Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.3a1) Gecko/20100208 MozillaDeveloperPreview/3.7a1 (.NET CLR 3.5.30729)");
				assert.equal(mozillaDeveloperPreview.ua.family, "firefox");

				const operaTablet = new UA("Opera/9.80 (Android 3.2; Linux; Opera Tablet/ADR-1106291546; U; en) Presto/2.8.149 Version/11.10");
				assert.equal(operaTablet.ua.family, "opera");

				const operaMobile = new UA("Opera/9.80 (S60; SymbOS; Opera Mobi/275; U; es-ES) Presto/2.4.13 Version/10.00");
				assert.equal(operaMobile.ua.family, "op_mob");

				const operaMini = new UA("SAMSUNG GT-S3330 Opera/9.80 (J2ME/MIDP; Opera Mini/7.1.32840/37.9143; U; en) Presto/2.12.423 Version/12.16");
				assert.equal(operaMini.ua.family, "op_mini");

				const chromeMobile = new UA("Mozilla/5.0 (Linux; Android 4.1.2; GT-S7710 Build/JZO54K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile");
				assert.equal(chromeMobile.ua.family, "chrome");

				const chromeFrame = new UA("Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; chromeframe/11.0.660.0)");
				assert.equal(chromeFrame.ua.family, "chrome");

				const chromium = new UA("Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Ubuntu/10.10 Chromium/10.0.648.133 Chrome/10.0.648.133 Safari/534.16");
				assert.equal(chromium.ua.family, "chrome");

				const ieMobile = new UA("Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0; SAMSUNG; SGH-i917)");
				assert.equal(ieMobile.ua.family, "ie_mob");

				const ieLargeScreen = new UA("Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; XBLWP7; ZuneWP7)");
				assert.equal(ieLargeScreen.ua.family, "ie");

				const ie = new UA("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; chromeframe; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729)");
				assert.equal(ie.ua.family, "ie");

				const ucBrowser = new UA("Mozilla/5.0 (Linux; U; Android 2.2.1; en-US; GT-P1000 Build/FROYO) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/10.0.1.512 U3/0.8.0 Mobile Safari/534.30");
				assert.equal(ucBrowser.ua.family, "uc browser");

				const chromeMobileIos = new UA("Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.12 Mobile/11A501 Safari/8536.25");
				assert.equal(chromeMobileIos.ua.family, "ios_saf");

				const mobileSafari = new UA("Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B367 Safari/531.21.10");
				assert.equal(mobileSafari.ua.family, "ios_saf");

				const mobileSafariUIWebView = new UA("Mozilla/5.0 (iPod touch; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69");
				assert.equal(mobileSafariUIWebView.ua.family, "ios_saf");

				const facebookIOS = new UA("Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B206 [FBAN/FBIOS;FBAV/6.1;FBBV/201075;FBDV/iPhone3,1;FBMD/iPhone;FBSN/iPhone OS;FBSV/5.1.1;FBSS/2; FBCR/Vodafone.de;FBID/phone;FBLC/en_US;FBOP/1]");
				assert.equal(facebookIOS.ua.family, "ios_saf");

				const samsungInternet = new UA("Mozilla/5.0 (Linux; Android 5.0.1; SAMSUNG GT-I9506-ORANGE Build/LRX22C) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/2.1 Chrome/34.0.1847.76 Mobile Safari/537.36");
				assert.equal(samsungInternet.ua.family, 'samsung_mob');

				const phantomjs = new UA("Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.6.0 Safari/534.34");
				assert.equal(phantomjs.ua.family, 'safari');

				const yandex = new UA("Mozilla/5.0 (Linux; Android 5.0.1; GT-I9505 Build/LRX22C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 YaBrowser/14.2.1.1239.00 Mobile Safari/537.36");
				assert.equal(yandex.ua.family, 'chrome');

				const googlebot = new UA("Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)");
				assert.equal(googlebot.ua.family, 'chrome');

				const headlesschrome = new UA("Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/66.0.3347.0 Safari/537.36");
				assert.equal(headlesschrome.ua.family, 'chrome');
			});
		});
	});

	describe('.getFamily', () => {
		it('returns browser family from useragent', () => {
			const chrome = new UA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36");
			assert.equal(chrome.getFamily(), 'chrome');

			const phantom = new UA("Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.0 Safari/534.34");
			assert.equal(phantom.getFamily(), "safari");

			const yandex = new UA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 YaBrowser/14.10.2062.12057 Safari/537.36");
			assert.equal(yandex.getFamily(), "chrome");

			const ie = new UA("Mozilla/5.0 (Windows Phone 10.0;  Android 4.2.1; Nokia; Lumia 520) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.10130");
			assert.equal(ie.getFamily(), "edge_mob");

			const ios1 = new UA("Mozilla/5.0 (iPad; CPU OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10A523 [FBAN/FBIOS;FBAV/6.0.1;FBBV/180945;FBDV/iPad2,1;FBMD/iPad;FBSN/iPhone OS;FBSV/6.0.1;FBSS/1; FBCR/;FBID/tablet;FBLC/en_US;FBOP/1]");
			assert.equal(ios1.getFamily(), "ios_saf");

			const ios2 = new UA("Mozilla/5.0 (iPad; CPU OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B329 [FBAN/FBIOS;FBAV/6.0.2;FBBV/183159;FBDV/iPad3,1;FBMD/iPad;FBSN/iPhone OS;FBSV/6.1.3;FBSS/2; FBCR/;FBID/tablet;FBLC/en_US;FBOP/1]");
			assert.equal(ios2.getFamily(), "ios_saf");

			const ios3 = new UA("Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B329 [FBAN/FBIOS;FBAV/6.0.2;FBBV/183159;FBDV/iPhone4,1;FBMD/iPhone;FBSN/iPhone OS;FBSV/6.1.3;FBSS/2; FBCR/AT&T;FBID/phone;FBLC/en_US;FBOP/1]");
			assert.equal(ios3.getFamily(), "ios_saf");
		});
	});

	describe('.getVersion', () => {
		it('returns the full version of the ua', () => {
			const ua = new UA("ie/11.3.0");
			assert.equal(ua.getVersion(), '11.3.0');
		});
	});

	describe('.satisfies', () => {
		it('returns false if browser is not within the supported browsers', () => {
			const ua = new UA("abcdefghi/11.0");
			assert.equal(ua.satisfies('^11.0.0'), false);
		});

		it('returns false if browser is within the supported browser-versions list but version is lower than the baseline', () => {
			const ua = new UA("ie/5.0");
			assert.equal(ua.satisfies('^5.0.0'), false);
		});

		it('returns false if browser is within the supported browser-versions list but not within the range being requested ', () => {
			const ua = new UA("ie/11.0");
			assert.equal(ua.satisfies('^12.0.0'), false);
		});

		it('returns true if browser is within the supported browser-versions list and within the range being requested ', () => {
			const ua = new UA("ie/11.0");
			assert.equal(ua.satisfies('^11.0.0'), true);
		});
	});

	describe('.getBaseline', () => {
		it('returns the baseline version for the browser if it is in our supported list', () => {
			const ua = new UA("ie/11.0");
			assert.isString(ua.getBaseline());
		});

		it('returns undefined if the browser is not in our supported list', () => {
			const ua = new UA("abcdefghi/11.0");
			assert.isUndefined(ua.getBaseline());
		});
	});

	describe(".normalize", function () {

		it('should return UA string lowercase if already normalized', () => {
			const normalizedUa = UA.normalize("IE/11.3.0");
			assert.equal(normalizedUa, 'ie/11.3.0');
		});

		it("should resolve user agents of core supported browsers", function () {
			const test = UA.normalize("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36");
			assert.equal(test, "chrome/39.0.0");
		});

		it("should resolve user agents of browsers that map all versions to a constant", function () {
			const phantom = UA.normalize("Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.0 Safari/534.34");
			assert.equal(phantom, "safari/5.0.0");
		});

		it("should resolve user agents of browsers with granular version mapping", function () {
			const yandex = UA.normalize("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 YaBrowser/14.10.2062.12057 Safari/537.36");
			assert.equal(yandex, "chrome/37.0.0");
		});

		it("should resolve edge mobile to the edge_mob family", function () {
			const test = UA.normalize("Mozilla/5.0 (Windows Phone 10.0;  Android 4.2.1; Nokia; Lumia 520) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.10130");
			assert.equal(test, "edge_mob/12.10130.0");
		});

		it("should resolve Facebook iOS App to the version of iOS it is running within", function () {
			let test = UA.normalize("Mozilla/5.0 (iPad; CPU OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10A523 [FBAN/FBIOS;FBAV/6.0.1;FBBV/180945;FBDV/iPad2,1;FBMD/iPad;FBSN/iPhone OS;FBSV/6.0.1;FBSS/1; FBCR/;FBID/tablet;FBLC/en_US;FBOP/1]");
			assert.equal(test, "ios_saf/6.0.0");

			test = UA.normalize("Mozilla/5.0 (iPad; CPU OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B329 [FBAN/FBIOS;FBAV/6.0.2;FBBV/183159;FBDV/iPad3,1;FBMD/iPad;FBSN/iPhone OS;FBSV/6.1.3;FBSS/2; FBCR/;FBID/tablet;FBLC/en_US;FBOP/1]");
			assert.equal(test, "ios_saf/6.1.0");

			test = UA.normalize("Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B329 [FBAN/FBIOS;FBAV/6.0.2;FBBV/183159;FBDV/iPhone4,1;FBMD/iPhone;FBSN/iPhone OS;FBSV/6.1.3;FBSS/2; FBCR/AT&T;FBID/phone;FBLC/en_US;FBOP/1]");
			assert.equal(test, "ios_saf/6.1.0");
		});

		it("should resolve mobile googlebot 2.1 to chrome 41.0.0", function () {
			const googlebot = UA.normalize("Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)");
			assert.equal(googlebot, "chrome/41.0.0");
		});

		it("should resolve desktop googlebot 2.1 to chrome 41.0.0", function () {
			const googlebot = UA.normalize("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)");
			assert.equal(googlebot, "chrome/41.0.0");
		});

		it("should resolve legacy desktop googlebot 2.1 to chrome 41.0.0", function () {
			const googlebot = UA.normalize("Googlebot/2.1 (+http://www.google.com/bot.html)");
			assert.equal(googlebot, "chrome/41.0.0");
		});
	});

	describe(".isUnknown", function () {
		it("should resolve false for user agents we have a baseline version for", function () {
			assert.equal(new UA("ie/6").isUnknown(), true);
			assert.equal(new UA("ie/7").isUnknown(), true);
			assert.equal(new UA("ie/14").isUnknown(), false);


			assert.equal(new UA("ie_mob/7").isUnknown(), true);
			assert.equal(new UA("ie_mob/8").isUnknown(), true);
			assert.equal(new UA("ie_mob/13").isUnknown(), false);

			assert.equal(new UA("chrome/1").isUnknown(), true);
			assert.equal(new UA("chrome/20").isUnknown(), true);
			assert.equal(new UA("chrome/30").isUnknown(), false);
			assert.equal(new UA("chrome/35").isUnknown(), false);
			assert.equal(new UA("chrome/40").isUnknown(), false);
			assert.equal(new UA("chrome/52").isUnknown(), false);

			assert.equal(new UA("safari/3").isUnknown(), true);
			assert.equal(new UA("safari/4").isUnknown(), true);

			assert.equal(new UA("safari/9").isUnknown(), false);

			assert.equal(new UA("ios_saf/3").isUnknown(), true);
			assert.equal(new UA("ios_saf/4").isUnknown(), true);
			assert.equal(new UA("ios_saf/9").isUnknown(), false);

			assert.equal(new UA("ios_chr/3").isUnknown(), true);
			assert.equal(new UA("ios_chr/4").isUnknown(), true);
			assert.equal(new UA("ios_chr/9").isUnknown(), false);

			assert.equal(new UA("firefox/48.0").isUnknown(), false);
			assert.equal(new UA("firefox/3.6").isUnknown(), true);
			assert.equal(new UA("firefox/3.5").isUnknown(), true);
			assert.equal(new UA("firefox/3.0").isUnknown(), true);
			assert.equal(new UA("firefox/2.0").isUnknown(), true);
			assert.equal(new UA("firefox/1.5").isUnknown(), true);
			assert.equal(new UA("firefox/1.0").isUnknown(), true);
			assert.equal(new UA("firefox/0.1").isUnknown(), true);

			assert.equal(new UA("firefox_mob/48.0").isUnknown(), false);
			assert.equal(new UA("firefox_mob/4.0").isUnknown(), true);
			assert.equal(new UA("firefox_mob/3.6").isUnknown(), true);
			assert.equal(new UA("firefox_mob/3.5").isUnknown(), true);
			assert.equal(new UA("firefox_mob/3.0").isUnknown(), true);
			assert.equal(new UA("firefox_mob/2.0").isUnknown(), true);
			assert.equal(new UA("firefox_mob/1.5").isUnknown(), true);
			assert.equal(new UA("firefox_mob/1.0").isUnknown(), true);
			assert.equal(new UA("firefox_mob/0.1").isUnknown(), true);

			assert.equal(new UA("opera/10").isUnknown(), true);
			assert.equal(new UA("opera/11").isUnknown(), true);
			assert.equal(new UA("opera/39").isUnknown(), false);

			assert.equal(new UA("android/2.0").isUnknown(), true);
			assert.equal(new UA("android/3.0").isUnknown(), true);
			assert.equal(new UA("android/5").isUnknown(), false);
			assert.equal(new UA("android/5.1").isUnknown(), false);

			assert.equal(new UA("op_mob/9").isUnknown(), true);
			assert.equal(new UA("op_mob/10").isUnknown(), false);
			assert.equal(new UA("op_mob/33").isUnknown(), false);

			assert.equal(new UA("op_mini/4").isUnknown(), true);
			assert.equal(new UA("op_mini/5").isUnknown(), false);

			assert.equal(new UA("bb/5").isUnknown(), true);
			assert.equal(new UA("bb/6").isUnknown(), false);
			assert.equal(new UA("bb/10").isUnknown(), false);

			assert.equal(new UA("samsung_mob/3").isUnknown(), true);
			assert.equal(new UA("samsung_mob/4").isUnknown(), false);
		});
	});

	describe('.getBaselines', () => {
		it('returns the browsers we support and the minimum supported version as a semver range', () => {
			const browserMinimumVersions = UA.getBaselines();
			assert.isObject(browserMinimumVersions, Object);

			describe('Each browser should have a valid semver range', () => {
				const browsers = Object.keys(browserMinimumVersions);
				for (const browser of browsers) {
					it(`${browser} uses a valid semver range`, () => {
						assert.isNotNull(semver.validRange(browserMinimumVersions[browser]));
					});
				}
			});
		});
	});
});
