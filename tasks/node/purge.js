'use strict';

require('dotenv').config();

const argv = require('minimist')(process.argv.slice(2));

const PRODUCTION = argv.env === 'prod';

const FASTLY_API_KEY = process.env.FASTLY_API_KEY;

let FASTLY_SERVICE_ID;

if (!FASTLY_API_KEY) {
	console.error('In order to purge assets from Fastly, you need to have set the environment variable "FASTLY_API_KEY". This can be done by creating a file named ".env" in the root of this repository with the contents "FASTLY_API_KEY=XXXXXX", where XXXXXX is your Fastly API key.');
	process.exit(1);
}

if (PRODUCTION && !process.env.FASTLY_SERVICE_ID) {
	console.error('In order to purge assets from the production Fastly service, you need to have set the environment variable "FASTLY_SERVICE_ID". This can be done by creating a file named ".env" in the root of this repository with the contents "FASTLY_SERVICE_ID=XXXXXX", where XXXXXX is your Fastly service ID.');
	process.exit(1);
} else {
	FASTLY_SERVICE_ID = process.env.FASTLY_SERVICE_ID;
}

if (!PRODUCTION && !process.env.FASTLY_SERVICE_ID_QA) {
	console.error('In order to purge assets from the QA Fastly service, you need to have set the environment variable "FASTLY_SERVICE_ID_QA". This can be done by creating a file named ".env" in the root of this repository with the contents "FASTLY_SERVICE_ID_QA=XXXXXX", where XXXXXX is your Fastly service ID.');
	process.exit(1);
} else {
	FASTLY_SERVICE_ID = process.env.FASTLY_SERVICE_ID_QA;
}

const FastlyPurge = require('fastly-purge');

const fastly = new FastlyPurge(FASTLY_API_KEY, {
	softPurge: true
});

const key = 'polyfill-service';

fastly.key(FASTLY_SERVICE_ID, key, {
	apiKey: FASTLY_API_KEY
}, error => {
	if (error) {
		console.error(`Failed to purge endpoints. ${error}`);
		process.exit(1);
	} else {
		console.log(`Purged key: ${key} from ${PRODUCTION ? 'production' : 'qa'} service - ${FASTLY_SERVICE_ID}`);
	}
});
