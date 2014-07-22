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
	 * Run an alias resolver function over each element in an array of polyfill identifier objects.
	 *
	 * @param {array}    aliases       A list of polyfill identifiers to expand.
	 * @param {Function} aliasResolver The alias resolver function to use in
	 *                                 the resolution process.
	 *
	 * @return {array} An expanded list of polyfill identifiers
	 */
	function applyResolverToAliases(aliases, aliasResolverFunction) {

		var expandedPolyfills = flatMap(aliases, function(polyfillIdentifier) {
			var polyfillIdentifierNames = aliasResolverFunction(polyfillIdentifier.name);

			// For each polyfill identifier name, apply the aliases and flags
			// and return an array of Polyfill Identifier Objects
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

		// Get the object's values (kind of like an imaginary Object.values function) as
		// an array
		var arrayOfPolyfills = Object.keys(polyfillSet).map(function(key) { return polyfillSet[key]; });

		return arrayOfPolyfills;
	}

	return {
		/**
		 * Resolve an array of polyfill identifiers by iteratively invoking the
		 * resolver functions on each element.
		 *
		 * @param {array} polyfillIdentifiers The polyfill identifier objects
		 *                                    to resolve. A polyfill identifier is
		 *                                    an object with a 'name' property as a string
		 *                                    and a 'flags' property as an array
		 *
		 * @returns {array} An resolved list of resolved polyfill identifiers.
		 */
		resolvePolyfills: function(polyfillIdentifiers) {
			var currentPolyfillIdentifiers = polyfillIdentifiers;

			aliasResolverFunctions.forEach(function(resolverFunction) {
				currentPolyfillIdentifiers = applyResolverToAliases(currentPolyfillIdentifiers, resolverFunction);
			});

			return currentPolyfillIdentifiers;
		},
		/** Add a resolution function to the end of the alias resolution
		 * logic.
		 *
		 * @param {Function} A function that takes a single string argument
		 *                   and returns an array of string elements
		 *                   representing the expanded identifiers/aliases.
		 */
		addResolver: function(resolverFunction) {
			aliasResolvers.push(resolverFunction);
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
