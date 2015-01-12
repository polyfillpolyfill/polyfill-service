'use strict';

var fs = require('fs');
var path = require('path');
var Promise = require('es6-promise').Promise;
var denodeify = require('denodeify');
var exec = denodeify(require('child_process').exec, function(err, stdout, stderr) { return [err, stdout]; });
var write = denodeify(fs.writeFile);

module.exports = function(grunt) {

	grunt.registerTask('deploy', "Deploy the service to production", function() {

		var done = this.async();
		var options = this.options({
			targetremote: 'heroku'
		});
		var basePath = path.join(__dirname, '..');

		Promise.all([exec('git symbolic-ref -q --short HEAD'), exec('git describe')])
		.then(spread(function(srcbranch, version) {

			if (!/^v\d+\.\d+\.\d+$/.test(version)) {
				throw new Error('Cannot deploy an untagged commit.  First apply a version tag in the format v0.0.0 then run deploy again.');
			}

			var deploybranch = 'deploy-'+srcbranch+'-'+version;

			var deployedversions = require('./installcollections-versions.json')
			deployedversions.push(version);

			return write('./installcollections-versions.json', deployedversions)
			.then(function() {
				exec(
					'git checkout -b '+deploybranch+';' +
					'echo "'+version+'" > .semver;' +
					'git add .semver;' +
					'git commit -m "Deploying '+version+' to '+options.targetremote+'";' +
					'git push '+options.targetremote+' -f '+deploybranch+':master' +
					'git checkout '+srcbranch+';'
				, {cwd: basePath});
			});
		}));

	});
};


// Quick helper for Promise.all to spread results over separate arguments rather than an array
function spread(fn) {
	return function(results) {
		fn.apply(fn, results);
	};
}
