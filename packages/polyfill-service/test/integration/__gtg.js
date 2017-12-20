/* eslint-env mocha */

'use strict';

const assert = require('proclaim');
const itRespondsWithContentType = require('./helpers/it-responds-with-content-type');
const itRespondsWithHeader = require('./helpers/it-responds-with-header');
const itRespondsWithStatus = require('./helpers/it-responds-with-status');
const setupRequest = require('./helpers/setup-request');

describe('GET /__gtg', function() {
	setupRequest('GET', '/__gtg');
	itRespondsWithStatus(200);
	itRespondsWithContentType('text/plain');
	itRespondsWithHeader('cache-control', 'no-cache');

	it('responds with OK', function() {
		return this.request.expect(response => {
			assert.isString(response.text);
			assert.equal(response.text, "OK");
		});
	});
});
