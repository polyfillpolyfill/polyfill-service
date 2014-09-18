/*
 * Utility to convert between polyfill list and a query string representation
 */

var PolyfillSet = function(polyfillset) {
	this.data = polyfillset;
};

PolyfillSet.prototype.stringify = function() {
	return this.data.map(function(polyfill) {
		return polyfill.name + (polyfill.flags.length ? '|' + polyfill.flags.join('|') : '');
	}).join(',');
};
PolyfillSet.prototype.get = function() {
	return this.data;
};


PolyfillSet.fromQueryParam = function(polyfillList, additionalFlags) {
	var list = polyfillList.split(',').filter(function(x) { return x.length; });
	additionalFlags = additionalFlags || [];

	return new PolyfillSet(list.sort().map(function parsePolyfillInfo(name) {
		var nameAndFlags = name.split('|');
		return {
			flags:   nameAndFlags.slice(1).concat(additionalFlags),
			name:    nameAndFlags[0]
		};
	}));
};

module.exports = PolyfillSet;
