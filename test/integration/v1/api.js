/* eslint-env mocha */

'use strict';

const itRespondsWithHeader = require('../helpers/it-responds-with-header');
const itRespondsWithStatus = require('../helpers/it-responds-with-status');
const setupRequest = require('../helpers/setup-request');

describe('GET /v1/polyfill.js', function() {
	setupRequest('GET', '/v1/polyfill.js');
	itRespondsWithStatus(301);
	itRespondsWithHeader('Location', '/v2/polyfill.js');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});

describe('GET /v1/polyfill.js?features=default&libVersion=1&gated=true', function() {
	setupRequest('GET', '/v1/polyfill.js?features=default&libVersion=1&gated=true');
	itRespondsWithStatus(301);
	itRespondsWithHeader('Location', '/v2/polyfill.js?features=default');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});

describe('GET /v1/polyfill.min.js', function() {
	setupRequest('GET', '/v1/polyfill.min.js');
	itRespondsWithStatus(301);
	itRespondsWithHeader('Location', '/v2/polyfill.min.js');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});

describe('GET /v1/polyfill.min.js?features=default&libVersion=1&gated=true', function() {
	setupRequest('GET', '/v1/polyfill.min.js?features=default&libVersion=1&gated=true');
	itRespondsWithStatus(301);
	itRespondsWithHeader('Location', '/v2/polyfill.min.js?features=default');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});
