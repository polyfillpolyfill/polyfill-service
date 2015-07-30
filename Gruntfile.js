'use strict';

require('es6-promise').polyfill();

var ENV = process.env;

var fs = require('fs');
if (fs.existsSync('./.env.json')) {
	var environmentOverrides = require('./.env.json');
	ENV = require('lodash').extend(ENV, environmentOverrides);
}


module.exports = function(grunt) {

	grunt.initConfig({
		"clean": {
			repo: ['polyfills/__repo'],
			versions: ['polyfills/__versions']
		},
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
		"saucelabs": {
			compat: {
				options: {
					urls: {
						polyfilled: 'http://127.0.0.1:3000/test/director?mode=all',
						native: 'http://127.0.0.1:3000/test/director?mode=control'
					},
					browsers: browsers.full
				}
			},
			ci: {
				options: {
					cibuild: true,
					urls: {
						default: 'http://127.0.0.1:3000/test/director?mode=targeted'
					},
					browsers: browsers.ci
				}
			},
			quick: {
				options: {
					cibuild: true,
					urls: {
						default: 'http://127.0.0.1:3000/test/director?mode=targeted'
					},
					browsers: browsers.quick
				}
			}
		},
		"watch": {
			options: {
				spawn: false
			},
			js: {
				files: ['!*', 'docs/**/*', 'service/**/*', 'lib/**/*'],
				tasks: ['service:polyfillservice:restart']
			},
			polyfills: {
				files: ['!*', 'polyfills/**/*', '!polyfills/__versions/**', '!polyfills/*.json'],
				tasks: ['service:polyfillservice:stop', 'buildsources', 'service:polyfillservice:start']
			}
		},
		"service": {
			polyfillservice: {
				shellCommand: __dirname + '/bin/polyfill-service',
				options: {
					env: ENV,
					cwd: __dirname,
					failOnError: true
				}
			}
		},
		"updatelibrary": {
			options: {
				expand: true
			},
			tasks: {
				src: ['polyfills/**/update.task.js'],
			}
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-simple-mocha');

	grunt.registerTask("test", [
		"buildsources",
		"simplemocha",
		"service",
		"saucelabs:quick",
		"service:polyfillservice:stop"
	]);

	grunt.registerTask("compatgen", [
		"buildsources",
		"simplemocha",
		"service",
		"saucelabs:compat",
		"compattable",
		"service:polyfillservice:stop"
	]);

	grunt.registerTask("ci", [
		"buildsources",
		"simplemocha",
		"service",
		"saucelabs:ci",
		"service:polyfillservice:stop"
	]);

	grunt.registerTask("build", [
		"clean",
		"installcollections",
		"buildsources",
		"clean:repo"
	]);

	grunt.registerTask('dev', [
		"clean",
		"buildsources",
		"service",
		"watch"
	]);
};

var browsers = {
	quick: [
		['chrome', '39', 'Windows 7'],
		['firefox', '34', 'Linux'],
		['internet explorer', '7', 'Windows XP'],
		['internet explorer', '11', 'Windows 8.1'],
	],
	ci: [
		['chrome', '39', 'Windows 7'],
		['chrome', '26', 'Windows 7'],
		['firefox', '34', 'Linux'],
		['firefox', '20', 'Linux'],
		['firefox', '3.6', 'Linux'],
		['internet explorer', '6', 'Windows XP'],
		['internet explorer', '7', 'Windows XP'],
		['internet explorer', '8', 'Windows XP'],
		['internet explorer', '9', 'Windows 7'],
		['internet explorer', '10', 'Windows 7'],
		['internet explorer', '11', 'Windows 8.1'],
		['safari', '5.1', 'Windows 7'],
		['safari', '8.1', 'OSX 10.11'],
		['android', '4.4', 'linux'],
		['android', '4.0', 'linux']
	],
	full: [
		['chrome', '39', 'Windows 7'],
		['chrome', '38', 'Windows 7'],
		['chrome', '34', 'Windows 7'],
		['chrome', '26', 'Windows 7'],
		['firefox', '34', 'Linux'],
		['firefox', '33', 'Linux'],
		['firefox', '29', 'Linux'],
		['firefox', '20', 'Linux'],
		['firefox', '3.6', 'Linux'],
		['internet explorer', '6', 'Windows XP'],
		['internet explorer', '7', 'Windows XP'],
		['internet explorer', '8', 'Windows XP'],
		['internet explorer', '9', 'Windows 7'],
		['internet explorer', '10', 'Windows 7'],
		['internet explorer', '11', 'Windows 8.1'],
		['safari', '5.1', 'Windows 7'],
		['safari', '8.1', 'OSX 10.11'],
		['android', '4.4', 'linux'],
		['android', '4.3', 'linux'],
		['android', '4.2', 'linux'],
		['android', '4.1', 'linux'],
		['android', '4.0', 'linux']
	]
};
