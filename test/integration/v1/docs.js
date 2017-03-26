/* eslint-env mocha */

'use strict';

const itRespondsWithHeader = require('../helpers/it-responds-with-header');
const itRespondsWithStatus = require('../helpers/it-responds-with-status');
const setupRequest = require('../helpers/setup-request');

describe('GET /v1', function() {
	setupRequest('GET', '/v1');
	itRespondsWithStatus(302);
	itRespondsWithHeader('Location', '/v2/docs/');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});
