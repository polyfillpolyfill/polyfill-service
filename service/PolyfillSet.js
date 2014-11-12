/*
 * Utility to convert between polyfill list and a query string representation
 *
 */
'use strict';

var PolyfillSet = function(polyfillset) {
	this.data = polyfillset;
};

PolyfillSet.prototype.stringify = function() {
	return Object.keys(this.data).map(function(featureName) {
		var flags = this.data[featureName].flags;
		return featureName + (flags.length ? '|' + flags.join('|') : '');
	}, this).join(',');
};
PolyfillSet.prototype.get = function() {
	return this.data;
};


PolyfillSet.fromQueryParam = function(polyfillList, additionalFlags) {
	var list = polyfillList.split(',').filter(function(x) { return x.length; });
	additionalFlags = additionalFlags || [];

	return new PolyfillSet(list.sort().reduce(function parsePolyfillInfo(obj, name) {
		var nameAndFlags = name.split('|');
		obj[nameAndFlags[0]] = {
			flags:   nameAndFlags.slice(1).concat(additionalFlags)
		};
		return obj;
	}, {}));
};

module.exports = PolyfillSet;
