/**
 * AliasResolvers provide logic used for expanding and resolving feature identifiers using more than one mechanism (if required).
 *
 * A feature identifier is an object with at least a 'name' property, and optionally also 'flags' (array) and other properties.  The 'name' is the string identifying a feature (or group of features), 'flags' is an array containing any flags that alter the way that the feature should be polyfilled (and therefore also need to apply to any aliased polyfills), while all other properties are preserved only on the parent.
 *
 *  e.g: { name: "modernizr:es5", flags: ["always"], polyfillVariant: "default" }
 */
var AliasResolver = function(resolvers) {

	/** An array of functions that map a string identifier (e.g. an alias) to an array of
	 * potentially alternate string identifiers (e.g. expanded names the alias refers to)
	 *
	 * The key point is that each is invoked in sequence with the result of
	 * the previous resolver function as an argument.
	 */
	this.polyfillNameResolverFunctions = resolvers;
};

/**
 * Resolve an array of polyfill identifiers by iteratively invoking the
 * resolver functions on each element.
 *
 * @param {array} ids The feature identifiers to resolve.
 * @returns {array} A list of resolved feature identifiers.
 */
AliasResolver.prototype.resolve = function(featureList) {
	var resolvingList = featureList;

	this.polyfillNameResolverFunctions.forEach(function(resolverFunction) {
		resolvingList = applyResolverToIdentifiers(resolvingList, resolverFunction);
	});

	return resolvingList;
};

module.exports = AliasResolver;



/**
 * Run a name resolver function over each polyfill identifier in an array,
 * remove duplicates after the resolution and keep track of aliases and
 * flags.
 *
 * @param {array}    featureList          A list of feature identifier objects to expand.
 * @param {Function} nameResolverFunction The function to use in the resolution process. Must take a string name as a single arg and return an array of names to which the specified name maps, or undefined if it has no mapping for that name.
 *
 * @return {array} An expanded list of polyfill identifiers
 */
function applyResolverToIdentifiers(featureList, nameResolverFunction) {
	var _ = require('lodash');

	var resolvedFeatures = flatMap(featureList, function(feature) {

		var resultItems = nameResolverFunction(feature);
		if (!Array.isArray(resultItems)) return feature;

		// For each polyfill identifier name, apply the aliases and flags
		// and return an array of Polyfill Identifier Objects
		return resultItems.map(function(result) {
			if (typeof result === 'string') result = {name: result};

			// Some resolvers may return a list that includes the original, in which case simply preserve the existing object
			if (result === feature || result.name === feature.name) return feature;

			result.aliasOf = _.uniq([feature.name].concat((result.aliasOf || []), (feature.aliasOf || [])));
			result.flags = result.flags || feature.flags || []

			return result;
		});
	});

	// Remove duplicates: When removing duplicates, if one is found ->
	// concat the flags and the aliasOf fields
	var uniqueSet = {};
	resolvedFeatures.forEach(function(feature) {
		if (!uniqueSet[feature.name]) {
			uniqueSet[feature.name] = feature;
		} else {
			['flags', 'aliasOf'].forEach(function mergeProperties(prop) {
				if (uniqueSet[feature.name][prop] && feature[prop]) {
					uniqueSet[feature.name][prop] = _.uniq(uniqueSet[feature.name][prop].concat(feature[prop]));
				} else if (feature[prop]) {
					uniqueSet[feature.name][prop] = feature[prop];
				}
			});
		}
	});

	// Return the object's values as an array (kind of like an imaginary Object.values function)
	return Object.keys(uniqueSet).map(function(key) { return uniqueSet[key]; });

}

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
