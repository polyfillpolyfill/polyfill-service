'use strict';
const denodeify = require('denodeify');

if (!process.env.SAUCE_USER_NAME || !process.env.SAUCE_API_KEY) {
	throw new Error('SAUCE_USER_NAME and SAUCE_API_KEY must be set in the environment to run tests on Sauce Labs.  For more information about how to set this up or for alternative methods of testing, see https://polyfill.io/v2/docs/contributing/testing');
}

module.exports = {
	creds: {
		username: process.env.SAUCE_USER_NAME,
		key: process.env.SAUCE_API_KEY
	},
	tunnel: function (tunnelId) {
		const Tunnel = require('sauce-tunnel');
		const tunnel = new Tunnel(process.env.SAUCE_USER_NAME, process.env.SAUCE_API_KEY, tunnelId);
		return {
			openTunnel: () => new Promise(resolve => {
				tunnel.start(tunnelStatus => {
					if (tunnelStatus !== true) {
						throw new Error("Failed to open tunnel");
					}
					resolve();
				});
			}),
			closeTunnel: () => denodeify(tunnel.stop.bind(tunnel))()
		};
	},
	host: "127.0.0.1",
	port: 4445,
	useragentToBrowserObj: (browserWithVersion) => {
		let [browser, version] = browserWithVersion.split('/');
		version = parseFloat(version);
		if (browser === 'ie' && version > 11) {
			browser = 'edge';
		}
		const browserObj = browsers.find(browserObject => {
			if (browser === browserObject.browserName && version === parseFloat(browserObject.version)) {
				return true;
			} else if (browser === browserObject.browserName && version === parseInt(browserObject.version, 10)) {
				return true;
			} else {
				return false;
			}
		});

		if (browserObj) {
			return browserObj;
		} else {
			throw new Error(`Browser: ${browser} with version ${version} was not found on BrowserStack.`);
		}
	}
};

const browsers = [{
		"browserName": 'chrome',
		"version": '54.0',
		"platform": 'Windows 10',
		"deviceName": null
	},
	{
		"browserName": 'chrome',
		"version": '48.0',
		"platform": 'Windows 7',
		"deviceName": null
	},
	{
		"browserName": 'chrome',
		"version": '46.0',
		"platform": 'Windows 7',
		"deviceName": null
	},
	{
		"browserName": 'chrome',
		"version": '42.0',
		"platform": 'Windows 7',
		"deviceName": null
	},
	{
		"browserName": 'chrome',
		"version": '40.0',
		"platform": 'Windows OS X 10.11',
		"deviceName": null
	},
	{
		"browserName": 'chrome',
		"version": '35.0',
		"platform": 'OS X 10.11',
		"deviceName": null
	},
	{
		"browserName": 'chrome',
		"version": '30.0',
		"platform": 'Windows 7',
		"deviceName": null
	},
	{
		"browserName": 'firefox',
		"version": '49.0',
		"platform": 'OS X 10.11',
		"deviceName": null
	},
	{
		"browserName": 'firefox',
		"version": '44.0',
		"platform": 'Linux',
		"deviceName": null
	},
	{
		"browserName": 'firefox',
		"version": '42.0',
		"platform": 'Linux',
		"deviceName": null
	},
	{
		"browserName": 'firefox',
		"version": '41.0',
		"platform": 'Linux',
		"deviceName": null
	},
	{
		"browserName": 'firefox',
		"version": '33.0',
		"platform": 'Linux',
		"deviceName": null
	},
	{
		"browserName": 'firefox',
		"version": '30.0',
		"platform": 'OSX 10.11',
		"deviceName": null
	},
	{
		"browserName": 'firefox',
		"version": '20.0',
		"platform": 'Linux',
		"deviceName": null
	},
	{
		"browserName": 'microsoftedge',
		"version": '14',
		"platform": 'Windows 10',
		"deviceName": null
	},
	{
		"browserName": 'MicrosoftEdge',
		"version": '13.10586',
		"platform": 'Windows 10',
		"deviceName": null
	},
	{
		"browserName": 'internet explorer',
		"version": '11',
		"platform": 'Windows 10',
		"deviceName": null
	},
	{
		"browserName": 'internet explorer',
		"version": '10',
		"platform": 'Windows 7',
		"deviceName": null
	},
	{
		"browserName": 'internet explorer',
		"version": '9',
		"platform": 'Windows 7',
		"deviceName": null
	},
	{
		"browserName": 'internet explorer',
		"version": '8',
		"platform": 'Windows XP',
		"deviceName": null
	},
	{
		"browserName": 'internet explorer',
		"version": '7',
		"platform": 'Windows XP',
		"deviceName": null
	},
	{
		"browserName": 'internet explorer',
		"version": '6',
		"platform": 'Windows XP',
		"deviceName": null
	},
	{
		"browserName": 'safari',
		"version": '9.0',
		"platform": 'OSX 10.11',
		"deviceName": null
	},
	{
		"browserName": 'safari',
		"version": '8.0',
		"platform": 'OSX 10.10',
		"deviceName": null
	},
	{
		"browserName": 'safari',
		"version": '5.1',
		"platform": 'Windows 7',
		"deviceName": null
	},
	{
		"browserName": 'android',
		"version": '5.1',
		"platform": 'linux',
		"deviceName": 'Android Emulator'
	},
	{
		"browserName": 'android',
		"version": '4.4',
		"platform": 'linux',
		"deviceName": 'Android Emulator'
	},
	{
		"browserName": 'android',
		"version": '4.3',
		"platform": 'linux',
		"deviceName": 'Android Emulator'
	},
	{
		"browserName": 'android',
		"version": '4.2',
		"platform": 'linux',
		"deviceName": 'Android Emulator'
	},
	{
		"browserName": 'android',
		"version": '4.1',
		"platform": 'linux',
		"deviceName": 'Android Emulator'
	},
	{
		"browserName": 'iphone',
		"version": '9.1',
		"platform": 'OSX 10.10',
		"deviceName": 'iPhone 6'
	},
	{
		"browserName": 'iphone',
		"version": '9.2',
		"platform": 'OSX 10.10',
		"deviceName": 'iPhone 6 Plus'
}];
