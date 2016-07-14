(function () {
	var ArrayIterator = require('es6-iterator/array')
	NodeList.protoype[Symbol.iterator] = function values () {
	  return new ArrayIterator(this);
	};
})();
