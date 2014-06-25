/**
 * The AliasResolver provides the logic used for expanding and resolving
 * aliases using more than one mechanism (if required).
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
AliasResolver.createDefault = function(polyfillAliases) {
	return new AliasResolver([
		function expandAliasesFromConfig(polyfill) {

			var aliases = polyfillAliases[polyfill.name];

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
