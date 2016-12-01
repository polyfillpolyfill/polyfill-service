'use strict';

require('dotenv').config({silent: true});
const process = require('process');

module.exports = function(grunt) {

	grunt.initConfig({
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