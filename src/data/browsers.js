"use strict";

module.exports = {
	supported: Object.entries(require("@financial-times/polyfill-useragent-normaliser/data.json").baselineVersions).map(([browser, version]) => {
		switch (browser) {
			case "ie": {
				browser = "Internet Explorer";
				break;
			}
			case "ie_mob": {
				browser = "Internet Explorer Mobile";
				break;
			}
			case "chrome": {
				browser = "Chrome";
				break;
			}
			case "safari": {
				browser = "Safari";
				break;
			}
			case "ios_saf": {
				browser = "iOS Safari";
				break;
			}
			case "ios_chr": {
				browser = "iOS Chrome";
				break;
			}
			case "firefox": {
				browser = "Firefox";
				break;
			}
			case "firefox_mob": {
				browser = "Firefox Mobile";
				break;
			}
			case "android": {
				browser = "Android";
				break;
			}
			case "opera": {
				browser = "Opera";
				break;
			}
			case "op_mob": {
				browser = "Opera Mobile";
				break;
			}
			case "op_mini": {
				browser = "Opera Mini";
				break;
			}
			case "bb": {
				browser = "BlackBerry";
				break;
			}
			case "samsung_mob": {
				browser = "Samsung Internet";
				break;
			}
		}
		version = version.replace(">=", "");
		return {
			browser,
			version
		};
	})
};
