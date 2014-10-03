var port = 3000;

var polyfilldir = __dirname+'/polyfills';
var testUrls = [];
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
			all: {
				options: {
					username: 'polyfill-service',
					key: process.env.SAUCE_API_KEY,
					urls: {
						polyfilled: 'http://127.0.0.1:3000/test/tests/',
						native: 'http://127.0.0.1:3000/test/tests/?nopolyfill=1'
					},
					concurrency: 2,
					browsers: [{
						browserName: 'firefox',
						version: '19',
						platform: 'XP'
					}]
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

	grunt.registerTask("ci", [
		"simplemocha",
		"polyfillservice",
		"saucelabs",
	]);
};
