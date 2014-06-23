
function AliasResolver(resolvers) {
	this.aliasResolvers = resolvers || [
		function identity(name) {
			return [name];
		}
	];
}

AliasResolver.prototype.resolve = function(polyfillAliases) {
	var expandedAliases = polyfillAliases;

	this.aliasResolvers.forEach(function(aliasResolver) {
		expandedAliases = processListOfAliases(expandedAliases, aliasResolver);
	});

	return expandedAliases;
};

/**
 * FP Helper:
 * flatMap lambda over the terms in array.
 */
var flatMap = function(array, lambda) {
	return Array.prototype.concat.apply([], array.map(lambda));
};

function processListOfAliases(aliases, aliasResolver) {
	return flatMap(aliases, function(name) {
		return aliasResolver(name);
	}).filter(function(name, position, self) {
		return self.indexOf(name) == position;
	});
}


module.exports = AliasResolver;
