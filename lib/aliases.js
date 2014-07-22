/**
 * The AliasResolver provides the logic used for expanding and resolving
 * aliases using more than one mechanism (if required).
 */
module.exports = (function() {

	/** An array of functions that map a string identifier (e.g. an alias) to an array of
	 * potentially alternate string identifiers (e.g. expanded names the alias refers to)
	 *
	 * The key point is that each is invoked in sequence with the result of
	 * the previous function.
	 */
	var aliasResolverFunctions = [];

	/**
	 * Run an alias resolution function over each element in an array of polyfill objects.
	 *
	 * Each polyfill object's name may be an alias rather than a canonical name. The
	 * resolving function may try to expand these polyfill names to another
	 * name. If it does not know how to expand the name, it is ignored and returned without
	 * change in the new, potentially expanded, array of polyfill objects.
	 *
	 * @param {array}    aliases       A list of aliased polyfills to expand.
	 * @param {Function} aliasResolver A function to apply to each polyfill
	 *                                 object in the list of aliases.  The
	 *                                 function takes a polyfill as an object,
	 *                                 and returns an array of polyfill objects
	 *                                 with an additional 'aliasOf' field to
	 *                                 indicate the original alias that included
	 *                                 the polyfill.
	 *
	 * @return {array} An expanded list of aliases
	 */
	function applyResolverToAliases(aliases, aliasResolver) {

		var expandedPolyfills = flatMap(aliases, function(polyfillIdentifier) {
			// Map the resolver over the aliases and flatten
			var polyfillIdentifierNames = aliasResolver(polyfillIdentifier.name);

			return polyfillIdentifierNames.map(function(name) {
				return {
					name: name,
					flags: polyfillIdentifier.flags,
					aliasOf: polyfillIdentifier.aliasOf || [polyfillIdentifier.name]
				};
			});
		});

		// Remove duplicates: When removing duplicates, if one is found ->
		// concat the flags and the aliasOf fields.
		var polyfillSet = {};
		expandedPolyfills.forEach(function(polyfill) {
			if (!polyfillSet[polyfill.name]) {
				polyfillSet[polyfill.name] = polyfill;
			} else {
				polyfillSet[polyfill.name].aliasOf = polyfillSet[polyfill.name].aliasOf.concat(polyfill.aliasOf);
				polyfillSet[polyfill.name].flags   = polyfillSet[polyfill.name].flags.concat(polyfill.flags);
			}
		});

		// Get the object's values (Kind of like an Object.values function)
		var arrayOfPolyfills = Object.keys(polyfillSet).map(function(key) { return polyfillSet[key]; });

		return arrayOfPolyfills;
	}

	return {
		/**
		 * Resolve an array of polyfill identifiers by iteratively invoking the
		 * resolver functions on each element.
		 *
		 * @param {array} polyfillAliases The f aliases to resolve
		 * @returns {array} An expanded list of resolved aliases.
		 */
		resolvePolyfills: function(polyfillIdentifiers) {
			var currentPolyfillIdentifiers = polyfillIdentifiers;

			aliasResolverFunctions.forEach(function(resolverFunction) {
				currentPolyfillIdentifiers = applyResolverToAliases(currentPolyfillIdentifiers, resolverFunction);
			});

			return currentPolyfillIdentifiers;
		},
		addResolver: function(func) {
			aliasResolvers.push(func);
			return this;
		},
		clearResolvers: function() {
			aliasResolvers = [];
		}
	}
}());

/**
 * Apply a function to each element in the array and concatenate the result
 * of the function into a new array.
 *
 * @example The difference between map and flatMap
 * > [0, 1, 2].map(function(val) {return [val + 1, val + 2]; });
 * [ [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ]
 *
 * > flatMap([0, 1, 2], function(val) { return [val + 1, val + 2]; });
 * [ 1, 2, 2, 3, 3, 4 ]
 */
function flatMap(array, func) {
	return Array.prototype.concat.apply([], array.map(func));
};
