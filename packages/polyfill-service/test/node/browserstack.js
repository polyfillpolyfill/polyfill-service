'use strict';

const denodeify = require('denodeify');

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
						throw new Error("Failed to open tunnel");
					}
					resolve();
				});
			}),
			closeTunnel: () => denodeify(tunnel.stop.bind(tunnel))()
		};
	},
	host: "hub-cloud.browserstack.com",
	port: 80,
	useragentToBrowserObj: {
		'chrome/54': {
			"os": "Windows",
			"os_version": "10",
			"browser": "chrome",
			"browser_version": "54.0"
		},
		'chrome/48': {
			"os": "Windows",
			"os_version": "10",
			"browser": "chrome",
			"browser_version": "48.0"
		},
		'chrome/46': {
			"os": "Windows",
			"os_version": "10",
			"browser": "chrome",
			"browser_version": "46.0"
		},
		'chrome/42': {
			"os": "Windows",
			"os_version": "10",
			"browser": "chrome",
			"browser_version": "42.0"
		},
		'chrome/40': {
			"os": "Windows",
			"os_version": "10",
			"browser": "chrome",
			"browser_version": "40.0"
		},
		'chrome/35': {
			"os": "Windows",
			"os_version": "8",
			"browser": "chrome",
			"browser_version": "35.0"
		},
		'chrome/30': {
			"os": "Windows",
			"os_version": "8.1",
			"browser": "chrome",
			"browser_version": "30.0"
		},
		'firefox/49': {
			"os": "Windows",
			"os_version": "8.1",
			"browser": "firefox",
			"browser_version": "49.0"
		},
		'firefox/44': {
			"os": "Windows",
			"os_version": "10",
			"browser": "firefox",
			"browser_version": "44.0"
		},
		'firefox/42': {
			"os": "OS X",
			"os_version": "Snow Leopard",
			"browser": "firefox",
			"browser_version": "42.0"
		},
		'firefox/41': {
			"os": "OS X",
			"os_version": "Lion",
			"browser": "firefox",
			"browser_version": "41.0"
		},
		'firefox/33': {
			"os": "OS X",
			"os_version": "Mountain Lion",
			"browser": "firefox",
			"browser_version": "33.0"
		},
		'firefox/30': {
			"os": "OS X",
			"os_version": "Mavericks",
			"browser": "firefox",
			"browser_version": "30.0"
		},
		'firefox/20': {
			"os": "OS X",
			"os_version": "Yosemite",
			"browser": "firefox",
			"browser_version": "20.0"
		},
		'ie/14': {
			"os": "Windows",
			"os_version": "10",
			"browser": "edge",
			"browser_version": "14.0"
		},
		'ie/13': {
			"os": "Windows",
			"os_version": "10",
			"browser": "edge",
			"browser_version": "13.0"
		},
		'ie/11': {
			"os": "Windows",
			"os_version": "10",
			"browser": "ie",
			"browser_version": "11.0"
		},
		'ie/10': {
			"os": "Windows",
			"os_version": "7",
			"browser": "ie",
			"browser_version": "10.0"
		},
		'ie/9': {
			"os": "Windows",
			"os_version": "7",
			"browser": "ie",
			"browser_version": "9.0"
		},
		'ie/8': {
			"os": "Windows",
			"os_version": "7",
			"browser": "ie",
			"browser_version": "8.0"
		},
		'ie/7': {
			"os": "Windows",
			"os_version": "XP",
			"browser": "ie",
			"browser_version": "7.0"
		},
		'ie/6': {
			"os": "Windows",
			"os_version": "XP",
			"browser": "ie",
			"browser_version": "6.0"
		},
		'safari/9': {
			"os": "OS X",
			"os_version": "El Capitan",
			"browser": "safari",
			"browser_version": "9.1"
		},
		'safari/8': {
			"os": "OS X",
			"os_version": "Yosemite",
			"browser": "safari",
			"browser_version": "8.0"
		},
		'safari/5.1': {
			"os": "OS X",
			"os_version": "Snow Leopard",
			"browser": "safari",
			"browser_version": "5.1"
		},
		'android/4.4': {
			"os": "android",
			"os_version": "4.4",
			"browser": "android",
			"device": "HTC One M8",
			"browser_version": null
		},
		'android/4.3': {
			"os": "android",
			"os_version": "4.3",
			"browser": "android",
			"device": "Amazon Kindle Fire HDX 7",
			"browser_version": null
		},
		'android/4.2': {
			"os": "android",
			"os_version": "4.2",
			"browser": "android",
			"device": "Google Nexus 4",
			"browser_version": null
		},
		'android/4.1': {
			"os": "android",
			"os_version": "4.1",
			"browser": "android",
			"device": "Google Nexus 7",
			"browser_version": null
		},
		'ios_saf/9.1': {
			"os": "ios",
			"os_version": "9.1",
			"browser": "iphone",
			"device": "iPhone 6S",
			"browser_version": null
		}
	}
};
