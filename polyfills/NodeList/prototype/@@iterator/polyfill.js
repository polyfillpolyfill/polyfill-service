(function () {
	const ArrayIterator = require('es6-iterator/array')
	NodeList.protoype[Symbol.iterator] = function () {
	  return new ArrayIterator(this);
	};
})();
