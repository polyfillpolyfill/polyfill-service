/* eslint-env mocha */

'use strict';

const itRespondsWithContentType = require('./helpers/it-responds-with-content-type');
const itRespondsWithStatus = require('./helpers/it-responds-with-status');
const setupRequest = require('./helpers/setup-request');

describe('GET /404', function() {
	setupRequest('GET', '/404');
	itRespondsWithStatus(404);
	itRespondsWithContentType('text/html');
});
