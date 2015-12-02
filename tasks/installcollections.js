
'use strict';

var path = require('path');
var denodeify = require('denodeify');
var mkdir = denodeify(require('mkdirp'));
var exec = denodeify(require('child_process').exec, function(err, stdout, stderr) { return [err, stdout]; });

// The ability to switch to a previous version of the libary is now deprecated.
// Versions that were previously exposed in this manner are still supported by the v1 API
var versions = ['v0.0.1', 'v1.0.0', 'v1.0.2', 'v1.1.0', 'v1.2.0', 'v1.3.0', 'v1.4.0', 'v1.5.0'];
var repourl = 'git://github.com/financial-times/polyfill-service';


module.exports = function(grunt) {

	grunt.registerTask('installcollections', 'Install previous versions of the polyfill collection', function() {

		var done = this.async();

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
			return versions.reduce(function(asYouWere, version) {
				var dest = path.join(versionsdir, version);
				return asYouWere
					.then(function() {
						return execCmd('git checkout ' + version, repodir);
					})
					.then(function() {
						grunt.file.recurse(path.join(repodir, 'polyfills/'), function (abspath, rootdir, subdir, filename) {
							if (subdir) {
								grunt.file.copy(abspath, path.join(dest, subdir, filename));
							}
						});
					});
			}, Promise.resolve(1));
		})
		.then(done)
		.catch(grunt.warn);
	});
};
