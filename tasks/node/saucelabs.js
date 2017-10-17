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
	useragentToBrowserObj: {
		'chrome/54': {
			"browserName": 'chrome',
			"version": '54.0',
			"platform": 'Windows 10',
			"deviceName": null
		},
		'chrome/48': {
			"browserName": 'chrome',
			"version": '48.0',
			"platform": 'Windows 7',
			"deviceName": null
		},
		'chrome/46': {
			"browserName": 'chrome',
			"version": '46.0',
			"platform": 'Windows 7',
			"deviceName": null
		},
		'chrome/42': {
			"browserName": 'chrome',
			"version": '42.0',
			"platform": 'Windows 7',
			"deviceName": null
		},
		'chrome/40': {
			"browserName": 'chrome',
			"version": '40.0',
			"platform": 'Windows OS X 10.11',
			"deviceName": null
		},
		'chrome/35': {
			"browserName": 'chrome',
			"version": '35.0',
			"platform": 'OS X 10.11',
			"deviceName": null
		},
		'chrome/30': {
			"browserName": 'chrome',
			"version": '30.0',
			"platform": 'Windows 7',
			"deviceName": null
		},
		'firefox/49': {
			"browserName": 'firefox',
			"version": '49.0',
			"platform": 'OS X 10.11',
			"deviceName": null
		},
		'firefox/44': {
			"browserName": 'firefox',
			"version": '44.0',
			"platform": 'Linux',
			"deviceName": null
		},
		'firefox/42': {
			"browserName": 'firefox',
			"version": '42.0',
			"platform": 'Linux',
			"deviceName": null
		},
		'firefox/41': {
			"browserName": 'firefox',
			"version": '41.0',
			"platform": 'Linux',
			"deviceName": null
		},
		'firefox/33': {
			"browserName": 'firefox',
			"version": '33.0',
			"platform": 'Linux',
			"deviceName": null
		},
		'firefox/30': {
			"browserName": 'firefox',
			"version": '30.0',
			"platform": 'OSX 10.11',
			"deviceName": null
		},
		'firefox/20': {
			"browserName": 'firefox',
			"version": '20.0',
			"platform": 'Linux',
			"deviceName": null
		},
		'ie/14': {
			"browserName": 'microsoftedge',
			"version": '14',
			"platform": 'Windows 10',
			"deviceName": null
		},
		'ie/13': {
			"browserName": 'MicrosoftEdge',
			"version": '13.10586',
			"platform": 'Windows 10',
			"deviceName": null
		},
		'ie/11': {
			"browserName": 'internet explorer',
			"version": '11',
			"platform": 'Windows 10',
			"deviceName": null
		},
		'ie/10': {
			"browserName": 'internet explorer',
			"version": '10',
			"platform": 'Windows 7',
			"deviceName": null
		},
		'ie/9': {
			"browserName": 'internet explorer',
			"version": '9',
			"platform": 'Windows 7',
			"deviceName": null
		},
		'ie/8': {
			"browserName": 'internet explorer',
			"version": '8',
			"platform": 'Windows XP',
			"deviceName": null
		},
		'ie/7': {
			"browserName": 'internet explorer',
			"version": '7',
			"platform": 'Windows XP',
			"deviceName": null
		},
		'ie/6': {
			"browserName": 'internet explorer',
			"version": '6',
			"platform": 'Windows XP',
			"deviceName": null
		},
		'safari/9': {
			"browserName": 'safari',
			"version": '9.0',
			"platform": 'OSX 10.11',
			"deviceName": null
		},
		'safari/8': {
			"browserName": 'safari',
			"version": '8.0',
			"platform": 'OSX 10.10',
			"deviceName": null
		},
		'safari/5.1': {
			"browserName": 'safari',
			"version": '5.1',
			"platform": 'Windows 7',
			"deviceName": null
		},
		'android/5.1': {
			"browserName": 'android',
			"version": '5.1',
			"platform": 'linux',
			"deviceName": 'Android Emulator'
		},
		'android/4.4': {
			"browserName": 'android',
			"version": '4.4',
			"platform": 'linux',
			"deviceName": 'Android Emulator'
		},
		'android/4.3': {
			"browserName": 'android',
			"version": '4.3',
			"platform": 'linux',
			"deviceName": 'Android Emulator'
		},
		'android/4.2': {
			"browserName": 'android',
			"version": '4.2',
			"platform": 'linux',
			"deviceName": 'Android Emulator'
		},
		'android/4.1': {
			"browserName": 'android',
			"version": '4.1',
			"platform": 'linux',
			"deviceName": 'Android Emulator'
		},
		'ios_saf/9.1': {
			"browserName": 'iphone',
			"version": '9.1',
			"platform": 'OSX 10.10',
			"deviceName": 'iPhone 6'
		},
		'ios_saf/9.2': {
			"browserName": 'iphone',
			"version": '9.2',
			"platform": 'OSX 10.10',
			"deviceName": 'iPhone 6 Plus'
		}
	}
};
