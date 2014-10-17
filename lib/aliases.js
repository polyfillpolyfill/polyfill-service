/**
 * AliasResolvers provide logic used for expanding and resolving feature identifiers using more than one mechanism (if required).
 *
 * A feature identifier is an object key with optionally a 'flags' (array) property and other properties.  The key is the string identifying a feature (or group of features), 'flags' is an array containing any flags that alter the way that the feature should be polyfilled (and therefore also need to apply to any aliased polyfills), while all other properties are preserved only on the parent.
 *
 *  e.g: { "modernizr:es5": { flags: ["always"], polyfillVariant: "default" } }
 */
var AliasResolver = function(resolvers) {

	/** An array of functions that map a feature name and properties identifier (e.g. an alias) to a set of
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
 * @param {array} featureSet The feature identifiers to resolve.
 * @returns {array} A list of resolved feature identifiers.
 */
AliasResolver.prototype.resolve = function(featureSet) {
	var resolvingSet = featureSet;

	this.polyfillNameResolverFunctions.forEach(function(resolverFunction) {
		resolvingSet = applyResolverToIdentifiers(resolvingSet, resolverFunction);
	});

	return resolvingSet;
};

module.exports = AliasResolver;



/**
 * Run a name resolver function over each polyfill identifier in an array,
 * remove duplicates after the resolution and keep track of aliases and
 * flags.
 *
 * @param {array}    featureSet           A list of feature identifier objects to expand.
 * @param {Function} nameResolverFunction The function to use in the resolution process. Must take a string name as a single arg and return an array of names to which the specified name maps, or undefined if it has no mapping for that name.
 *
 * @return {array} An expanded list of polyfill identifiers
 */
function applyResolverToIdentifiers(featureSet, nameResolverFunction) {
	var _ = require('lodash');

	Object.keys(featureSet).forEach(function(featureName) {
		var feature = featureSet[featureName];
		var resultItems = nameResolverFunction(featureName);
		if (!Array.isArray(resultItems)) return true;

		resultItems.forEach(function(newName) {
			if (newName !== featureName) {
				var result = _.extend({}, feature, {
					aliasOf: _.uniq([featureName].concat(feature.aliasOf || [])),
					flags: feature.flags || []
				});

				if (!featureSet[newName]) {
					featureSet[newName] = result;
				} else {
					['flags', 'aliasOf'].forEach(function mergeProperties(prop) {
						featureSet[newName][prop] = (prop in featureSet[newName]) ? _.uniq(featureSet[newName][prop].concat(result[prop])) : result[prop];
					});
				}
			}
		});

		if (resultItems.indexOf(featureName) === -1) delete featureSet[featureName];
	});
	return featureSet;
}
