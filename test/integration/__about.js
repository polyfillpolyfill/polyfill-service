/* eslint-env mocha */

'use strict';

const itRespondsWithContentType = require('./helpers/it-responds-with-content-type');
const itRespondsWithHeader = require('./helpers/it-responds-with-header');
const itRespondsWithStatus = require('./helpers/it-responds-with-status');
const setupRequest = require('./helpers/setup-request');

describe('GET /__about', function() {
	setupRequest('GET', '/__about');
	itRespondsWithStatus(200);
	itRespondsWithContentType('application/json');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});
