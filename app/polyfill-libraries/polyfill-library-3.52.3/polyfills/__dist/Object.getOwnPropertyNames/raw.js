
// Object.getOwnPropertyNames
/* global CreateMethodProperty, ToObject */
(function() {
  var toString = {}.toString;
  var split = "".split;
  var concat = [].concat;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var nativeGetOwnPropertyNames = Object.getOwnPropertyNames || Object.keys;
  var cachedWindowNames =
    typeof self === "object" ? nativeGetOwnPropertyNames(self) : [];

  // 19.1.2.10 Object.getOwnPropertyNames ( O )
  CreateMethodProperty(
    Object,
    "getOwnPropertyNames",
    function getOwnPropertyNames(O) {
      var object = ToObject(O);

      if (toString.call(object) === "[object Window]") {
        try {
          return nativeGetOwnPropertyNames(object);
        } catch (e) {
          // IE bug where layout engine calls userland Object.getOwnPropertyNames for cross-domain `window` objects
          return concat.call([], cachedWindowNames);
        }
      }

      // Polyfill.io fallback for non-array-like strings which exist in some ES3 user-agents (IE 8)
      object =
        toString.call(object) == "[object String]"
          ? split.call(object, "")
          : Object(object);

      var result = nativeGetOwnPropertyNames(object);
      var extraNonEnumerableKeys = ["length", "prototype"];
      for (var i = 0; i < extraNonEnumerableKeys.length; i++) {
        var key = extraNonEnumerableKeys[i];
        if (hasOwnProperty.call(object, key) && !result.includes(key)) {
          result.push(key);
        }
      }

      if (result.includes("__proto__")) {
        var index = result.indexOf("__proto__");
        result.splice(index, 1);
      }

      return result;
    }
  );
})();
