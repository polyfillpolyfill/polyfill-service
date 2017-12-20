/* eslint-env mocha */
"use strict";

const assert = require('proclaim');
const sinon = require('sinon');
const setsToArrays = require('../../utils/sets_to_arrays');

describe('lib/aliases', () => {
	let aliasResolver;

	beforeEach(() => {
		aliasResolver = require('../../../lib/aliases');
	});

	it('exports a function', () => {
		assert.isFunction(aliasResolver);
	});

	it('has a length of 0', () => {
		assert.equal(aliasResolver.length, 0);
	});

	describe('aliasResolver(resolvers)', () => {

		it('returns a function', () => {
			assert.isFunction(aliasResolver());
		});

		it('returns a function with length 1', () => {
			assert.equal(aliasResolver().length, 1);
		});

		describe('aliasResolver(resolvers)(featureSet)', () => {

			it('returns a promise', () => {
				assert.isInstanceOf(aliasResolver(() => {})(), Promise);
			});

			it('calls the resolver function with each key in the featureSet', () => {
				const spy = sinon.spy();
				const resolver = aliasResolver(spy);
				const featureSet = {
					'key1': 'value1',
					'key2': 'value2'
				};
				return resolver(featureSet)
					.then(() => {
						assert.equal(spy.calledTwice, true);
						assert.deepEqual(spy.firstCall.args, ['key1']);
						assert.deepEqual(spy.secondCall.args, ['key2']);
					});
			});

			describe("AliasResolver", () => {

				describe("#resolve(polyfills)", () => {

					it("should take a list of polyfill objects and resolve each to potentially many other polyfill objects based on a sequence of resolution functions", () => {

						// Initialise the resolver with a dictionary of names mapping to
						// potentially many names (eg modernizr:es5array contains all the ES5
						// array polyfills.
						const configuredAliases = {
							"alias_name_a": ["resolved_name_a", "resolved_name_b"],
							"alias_name_b": ["resolved_name_c", "resolved_name_d"]
						};

						const resolver = aliasResolver(function expandAliasFromConfig(featureName) {
							return configuredAliases[featureName];
						});

						return resolver({
							alias_name_a: {
								flags: []
							}
						}).then(function(resolved) {
							assert.deepEqual(setsToArrays(resolved), {
								resolved_name_a: {
									flags: [],
									aliasOf: ["alias_name_a"]
								},
								resolved_name_b: {
									flags: [],
									aliasOf: ["alias_name_a"]
								}
							});
						});
					});

					it("should remove duplicate polyfills once expanded and record which aliases included each polyfill once duplicates are removed", () => {
						const configuredAliases = {
							"alias_name_a": ["resolved_name_a", "resolved_name_b"],
							"alias_name_b": ["resolved_name_c", "resolved_name_b"]
						};

						const resolver = aliasResolver(function expandAliasFromConfig(featureName) {
							return configuredAliases[featureName];
						});

						return resolver({
							alias_name_a: {
								flags: []
							},
							alias_name_b: {
								flags: []
							}
						}).then(function(resolved) {
							assert.deepEqual(setsToArrays(resolved), {
								resolved_name_a: {
									flags: [],
									aliasOf: ["alias_name_a"]
								},
								resolved_name_b: {
									flags: [],
									aliasOf: ["alias_name_a", "alias_name_b"]
								},
								resolved_name_c: {
									flags: [],
									aliasOf: ["alias_name_b"]
								}
							});
						});
					});

					it("should pass flags from the aliases to their resolved counterparts", () => {
						const configuredAliases = {
							"alias_name_a": ["resolved_name_a", "resolved_name_b"],
							"alias_name_b": ["resolved_name_c", "resolved_name_d"]
						};
						const resolver = aliasResolver(function expandAliasFromConfig(featureName) {
							return configuredAliases[featureName];
						});
						return resolver({
							alias_name_a: {
								flags: ["always"]
							},
							alias_name_b: {
								flags: ["gated"]
							}
						}).then(function(resolved) {
							assert.deepEqual(setsToArrays(resolved), {
								resolved_name_a: {
									flags: ["always"],
									aliasOf: ["alias_name_a"]
								},
								resolved_name_b: {
									flags: ["always"],
									aliasOf: ["alias_name_a"]
								},
								resolved_name_c: {
									flags: ["gated"],
									aliasOf: ["alias_name_b"]
								},
								resolved_name_d: {
									flags: ["gated"],
									aliasOf: ["alias_name_b"]
								}
							});
						});
					});

					it("should concatenate duplicate polyfills' flags and aliases", () => {
						const configuredAliases = {
							"alias_name_a": ["resolved_name_a", "resolved_name_b"],
							"alias_name_b": ["resolved_name_c", "resolved_name_b"]
						};
						const resolver = aliasResolver(function expandAliasFromConfig(featureName) {
							return configuredAliases[featureName];
						});
						return resolver({
							alias_name_a: {
								flags: ["always"]
							},
							alias_name_b: {
								flags: ["gated"]
							}
						}).then(function(resolved) {
							assert.deepEqual(setsToArrays(resolved), {
								resolved_name_a: {
									flags: ["always"],
									aliasOf: ["alias_name_a"]
								},
								resolved_name_b: {
									flags: ["always", "gated"],
									aliasOf: ["alias_name_a", "alias_name_b"]
								},
								resolved_name_c: {
									flags: ["gated"],
									aliasOf: ["alias_name_b"]
								}
							});
						});
					});

					it("should transfer all aliases to the final resolved polyfill identifier", () => {
						const configuredAliases = {
							"alias_name_a": ["resolved_name_a", "resolved_name_b"],
							"alias_name_b": ["resolved_name_c", "resolved_name_b"]
						};

						const resolver = aliasResolver(

							// Map only first_alias_name_a to another alias
							function(name) {
								return (name === "first_alias_name_a") ? ["alias_name_a"] : undefined;
							},
							function(name) {
								return configuredAliases[name];
							}
						);

						return resolver({
							first_alias_name_a: {
								flags: ["always"]
							}
						}).then(function(resolved) {
							assert.deepEqual(setsToArrays(resolved), {
								resolved_name_a: {
									flags: ["always"],
									aliasOf: ["alias_name_a", "first_alias_name_a"]
								},
								resolved_name_b: {
									flags: ["always"],
									aliasOf: ["alias_name_a", "first_alias_name_a"]
								}
							});
						});
					});

					it("should only record the rule that included the polyfill in the final aliasOf array if an alias was used", () => {
						const configuredAliases = {
							"alias_name_a": ["resolved_name_a", "resolved_name_b"],
							"alias_name_b": ["resolved_name_c", "resolved_name_b"]
						};
						const resolver = aliasResolver(function expandAliasFromConfig(featureName) {
							return configuredAliases[featureName];
						});
						return resolver({
							resolved_name_a: {
								flags: ["always"]
							},
							alias_name_b: {
								flags: ["gated"]
							}
						}).then(function(resolved) {
							assert.deepEqual(setsToArrays(resolved), {
								resolved_name_a: {
									flags: ["always"]
								},
								resolved_name_c: {
									flags: ["gated"],
									aliasOf: ["alias_name_b"]
								},
								resolved_name_b: {
									flags: ["gated"],
									aliasOf: ["alias_name_b"]
								}
							});
						});
					});

					it("should handle cases where a resolver function cannot resolve a name so returns undefined by passing the polyfill identifier to the next function", () => {
						const configuredAliases = {
							"alias_name_a": ["resolved_name_a", "resolved_name_b"],
							"alias_name_b": ["resolved_name_c", "resolved_name_b"]
						};

						const resolver = aliasResolver(

							// Map only first_alias_name_a to another alias
							function(name) {
								return (name === "first_alias_name_a") ? ["alias_name_a"] : undefined;
							},
							function(name) {
								return configuredAliases[name];
							}
						);

						return resolver({
							first_alias_name_a: {
								flags: ["always"]
							},
							alias_name_b: {
								flags: ["gated"]
							}
						}).then(function(resolved) {
							assert.deepEqual(setsToArrays(resolved), {
								resolved_name_a: {
									flags: ["always"],
									aliasOf: ["alias_name_a", "first_alias_name_a"]
								},
								resolved_name_b: {
									flags: ["always", "gated"],
									aliasOf: ["alias_name_a", "alias_name_b", "first_alias_name_a"]
								},
								resolved_name_c: {
									flags: ["gated"],
									aliasOf: ["alias_name_b"]
								}
							});
						});
					});

					it('should be able to resolve an alias to one of the other inputs', () => {
						const resolver = aliasResolver(
							function(name) {
								return (name === 'alias_name_a') ? ['name_b'] : undefined;
							}
						);

						return resolver({
							alias_name_a: {
								flags: new Set(["always"])
							},
							name_b: {
								flags: new Set(["gated"])
							}
						}).then(function(resolved) {
							assert.deepEqual(setsToArrays(resolved), {
								name_b: {
									flags: ["always", "gated"],
									aliasOf: ['alias_name_a']
								}
							});
						});
					});

					it('should be able to resolve an alias to itself', () => {
						const resolver = aliasResolver(
							function(name) {
								return [name];
							}
						);

						return resolver({
							name_a: {},
							name_b: {}
						}).then(function(resolved) {
							assert.deepEqual(setsToArrays(resolved), {
								name_a: {},
								name_b: {}
							});
						});
					});
				});
			});
		});
	});
});
