var assert  = require('assert');
var AliasResolver = require('../../../lib/aliases');

var configuredAliases = {};

var resolver = new AliasResolver([function expandAliasFromConfig(featureName) {
	return configuredAliases[featureName] || undefined;
}]);

describe("#resolve(polyfills)", function() {

	it("should take a list of polyfill objects and resolve each to potentially many other polyfill objects based on a sequence of resolution functions", function() {

		// Initialise the resolver with a dictionary of names mapping to
		// potentially many names (eg modernizr:es5array contains all the ES5
		// array polyfills.
		configuredAliases = {
			"alias_name_a": [ "resolved_name_a", "resolved_name_b" ],
			"alias_name_b": [ "resolved_name_c", "resolved_name_d" ]
		};

		assert.deepEqual(resolver.resolve({
			alias_name_a: { flags: [] }
		}), {
			resolved_name_a: { flags: [], aliasOf: ["alias_name_a"] },
			resolved_name_b: { flags: [], aliasOf: ["alias_name_a"] }
		});
	});

	it("should remove duplicate polyfills once expanded and record which aliases included each polyfill once duplicates are removed", function() {
		configuredAliases = {
			"alias_name_a": ["resolved_name_a", "resolved_name_b"],
			"alias_name_b": ["resolved_name_c", "resolved_name_b"]
		};

		assert.deepEqual(resolver.resolve({
			alias_name_a: { flags: [] },
			alias_name_b: { flags: [] }
		}), {
			resolved_name_a: { flags: [], aliasOf: ["alias_name_a"] },
			resolved_name_b: { flags: [], aliasOf: ["alias_name_a", "alias_name_b"] },
			resolved_name_c: { flags: [], aliasOf: ["alias_name_b"] }
		});
	});

	it("should pass flags from the aliases to their resolved counterparts", function() {
		configuredAliases = {
			"alias_name_a": ["resolved_name_a", "resolved_name_b"],
			"alias_name_b": ["resolved_name_c", "resolved_name_d"]
		};

		assert.deepEqual(resolver.resolve({
			alias_name_a: { flags: ["always"] },
			alias_name_b: { flags: ["gated"] }
		}), {
			resolved_name_a: { flags: ["always"], aliasOf: ["alias_name_a"] },
			resolved_name_b: { flags: ["always"], aliasOf: ["alias_name_a"] },
			resolved_name_c: { flags: ["gated"], aliasOf: ["alias_name_b"] },
			resolved_name_d: { flags: ["gated"], aliasOf: ["alias_name_b"] }
		});
	});

	it("should concatenate duplicate polyfills' flags and aliases", function() {
		configuredAliases = {
			"alias_name_a": ["resolved_name_a", "resolved_name_b"],
			"alias_name_b": ["resolved_name_c", "resolved_name_b"]
		};

		assert.deepEqual(resolver.resolve({
			alias_name_a: { flags: ["always"] },
			alias_name_b: { flags: ["gated"] }
		}), {
			resolved_name_a: { flags: ["always"], aliasOf: ["alias_name_a"] },
			resolved_name_b: { flags: ["always", "gated"], aliasOf: ["alias_name_a", "alias_name_b"] },
			resolved_name_c: { flags: ["gated"], aliasOf: ["alias_name_b"] }
		});
	});

	it("should transfer all aliases to the final resolved polyfill identifier", function() {
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

		assert.deepEqual(localresolver.resolve({
			first_alias_name_a: { flags: ["always"] }
		}), {
			resolved_name_a: { flags: ["always"], aliasOf: ["alias_name_a", "first_alias_name_a"] },
			resolved_name_b: { flags: ["always"], aliasOf: ["alias_name_a", "first_alias_name_a"] }
		});
	});

	it("should only record the rule that included the polyfill in the final aliasOf array if an alias was used", function() {
		configuredAliases = {
			"alias_name_a": ["resolved_name_a", "resolved_name_b"],
			"alias_name_b": ["resolved_name_c", "resolved_name_b"]
		};

		assert.deepEqual(resolver.resolve({
			resolved_name_a: { flags: ["always"] },
			alias_name_b: { flags: ["gated"] }
		}), {
			resolved_name_a: { flags: ["always"] },
			resolved_name_c: { flags: ["gated"], aliasOf: ["alias_name_b"] },
			resolved_name_b: { flags: ["gated"], aliasOf: ["alias_name_b"] }
		});
	});

	it("should handle cases where a resolver function cannot resolve a name so returns undefined by passing the polyfill identifier to the next function", function() {
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

		var result = localresolver.resolve({
			first_alias_name_a: { flags: ["always"] },
			alias_name_b: { flags: ["gated"] }
		});

		assert.deepEqual(result, {
			resolved_name_a: { flags: ["always"], aliasOf: ["alias_name_a", "first_alias_name_a"] },
			resolved_name_b: { flags: ["gated", "always"], aliasOf: ["alias_name_b", "alias_name_a", "first_alias_name_a"] },
			resolved_name_c: { flags: ["gated"], aliasOf: ["alias_name_b"] }
		});
	});

	it('should be able to resolve an alias to one of the other inputs', function() {
		var localresolver = new AliasResolver([
			function(name) {
				return (name === 'alias_name_a') ? ['name_b'] : undefined;
			}
		]);

		assert.deepEqual(localresolver.resolve({
			alias_name_a: { flags: ["always"] },
			name_b: { flags: ["gated"] }
		}), {
			name_b: { flags: ["gated", "always"], aliasOf: ['alias_name_a'] }
		});
	})

	it('should be able to resolve an alias to itself', function() {
		var localresolver = new AliasResolver([
			function(name) { return [name]; }
		]);

		assert.deepEqual(localresolver.resolve({
			name_a: { },
			name_b: { }
		}), {
			name_a: { },
			name_b: { }
		});
	})
});
