'use strict';

require('es6-promise').polyfill();

var ENV = {};
var fs = require('fs');
if (fs.existsSync('./.env.json')) {
	ENV = require('./.env.json');
	require('lodash').extend(process.env, ENV);
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
				tasks: ['buildsources', 'service:polyfillservice:restart']
			}
		},
		"service": {
			polyfillservice: {
				shellCommand: process.argv[0] + ' ' + __dirname + '/service/index.js',
				pidFile: __dirname + '/service-process.pid',
				generatePID: true,
				options: {
					env: ENV,
					cwd: __dirname,
					failOnError: true
				}
			}
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-service');
	grunt.loadNpmTasks('grunt-simple-mocha');

	grunt.registerTask("test", [
		"buildsources",
		"simplemocha",
		"service:polyfillservice",
		"saucelabs:quick",
	]);

	grunt.registerTask("compatgen", [
		"buildsources",
		"simplemocha",
		"service:polyfillservice",
		"saucelabs:compat",
		"compattable"
	]);

	grunt.registerTask("ci", [
		"buildsources",
		"simplemocha",
		"service:polyfillservice",
		"saucelabs:ci"
	]);

	grunt.registerTask("build", [
		"clean:repo",
		"clean:versions",
		"installcollections",
		"buildsources",
		"clean:repo"
	]);

	grunt.registerTask('dev', [
		"clean:repo",
		"clean:versions",
		"buildsources",
		"service:polyfillservice",
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
		['safari', '5', 'OSX 10.6'],
		['safari', '7', 'OSX 10.9'],
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
		['safari', '5', 'OSX 10.6'],
		['safari', '6', 'OSX 10.8'],
		['safari', '7', 'OSX 10.9'],
		['android', '4.4', 'linux'],
		['android', '4.3', 'linux'],
		['android', '4.2', 'linux'],
		['android', '4.1', 'linux'],
		['android', '4.0', 'linux']
	]
};
