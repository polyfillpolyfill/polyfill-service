'use strict';

/*
 * Utility to convert between polyfill list and a query string representation
 *
 */

const PolyfillSet = function(polyfillset) {
	this.data = polyfillset;
};

PolyfillSet.prototype.get = function() {
	return this.data;
};


PolyfillSet.fromQueryParam = function(polyfillList, additionalFlags) {
	if (!polyfillList || !polyfillList.split) polyfillList = 'default';
	const list = polyfillList
		.split(',')
		.filter(x => x.length)
		.map(x => x.replace(/[\*\/]/g, '')) // Eliminate XSS vuln
	;
	additionalFlags = additionalFlags || [];

	return new PolyfillSet(list.sort().reduce((obj, name) => {
		const nameAndFlags = name.split('|');
		obj[nameAndFlags[0]] = {
			flags: new Set(nameAndFlags.slice(1).concat(additionalFlags))
		};
		return obj;
	}, {}));
};

module.exports = PolyfillSet;
