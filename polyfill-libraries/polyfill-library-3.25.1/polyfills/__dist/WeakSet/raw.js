
// WeakSet
/**
 * @license
 *
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function(global) {
	var counter = Date.now() % 1e9;

	var WeakSet = function WeakSet(data) {
		this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
		data && data.forEach && data.forEach(this.add, this);
	};

	WeakSet.prototype["add"] = function(obj) {
		var name = this.name;
		if (!obj[name]) Object.defineProperty(obj, name, {value: true, writable: true});
		return this;
	};
	WeakSet.prototype["delete"] = function(obj) {
		if (!obj[this.name]) return false;
		obj[this.name] = undefined;
		return true;
	};
	WeakSet.prototype["has"] = function(obj) {
		return !!obj[this.name];
	};

	WeakSet.prototype.constructor = WeakSet;
	WeakSet.name = "WeakSet";

	global.WeakSet = WeakSet;
}(this));
