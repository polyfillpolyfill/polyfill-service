"use strict";

const UA = require("polyfill-library/lib/UA");
const supportedBrowsers = Object.entries(UA.getBaselines()).map(([browser, version]) => {
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
	return { browser, version };
});
module.exports = app => {
	app.get("/v3/supported-browsers", async (request, response) => {
		response.render("supported-browsers", { supportedBrowsers });
	});
};
