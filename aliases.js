/**
 * The AliasResolver provides the logic used for expanding and resolving
 * aliases using more than one mechanism.
 *
 * As an alias can reference one or more polyfills this expands
 * aliases based on a number of given expansion functions/mechanisms.
 *
 * The AliasResolver is constructed with a list of alias functions, each
 * should return an array of names.  Each function in the list is called
 * expanding the aliases expanded from the previous function.  For this to
 * work, if an alias can not be expanded the function should return the name
 * anyway deferring to the next function. (For example see the identity
 * function in the constructor used as a default)
 *
 * The idea is that by the time the alias functions have completed you should
 * have the basic list of polyfills that can be referenced from the ./source
 * directory.
 */

/**
 * Construct a new AliasResolver accepting a list of functions that can be
 * used to expand an alias.
 *
 * @constructor
 * @param {array} resolvers A list of functions that map any object or string
 *                          to an array of objects or strings.
 */
function AliasResolver(resolvers) {
	this.aliasResolvers = resolvers || [
		function identity(name) {
			return [name];
		}
	];
}

/**
 * Resolve an alias usin the resolver functions.  Each is called in turn until
 * a list of expandedAliases remain.
 *
 * @param {array} polyfillAliases The list of aliases to resolve
 * @returns {array} An expanded list of resolved aliases.
 */
AliasResolver.prototype.resolve = function(polyfillAliases) {
	var expandedAliases = polyfillAliases;

	this.aliasResolvers.forEach(function(aliasResolver) {
		expandedAliases = processListOfAliases(expandedAliases, aliasResolver);
	});

	return expandedAliases;
};

/**
 * Create the default AliasResolver: This contains a function which uses the
 * polyfills info (which contains the config info for each polyfill) and
 * expands the aliases.
 *
 * @param {Object} polyfills Object containing information about the loaded
 *                           polyfills
 * @return {AliasResolver}
 */
AliasResolver.createDefault = function(polyfills) {
	return new AliasResolver([
		function expandAliasesFromConfig(polyfill) {

			var aliases = polyfills.aliases[polyfill.name];

			if (aliases) {
				return aliases.map(function(alias) {
					return {
						name: alias,
						flags: polyfill.flags,
						aliasOf: polyfill.aliasOf
					};
				});
			}

			return [polyfill];
		}
	]);

};

/**
 * FP Helper:
 * flatMap the terms in the array using lambda.
 */
function flatMap(array, lambda) {
	return Array.prototype.concat.apply([], array.map(lambda));
};

/**
 * Run an alias resolver over each member in a list of aliases.  This should
 * result in an array of new names that potentially contain the expanded
 * aliases depending on the aliasResolver function.
 *
 * @param {array}    aliases       A list of aliases to expand.
 * @param {Function} aliasResolver A function to apply to each member in the
 *                                 list of aliases.
 * @return {array} An expanded list of aliases
 */
function processListOfAliases(aliases, aliasResolver) {
	return flatMap(aliases, function(name) {
		return aliasResolver(name);
	}).filter(function(name, position, self) {
		return self.indexOf(name) == position;
	});
}


module.exports = AliasResolver;
