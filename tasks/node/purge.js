'use strict';

require('dotenv').config();

const PRODUCTION = process.env.NODE_ENV === 'production';

const FASTLY_API_KEY = process.env.FASTLY_API_KEY;
const SURROGATE_KEY = process.env.SURROGATE_KEY;

if (!SURROGATE_KEY) {
	console.error('In order to purge assets from Fastly, you need to have set the environment variable "SURROGATE_KEY". This can be done by creating a file named ".env" in the root of this repository with the contents "SURROGATE_KEY=XXXXXX", where XXXXXX is the surrogate-key used in your polyfill-service application.');
	process.exit(1);
}

let FASTLY_SERVICE_ID;

if (!FASTLY_API_KEY) {
	console.error('In order to purge assets from Fastly, you need to have set the environment variable "FASTLY_API_KEY". This can be done by creating a file named ".env" in the root of this repository with the contents "FASTLY_API_KEY=XXXXXX", where XXXXXX is your Fastly API key.');
	process.exit(1);
}

if (PRODUCTION) {
	if (process.env.FASTLY_SERVICE_ID) {
		FASTLY_SERVICE_ID = process.env.FASTLY_SERVICE_ID;
	} else {
		console.error('In order to purge assets from the production Fastly service, you need to have set the environment variable "FASTLY_SERVICE_ID". This can be done by creating a file named ".env" in the root of this repository with the contents "FASTLY_SERVICE_ID=XXXXXX", where XXXXXX is your Fastly service ID.');
		process.exit(1);
	}
} else {
	if (process.env.FASTLY_SERVICE_ID_QA) {
		FASTLY_SERVICE_ID = process.env.FASTLY_SERVICE_ID_QA;
	} else {
		console.error('In order to purge assets from the QA Fastly service, you need to have set the environment variable "FASTLY_SERVICE_ID_QA". This can be done by creating a file named ".env" in the root of this repository with the contents "FASTLY_SERVICE_ID_QA=XXXXXX", where XXXXXX is your Fastly service ID.');
		process.exit(1);
	}
}

const FastlyPurge = require('fastly-purge');

const fastly = new FastlyPurge(FASTLY_API_KEY, {
	softPurge: true
});


fastly.key(FASTLY_SERVICE_ID, SURROGATE_KEY, {
	apiKey: FASTLY_API_KEY
}, error => {
	if (error) {
		console.error(`Failed to purge endpoints. ${error}`);
		process.exit(1);
	} else {
		console.log(`Purged key: ${SURROGATE_KEY} from ${PRODUCTION ? 'production' : 'qa'} service - https://manage.fastly.com/dashboard/services/${FASTLY_SERVICE_ID}/datacenters/all`);
	}
});
