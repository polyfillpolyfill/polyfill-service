
'use strict';

var fs = require('fs');
var path = require('path');
var denodeify = require('denodeify');
var mkdir = denodeify(require('mkdirp'));
var exec = denodeify(require('child_process').exec, function(err, stdout, stderr) { return [err, stdout]; });

var repourl = 'git://github.com/financial-times/polyfill-service';

module.exports = function(grunt) {

	grunt.registerTask('installcollections', 'Install previous versions of the polyfill collection', function() {

		var done = this.async();

		var versions = [];
		var basedir = path.join(__dirname, '..');
		var repodir = path.join(__dirname, '../polyfills/__repo');
		var versionsdir = path.join(__dirname, '../polyfills/__versions');

		function execCmd(cmd, cwd) {
			cwd = cwd || basedir;
			return exec(cmd, {cwd:cwd}).then(function(stdout) {
				console.log('> '+cmd);
				if (stdout) console.log(stdout);
				return stdout.replace(/\s+$/, '').replace(/^\s+/, '');
			});
		}

		return Promise.all([
			mkdir(repodir), mkdir(versionsdir)
		])
		.then(function() {
			grunt.log.writeln('Cloning polyfill service source from '+repourl);
			return execCmd('git clone '+ repourl +' '+ repodir);
		})
		.then(function() {
			return execCmd('git tag', basedir).then(function(stdout) {
				versions = stdout.split('\n').filter(function(item) {
					return /^v\d+\.\d+\.\d+$/.test(item);
				})
			})
		})
		.then(execCmd.bind(this, 'git describe --tags', basedir))
		.then(function(currentTag) {
			return versions.reduce(function(asYouWere, version) {
				var dest = path.join(versionsdir, version);
				if (version !== currentTag) {
					return asYouWere
					.then(function() {
						return execCmd('git checkout ' + version, repodir);
					})
					.then(function() {
						return mkdir(dest);
					})
					.then(function() {
						return execCmd('cp -r ' + path.join(repodir, 'polyfills/*') + ' ' + dest);
					});
				} else {

					// If the version is the same as a tag that describes HEAD, just create a symlink
					return asYouWere
					.then(execCmd.bind(this, 'ln -s '+path.join(__dirname, '../polyfills')+' '+version, versionsdir));
				}
			}, Promise.resolve(1));
		})
		.then(execCmd.bind(this, 'rm -rf '+repodir, basedir))
		.then(done)
		.catch(grunt.warn);

	});
};
