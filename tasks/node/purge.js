'use strict';

require('dotenv').config({silent: true});

const argv = require('minimist')(process.argv.slice(2));

const DRY_RUN = argv.dryRun;
const PRODUCTION = argv.env === 'prod';

const FASTLY_API_KEY = process.env.FASTLY_API_KEY;

if (!FASTLY_API_KEY) {
	console.error('In order to purge assets from Fastly, you need to have set the environment variable "FASTLY_API_KEY". This can be done by creating a file named ".env" in the root of this repository with the contents "FASTLY_API_KEY=XXXXXX", where XXXXXX is your Fastly API key.');
	process.exit(1);
}

const flatten = require('lodash').flattenDeep;
const qaHostNames = [
	'http://qa.polyfill.io'
];
const productionHostNames = [
	'https://polyfill.io',
	'https://polyfill.webservices.ft.com',
	'https://cdn.polyfill.io'
];
const hostnames = PRODUCTION ? productionHostNames : qaHostNames;
const paths = [
	'/v2/',
	'/v2/assets/css/style.css',
	'/v2/assets/images/fastly-logo.png',
	'/v2/assets/images/logo.svg',
	'/v2/assets/js/ui.js',
	'/v2/docs/',
	'/v2/docs/api',
	'/v2/docs/contributing',
	'/v2/docs/contributing/authoring-polyfills',
	'/v2/docs/contributing/common-scenarios',
	'/v2/docs/contributing/docs/assets/compat.json',
	'/v2/docs/contributing/testing',
	'/v2/docs/examples',
	'/v2/docs/features/',
	'/v2/docs/usage'
];
const endpoints = flatten(paths.map(path => hostnames.map(host => host + path)));

if (!DRY_RUN) {
	console.log();
	const fetch = require('node-fetch');
	Promise.all(endpoints.map(endpoint => {
		return fetch(endpoint, {
			method: 'PURGE',
			headers: {"Fastly-Key": process.env.FASTLY_API_KEY},
			mode: 'no-cors',
			cache: 'default'
		})
		.then(function(res) {
			if (res.ok) {
				console.log(`Purged ${endpoint}`);
			} else if (res.status === 401){
				throw Error('It seems you may not be authorised to purge the resources. Have you set the environment variable "FASTLY_API_KEY"?');
			}
		});
	}))
	.then(() => console.log('\nPurged all endpoints successfully.'))
	.catch((e) => console.error(`Failed to purge endpoints. ${e}`));
} else {
	console.log('\nThis is a dry run. No assets were purged from the cache.\n');
	console.log('If this were not a dry run, these are the assets which would have been purged from the cache:\n');
	endpoints.forEach(endpoint => console.log(endpoint));
}
