/* eslint-env mocha */

'use strict';

const itRespondsWithContentType = require('./helpers/it-responds-with-content-type');
const itRespondsWithHeader = require('./helpers/it-responds-with-header');
const itRespondsWithStatus = require('./helpers/it-responds-with-status');
const setupRequest = require('./helpers/setup-request');

describe('GET /test/test', function() {
	setupRequest('GET', '/test/test');
	itRespondsWithStatus(200);
	itRespondsWithContentType('text/html');
	itRespondsWithHeader('cache-control', 'no-store');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});

describe('GET /test/test/', function () {
	setupRequest('GET', '/test/test/');
	itRespondsWithStatus(200);
	itRespondsWithContentType('text/html');
	itRespondsWithHeader('cache-control', 'no-store');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});

describe('GET /test/tests', function() {
	setupRequest('GET', '/test/tests');
	itRespondsWithStatus(200);
	itRespondsWithContentType('text/html');
	itRespondsWithHeader('cache-control', 'no-store');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});

describe('GET /test/tests/', function() {
	setupRequest('GET', '/test/tests/');
	itRespondsWithStatus(200);
	itRespondsWithContentType('text/html');
	itRespondsWithHeader('cache-control', 'no-store');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});

describe('GET /test/libs/mocha/mocha.css', function() {
	setupRequest('GET', '/test/libs/mocha/mocha.css');
	itRespondsWithStatus(200);
	itRespondsWithContentType('text/css');
	itRespondsWithHeader('cache-control', 'public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});

describe('GET /test/libs/mocha/mocha.js', function () {
	setupRequest('GET', '/test/libs/mocha/mocha.js');
	itRespondsWithStatus(200);
	itRespondsWithContentType('application/javascript');
	itRespondsWithHeader('cache-control', 'public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});

describe('GET /test/libs/proclaim/proclaim.js', function () {
	setupRequest('GET', '/test/libs/proclaim/proclaim.js');
	itRespondsWithStatus(200);
	itRespondsWithContentType('application/javascript');
	itRespondsWithHeader('cache-control', 'public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});

describe('GET /test/director/', function() {
	setupRequest('GET', '/test/director/');
	itRespondsWithStatus(200);
	itRespondsWithContentType('text/html');
	itRespondsWithHeader('cache-control', 'no-store');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});

describe('GET /test/director/', function() {
	setupRequest('GET', '/test/director/');
	itRespondsWithStatus(200);
	itRespondsWithContentType('text/html');
	itRespondsWithHeader('cache-control', 'no-store');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});

describe('GET /test/director/', function() {
	setupRequest('GET', '/test/director/');
	itRespondsWithStatus(200);
	itRespondsWithContentType('text/html');
	itRespondsWithHeader('cache-control', 'no-store');
	itRespondsWithHeader('surrogate-key', 'polyfill-service');
});
