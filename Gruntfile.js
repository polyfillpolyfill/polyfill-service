module.exports = function(grunt) {

	grunt.initConfig({

		// Run the service, which generates its own test pages at /test/runner/, and sauce at the same time, so that sauce can load pages from the service
		"concurrent": {
			ci: {
				tasks: ['nodemon', 'saucelabs-mocha'],
				options: {
					logConcurrentOutput: true
				}
			},
			dev: {
				tasks: ['nodemon', 'mocha'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		"nodemon": {
			dev: {
				script: 'service/index.js',
				options: {
					env: {
						PORT: 3000
					},
					callback: function (nodemon) {
						setTimeout(function() {

							// TODO: How do you run a grunt task programmatically?
							grunt.tasks(['mocha']);
						}, 2500);
					}
				}
			},
			ci: {
				script: 'service/index.js',
				options: {
					env: {
						PORT: 3000
					},
					callback: function (nodemon) {
						setTimeout(function() {
							grunt.run('saucelabs-mocha');
						}, 1000);
					}
				}
			}
		},
		"simplemocha": {
			options: {
				globals: ['should'],
				timeout: 3000,
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
				reporter: 'spec',
				urls: [
					'http://localhost:3000/test/tests/Array.isArray',
					'http://localhost:3000/test/tests/Array.from'
				]
			}
		},
		"saucelabs-mocha": {
			all: {
				options: {

					// Using Sauce over Sauce connect tunnel, so local URLs will work
					urls: 'http://127.0.0.1:3000/test/runner/'
				}
			}
		}
	});


	// Loading dependencies
	grunt.loadNpmTasks('grunt-saucelabs');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask("dev", ["simplemocha", "nodemon:dev"]);
	grunt.registerTask("ci", ["simplemocha", "nodemon:ci"]);
};
