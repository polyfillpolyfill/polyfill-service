"use strict";

const fs = require("fs-extra");
const path = require("path");
const outputPath = path.join(__dirname, "../fastly/terraform/variables.json");
const env = require("./env")();
const stack = fs.readJsonSync(path.join(__dirname, "./stack.json"));

function recursivelyUpdateBackends(backends) {
	if (backends.length < 2) {
		backends[0].backends = [];
		return backends;
	}

	return backends.map((backend, index) => {
		backend = Object.assign({}, backend);
		backend.backends = recursivelyUpdateBackends(
			backends.reduce((backends, next) => {
				if (next.address === backend.address) {
					return backends;
				}
				backends.unshift(
					Object.assign({}, next, {
						number: backends.length + 1
					})
				);

				return backends;
			}, [])
		);

		backend.number = backends.length - index;
		return Object.assign({}, backend);
	});
}

function generateOutput(currentVariables, data) {
	const newVariables = Object.assign(
		{
			backends: []
		},
		currentVariables
	);
	const [, domain, region, stage] = /^https?:\/\/([a-zA-Z0-9]+\.[a-zA-Z0-9\-]+\.([a-zA-Z0-9\-]+).*?)\/(.*)/.exec(data.ServiceEndpoint);
	const ssl_cert_hostname = domain.replace(/^[^.]*(.*)/, "*$1");
	const ssl_sni_hostname = domain;

	newVariables.backends.unshift({
		address: domain,
		ssl_cert_hostname: ssl_cert_hostname,
		ssl_sni_hostname: ssl_sni_hostname,
		// We use the region in Fastly as part of the backend identifier.
		// Fastly allows only [0 - 9a - zA - Z_] in the identifier.
		region: region.replace(/([^0-9a-zA-Z_])/g, "_"),
		number: newVariables.backends.length + 1
	});

	newVariables.backends = recursivelyUpdateBackends(newVariables.backends);

	newVariables.prepended_path = stage;
	newVariables.polyfill_library_latest_version = require("polyfill-library/package.json").version;
	newVariables.AWS_WEBSITE_BUCKET = data.AWS_WEBSITE_BUCKET;
	newVariables.AWS_BUNDLE_BUCKET = data.AWS_BUNDLE_BUCKET;
	newVariables.AWS_ACCESS_KEY_ID = env.AWS_ACCESS_KEY_ID;
	newVariables.AWS_SECRET_ACCESS_KEY = env.AWS_SECRET_ACCESS_KEY;
	newVariables.is_test_environment = stage !== "prod";
	return newVariables;
}

const currentVariables = fs.existsSync(outputPath) ? fs.readJsonSync(outputPath, "utf8") : {};

const outputData = {
	AWS_BUNDLE_BUCKET: stack.S3BundlesBucket,
	AWS_WEBSITE_BUCKET: stack.WebsiteBucket,
	ServiceEndpoint: stack.ServiceEndpoint
};

fs.outputJsonSync(outputPath, generateOutput(currentVariables, outputData));
