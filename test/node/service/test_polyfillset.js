/* eslint-env mocha */
'use strict';

const assert = require('proclaim');
const setsToArrays = require('../../utils/sets_to_arrays');

const PolyfillSet = require('../../../service/PolyfillSet');

describe('PolyfillSet', () => {
	describe(".fromQueryParam(polyfillList, additionalFlags)", () => {

		it("should transform a simple querystring, containing comma-separated values to a list of polyfills with flags", () => {
			const querystring = "poly1|gated,poly2|always";
			assert.deepEqual(setsToArrays(PolyfillSet.fromQueryParam(querystring).get()), {
				poly1: { flags: ['gated'] },
				poly2: { flags: ['always'] }
			});
		});

		it("should add additional flags to each polyfill object returned if additional flags are specified", () => {
			const querystring = "poly1|always,poly2|always";
			assert.deepEqual(setsToArrays(PolyfillSet.fromQueryParam(querystring, ['gated']).get()), {
				poly1: { flags: ['always', 'gated'] },
				poly2: { flags: ['always', 'gated'] }
			});
		});
	});

});
