'use strict';

require('dotenv').config({silent: true});
const path = require('path');
const process = require('process');

module.exports = function(grunt) {

	grunt.initConfig({
		"clean": {
			dist: [path.resolve(__dirname, 'polyfills/__dist')],
			testResults: [path.resolve(__dirname, 'test/results')]
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
						all: 'http://127.0.0.1:3000/test/director?mode=all',
						control: 'http://127.0.0.1:3000/test/director?mode=control'
					},
					browsers: browsers.full
				}
			},
			ci: {
				options: {
					cibuild: true,
					urls: {
						targeted: 'http://127.0.0.1:3000/test/director?mode=targeted'
					},
					browsers: browsers.ci
				}
			},
			quick: {
				options: {
					cibuild: true,
					urls: {
						targeted: 'http://127.0.0.1:3000/test/director?mode=targeted'
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
				files: ['bin/*', 'docs/*.html', 'service/**/*.js', 'lib/*.js'],
				tasks: ['service:polyfillservice:restart']
			},
			polyfills: {
				files: ['polyfills/**/*.js', 'polyfills/**/config.json', '!polyfills/__dist/**'],
				tasks: ['service:polyfillservice:stop', 'build', 'service:polyfillservice:start']
			}
		},
		"service": {
			polyfillservice: {
				shellCommand: __dirname + '/bin/polyfill-service',
				pidFile: __dirname+'/.service.pid',
				generatePID: true,
				options: {
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
				src: ['polyfills/**/config.json'],
			}
		},
		"deployvcl": {
			dryrun: { options: {service: "qa", dryRun: true} },
			qa: { options: {service: "qa"} },
			prod: { options: {service: "prod"} }
		},
		"eslint": {
			options: {
				ignorePath: './.gitignore'
			},
      target: ['bin', 'lib', 'service', 'tasks', 'polyfills/**/polyfill.js', '!polyfills/_ArrayIterator/polyfill.js', '!polyfills/Array/of/polyfill.js', '!polyfills/Array/prototype/values/polyfill.js', '!polyfills/atob/polyfill.js', '!polyfills/AudioContext/polyfill.js', '!polyfills/fetch/polyfill.js', '!polyfills/Function/prototype/bind/polyfill.js', '!polyfills/HTMLPictureElement/polyfill.js', '!polyfills/IntersectionObserver/polyfill.js', '!polyfills/Intl/polyfill.js', '!polyfills/Intl/**/polyfill.js', '!polyfills/JSON/polyfill.js', '!polyfills/navigator/sendBeacon/polyfill.js', '!polyfills/Promise/polyfill.js', '!polyfills/setImmediate/polyfill.js', '!polyfills/URL/polyfill.js', '!polyfills/UserTiming/polyfill.js', '!polyfills/WeakSet/polyfill.js', '!polyfills/~html5-elements/polyfill.js',
			]
    }
	});

	if (process.env.NODE_ENV === 'production') {
		require('./tasks/buildsources')(grunt);
		require('./tasks/updatelibrary')(grunt);
		grunt.loadNpmTasks('grunt-contrib-clean');
	} else {
		grunt.loadTasks('grunt');
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-simple-mocha');
		grunt.loadNpmTasks('grunt-eslint');
	}

	grunt.registerTask("test", [
		"build",
		"simplemocha",
		"service",
		"saucelabs:quick",
		"service:polyfillservice:stop"
	]);

	grunt.registerTask("compatgen", [
		"build",
		"simplemocha",
		"service",
		"saucelabs:compat",
		"compattable",
		"service:polyfillservice:stop"
	]);

	grunt.registerTask("ci", [
		"build",
		"simplemocha",
		"service",
		"saucelabs:ci",
		"service:polyfillservice:stop",
		"deployvcl:dryrun"
	]);

	grunt.registerTask("build", [
		"clean",
		"updatelibrary",
		"buildsources",
	]);

	grunt.registerTask("devbuild", [
		"clean",
		"buildsources",
	]);

	grunt.registerTask('dev', [
		"service",
		"watch"
	]);
};

const browsers = {
	quick: [
		'chrome/48',
		'firefox/44',
		'ie/13',
		'ie/12',
		'ie/11',
		'ie/8',
		'android/4.4'
	],
	ci: [
		'chrome/48',
		'chrome/40',
		'firefox/42',
		'firefox/30',
		'ie/13',
		'ie/12',
		'ie/11',
		'ie/10',
		'ie/9',
		'ie/8',
		'ie/7',
		'safari/9',
		'safari/8',
		'android/4.4'
	],
	full: [
		'chrome/48',
		'chrome/46',
		'chrome/42',
		'chrome/40',
		'chrome/35',
		'chrome/30',
		'firefox/44',
		'firefox/42',
		'firefox/41',
		'firefox/33',
		'firefox/30',
		'firefox/20',
		'ie/13',
		'ie/12',
		'ie/11',
		'ie/10',
		'ie/9',
		'ie/8',
		'ie/7',
		'safari/9',
		'safari/8',
		'safari/5.1',
		'android/4.4',
		'android/4.3',
		'android/4.2',
		'android/4.1',
		'ios_saf/9.1',
		'ios_saf/9.2'
	]
};
