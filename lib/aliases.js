/**
 * The AliasResolver provides the logic used for expanding and resolving
 * polyfill identifiers using more than one mechanism (if required).
 *
 * A polyfill identifier is an object with at least a 'name' and 'flags'
 * property, where the 'name' is the string identifying a polyfill and
 * 'flags' is an array containing any flags that should be applied with
 * the polyfill (and subsequently to any aliased polyfills).
 *
 *  e.g: { name: "modernizr:es5", flags: ["always"] }
 */
module.exports = (function() {

	/** An array of functions that map a string identifier (e.g. an alias) to an array of
	 * potentially alternate string identifiers (e.g. expanded names the alias refers to)
	 *
	 * The key point is that each is invoked in sequence with the result of
	 * the previous function as an argument.
	 */
	var polyfillNameResolverFunctions = [];

	/**
	 * Run a name resolver function over each polyfill identifier in an array,
	 * remove duplicates after the resolution and keep track of aliases and
	 * flags.
	 *
	 * @param {array}    polyfillIdentifiers          A list of polyfill identifiers to expand.
	 * @param {Function} polyfillNameResolverFunction The identifier name resolver function to use in
	 *                                                the resolution process.
	 *
	 * @return {array} An expanded list of polyfill identifiers
	 */
	function applyResolverToIdentifiers(polyfillIdentifiers, polyfillNameResolverFunction) {

		var expandedPolyfills = flatMap(polyfillIdentifiers, function(polyfillIdentifier) {
			var polyfillIdentifierNames = polyfillNameResolverFunction(polyfillIdentifier.name);

			// If the resolver function returns null, undefined or anything else that
			// is not an array of size > 0, just return the polyfillIdentifier
			// to be handled by subsequent steps.
			if (!Array.isArray(polyfillIdentifierNames) || polyfillIdentifierNames.length === 0) {
				return polyfillIdentifier;
			}

			// For each polyfill identifier name, apply the aliases and flags
			// and return an array of Polyfill Identifier Objects
			return polyfillIdentifierNames.map(function(name) {
				// It is possible that the name of an alias may also be the
				// name of a polyfill.  In this case avoid setting an alias of
				// itself
				var aliasOf = polyfillIdentifier.aliasOf || (polyfillIdentifier.name === name ? [] : [polyfillIdentifier.name]);

				return {
					name: name,
					flags: polyfillIdentifier.flags,
					aliasOf: aliasOf
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
				var aliasOf = polyfillSet[polyfill.name].aliasOf;
				var flags = polyfillSet[polyfill.name].flags;

				if (aliasOf && polyfill.aliasOf) {
					polyfillSet[polyfill.name].aliasOf =  aliasOf.concat(polyfill.aliasOf);
				} else if (polyfill.aliasOf) {
					polyfillSet[polyfill.name].aliasOf =  polyfill.aliasOf;
				}

				if (flags && polyfill.flags) {
					polyfillSet[polyfill.name].flags   = flags.concat(polyfill.flags);
				} else if (polyfill.flags) {
					polyfillSet[polyfill.name].flags   = polyfill.flags;

				}
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

			polyfillNameResolverFunctions.forEach(function(resolverFunction) {
				currentPolyfillIdentifiers = applyResolverToIdentifiers(currentPolyfillIdentifiers, resolverFunction);
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
			polyfillNameResolverFunctions.push(resolverFunction);
			return this;
		},
		clearResolvers: function() {
			polyfillNameResolverFunctions = [];
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
