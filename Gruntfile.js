
var polyfilldir = __dirname+'/polyfills';
var testUrls = [];
var port = 3000;
require('fs').readdirSync(polyfilldir).forEach(function (polyfillName) {
	testUrls.push('http://127.0.0.1:'+port+'/test/tests/'+polyfillName);
});

module.exports = function(grunt) {

	grunt.initConfig({

		"simplemocha": {
			options: {
				globals: ['should'],
				timeout: port,
				ignoreLeaks: false,
				ui: 'bdd',
				reporter: 'spec'
			},
			all: {
				src: ['test/node/**/*.js']
			}
		},
		"mocha": {
			all: {
				options: {
					reporter: 'Spec',
					run: true,
					urls: testUrls
				}
			}
		},
		"saucelabs": {
			compat: {
				options: {
					username: 'polyfill-service',
					key: process.env.SAUCE_API_KEY,
					urls: {
						polyfilled: 'http://127.0.0.1:3000/test/tests/',
						native: 'http://127.0.0.1:3000/test/tests/?nopolyfill=1'
					},
					concurrency: 3,
					browsers: browserList
				}
			},
			ci: {
				options: {
					username: 'polyfill-service',
					key: process.env.SAUCE_API_KEY,
					cibuild: true,
					urls: {
						default: 'http://127.0.0.1:3000/test/tests/?configuredonly=1'
					},
					concurrency: 3,
					browsers: browserList
				}
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask("dev", [
		"simplemocha",
		"polyfillservice",
		"mocha",
	]);

	grunt.registerTask("compatgen", [
		"simplemocha",
		"polyfillservice",
		"saucelabs:compat",
		"compattable"
	]);

	grunt.registerTask("ci", [
		"simplemocha",
		"polyfillservice",
		"saucelabs:ci"
	]);
};

var browserList  = [
	{
		browserName: 'chrome',
		version: 'beta',
		platform: 'Windows 7'
	},
	{
		browserName: 'chrome',
		version: '38',
		platform: 'Windows 7'
	},
	{
		browserName: 'chrome',
		version: '37',
		platform: 'Windows 7'
	},
	{
		browserName: 'chrome',
		version: '32',
		platform: 'Windows 7'
	},
	{
		browserName: 'chrome',
		version: '26',
		platform: 'Windows 7'
	},
	{
		browserName: 'firefox',
		version: 'beta',
		platform: 'Linux'
	},
	{
		browserName: 'firefox',
		version: '32',
		platform: 'Linux'
	},
	{
		browserName: 'firefox',
		version: '31',
		platform: 'Linux'
	},
	{
		browserName: 'firefox',
		version: '25',
		platform: 'Linux'
	},
	{
		browserName: 'firefox',
		version: '20',
		platform: 'Linux'
	},
	{
		browserName: 'firefox',
		version: '3.6',
		platform: 'Linux'
	},
	{
		browserName: 'internet explorer',
		version: '6',
		platform: 'Windows XP'
	},
	{
		browserName: 'internet explorer',
		version: '7',
		platform: 'Windows XP'
	},
	{
		browserName: 'internet explorer',
		version: '8',
		platform: 'Windows XP'
	},
	{
		browserName: 'internet explorer',
		version: '9',
		platform: 'Windows 7'
	},
	{
		browserName: 'internet explorer',
		version: '10',
		platform: 'Windows 7'
	},
	{
		browserName: 'internet explorer',
		version: '11',
		platform: 'Windows 7'
	},
	{
		browserName: 'opera',
		version: '11',
		platform: 'Windows XP'
	},
	{
		browserName: 'opera',
		version: '12',
		platform: 'Windows XP'
	},
	{
		browserName: 'iphone',
		version: '7.1',
		platform: 'OSX 10.9'
	},
	{
		browserName: 'iphone',
		version: '7.0',
		platform: 'OSX 10.9'
	},
	{
		browserName: 'iphone',
		version: '6.1',
		platform: 'OSX 10.8'
	},
	{
		browserName: 'iphone',
		version: '6.0',
		platform: 'OSX 10.8'
	},
	{
		browserName: 'iphone',
		version: '5.1',
		platform: 'OSX 10.6'
	},
	{
		browserName: 'iphone',
		version: '5.0',
		platform: 'OSX 10.6'
	},
	{
		browserName: 'iphone',
		version: '4.3',
		platform: 'OSX 10.6'
	},
	{
		browserName: 'safari',
		version: '5',
		platform: 'OSX 10.6'
	},
	{
		browserName: 'safari',
		version: '6',
		platform: 'OSX 10.8'
	},
	{
		browserName: 'safari',
		version: '7',
		platform: 'OSX 10.9'
	},
	{
		browserName: 'android',
		version: '4.4',
		platform: 'linux'
	},
	{
		browserName: 'android',
		version: '4.3',
		platform: 'linux'
	},
	{
		browserName: 'android',
		version: '4.2',
		platform: 'linux'
	},
	{
		browserName: 'android',
		version: '4.1',
		platform: 'linux'
	},
	{
		browserName: 'android',
		version: '4.0',
		platform: 'linux'
	}
];
