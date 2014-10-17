
module.exports = function(grunt) {

	grunt.initConfig({

		"simplemocha": {
			options: {
				globals: ['should'],
				timeout: 5000,
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
					urls: ['http://127.0.0.1:3000/test/director?mode=targeted']
				}
			}
		},
		"saucelabs": {
			compat: {
				options: {
					urls: {
						polyfilled: 'http://127.0.0.1:3000/test/director?mode=all',
						native: 'http://127.0.0.1:3000/test/director?mode=control'
					},
					browsers: browserList
				}
			},
			ci: {
				options: {
					cibuild: true,
					urls: {
						default: 'http://127.0.0.1:3000/test/director?mode=targeted'
					},
					browsers: browserList
				}
			},
			quick: {
				options: {
					cibuild: true,
					urls: {
						default: 'http://127.0.0.1:3000/test/director?mode=targeted'
					},
					browsers: 	[
						{
							browserName: 'chrome',
							version: 'beta',
							platform: 'Windows 7'
						},
						{
							browserName: 'internet explorer',
							version: '6',
							platform: 'Windows XP'
						}
					]
				}
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask("test", [
		"simplemocha",
		"polyfillservice",
		"mocha",
	]);

	grunt.registerTask("saucedev", [
		"polyfillservice",
		"saucelabs:quick",
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

var browserList = [
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
		browserName: 'iphone',
		version: '7.1',
		platform: 'OSX 10.9'
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
