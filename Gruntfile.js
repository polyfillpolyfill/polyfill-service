var port = 3000;

var polyfilldir = __dirname+'/polyfills';
var testUrls = [];
require('fs').readdirSync(polyfilldir).forEach(function (polyfillName) {
	testUrls.push('http://127.0.0.1:'+port+'/test/tests/'+polyfillName);
});

module.exports = function(grunt) {

	grunt.initConfig({

		// Run the service, which generates its own test pages at /test/runner/, and sauce at the same time, so that sauce can load pages from the service
		"concurrent": {
			options: {
				logConcurrentOutput: true
			},
			ci: {
				tasks: ['nodemon', 'saucelabs']
			},
			dev: {
				tasks: ['nodemon', 'delayedmocha']
			}
		},
		"nodemon": {
			options: {
				env: {
					PORT: port
				}
			},
			all: {
				script: 'service/index.js'
			},
		},
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
					key: 'xxxxxxxxxxxxxxxxxxxxxx',
					url: 'http://127.0.0.1:3000/test/tests/',
					concurrency: 2,
					browsers: [{
						browserName: 'firefox',
						version: '19',
						platform: 'XP'
					}]
				}
			}
		},
		"wait": {
			all: {
				options: {
					delay: 5000
				}
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-wait');

	grunt.registerTask("delayedmocha", ["wait", "mocha"]);

	grunt.registerTask("dev", ["simplemocha", "concurrent:dev"]);
	grunt.registerTask("ci", ["simplemocha", "concurrent:ci"]);

};
