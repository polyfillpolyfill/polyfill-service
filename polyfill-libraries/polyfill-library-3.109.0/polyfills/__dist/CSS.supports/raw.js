
// CSS.supports
/*! CSS.supports() Polyfill
 * https://gist.github.com/codler/03a0995195aa2859465f
 * Copyright (c) 2014 Han Lin Yap http://yap.nu; MIT license */

/*
 * This polyfill has 2 issues:
 * On presto-based opera browsers (12.1, op_mini) it just uses window.supportsCSS with whatever limitations this has (i couldnt find out).
 * when there is an earlier version of window.CSS.supports present, it will get used and the parentheses-less one-argument version will not work.
 * It maybe not be performant when used excessively, once requested values will get cached though (will increase memory usage if used excessively).
 */
(function() {
	//reassignment for presto-based opera-browsers
	if ("supportsCSS" in window) {
		window.CSS = {};
		window.CSS.supports = window.supportsCSS;
		return;
	}
	// if window.CSS doesnt exist, add it
	if (!("CSS" in window)) window.CSS = {};
	// if window.CSS.supports doesnt exist, use polyfill
	if (!("supports" in window.CSS)) {
		var _cache = {};
		window.CSS.supports = function(propertyName, value) {
			var key = [propertyName, value].toString();
			if (key in _cache) return _cache[key];

			//recursive calls if there are multiple CSS Property Values
			function cssSupports(propertyName, value) {
				var style = document.createElement("div").style;
				//case 1: boolean supports(CSSOMString conditionText);
				if (typeof propertyName === "string" && !value) {
					var arrOr = mergeOdd(propertyName, /([)])\s*or\s*([(])/gi);
					if (arrOr)
						return arrOr.some(function(supportsCondition) {
							return window.CSS.supports(supportsCondition);
						});
					var arrAnd = mergeOdd(propertyName, /([)])\s*and\s*([(])/gi);
					if (arrAnd)
						return arrAnd.every(function(supportsCondition) {
							return window.CSS.supports(supportsCondition);
						});
					//remove the first and last parentheses
					style.cssText = propertyName.replace("(", "").replace(/[)]$/, "");
					//is invalid when it doesnt get parsed
					return !!style.length;
				}
				//case 2: boolean supports(CSSOMString property, CSSOMString value);
				else if (
					typeof propertyName === "string" &&
					typeof value === "string"
				) {
					style.cssText = propertyName + ":" + value;
					return !!style.length;
				}
				//doesnt match either function signature
				else return false;
			}

			return (_cache[key] = cssSupports(propertyName, value));
		};
	}

	//split string with regex -> pair strings -> filter out falsy values
	function mergeOdd(propertyName, reg) {
		var arr = propertyName.split(reg);
		if (arr.length > 1)
			return arr
				.map(function(value, index, arr) {
					return index % 2 == 0 ? value + arr[index + 1] : "";
				})
				.filter(Boolean);
	}
})();
