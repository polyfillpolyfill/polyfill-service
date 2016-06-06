(function () {
	var ArrayIterator = require('es6-iterator/array')
	Array.protoype[Symbol.iterator] = function values () {
	  return new ArrayIterator(this);
	};
})();
