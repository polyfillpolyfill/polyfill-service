var assert  = require('assert');
var AliasResolver = require('../../lib/aliases');

var configuredAliases = {};

AliasResolver.addResolver(function expandAliasFromConfig(polyfillIdentifierName) {
	return configuredAliases[polyfillIdentifierName] || undefined;
});

describe("#resolvePolyfills(polyfills)", function() {

	it("should take a list of polyfill objects and resolve each to potentially many other polyfill objects based on a sequence of resolution functions", function() {

		// Initialise the resolver with a dictionary of names mapping to
		// potentially many names (eg modernizr:es5array contains all the ES5
		// array polyfills.
		configuredAliases = {
			"alias_name_a": [ "resolved_name_a", "resolved_name_b" ],
			"alias_name_b": [ "resolved_name_c", "resolved_name_d" ]
		};

		var resolvedPolyfills = AliasResolver.resolvePolyfills([{
			name: "alias_name_a",
			flags: []
		}]);

		assert.deepEqual([{
				name: "resolved_name_a",
				flags: [],
				aliasOf: ["alias_name_a"]
			},
			{
				name: "resolved_name_b",
				flags: [],
				aliasOf: ["alias_name_a"]
			}
		], resolvedPolyfills);
	});

	it("should remove duplicate polyfills once expanded and record which aliases included each polyfill once duplicates are removed", function() {
		configuredAliases = {
			"alias_name_a": ["resolved_name_a", "resolved_name_b"],
			"alias_name_b": ["resolved_name_c", "resolved_name_b"]
		};

		var resolvedPolyfills = AliasResolver.resolvePolyfills([{
			name: "alias_name_a",
			flags: []
		},
		{
			name: "alias_name_b",
			flags: []
		}]);

		assert.deepEqual([
			{
				name: "resolved_name_a",
				flags: [],
				aliasOf: ["alias_name_a"]
			},
			{
				name: "resolved_name_b",
				flags: [],
				aliasOf: ["alias_name_a", "alias_name_b"]
			},
			{
				name: "resolved_name_c",
				flags: [],
				aliasOf: ["alias_name_b"]
			}
		], resolvedPolyfills);
	});

	it("should pass flags from the aliases to their resolved counterparts", function() {
		configuredAliases = {
			"alias_name_a": ["resolved_name_a", "resolved_name_b"],
			"alias_name_b": ["resolved_name_c", "resolved_name_d"]
		};

		var resolvedPolyfills = AliasResolver.resolvePolyfills([
			{
				name: "alias_name_a",
				flags: ["always"]
			},
			{
				name: "alias_name_b",
				flags: ["gated"]
			}
		]);

		assert.deepEqual([
			{
				name: "resolved_name_a",
				flags: ["always"],
				aliasOf: ["alias_name_a"]
			},
			{
				name: "resolved_name_b",
				flags: ["always"],
				aliasOf: ["alias_name_a"]
			},
			{
				name: "resolved_name_c",
				flags: ["gated"],
				aliasOf: ["alias_name_b"]
			},
			{
				name: "resolved_name_d",
				flags: ["gated"],
				aliasOf: ["alias_name_b"]
			}
		], resolvedPolyfills);
	});

	it("should concatenate duplicate polyfill's flags and aliases", function() {
		configuredAliases = {
			"alias_name_a": ["resolved_name_a", "resolved_name_b"],
			"alias_name_b": ["resolved_name_c", "resolved_name_b"]
		};

		var resolvedPolyfills = AliasResolver.resolvePolyfills([
			{
				name: "alias_name_a",
				flags: ["always"]
			},
			{
				name: "alias_name_b",
				flags: ["gated"]
			}
		]);

		assert.deepEqual([
			{
				name: "resolved_name_a",
				flags: ["always"],
				aliasOf: ["alias_name_a"]
			},
			{
				name: "resolved_name_b",
				flags: ["always", "gated"],
				aliasOf: ["alias_name_a", "alias_name_b"]
			},
			{
				name: "resolved_name_c",
				flags: ["gated"],
				aliasOf: ["alias_name_b"]
			}
		], resolvedPolyfills);
	});

	it("should transfer only the first, specified alias to the final resolved polyfill identifier", function() {
		configuredAliases = {
			"alias_name_a": ["resolved_name_a", "resolved_name_b"],
			"alias_name_b": ["resolved_name_c", "resolved_name_b"]
		};

		AliasResolver.clearResolvers();
		AliasResolver.addResolver(function(polyfillIdentifierName) {

			// Map only first_alias_name_a to another alias
			if (polyfillIdentifierName === "first_alias_name_a") {
				return ["alias_name_a"];
			}

			return undefined;
		}).addResolver(function(polyfillIdentifierName) {
			return configuredAliases[polyfillIdentifierName];
		});

		var resolvedPolyfills = AliasResolver.resolvePolyfills([
			{
				name: "first_alias_name_a",
				flags: ["always"]
			}
		]);

		assert.deepEqual([
			{
				name: "resolved_name_a",
				flags: ["always"],
				aliasOf: ["first_alias_name_a"]
			},
			{
				name: "resolved_name_b",
				flags: ["always"],
				aliasOf: ["first_alias_name_a"]
			}
		], resolvedPolyfills);
	});

	it("should only record the rule that included the polyfill in the final aliasOf array if an alias was used", function() {
		configuredAliases = {
			"alias_name_a": ["resolved_name_a", "resolved_name_b"],
			"alias_name_b": ["resolved_name_c", "resolved_name_b"]
		};

		AliasResolver.clearResolvers();
		AliasResolver.addResolver(function(polyfillIdentifierName) {
			return configuredAliases[polyfillIdentifierName] || undefined;
		});

		var resolvedPolyfills = AliasResolver.resolvePolyfills([
			{
				name: "resolved_name_a",
				flags: ["always"]
			},
			{
				name: "alias_name_b",
				flags: ["gated"]
			}
		]);

		assert.deepEqual([
			{
				name: "resolved_name_a",
				flags: ["always"]
			},
			{
				name: "resolved_name_c",
				flags: ["gated"],
				aliasOf: ["alias_name_b"]
			},
			{
				name: "resolved_name_b",
				flags: ["gated"],
				aliasOf: ["alias_name_b"]
			}
		], resolvedPolyfills);
	});

	it("should handle cases where a resolver function can not resolve a name so returns undefined by passing the polyfill identifier to the next function", function() {
		configuredAliases = {
			"alias_name_a": ["resolved_name_a", "resolved_name_b"],
			"alias_name_b": ["resolved_name_c", "resolved_name_b"]
		};

		AliasResolver.clearResolvers();
		AliasResolver.addResolver(function(polyfillIdentifierName) {

			// Map only first_alias_name_a to another alias
			if (polyfillIdentifierName === "first_alias_name_a") {
				return ["alias_name_a"];
			}

			return undefined;
		}).addResolver(function(polyfillIdentifierName) {
			return configuredAliases[polyfillIdentifierName] || undefined;
		});

		var resolvedPolyfills = AliasResolver.resolvePolyfills([
			{
				name: "first_alias_name_a",
				flags: ["always"]
			},
			{
				name: "alias_name_b",
				flags: ["gated"]
			}
		]);

		assert.deepEqual([
			{
				name: "resolved_name_a",
				flags: ["always"],
				aliasOf: ["first_alias_name_a"]
			},
			{
				name: "resolved_name_b",
				flags: ["always", "gated"],
				aliasOf: ["first_alias_name_a", "alias_name_b"]
			},
			{
				name: "resolved_name_c",
				flags: ["gated"],
				aliasOf: ["alias_name_b"]
			}
		], resolvedPolyfills);
	});

	it("should remove duplicate canonical polyfills, merge flags and not create an alias", function() {

		AliasResolver.clearResolvers();
		AliasResolver.addResolver(function(polyfillIdentifierName) {
			return undefined;
		});

		var resolvedPolyfills = AliasResolver.resolvePolyfills([
			{
				name: "resolved_name_a",
				flags: ["always"]
			},
			{
				name: "resolved_name_a",
				flags: ["gated"]
			}
		]);

		assert.deepEqual([
			{
				name: "resolved_name_a",
				flags: ["always", "gated"]
			}
		], resolvedPolyfills);
	});
});
