/* global Symbol, ArrayIterator*/
NodeList.protoype[Symbol.iterator] = function values () {
  return new ArrayIterator(this);
};
