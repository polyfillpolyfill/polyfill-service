"use strict";

const path = require("path");
const fs = require("fs");
const BrowserStack = require("browserstack");
const dotenvSafe = require("dotenv-safe");
dotenvSafe.config({
	path: path.join(__dirname, "../../.env"),
	example: path.join(__dirname, "../../env.example")
});
const browserStackCredentials = {
	username: process.env.BROWSERSTACK_USERNAME,
	password: process.env.BROWSERSTACK_ACCESS_KEY
};

const automateClient = BrowserStack.createAutomateClient(browserStackCredentials);

automateClient.getBrowsers(function(error, browsers) {
	console.log("Updated the browser list for automated testing via BrowserStack.");
	fs.writeFileSync(path.join(__dirname, "browserstackBrowsers.json"), JSON.stringify(browsers, null, 4));
	fs.writeFileSync(
		path.join(__dirname, "browsers.json"),
		JSON.stringify(Array.from(new Set(browsers.map(b => (b.browser_version ? `${b.browser}/${b.browser_version}` : `${b.os}/${b.os_version}`)))).sort(), null, 4)
	);
});
