/* eslint-env mocha */

'use strict';

const itRespondsWithContentType = require('./helpers/it-responds-with-content-type');
const itRespondsWithHeader = require('./helpers/it-responds-with-header');
const itRespondsWithStatus = require('./helpers/it-responds-with-status');
const setupRequest = require('./helpers/setup-request');

describe('GET /__health', function() {
	setupRequest('GET', '/__health');
	itRespondsWithStatus(200);
	itRespondsWithContentType('application/json');
	itRespondsWithHeader('cache-control', 'no-cache');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});
