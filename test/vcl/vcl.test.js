/* eslint-env mocha */

'use strict';
const request = require('request-promise');
const proclaim = require('proclaim');
const isProduction = process.env.NODE_ENV === 'production';

const backends = {
	'us-prod': 'ft-polyfill-service-us.herokuapp.com',
	'us-qa': 'ft-polyfill-service-us-qa.herokuapp.com',
	'eu-prod': 'ft-polyfill-service.herokuapp.com',
	'eu-qa': 'ft-polyfill-service-qa.herokuapp.com'
};

describe('debug headers', function () {
	let req;

	beforeEach(() => {
		req = request({
			url: isProduction ? 'https://polyfill.io' : 'https://qa.polyfill.io',
			headers: {
				'fastly-debug': true
			},
			resolveWithFullResponse: true
		});
	});

	it('returns an debug-host header', () => {
		return req.then(response => {
			proclaim.ok(response.headers['debug-host']);
		});
	});

	it('returns an debug-x-original-host header', () => {
		return req.then(response => {
			proclaim.ok(response.headers['debug-x-original-host']);
		});
	});

	it('returns an debug-x-backend header', () => {
		return req.then(response => {
			proclaim.ok(response.headers['debug-x-backend']);
		});
	});
});

describe.skip('Canonicalise', function () {
	let req;

	beforeEach(() => {
		req = request({
			url: 'https://polyfills.io',
			resolveWithFullResponse: true
		});
	})

	it('returns a permanent redirect', () => {
		return req.then(response => {
			proclaim.equal(response.statusCode, 301);
		});
	});

	it('redirects to https://polyfill.io', () => {
		return req.then(response => {
			proclaim.isTrue(response.headers['location'].startsWoth('https://polyfill.io'));
		});
	});
});

describe('Fastly purging', () => {
	let req;

	beforeEach(() => {
		req = request({
			method: 'PURGE',
			url: 'https://polyfill.io',
			resolveWithFullResponse: true
		});
	});

	it('fails when api key header not set', () => {
		return req.then(() => {
			throw new Error('Expected promise to reject but it resolved.');
		}, () => {
			return Promise.resolve();
		});
	});
});

describe('Force TLS', () => {
	let req;

	beforeEach(() => {
		req = request({
			url: isProduction ? 'http://polyfill.io' : 'http://qa.polyfill.io',
			followRedirect: false,
			resolveWithFullResponse: true
		});
	});

	it('redirects to https', () => {
		return req.then(() => {
			throw new Error('Expected promise to reject but it resolved.');
		}, (error) => {
			proclaim.equal(error.statusCode, 301);
			proclaim.equal(error.response.headers.location, 'https://polyfill.io/');
		});
	});
});
