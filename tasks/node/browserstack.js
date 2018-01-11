'use strict';

const denodeify = require('denodeify');
const browsers = require('./browserstackBrowsers');

if (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_ACCESS_KEY) {
	throw new Error('BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY must be set in the environment to run tests on BrowserStack.  For more information about how to set this up or for alternative methods of testing, see https://polyfill.io/v2/docs/contributing/testing');
}

module.exports = {
	creds: {
		username: process.env.BROWSERSTACK_USERNAME,
		key: process.env.BROWSERSTACK_ACCESS_KEY
	},
	tunnel: function () {
		const Tunnel = require('browserstack-local').Local;
		const tunnel = new Tunnel();
		return {
			openTunnel: () => new Promise(resolve => {
				tunnel.start({}, error => {
					if (error) {
						console.error("Failed to open tunnel");
						console.error(error);
						throw error;
					}
					resolve();
				});
			}),
			closeTunnel: () => denodeify(tunnel.stop.bind(tunnel))()
		};
	},
	host: "hub-cloud.browserstack.com",
	port: 80,
	useragentToBrowserObj: (browserWithVersion) => {
		let [browser, version] = browserWithVersion.split('/');
		version = parseFloat(version);
		if (browser === 'ie' && version > 11) {
			browser = 'edge';
		}
		const browserObj = browsers.find(browserObject => {
			if (browser === browserObject.browser && version === parseFloat(browserObject.os_version)) {
				return true;
			} else if (browser === browserObject.browser && version === parseInt(browserObject.browser_version, 10)) {
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
