/** Any Helper functions specific to the service reside here.
 */
module.exports = {
	parseRequestedPolyfills: function(polyfillList, additionalFlags) {
		var list = polyfillList.split(',').filter(function(x) { return x.length; });
		additionalFlags = additionalFlags || [];

		return list.map(function parsePolyfillInfo(name) {
			var nameAndFlags = name.split('|');
			return {
				flags:   nameAndFlags.slice(1).concat(additionalFlags),
				name:    nameAndFlags[0]
			};
		});
	}
};

