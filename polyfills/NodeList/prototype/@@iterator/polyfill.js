(function () {
	var ArrayIterator = require('es6-iterator/array');
	NodeList.prototype[Symbol.iterator] = function () {
	  return new ArrayIterator(this);
	};
})();
