/* global describe, it */

const assert = require('proclaim');
const setsToArrays = require('../../utils/sets_to_arrays');

const createAliasResolver = require('../../../lib/aliases');

function createConfigResolver(mappings) {
	return featureName => mappings[featureName] || undefined;
}


describe("AliasResolver", () => {
	describe("#resolve(polyfills)", () => {

		it("should take a list of polyfill objects and resolve each to potentially many other polyfill objects based on a sequence of resolution functions", () => {

			const testResolver = createAliasResolver(createConfigResolver({
				"alias_name_a": [ "resolved_name_a", "resolved_name_b" ],
				"alias_name_b": [ "resolved_name_c", "resolved_name_d" ]
			}));
			const input = {
				alias_name_a: { flags: new Set() }
			};
			const expectedResult = {
				resolved_name_a: { flags: [], aliasOf: ["alias_name_a"] },
				resolved_name_b: { flags: [], aliasOf: ["alias_name_a"] }
			};
			return testResolver(input).then(result => assert.deepEqual(setsToArrays(result), expectedResult));
		});

		it("should remove duplicate polyfills once expanded and record which aliases included each polyfill once duplicates are removed", () => {
			const testResolver = createAliasResolver(createConfigResolver({
				"alias_name_a": ["resolved_name_a", "resolved_name_b"],
				"alias_name_b": ["resolved_name_c", "resolved_name_b"]
			}));
			const input = {
				alias_name_a: { flags: new Set() },
				alias_name_b: { flags: new Set() }
			};
			const expectedResult = {
				resolved_name_a: { flags: [], aliasOf: ["alias_name_a"] },
				resolved_name_b: { flags: [], aliasOf: ["alias_name_a", "alias_name_b"] },
				resolved_name_c: { flags: [], aliasOf: ["alias_name_b"] }
			};
			return testResolver(input).then(result => assert.deepEqual(setsToArrays(result), expectedResult));
		});

		it("should pass flags from the aliases to their resolved counterparts", () => {
			const testResolver = createAliasResolver(createConfigResolver({
				"alias_name_a": ["resolved_name_a", "resolved_name_b"],
				"alias_name_b": ["resolved_name_c", "resolved_name_d"]
			}));
			const input = {
				alias_name_a: { flags: new Set(["always"]) },
				alias_name_b: { flags: new Set(["gated"]) }
			};
			const expectedResult = {
				resolved_name_a: { flags: ["always"], aliasOf: ["alias_name_a"] },
				resolved_name_b: { flags: ["always"], aliasOf: ["alias_name_a"] },
				resolved_name_c: { flags: ["gated"], aliasOf: ["alias_name_b"] },
				resolved_name_d: { flags: ["gated"], aliasOf: ["alias_name_b"] }
			};
			return testResolver(input).then(result => assert.deepEqual(setsToArrays(result), expectedResult));
		});

		it("should concatenate duplicate polyfills' flags and aliases", () => {
			const testResolver = createAliasResolver(createConfigResolver({
				"alias_name_a": ["resolved_name_a", "resolved_name_b"],
				"alias_name_b": ["resolved_name_c", "resolved_name_b"]
			}));
			const input = {
				alias_name_a: { flags: new Set(["always"]) },
				alias_name_b: { flags: new Set(["gated"]) }
			};
			const expectedResult = {
				resolved_name_a: { flags: ["always"], aliasOf: ["alias_name_a"] },
				resolved_name_b: { flags: ["always", "gated"], aliasOf: ["alias_name_a", "alias_name_b"] },
				resolved_name_c: { flags: ["gated"], aliasOf: ["alias_name_b"] }
			};
			return testResolver(input).then(result => assert.deepEqual(setsToArrays(result), expectedResult));
		});

		it("should transfer all aliases to the final resolved polyfill identifier", () => {
			const testResolver = createAliasResolver([
				name => (name === "first_alias_name_a") ? ["alias_name_a"] : undefined,
				createConfigResolver({
					"alias_name_a": ["resolved_name_a", "resolved_name_b"],
					"alias_name_b": ["resolved_name_c", "resolved_name_b"]
				})
			]);
			const input = {
				first_alias_name_a: { flags: new Set(["always"]) }
			};
			const expectedResult = {
				resolved_name_a: { flags: ["always"], aliasOf: ["alias_name_a", "first_alias_name_a"] },
				resolved_name_b: { flags: ["always"], aliasOf: ["alias_name_a", "first_alias_name_a"] }
			};
			return testResolver(input).then(result => assert.deepEqual(setsToArrays(result), expectedResult));
		});

		it("should only record the rule that included the polyfill in the final aliasOf array if an alias was used", () => {
			const testResolver = createAliasResolver(createConfigResolver({
				"alias_name_a": ["resolved_name_a", "resolved_name_b"],
				"alias_name_b": ["resolved_name_c", "resolved_name_b"]
			}));
			const input = {
				resolved_name_a: { flags: new Set(["always"]) },
				alias_name_b: { flags: new Set(["gated"]) }
			};
			const expectedResult = {
				resolved_name_a: { flags: ["always"] },
				resolved_name_c: { flags: ["gated"], aliasOf: ["alias_name_b"] },
				resolved_name_b: { flags: ["gated"], aliasOf: ["alias_name_b"] }
			};
			return testResolver(input).then(result => assert.deepEqual(setsToArrays(result), expectedResult));
		});

		it("should handle cases where a resolver function cannot resolve a name so returns undefined by passing the polyfill identifier to the next function", () => {
			const testResolver = createAliasResolver([
				name => (name === "first_alias_name_a") ? ["alias_name_a"] : undefined,
				createConfigResolver({
					"alias_name_a": ["resolved_name_a", "resolved_name_b"],
					"alias_name_b": ["resolved_name_c", "resolved_name_b"]
				})
			]);
			const input = {
				first_alias_name_a: { flags: new Set(["always"]) },
				alias_name_b: { flags: new Set(["gated"]) }
			};
			const expectedResult = {
				resolved_name_a: { flags: ["always"], aliasOf: ["alias_name_a", "first_alias_name_a"] },
				resolved_name_b: { flags: ["always", "gated"], aliasOf: ["alias_name_a", "alias_name_b", "first_alias_name_a"] },
				resolved_name_c: { flags: ["gated"], aliasOf: ["alias_name_b"] }
			};
			return testResolver(input).then(result => assert.deepEqual(setsToArrays(result), expectedResult));
		});

		it('should be able to resolve an alias to one of the other inputs', () => {
			const testResolver = createAliasResolver(
				name => (name === 'alias_name_a') ? ['name_b'] : undefined
			);
			const input = {
				alias_name_a: { flags: new Set(["always"]) },
				name_b: { flags: new Set(["gated"]) }
			};
			const expectedResult = {
				name_b: { flags: ["always", "gated"], aliasOf: ['alias_name_a'] }
			};
			return testResolver(input).then(result => assert.deepEqual(setsToArrays(result), expectedResult));
		});

		it('should be able to resolve an alias to itself', () => {
			const testResolver = createAliasResolver(name => name);
			const input = { name_a: { }, name_b: { } };
			const expectedResult = { name_a: { }, name_b: { } };
			return testResolver(input).then(result => assert.deepEqual(setsToArrays(result), expectedResult));
		});

	});
});
