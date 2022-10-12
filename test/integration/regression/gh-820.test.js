/* eslint-env mocha */

"use strict";

const request = require("supertest");
const assert = require("proclaim");
const vm = require("node:vm");
const host = require("../helpers").host;

describe("GET /v2/polyfill.min.js?features=default,Intl.~locale.fr,Intl.~locale.en,Intl.~locale.es", function() {
	context('compute-at-edge service', function() {
		it("responds with valid javascript", function() {
			this.timeout(30000);
			return request(host)
				.get("/v2/polyfill.min.js?features=default,Intl.~locale.fr,Intl.~locale.en,Intl.~locale.es&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.isString(response.text);
					assert.doesNotThrow(() => new vm.Script(response.text));
				});
		});
	});

	context('vcl service', function() {
		it("responds with valid javascript", function() {
			this.timeout(30000);
			return request(host)
				.get("/v2/polyfill.min.js?features=default,Intl.~locale.fr,Intl.~locale.en,Intl.~locale.es&use-compute-at-edge-backend=no")
				.then(response => {
					assert.isString(response.text);
					assert.doesNotThrow(() => new vm.Script(response.text));
				});
		});
	});
});

describe("GET /v2/polyfill.min.js?features=es5,Intl.~locale.en-AU&flags=always,gated", function() {
	context('compute-at-edge service', function() {
		it("responds with valid javascript", function() {
			this.timeout(30000);
			return request(host)
				.get("/v2/polyfill.min.js?features=es5,Intl.~locale.en-AU&flags=always,gated&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.isString(response.text);
					assert.doesNotThrow(() => new vm.Script(response.text));
				});
		});
	});

	context('vcl service', function() {
		it("responds with valid javascript", function() {
			this.timeout(30000);
			return request(host)
				.get("/v2/polyfill.min.js?features=es5,Intl.~locale.en-AU&flags=always,gated&use-compute-at-edge-backend=no")
				.then(response => {
					assert.isString(response.text);
					assert.doesNotThrow(() => new vm.Script(response.text));
				});
		});
	});
});

describe("GET /v2/polyfill.min.js?features=Intl.~locale.en,Intl.~locale.de,Intl.~locale.sv,fetch,Object.assign,Promise", function() {
	context('compute-at-edge service', function() {
		it("responds with valid javascript", function() {
			this.timeout(30000);
			return request(host)
				.get("/v2/polyfill.min.js?features=Intl.~locale.en,Intl.~locale.de,Intl.~locale.sv,fetch,Object.assign,Promise&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.isString(response.text);
					assert.doesNotThrow(() => new vm.Script(response.text));
				});
		});
	});

	context('vcl service', function() {
		it("responds with valid javascript", function() {
			this.timeout(30000);
			return request(host)
				.get("/v2/polyfill.min.js?features=Intl.~locale.en,Intl.~locale.de,Intl.~locale.sv,fetch,Object.assign,Promise&use-compute-at-edge-backend=no")
				.then(response => {
					assert.isString(response.text);
					assert.doesNotThrow(() => new vm.Script(response.text));
				});
		});
	});
});

describe("GET /v2/polyfill.min.js?features=Intl.~locale.en&unknown=polyfill", function() {
	context('compute-at-edge service', function() {
		it("responds with valid javascript", function() {
			this.timeout(30000);
			return request(host)
				.get("/v2/polyfill.min.js?features=Intl.~locale.en&unknown=polyfill&use-compute-at-edge-backend=yes")
				.then(response => {
					assert.isString(response.text);
					assert.doesNotThrow(() => new vm.Script(response.text));
				});
		});
	});

	context('vcl service', function() {
		it("responds with valid javascript", function() {
			this.timeout(30000);
			return request(host)
				.get("/v2/polyfill.min.js?features=Intl.~locale.en&unknown=polyfill&use-compute-at-edge-backend=no")
				.then(response => {
					assert.isString(response.text);
					assert.doesNotThrow(() => new vm.Script(response.text));
				});
		});
	});
});
