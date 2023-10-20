
// Symbol.prototype.description
/* global Symbol, Type */

var supportsGetters = (function() {
  try {
    var a = {};
    Object.defineProperty(a, "t", {
      configurable: true,
      enumerable: false,
      get: function() {
        return true;
      },
      set: undefined
    });
    return !!a.t;
  } catch (e) {
    return false;
  }
})();
if (supportsGetters) {
  (function() {
    var getInferredName;
    try {
      // eslint-disable-next-line no-new-func
      getInferredName = Function("s", "return { [s]() {} }[s].name;");
      // eslint-disable-next-line no-empty
    } catch (e) {}

    var inferred = function() {};
    var supportsInferredNames =
      getInferredName && inferred.name === "inferred" ? getInferredName : null;

    // The abstract operation thisSymbolValue(value) performs the following steps:
    function thisSymbolValue(value) {
      // 1. If Type(value) is Symbol, return value.
      if (Type(value) === "symbol") {
        return value;
      }
      // 2. If Type(value) is Object and value has a [[SymbolData]] internal slot, then
      // a. Let s be value.[[SymbolData]].
      // b. Assert: Type(s) is Symbol.
      // c. Return s.
      // 3. Throw a TypeError exception.
      throw TypeError(value + " is not a symbol");
    }

    // 19.4.3.2 get Symbol.prototype.description
    Object.defineProperty(Symbol.prototype, "description", {
      configurable: true,
      enumerable: false,
      get: function() {
        // 1. Let s be the this value.
        var s = this;
        // 2. Let sym be ? thisSymbolValue(s).
        var sym = thisSymbolValue(s);
        // 3. Return sym.[[Description]].
        if (supportsInferredNames) {
          var name = getInferredName(sym);
          if (name === "") {
            return undefined;
          }
          return name.slice(1, -1); // name.slice('['.length, -']'.length);
        }

        var string = sym.toString();
        return string.slice(7, string.length - 1);
      }
    });
  })();
}
