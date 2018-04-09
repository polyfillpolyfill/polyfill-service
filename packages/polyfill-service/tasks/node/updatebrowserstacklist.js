'use strict';

require('dotenv').config();

const path = require('path');
const fs = require('fs');
const BrowserStack = require("browserstack");

const browserStackCredentials = {
    username: process.env.BROWSERSTACK_USERNAME,
    password: process.env.BROWSERSTACK_ACCESS_KEY
};

const automateClient = BrowserStack.createAutomateClient(browserStackCredentials);

automateClient.getBrowsers(function(error, browsers) {
    console.log("Updated the browser list for automated testing via BrowserStack.");
	fs.writeFileSync(path.join(__dirname, 'browserstackBrowsers.json'), JSON.stringify(browsers, null, 4));
});
