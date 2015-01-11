
'use strict';

var fs = require('fs');
var path = require('path');
var Promise = require('es6-promise').Promise;
var denodeify = require('denodeify');
var copy = denodeify(require('ncp').ncp);
var mkdir = denodeify(require('mkdirp'));
var exec = denodeify(require('child_process').exec, function(err, stdout, stderr) { return [err, stdout]; });

var repourl = 'git://github.com/financial-times/polyfill-service';

module.exports = function(grunt) {

	grunt.registerTask('installcollections', 'Install previous versions of the polyfill collection', function() {

		var done = this.async();

		var versions = require('./installcollections-versions.json');
		var repodir = path.join(__dirname, '../polyfills/__repo');
		var versionsdir = path.join(__dirname, '../polyfills/__versions');

		return Promise.all([
			mkdir(repodir), mkdir(versionsdir)
		])
		.then(function() {
			grunt.log.writeln('Cloning polyfill service source from '+repourl);
			return exec('git clone '+ repourl +' '+ repodir);
		})
		.then(versions.reduce.bind(versions, function(asYouWere, version) {
			var dest = path.join(versionsdir, version);
			return asYouWere
			.then(function() {
				grunt.log.writeln('Installing version '+version);
				return exec('git checkout ' + version, {cwd: repodir});
			})
			.then(function() {
				return mkdir(dest);
			})
			.then(function() {
				return copy(path.join(repodir, 'polyfills'), dest);
			})
			.catch(grunt.warn);
		}, Promise.resolve(1)))
		.then(exec.bind(this, 'rm -rf '+repodir))
		.then(done)
		.catch(grunt.warn);

	});
};
