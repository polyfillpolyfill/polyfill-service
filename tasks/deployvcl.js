'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function(grunt) {

	grunt.registerTask('deployvcl', 'Push VCL configuration to Fastly', function() {

		const done = this.async();

		const options = this.options({
			vclFilePath: path.join(__dirname, '../fastly-config.vcl'),
			vclName: 'default',
			dryRun: false
		});

		if (!process.env.FASTLY_SERVICE_ID || !process.env.FASTLY_API_KEY) {
			throw new Error ("Fastly credentials required.  Check environment configuration");
		}
		if (!fs.statSync(options.vclFilePath).isFile()) {
			throw new Error ("Missing VCL file.");
		}

		const vclContent = fs.readFileSync(options.vclFilePath, 'UTF-8');

		grunt.log.writeln('Pushing to Fastly');

		const fastly = require('fastly')(process.env.FASTLY_API_KEY, encodeURIComponent(process.env.FASTLY_SERVICE_ID));
		let newVersion;

		let deploy =
			fastly.getServices()
			.then(services => {
				grunt.log.writeln('Loading Fastly service list');
				var service = services.filter(svc => svc.id === process.env.FASTLY_SERVICE_ID);
				if (!service) throw new Error('Service not found.  Check FASTLY_SERVICE_ID matches a valid service on Fastly that is accessible by your FASTLY_API_KEY');
				service = service[0];
				grunt.log.writeln('Cloning active version %s of %s', service.version, service.name);
				return fastly.cloneVersion(service.version).then(res => {
					newVersion = res.number
					grunt.log.writeln("Created version %d", newVersion);
				});
			})

			.then(() => fastly.getVcl(newVersion))
			.then(vclsList => {
				grunt.log.writeln('Deleting existing VCLs');
				return Promise.all(vclsList.map(vcl => fastly.deleteVcl(newVersion, vcl.name)))
			})

			.then(() => {
				grunt.log.writeln('Adding new VCL');
				return fastly.updateVcl(newVersion, {
					"name": options.vclName,
					"content": vclContent
				});
			})

			.then(() => {
				grunt.log.writeln('Setting the VCL as main');
				return fastly.setVclAsMain(newVersion, options.vclName)
			})

			// Validate the VCL
			.then(() => fastly.validateVersion(newVersion))

			// Activate the new version
			.then((res) => {
				if (res.status === 'ok') {
					grunt.log.ok('Version %s looks OK', newVersion);
					return options.dryRun ? null : fastly.activateVersion(newVersion);
				} else {
					grunt.log.error('Version %s looks bad', newVersion);
					grunt.log.writeln(res.msg);  // Report the vcl compile/syntax error
					throw new Error('VCL is invalid: ' + res.msg);
				}
			})

			.then(function(result) {
				if (result) {
					grunt.log.ok('New version %s installed and activated', newVersion);
				} else {
					grunt.log.ok('Dry run complete');
				}
				done();
			})

			.catch(err => grunt.warn(err))
		;

	});
};
