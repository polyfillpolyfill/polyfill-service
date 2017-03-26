/* eslint-env mocha */

'use strict';

const assert = require('proclaim');
const setupRequest = require('../helpers/setup-request');

const vm = require('vm');

describe('GET /v2/polyfill.min.js?features=default,Intl.~locale.fr,Intl.~locale.en,Intl.~locale.es', function() {
	setupRequest('GET', '/v2/polyfill.min.js?features=default,Intl.~locale.fr,Intl.~locale.en,Intl.~locale.es');

	it('responds with valid javascript', function() {
		return this.request.expect(response => {
			assert.isString(response.text);
			assert.doesNotThrow(() => new vm.Script(response.text));
		});
	});
});

describe('GET /v2/polyfill.min.js?features=es5,Intl.~locale.en-AU&flags=always,gated', function() {
	setupRequest('GET', '/v2/polyfill.min.js?features=es5,Intl.~locale.en-AU&flags=always,gated');

	it('responds with valid javascript', function() {
		return this.request.expect(response => {
			assert.isString(response.text);
			assert.doesNotThrow(() => new vm.Script(response.text));
		});
	});
});

describe('GET /v2/polyfill.min.js?features=Intl.~locale.en,Intl.~locale.de,Intl.~locale.sv,fetch,Object.assign,Promise', function() {
	setupRequest('GET', '/v2/polyfill.min.js?features=Intl.~locale.en,Intl.~locale.de,Intl.~locale.sv,fetch,Object.assign,Promise');

	it('responds with valid javascript', function() {
		return this.request.expect(response => {
			assert.isString(response.text);
			assert.doesNotThrow(() => new vm.Script(response.text));
		});
	});
});

describe('GET /v2/polyfill.min.js?features=Intl.~locale.en&unknown=polyfill', function() {
	setupRequest('GET', '/v2/polyfill.min.js?features=Intl.~locale.en&unknown=polyfill');

	it('responds with valid javascript', function() {
		return this.request.expect(response => {
			assert.isString(response.text);
			assert.doesNotThrow(() => new vm.Script(response.text));
		});
	});
});
