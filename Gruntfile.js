'use strict';

require('dotenv').config({silent: true});
const path = require('path');
const process = require('process');
const serviceHost = 'http://127.0.0.1:' + (process.env.PORT || 3000);

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
			debug: {
				options: {
					urls: { all: serviceHost + '/test/director?mode=all' },
					browsers: browsers.quick,
					concurrency: 3
				}
			},
			compat: {
				options: {
					urls: {
						all: serviceHost + '/test/director?mode=all',
						control: serviceHost + '/test/director?mode=control'
					},
					browsers: browsers.full,
					continueOnFail: true
				}
			},
			ci: {
				options: {
					urls: {
						targeted: serviceHost + '/test/director?mode=targeted'
					},
					browsers: browsers.ci
				}
			},
			quick: {
				options: {
					urls: {
						targeted: serviceHost + '/test/director?mode=targeted'
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
		"shell": {
			"deployrumlambda": {
				command: env => {

					if (env !== 'prod') env = 'qa';
					const qasuffix = (env !== 'prod') ? '_QA' : '';
					const cmd = `AWS_ACCESS_KEY_ID=${process.env['RUM_AWS_ACCESS_KEY'+qasuffix]} AWS_SECRET_ACCESS_KEY=${process.env['RUM_AWS_SECRET_KEY'+qasuffix]} apex deploy -C ./tasks/lambda --env ${env} --set RUM_MYSQL_DSN=${process.env['RUM_MYSQL_DSN'+qasuffix]}`;

					console.log('Deploying Lambda functions.  Environment:', env);
					return cmd;
				}
			}
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
		require('./tasks/grunt/buildsources')(grunt);
		require('./tasks/grunt/updatelibrary')(grunt);
		grunt.loadNpmTasks('grunt-contrib-clean');
	} else {
		grunt.loadTasks('tasks/grunt');
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-simple-mocha');
		grunt.loadNpmTasks('grunt-shell');
		grunt.loadNpmTasks('grunt-eslint');
	}

	grunt.registerTask("test", [
		"build",
		"simplemocha",
		"service",
		"saucelabs:quick",
		"service:polyfillservice:stop"
	]);

	grunt.registerTask("debugsauce", [
		"service",
		"saucelabs:debug",
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
		"eslint",
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
		'chrome/54',
		'firefox/49',
		'ie/14',
		'ie/11',
		'ie/8',
		'android/4.4'
	],
	ci: [
		'chrome/54',
		'chrome/48',
		'firefox/49',
		'firefox/44',
		'ie/14',
		'ie/13',
		'ie/11',
		'ie/10',
		'ie/9',
		'ie/8',
		'ie/7',
		'safari/9',
		'safari/8',
		'android/5.1',
		'android/4.4'
	],
	full: [
		'chrome/54',
		'chrome/48',
		'chrome/46',
		'chrome/42',
		'chrome/40',
		'chrome/35',
		'firefox/49',
		'firefox/44',
		'firefox/42',
		'firefox/41',
		'firefox/33',
		'firefox/30',
		'ie/14',
		'ie/13',
		'ie/11',
		'ie/10',
		'ie/9',
		'ie/8',
		'ie/7',
		'safari/9',
		'safari/8',
		'safari/5.1',
		'android/5.1',
		'android/4.4',
		'android/4.3',
		'android/4.2',
		'ios_saf/9.1',
		'ios_saf/9.2'
	]
};
