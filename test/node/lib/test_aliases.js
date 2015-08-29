/* global describe, it */

var assert  = require('assert');
var AliasResolver = require('../../../lib/aliases');

var configuredAliases = {};

var resolver = new AliasResolver([function expandAliasFromConfig(featureName) {
	return configuredAliases[featureName] || undefined;
}]);

describe("AliasResolver", function() {
	describe("#resolve(polyfills)", function() {

		it("should take a list of polyfill objects and resolve each to potentially many other polyfill objects based on a sequence of resolution functions", function(done) {

			// Initialise the resolver with a dictionary of names mapping to
			// potentially many names (eg modernizr:es5array contains all the ES5
			// array polyfills.
			configuredAliases = {
				"alias_name_a": [ "resolved_name_a", "resolved_name_b" ],
				"alias_name_b": [ "resolved_name_c", "resolved_name_d" ]
			};

			resolver.resolve({
				alias_name_a: { flags: [] }
			}).then(function(resolved) {
				assert.deepEqual(resolved, {
					resolved_name_a: { flags: [], aliasOf: ["alias_name_a"] },
					resolved_name_b: { flags: [], aliasOf: ["alias_name_a"] }
				});
				done();
			});
		});

		it("should remove duplicate polyfills once expanded and record which aliases included each polyfill once duplicates are removed", function(done) {
			configuredAliases = {
				"alias_name_a": ["resolved_name_a", "resolved_name_b"],
				"alias_name_b": ["resolved_name_c", "resolved_name_b"]
			};

			resolver.resolve({
				alias_name_a: { flags: [] },
				alias_name_b: { flags: [] }
			}).then(function(resolved) {
				assert.deepEqual(resolved, {
					resolved_name_a: { flags: [], aliasOf: ["alias_name_a"] },
					resolved_name_b: { flags: [], aliasOf: ["alias_name_a", "alias_name_b"] },
					resolved_name_c: { flags: [], aliasOf: ["alias_name_b"] }
				});
				done();
			});
		});

		it("should pass flags from the aliases to their resolved counterparts", function(done) {
			configuredAliases = {
				"alias_name_a": ["resolved_name_a", "resolved_name_b"],
				"alias_name_b": ["resolved_name_c", "resolved_name_d"]
			};

			resolver.resolve({
				alias_name_a: { flags: ["always"] },
				alias_name_b: { flags: ["gated"] }
			}).then(function(resolved) {
				assert.deepEqual(resolved, {
					resolved_name_a: { flags: ["always"], aliasOf: ["alias_name_a"] },
					resolved_name_b: { flags: ["always"], aliasOf: ["alias_name_a"] },
					resolved_name_c: { flags: ["gated"], aliasOf: ["alias_name_b"] },
					resolved_name_d: { flags: ["gated"], aliasOf: ["alias_name_b"] }
				});
				done();
			});
		});

		it("should concatenate duplicate polyfills' flags and aliases", function(done) {
			configuredAliases = {
				"alias_name_a": ["resolved_name_a", "resolved_name_b"],
				"alias_name_b": ["resolved_name_c", "resolved_name_b"]
			};

			resolver.resolve({
				alias_name_a: { flags: ["always"] },
				alias_name_b: { flags: ["gated"] }
			}).then(function(resolved) {
				assert.deepEqual(resolved, {
					resolved_name_a: { flags: ["always"], aliasOf: ["alias_name_a"] },
					resolved_name_b: { flags: ["always", "gated"], aliasOf: ["alias_name_a", "alias_name_b"] },
					resolved_name_c: { flags: ["gated"], aliasOf: ["alias_name_b"] }
				});
				done();
			});
		});

		it("should transfer all aliases to the final resolved polyfill identifier", function(done) {
			configuredAliases = {
				"alias_name_a": ["resolved_name_a", "resolved_name_b"],
				"alias_name_b": ["resolved_name_c", "resolved_name_b"]
			};

			var localresolver = new AliasResolver([

				// Map only first_alias_name_a to another alias
				function(name) {
					return (name === "first_alias_name_a") ? ["alias_name_a"] : undefined;
				},
				function(name) {
					return configuredAliases[name];
				}
			]);

			localresolver.resolve({
				first_alias_name_a: { flags: ["always"] }
			}).then(function(resolved) {
				assert.deepEqual(resolved, {
					resolved_name_a: { flags: ["always"], aliasOf: ["alias_name_a", "first_alias_name_a"] },
					resolved_name_b: { flags: ["always"], aliasOf: ["alias_name_a", "first_alias_name_a"] }
				});
				done();
			});
		});

		it("should only record the rule that included the polyfill in the final aliasOf array if an alias was used", function(done) {
			configuredAliases = {
				"alias_name_a": ["resolved_name_a", "resolved_name_b"],
				"alias_name_b": ["resolved_name_c", "resolved_name_b"]
			};

			resolver.resolve({
				resolved_name_a: { flags: ["always"] },
				alias_name_b: { flags: ["gated"] }
			}).then(function(resolved) {
				assert.deepEqual(resolved, {
					resolved_name_a: { flags: ["always"] },
					resolved_name_c: { flags: ["gated"], aliasOf: ["alias_name_b"] },
					resolved_name_b: { flags: ["gated"], aliasOf: ["alias_name_b"] }
				});
				done();
			});
		});

		it("should handle cases where a resolver function cannot resolve a name so returns undefined by passing the polyfill identifier to the next function", function(done) {
			configuredAliases = {
				"alias_name_a": ["resolved_name_a", "resolved_name_b"],
				"alias_name_b": ["resolved_name_c", "resolved_name_b"]
			};

			var localresolver = new AliasResolver([

				// Map only first_alias_name_a to another alias
				function(name) {
					return (name === "first_alias_name_a") ? ["alias_name_a"] : undefined;
				},
				function(name) {
					return configuredAliases[name] || undefined;
				}
			]);

			localresolver.resolve({
				first_alias_name_a: { flags: ["always"] },
				alias_name_b: { flags: ["gated"] }
			}).then(function(resolved) {
				assert.deepEqual(resolved, {
					resolved_name_a: { flags: ["always"], aliasOf: ["alias_name_a", "first_alias_name_a"] },
					resolved_name_b: { flags: ["gated", "always"], aliasOf: ["alias_name_b", "alias_name_a", "first_alias_name_a"] },
					resolved_name_c: { flags: ["gated"], aliasOf: ["alias_name_b"] }
				});
				done();
			});
		});

		it('should be able to resolve an alias to one of the other inputs', function(done) {
			var localresolver = new AliasResolver([
				function(name) {
					return (name === 'alias_name_a') ? ['name_b'] : undefined;
				}
			]);

			localresolver.resolve({
				alias_name_a: { flags: ["always"] },
				name_b: { flags: ["gated"] }
			}).then(function(resolved) {
				assert.deepEqual(resolved, {
					name_b: { flags: ["gated", "always"], aliasOf: ['alias_name_a'] }
				});
				done();
			});
		});

		it('should be able to resolve an alias to itself', function(done) {
			var localresolver = new AliasResolver([
				function(name) { return [name]; }
			]);

			localresolver.resolve({
				name_a: { },
				name_b: { }
			}).then(function(resolved) {
				assert.deepEqual(resolved, {
					name_a: { },
					name_b: { }
				});
				done();
			});
		});

		it('should handle resolvers that return promises', function(done) {
			var localresolver = new AliasResolver([
				function(name) { return Promise.resolve(['alias']); }
			]);

			localresolver.resolve({
				name: {},
			}).then(function(resolved) {
				assert.deepEqual(resolved, {
					alias: { flags: [], aliasOf: ["name"] },
				});
				done();
			});
		});
	});
});
