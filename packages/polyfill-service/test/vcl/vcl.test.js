/* eslint-env mocha */

'use strict';
const request = require('request-promise');
const proclaim = require('proclaim');
const isProduction = process.env.NODE_ENV === 'production';

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
	});

	it('returns a permanent redirect', () => {
		return req.then(response => {
			proclaim.equal(response.statusCode, 301);
		});
	});

	it('redirects to https://polyfill.io', () => {
		return req.then(response => {
			proclaim.isTrue(response.headers['location'].startsWith('https://polyfill.io'));
		});
	});
});

describe('Fastly purging', () => {
	let req;

	beforeEach(() => {
		req = request({
			method: 'PURGE',
			url: 'https://polyfill.io',
			resolveWithFullResponse: true,
			followRedirect: false
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
			proclaim.equal(error.response.headers.location, 'https://qa.polyfill.io/');
		});
	});
});

describe('/v2/recordRumData with Normalized-User-Agent set', () => {
	let req;

	beforeEach(() => {
		req = request({
			url: isProduction ? 'https://polyfill.io/v2/recordRumData?ua=chrome/60.0.0' : 'https://qa.polyfill.io/v2/recordRumData?ua=chrome/60.0.0',
			followRedirect: false,
			resolveWithFullResponse: true,
			headers: {
				'Normalized-User-Agent': 'chrome%2F60.0.0'
  		}
		});
	});

	it('returns an http status-code of 204', () => {
		return req.then(response => {
			proclaim.equal(response.statusCode, 204);
		});
	});
});

describe('/v2/polyfill.js with ua query-string set', () => {
	let requestConfig;

	beforeEach(() => {
		requestConfig = {
			url: isProduction ? 'https://polyfill.io/v2/polyfill.js?ua=chrome/60.0.0' : 'https://qa.polyfill.io/v2/polyfill.js?ua=chrome/60.0.0',
			followRedirect: false,
			resolveWithFullResponse: true,
			headers: {}
		};
	});

	it('returns an http status-code of 200', () => {
		return request(requestConfig).then(response => {
			proclaim.equal(response.statusCode, 200);
		});
	});

	it('returns an http vary header containg accept-encoding', () => {
		return request(requestConfig).then(response => {
			proclaim.equal(response.headers['vary'], 'Accept-Encoding');
		});
	});

	it('returns gzipped content if user-agent accepts it', () => {
		requestConfig.headers['Accept-Encoding'] = 'gzip';
		return request(requestConfig).then(response => {
			proclaim.equal(response.headers['content-encoding'], 'gzip');
		});
	});

	it('returns brotli-fied content if user-agent accepts it', () => {
		requestConfig.headers['Accept-Encoding'] = 'br';
		return request(requestConfig).then(response => {
			proclaim.equal(response.headers['content-encoding'], 'br');
		});
	});

	it('returns a response with Age set to 0', () => {
		return request(requestConfig).then(response => {
			proclaim.equal(response.headers['age'], '0');
		});
	});

});

describe('/v2/polyfill.js without ua query-string set', () => {
	let requestConfig;

	beforeEach(() => {
		requestConfig = {
			url: isProduction ? 'https://polyfill.io/v2/polyfill.js' : 'https://qa.polyfill.io/v2/polyfill.js',
			followRedirect: false,
			resolveWithFullResponse: true,
			headers: {
				'User-Agent': 'chrome/60.0.0'
			}
		};
	});

	it('returns an http status-code of 200', () => {
		return request(requestConfig).then(response => {
			proclaim.equal(response.statusCode, 200);
		});
	});

	it('returns an http vary header containg accept-encoding', () => {
		return request(requestConfig).then(response => {
			proclaim.isTrue(response.headers['vary'].includes('Accept-Encoding'));
		});
	});

	it('returns an http vary header containg user-agent', () => {
		return request(requestConfig).then(response => {
			proclaim.isTrue(response.headers['vary'].includes('User-Agent'));
		});
	});

	it('returns gzipped content if user-agent accepts it', () => {
		requestConfig.headers['Accept-Encoding'] = 'gzip';
		return request(requestConfig).then(response => {
			proclaim.equal(response.headers['content-encoding'], 'gzip');
		});
	});

	it('returns brotli-fied content if user-agent accepts it', () => {
		requestConfig.headers['Accept-Encoding'] = 'br';
		return request(requestConfig).then(response => {
			proclaim.equal(response.headers['content-encoding'], 'br');
		});
	});

	it('returns a response with Age set to 0', () => {
		return request(requestConfig).then(response => {
			proclaim.equal(response.headers['age'], '0');
		});
	});
});

describe('requests with rum query-string set', () => {
	let req;

	beforeEach(() => {
		req = request({
			url: isProduction ? 'https://polyfill.io/v2/docs/?rum=1' : 'https://qa.polyfill.io/v2/docs/?rum=1',
			resolveWithFullResponse: true,
			headers: {
				'User-Agent': 'chrome/60.0.0'
			}
		});
	});

	it('returns a cookie specifying the data-center which served the request', () => {
		return req.then(response => {
			proclaim.match(String(response.headers['set-cookie']), /FastlyDC=\S+;/);
		});
	});

	it('returns a cookie which is http-only', () => {
		return req.then(response => {
			proclaim.isTrue(String(response.headers['set-cookie']).split(' ').includes('HttpOnly;'));
		});
	});

	it('returns a cookie which is valid for 60 seconds', () => {
		return req.then(response => {
			proclaim.isTrue(String(response.headers['set-cookie']).split(' ').includes('max-age=60'));
		});
	});

	it('returns a cookie which is on path /', () => {
		return req.then(response => {
			proclaim.isTrue(String(response.headers['set-cookie']).split(' ').includes('Path=/;'));
		});
	});

	it('returns a response with Age set to 0', () => {
		return req.then(response => {
			proclaim.equal(response.headers['age'], '0');
		});
	});
});

describe('setting backend to production via override', () => {
	let requestConfig;

	beforeEach(() => {
		requestConfig = {
			url: isProduction ? 'https://polyfill.io/v2/polyfill.js?ua=chrome/60' : 'https://qa.polyfill.io/v2/polyfill.js?ua=chrome/60',
			resolveWithFullResponse: true,
			headers: {
				'X-Origin-Env': 'prod',
				'Fastly-Debug': 'true'
			}
		};
	});

	it('returns an http status-code of 200', () => {
		return request(requestConfig).then(response => {
			proclaim.equal(response.statusCode, 200);
		});
	});

	it('returns http header debug-x-backend with correct backend', () => {
		return request(requestConfig).then(response => {
			const backend = response.headers['debug-x-backend'];
			proclaim.isTrue(backend === 'eu_prod' || backend === 'us_prod');
		});
	});

	it('returns http header debug-host with correct backend', () => {
		return request(requestConfig).then(response => {
			const backend = response.headers['debug-host'];
			proclaim.isTrue(backend === 'ft-polyfill-service.herokuapp.com' || backend === 'ft-polyfill-service-us.herokuapp.com');
		});
	});
});

describe('setting backend to qa via override', () => {
	let requestConfig;

	beforeEach(() => {
		requestConfig = {
			url: isProduction ? 'https://polyfill.io/v2/polyfill.js?ua=chrome/60' : 'https://qa.polyfill.io/v2/polyfill.js?ua=chrome/60',
			resolveWithFullResponse: true,
			headers: {
				'X-Origin-Env': 'qa',
				'Fastly-Debug': 'true'
			}
		};
	});

	it('returns an http status-code of 200', () => {
		return request(requestConfig).then(response => {
			proclaim.equal(response.statusCode, 200);
		});
	});

	it('returns http header debug-x-backend with correct backend', () => {
		return request(requestConfig).then(response => {
			const backend = response.headers['debug-x-backend'];
			proclaim.isTrue(backend === 'eu_qa' || backend === 'us_qa');
		});
	});

	it('returns http header debug-host with correct backend', () => {
		return request(requestConfig).then(response => {
			const backend = response.headers['debug-host'];
			proclaim.isTrue(backend === 'ft-polyfill-service-qa.herokuapp.com' || backend === 'ft-polyfill-service-us-qa.herokuapp.com');
		});
	});
});
