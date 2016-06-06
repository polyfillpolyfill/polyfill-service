(function () {
	var ArrayIterator = require('es6-iterator/array')
	Array.prototype[Symbol.iterator] = function values () {
	  return new ArrayIterator(this);
	};
})();
