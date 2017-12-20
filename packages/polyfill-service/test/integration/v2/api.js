/* eslint-env mocha */

'use strict';

const assert = require('proclaim');
const itRespondsWithContentType = require('../helpers/it-responds-with-content-type');
const itRespondsWithHeader = require('../helpers/it-responds-with-header');
const itRespondsWithStatus = require('../helpers/it-responds-with-status');
const setupRequest = require('../helpers/setup-request');

const vm = require('vm');

describe('GET /v2/polyfill.js', function() {
	setupRequest('GET', '/v2/polyfill.js');
	itRespondsWithStatus(200);
	itRespondsWithContentType('application/javascript');
	itRespondsWithHeader('cache-control', 'public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');

	it('responds with valid javascript', function() {
		return this.request.expect(response => {
			assert.isString(response.text);
			assert.doesNotThrow(() => new vm.Script(response.text));
			assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
		});
	});
});

describe('GET /v2/polyfill.js?callback=AAA&callback=BBB', function() {
	setupRequest('GET', '/v2/polyfill.js?callback=AAA&callback=BBB');
	itRespondsWithStatus(200);
	itRespondsWithContentType('application/javascript');
	itRespondsWithHeader('cache-control', 'public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');

	it('responds with valid javascript', function() {
		return this.request.expect(response => {
			assert.isString(response.text);
			assert.doesNotThrow(() => new vm.Script(response.text));
			assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
		});
	});
});

describe('GET /v2/polyfill.min.js', function() {
	setupRequest('GET', '/v2/polyfill.min.js');
	itRespondsWithStatus(200);
	itRespondsWithContentType('application/javascript');
	itRespondsWithHeader('cache-control', 'public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');

	it('responds with valid javascript', function() {
		return this.request.expect(response => {
			assert.isString(response.text);
			assert.doesNotThrow(() => new vm.Script(response.text));
			assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
		});
	});
});



describe('GET /v2/polyfill.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1', function() {
	setupRequest('GET', '/v2/polyfill.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1');
	itRespondsWithStatus(200);
	itRespondsWithContentType('application/javascript');
	itRespondsWithHeader('cache-control', 'public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');

	it('responds with valid javascript', function() {
		return this.request.expect(response => {
			assert.isString(response.text);
			// vm.Script will cause the event loop to become blocked whilst it parses the large response
			assert.doesNotThrow(() => new vm.Script(response.text));
			assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
		});
	});
});

describe('GET /v2/polyfill.min.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1', function() {
	setupRequest('GET', '/v2/polyfill.min.js?features=all&ua=non-existent-ua&unknown=polyfill&flags=gated&rum=1');
	itRespondsWithStatus(200);
	itRespondsWithContentType('application/javascript');
	itRespondsWithHeader('cache-control', 'public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');

	it('responds with valid javascript', function() {
		return this.request.expect(response => {
			assert.isString(response.text);
			// vm.Script will cause the event loop to become blocked whilst it parses the large response
			assert.doesNotThrow(() => new vm.Script(response.text));
			assert.notMatch(response.text, /\/\/#\ssourceMappingURL(.+)/);
		});
	});
});
