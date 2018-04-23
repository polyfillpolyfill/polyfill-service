/* eslint-env mocha */

'use strict';

const itRespondsWithStatus = require('./helpers/it-responds-with-status');
const itRespondsWithHeader = require('./helpers/it-responds-with-header');
const setupRequest = require('./helpers/setup-request');

describe('GET /', function() {
	setupRequest('GET', '/');
	itRespondsWithStatus(302);
	itRespondsWithHeader('Location', '/v2/docs/');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});
