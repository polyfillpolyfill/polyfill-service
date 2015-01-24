'use strict';

var fs = require('fs');
var path = require('path');
var denodeify = require('denodeify');
var exec = denodeify(require('child_process').exec, function(err, stdout, stderr) { return [err, stdout]; });
var write = denodeify(fs.writeFile);


module.exports = function(grunt) {

	grunt.registerTask('shipit', "Save current file tree as a build branch and push to production", function() {

		var done = this.async();
		var options = this.options({
			targetremote: 'herokuqa'
		});
		var basePath = path.join(__dirname, '..');

		function execCmd(cmd) {
			return exec(cmd, {cwd:basePath}).then(function(stdout) {
				console.log('> '+cmd);
				if (stdout) console.log(stdout);
				return stdout.replace(/\s+$/, '').replace(/^\s+/, '');
			});
		}

		Promise.all([execCmd('git symbolic-ref -q --short HEAD'), execCmd('git describe --tags')])
		.then(function(stdout) {
			var srcbranch, version;

			srcbranch = stdout[0];
			version = stdout[1];

			if (!/^v\d+\.\d+\.\d+$/.test(version)) {
				throw Error('Cannot deploy an untagged commit.  First apply a version tag in the format v0.0.0 then run deploy again.  Current HEAD is described as '+version);
			}

			var deploybranch = 'deploy-'+srcbranch+'-'+version;

			var cmds = [
				'git checkout -b '+deploybranch,
				'echo "'+version+'" > .semver',
				'git add --all',
				'git commit --message="Build for deploy of '+version+' to '+options.targetremote+'"',
				'git push '+options.targetremote+' -f '+deploybranch+':master',
				'git checkout '+srcbranch
			];

			return cmds.reduce(function(asYouWere, cmd) {
				return asYouWere.then(execCmd.bind(this, cmd));
			}, Promise.resolve(1))

			.then(done);
		})
		.catch(grunt.warn);
	});
};
