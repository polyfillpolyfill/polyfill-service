/* eslint-env mocha */

"use strict";

const request = require("supertest");
const assert = require("proclaim");
const vm = require("vm");
const host = require("../helpers").host;

describe("GET /v2/polyfill.min.js?features=default,Intl.~locale.fr,Intl.~locale.en,Intl.~locale.es", function() {
	it("responds with valid javascript", function() {
		this.timeout(30000);
		return request(host)
			.get("/v2/polyfill.min.js?features=default,Intl.~locale.fr,Intl.~locale.en,Intl.~locale.es")
			.then(response => {
				assert.isString(response.text);
				assert.doesNotThrow(() => new vm.Script(response.text));
			});
	});
});

describe("GET /v2/polyfill.min.js?features=es5,Intl.~locale.en-AU&flags=always,gated", function() {
	it("responds with valid javascript", function() {
		this.timeout(30000);
		return request(host)
			.get("/v2/polyfill.min.js?features=es5,Intl.~locale.en-AU&flags=always,gated")
			.then(response => {
				assert.isString(response.text);
				assert.doesNotThrow(() => new vm.Script(response.text));
			});
	});
});

describe("GET /v2/polyfill.min.js?features=Intl.~locale.en,Intl.~locale.de,Intl.~locale.sv,fetch,Object.assign,Promise", function() {
	it("responds with valid javascript", function() {
		this.timeout(30000);
		return request(host)
			.get("/v2/polyfill.min.js?features=Intl.~locale.en,Intl.~locale.de,Intl.~locale.sv,fetch,Object.assign,Promise")
			.then(response => {
				assert.isString(response.text);
				assert.doesNotThrow(() => new vm.Script(response.text));
			});
	});
});

describe("GET /v2/polyfill.min.js?features=Intl.~locale.en&unknown=polyfill", function() {
	it("responds with valid javascript", function() {
		this.timeout(30000);
		return request(host)
			.get("/v2/polyfill.min.js?features=Intl.~locale.en&unknown=polyfill")
			.then(response => {
				assert.isString(response.text);
				assert.doesNotThrow(() => new vm.Script(response.text));
			});
	});
});
