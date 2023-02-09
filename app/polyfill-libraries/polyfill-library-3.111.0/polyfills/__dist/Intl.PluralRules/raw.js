
// Intl.PluralRules
(function() {
  // node_modules/tslib/tslib.es6.js
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i];
    return to;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/utils.js
  function getMagnitude(x) {
    return Math.floor(Math.log(x) * Math.LOG10E);
  }
  function repeat(s, times) {
    if (typeof s.repeat === "function") {
      return s.repeat(times);
    }
    var arr = new Array(times);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = s;
    }
    return arr.join("");
  }
  var UNICODE_EXTENSION_SEQUENCE_REGEX = /-u(?:-[0-9a-z]{2,8})+/gi;
  function invariant(condition, message, Err) {
    if (Err === void 0) {
      Err = Error;
    }
    if (!condition) {
      throw new Err(message);
    }
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/types/date-time.js
  var RangePatternType;
  (function(RangePatternType2) {
    RangePatternType2["startRange"] = "startRange";
    RangePatternType2["shared"] = "shared";
    RangePatternType2["endRange"] = "endRange";
  })(RangePatternType || (RangePatternType = {}));

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/CanonicalizeLocaleList.js
  function CanonicalizeLocaleList(locales) {
    return Intl.getCanonicalLocales(locales);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/262.js
  function ToString(o) {
    if (typeof o === "symbol") {
      throw TypeError("Cannot convert a Symbol value to a string");
    }
    return String(o);
  }
  function ToNumber(val) {
    if (val === void 0) {
      return NaN;
    }
    if (val === null) {
      return 0;
    }
    if (typeof val === "boolean") {
      return val ? 1 : 0;
    }
    if (typeof val === "number") {
      return val;
    }
    if (typeof val === "symbol" || typeof val === "bigint") {
      throw new TypeError("Cannot convert symbol/bigint to number");
    }
    return Number(val);
  }
  function ToObject(arg) {
    if (arg == null) {
      throw new TypeError("undefined/null cannot be converted to object");
    }
    return Object(arg);
  }
  function SameValue(x, y) {
    if (Object.is) {
      return Object.is(x, y);
    }
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    }
    return x !== x && y !== y;
  }
  function Type(x) {
    if (x === null) {
      return "Null";
    }
    if (typeof x === "undefined") {
      return "Undefined";
    }
    if (typeof x === "function" || typeof x === "object") {
      return "Object";
    }
    if (typeof x === "number") {
      return "Number";
    }
    if (typeof x === "boolean") {
      return "Boolean";
    }
    if (typeof x === "string") {
      return "String";
    }
    if (typeof x === "symbol") {
      return "Symbol";
    }
    if (typeof x === "bigint") {
      return "BigInt";
    }
  }
  var MINUTES_PER_HOUR = 60;
  var SECONDS_PER_MINUTE = 60;
  var MS_PER_SECOND = 1e3;
  var MS_PER_MINUTE = MS_PER_SECOND * SECONDS_PER_MINUTE;
  var MS_PER_HOUR = MS_PER_MINUTE * MINUTES_PER_HOUR;

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/CoerceOptionsToObject.js
  function CoerceOptionsToObject(options) {
    if (typeof options === "undefined") {
      return Object.create(null);
    }
    return ToObject(options);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/GetOption.js
  function GetOption(opts, prop, type, values, fallback) {
    if (typeof opts !== "object") {
      throw new TypeError("Options must be an object");
    }
    var value = opts[prop];
    if (value !== void 0) {
      if (type !== "boolean" && type !== "string") {
        throw new TypeError("invalid type");
      }
      if (type === "boolean") {
        value = Boolean(value);
      }
      if (type === "string") {
        value = ToString(value);
      }
      if (values !== void 0 && !values.filter(function(val) {
        return val == value;
      }).length) {
        throw new RangeError(value + " is not within " + values.join(", "));
      }
      return value;
    }
    return fallback;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/BestAvailableLocale.js
  function BestAvailableLocale(availableLocales, locale) {
    var candidate = locale;
    while (true) {
      if (availableLocales.has(candidate)) {
        return candidate;
      }
      var pos = candidate.lastIndexOf("-");
      if (!~pos) {
        return void 0;
      }
      if (pos >= 2 && candidate[pos - 2] === "-") {
        pos -= 2;
      }
      candidate = candidate.slice(0, pos);
    }
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/LookupMatcher.js
  function LookupMatcher(availableLocales, requestedLocales, getDefaultLocale) {
    var result = {locale: ""};
    for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
      var locale = requestedLocales_1[_i];
      var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, "");
      var availableLocale = BestAvailableLocale(availableLocales, noExtensionLocale);
      if (availableLocale) {
        result.locale = availableLocale;
        if (locale !== noExtensionLocale) {
          result.extension = locale.slice(noExtensionLocale.length + 1, locale.length);
        }
        return result;
      }
    }
    result.locale = getDefaultLocale();
    return result;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/BestFitMatcher.js
  function BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale) {
    var minimizedAvailableLocaleMap = {};
    var minimizedAvailableLocales = new Set();
    availableLocales.forEach(function(locale2) {
      var minimizedLocale = new Intl.Locale(locale2).minimize().toString();
      minimizedAvailableLocaleMap[minimizedLocale] = locale2;
      minimizedAvailableLocales.add(minimizedLocale);
    });
    var foundLocale;
    for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
      var l = requestedLocales_1[_i];
      if (foundLocale) {
        break;
      }
      var noExtensionLocale = l.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, "");
      if (availableLocales.has(noExtensionLocale)) {
        foundLocale = noExtensionLocale;
        break;
      }
      if (minimizedAvailableLocales.has(noExtensionLocale)) {
        foundLocale = minimizedAvailableLocaleMap[noExtensionLocale];
        break;
      }
      var locale = new Intl.Locale(noExtensionLocale);
      var maximizedRequestedLocale = locale.maximize().toString();
      var minimizedRequestedLocale = locale.minimize().toString();
      if (minimizedAvailableLocales.has(minimizedRequestedLocale)) {
        foundLocale = minimizedAvailableLocaleMap[minimizedRequestedLocale];
        break;
      }
      foundLocale = BestAvailableLocale(minimizedAvailableLocales, maximizedRequestedLocale);
    }
    return {
      locale: foundLocale || getDefaultLocale()
    };
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/UnicodeExtensionValue.js
  function UnicodeExtensionValue(extension, key) {
    invariant(key.length === 2, "key must have 2 elements");
    var size = extension.length;
    var searchValue = "-" + key + "-";
    var pos = extension.indexOf(searchValue);
    if (pos !== -1) {
      var start = pos + 4;
      var end = start;
      var k = start;
      var done = false;
      while (!done) {
        var e = extension.indexOf("-", k);
        var len = void 0;
        if (e === -1) {
          len = size - k;
        } else {
          len = e - k;
        }
        if (len === 2) {
          done = true;
        } else if (e === -1) {
          end = size;
          done = true;
        } else {
          end = e;
          k = e + 1;
        }
      }
      return extension.slice(start, end);
    }
    searchValue = "-" + key;
    pos = extension.indexOf(searchValue);
    if (pos !== -1 && pos + 3 === size) {
      return "";
    }
    return void 0;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/ResolveLocale.js
  function ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData, getDefaultLocale) {
    var matcher = options.localeMatcher;
    var r;
    if (matcher === "lookup") {
      r = LookupMatcher(availableLocales, requestedLocales, getDefaultLocale);
    } else {
      r = BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale);
    }
    var foundLocale = r.locale;
    var result = {locale: "", dataLocale: foundLocale};
    var supportedExtension = "-u";
    for (var _i = 0, relevantExtensionKeys_1 = relevantExtensionKeys; _i < relevantExtensionKeys_1.length; _i++) {
      var key = relevantExtensionKeys_1[_i];
      invariant(foundLocale in localeData, "Missing locale data for " + foundLocale);
      var foundLocaleData = localeData[foundLocale];
      invariant(typeof foundLocaleData === "object" && foundLocaleData !== null, "locale data " + key + " must be an object");
      var keyLocaleData = foundLocaleData[key];
      invariant(Array.isArray(keyLocaleData), "keyLocaleData for " + key + " must be an array");
      var value = keyLocaleData[0];
      invariant(typeof value === "string" || value === null, "value must be string or null but got " + typeof value + " in key " + key);
      var supportedExtensionAddition = "";
      if (r.extension) {
        var requestedValue = UnicodeExtensionValue(r.extension, key);
        if (requestedValue !== void 0) {
          if (requestedValue !== "") {
            if (~keyLocaleData.indexOf(requestedValue)) {
              value = requestedValue;
              supportedExtensionAddition = "-" + key + "-" + value;
            }
          } else if (~requestedValue.indexOf("true")) {
            value = "true";
            supportedExtensionAddition = "-" + key;
          }
        }
      }
      if (key in options) {
        var optionsValue = options[key];
        invariant(typeof optionsValue === "string" || typeof optionsValue === "undefined" || optionsValue === null, "optionsValue must be String, Undefined or Null");
        if (~keyLocaleData.indexOf(optionsValue)) {
          if (optionsValue !== value) {
            value = optionsValue;
            supportedExtensionAddition = "";
          }
        }
      }
      result[key] = value;
      supportedExtension += supportedExtensionAddition;
    }
    if (supportedExtension.length > 2) {
      var privateIndex = foundLocale.indexOf("-x-");
      if (privateIndex === -1) {
        foundLocale = foundLocale + supportedExtension;
      } else {
        var preExtension = foundLocale.slice(0, privateIndex);
        var postExtension = foundLocale.slice(privateIndex, foundLocale.length);
        foundLocale = preExtension + supportedExtension + postExtension;
      }
      foundLocale = Intl.getCanonicalLocales(foundLocale)[0];
    }
    result.locale = foundLocale;
    return result;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DefaultNumberOption.js
  function DefaultNumberOption(val, min, max, fallback) {
    if (val !== void 0) {
      val = Number(val);
      if (isNaN(val) || val < min || val > max) {
        throw new RangeError(val + " is outside of range [" + min + ", " + max + "]");
      }
      return Math.floor(val);
    }
    return fallback;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/GetNumberOption.js
  function GetNumberOption(options, property, minimum, maximum, fallback) {
    var val = options[property];
    return DefaultNumberOption(val, minimum, maximum, fallback);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/IsSanctionedSimpleUnitIdentifier.js
  var SANCTIONED_UNITS = [
    "angle-degree",
    "area-acre",
    "area-hectare",
    "concentr-percent",
    "digital-bit",
    "digital-byte",
    "digital-gigabit",
    "digital-gigabyte",
    "digital-kilobit",
    "digital-kilobyte",
    "digital-megabit",
    "digital-megabyte",
    "digital-petabyte",
    "digital-terabit",
    "digital-terabyte",
    "duration-day",
    "duration-hour",
    "duration-millisecond",
    "duration-minute",
    "duration-month",
    "duration-second",
    "duration-week",
    "duration-year",
    "length-centimeter",
    "length-foot",
    "length-inch",
    "length-kilometer",
    "length-meter",
    "length-mile-scandinavian",
    "length-mile",
    "length-millimeter",
    "length-yard",
    "mass-gram",
    "mass-kilogram",
    "mass-ounce",
    "mass-pound",
    "mass-stone",
    "temperature-celsius",
    "temperature-fahrenheit",
    "volume-fluid-ounce",
    "volume-gallon",
    "volume-liter",
    "volume-milliliter"
  ];
  function removeUnitNamespace(unit) {
    return unit.slice(unit.indexOf("-") + 1);
  }
  var SIMPLE_UNITS = SANCTIONED_UNITS.map(removeUnitNamespace);

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/ToRawPrecision.js
  function ToRawPrecision(x, minPrecision, maxPrecision) {
    var p = maxPrecision;
    var m;
    var e;
    var xFinal;
    if (x === 0) {
      m = repeat("0", p);
      e = 0;
      xFinal = 0;
    } else {
      var xToString = x.toString();
      var xToStringExponentIndex = xToString.indexOf("e");
      var _a = xToString.split("e"), xToStringMantissa = _a[0], xToStringExponent = _a[1];
      var xToStringMantissaWithoutDecimalPoint = xToStringMantissa.replace(".", "");
      if (xToStringExponentIndex >= 0 && xToStringMantissaWithoutDecimalPoint.length <= p) {
        e = +xToStringExponent;
        m = xToStringMantissaWithoutDecimalPoint + repeat("0", p - xToStringMantissaWithoutDecimalPoint.length);
        xFinal = x;
      } else {
        e = getMagnitude(x);
        var decimalPlaceOffset = e - p + 1;
        var n = Math.round(adjustDecimalPlace(x, decimalPlaceOffset));
        if (adjustDecimalPlace(n, p - 1) >= 10) {
          e = e + 1;
          n = Math.floor(n / 10);
        }
        m = n.toString();
        xFinal = adjustDecimalPlace(n, p - 1 - e);
      }
    }
    var int;
    if (e >= p - 1) {
      m = m + repeat("0", e - p + 1);
      int = e + 1;
    } else if (e >= 0) {
      m = m.slice(0, e + 1) + "." + m.slice(e + 1);
      int = e + 1;
    } else {
      m = "0." + repeat("0", -e - 1) + m;
      int = 1;
    }
    if (m.indexOf(".") >= 0 && maxPrecision > minPrecision) {
      var cut = maxPrecision - minPrecision;
      while (cut > 0 && m[m.length - 1] === "0") {
        m = m.slice(0, -1);
        cut--;
      }
      if (m[m.length - 1] === ".") {
        m = m.slice(0, -1);
      }
    }
    return {formattedString: m, roundedNumber: xFinal, integerDigitsCount: int};
    function adjustDecimalPlace(x2, magnitude) {
      return magnitude < 0 ? x2 * Math.pow(10, -magnitude) : x2 / Math.pow(10, magnitude);
    }
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/ToRawFixed.js
  function ToRawFixed(x, minFraction, maxFraction) {
    var f = maxFraction;
    var n = Math.round(x * Math.pow(10, f));
    var xFinal = n / Math.pow(10, f);
    var m;
    if (n < 1e21) {
      m = n.toString();
    } else {
      m = n.toString();
      var _a = m.split("e"), mantissa = _a[0], exponent = _a[1];
      m = mantissa.replace(".", "");
      m = m + repeat("0", Math.max(+exponent - m.length + 1, 0));
    }
    var int;
    if (f !== 0) {
      var k = m.length;
      if (k <= f) {
        var z = repeat("0", f + 1 - k);
        m = z + m;
        k = f + 1;
      }
      var a = m.slice(0, k - f);
      var b = m.slice(k - f);
      m = a + "." + b;
      int = a.length;
    } else {
      int = m.length;
    }
    var cut = maxFraction - minFraction;
    while (cut > 0 && m[m.length - 1] === "0") {
      m = m.slice(0, -1);
      cut--;
    }
    if (m[m.length - 1] === ".") {
      m = m.slice(0, -1);
    }
    return {formattedString: m, roundedNumber: xFinal, integerDigitsCount: int};
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/FormatNumericToString.js
  function FormatNumericToString(intlObject, x) {
    var isNegative = x < 0 || SameValue(x, -0);
    if (isNegative) {
      x = -x;
    }
    var result;
    var rourndingType = intlObject.roundingType;
    switch (rourndingType) {
      case "significantDigits":
        result = ToRawPrecision(x, intlObject.minimumSignificantDigits, intlObject.maximumSignificantDigits);
        break;
      case "fractionDigits":
        result = ToRawFixed(x, intlObject.minimumFractionDigits, intlObject.maximumFractionDigits);
        break;
      default:
        result = ToRawPrecision(x, 1, 2);
        if (result.integerDigitsCount > 1) {
          result = ToRawFixed(x, 0, 0);
        }
        break;
    }
    x = result.roundedNumber;
    var string = result.formattedString;
    var int = result.integerDigitsCount;
    var minInteger = intlObject.minimumIntegerDigits;
    if (int < minInteger) {
      var forwardZeros = repeat("0", minInteger - int);
      string = forwardZeros + string;
    }
    if (isNegative) {
      x = -x;
    }
    return {roundedNumber: x, formattedString: string};
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/regex.generated.js
  var S_UNICODE_REGEX = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BF\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEE0-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDD78\uDD7A-\uDDCB\uDDCD-\uDE53\uDE60-\uDE6D\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6\uDF00-\uDF92\uDF94-\uDFCA]/;

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/format_to_parts.js
  var CARET_S_UNICODE_REGEX = new RegExp("^" + S_UNICODE_REGEX.source);
  var S_DOLLAR_UNICODE_REGEX = new RegExp(S_UNICODE_REGEX.source + "$");

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/SetNumberFormatDigitOptions.js
  function SetNumberFormatDigitOptions(internalSlots, opts, mnfdDefault, mxfdDefault, notation) {
    var mnid = GetNumberOption(opts, "minimumIntegerDigits", 1, 21, 1);
    var mnfd = opts.minimumFractionDigits;
    var mxfd = opts.maximumFractionDigits;
    var mnsd = opts.minimumSignificantDigits;
    var mxsd = opts.maximumSignificantDigits;
    internalSlots.minimumIntegerDigits = mnid;
    if (mnsd !== void 0 || mxsd !== void 0) {
      internalSlots.roundingType = "significantDigits";
      mnsd = DefaultNumberOption(mnsd, 1, 21, 1);
      mxsd = DefaultNumberOption(mxsd, mnsd, 21, 21);
      internalSlots.minimumSignificantDigits = mnsd;
      internalSlots.maximumSignificantDigits = mxsd;
    } else if (mnfd !== void 0 || mxfd !== void 0) {
      internalSlots.roundingType = "fractionDigits";
      mnfd = DefaultNumberOption(mnfd, 0, 20, mnfdDefault);
      var mxfdActualDefault = Math.max(mnfd, mxfdDefault);
      mxfd = DefaultNumberOption(mxfd, mnfd, 20, mxfdActualDefault);
      internalSlots.minimumFractionDigits = mnfd;
      internalSlots.maximumFractionDigits = mxfd;
    } else if (notation === "compact") {
      internalSlots.roundingType = "compactRounding";
    } else {
      internalSlots.roundingType = "fractionDigits";
      internalSlots.minimumFractionDigits = mnfdDefault;
      internalSlots.maximumFractionDigits = mxfdDefault;
    }
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/PluralRules/GetOperands.js
  function GetOperands(s) {
    invariant(typeof s === "string", "GetOperands should have been called with a string");
    var n = ToNumber(s);
    invariant(isFinite(n), "n should be finite");
    var dp = s.indexOf(".");
    var iv;
    var f;
    var v;
    var fv = "";
    if (dp === -1) {
      iv = n;
      f = 0;
      v = 0;
    } else {
      iv = s.slice(0, dp);
      fv = s.slice(dp, s.length);
      f = ToNumber(fv);
      v = fv.length;
    }
    var i = Math.abs(ToNumber(iv));
    var w;
    var t;
    if (f !== 0) {
      var ft = fv.replace(/0+$/, "");
      w = ft.length;
      t = ToNumber(ft);
    } else {
      w = 0;
      t = 0;
    }
    return {
      Number: n,
      IntegerDigits: i,
      NumberOfFractionDigits: v,
      NumberOfFractionDigitsWithoutTrailing: w,
      FractionDigits: f,
      FractionDigitsWithoutTrailing: t
    };
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/PluralRules/InitializePluralRules.js
  function InitializePluralRules(pl, locales, options, _a) {
    var availableLocales = _a.availableLocales, relevantExtensionKeys = _a.relevantExtensionKeys, localeData = _a.localeData, getDefaultLocale = _a.getDefaultLocale, getInternalSlots2 = _a.getInternalSlots;
    var requestedLocales = CanonicalizeLocaleList(locales);
    var opt = Object.create(null);
    var opts = CoerceOptionsToObject(options);
    var internalSlots = getInternalSlots2(pl);
    internalSlots.initializedPluralRules = true;
    var matcher = GetOption(opts, "localeMatcher", "string", ["best fit", "lookup"], "best fit");
    opt.localeMatcher = matcher;
    internalSlots.type = GetOption(opts, "type", "string", ["cardinal", "ordinal"], "cardinal");
    SetNumberFormatDigitOptions(internalSlots, opts, 0, 3, "standard");
    var r = ResolveLocale(availableLocales, requestedLocales, opt, relevantExtensionKeys, localeData, getDefaultLocale);
    internalSlots.locale = r.locale;
    return pl;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/PluralRules/ResolvePlural.js
  function ResolvePlural(pl, n, _a) {
    var getInternalSlots2 = _a.getInternalSlots, PluralRuleSelect2 = _a.PluralRuleSelect;
    var internalSlots = getInternalSlots2(pl);
    invariant(Type(internalSlots) === "Object", "pl has to be an object");
    invariant("initializedPluralRules" in internalSlots, "pluralrules must be initialized");
    invariant(Type(n) === "Number", "n must be a number");
    if (!isFinite(n)) {
      return "other";
    }
    var locale = internalSlots.locale, type = internalSlots.type;
    var res = FormatNumericToString(internalSlots, n);
    var s = res.formattedString;
    var operands = GetOperands(s);
    return PluralRuleSelect2(locale, type, n, operands);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/LookupSupportedLocales.js
  function LookupSupportedLocales(availableLocales, requestedLocales) {
    var subset = [];
    for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
      var locale = requestedLocales_1[_i];
      var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, "");
      var availableLocale = BestAvailableLocale(availableLocales, noExtensionLocale);
      if (availableLocale) {
        subset.push(availableLocale);
      }
    }
    return subset;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/SupportedLocales.js
  function SupportedLocales(availableLocales, requestedLocales, options) {
    var matcher = "best fit";
    if (options !== void 0) {
      options = ToObject(options);
      matcher = GetOption(options, "localeMatcher", "string", ["lookup", "best fit"], "best fit");
    }
    if (matcher === "best fit") {
      return LookupSupportedLocales(availableLocales, requestedLocales);
    }
    return LookupSupportedLocales(availableLocales, requestedLocales);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/data.js
  var MissingLocaleDataError = function(_super) {
    __extends(MissingLocaleDataError2, _super);
    function MissingLocaleDataError2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = "MISSING_LOCALE_DATA";
      return _this;
    }
    return MissingLocaleDataError2;
  }(Error);

  // bazel-out/darwin-fastbuild/bin/packages/intl-pluralrules/lib/get_internal_slots.js
  var internalSlotMap = new WeakMap();
  function getInternalSlots(x) {
    var internalSlots = internalSlotMap.get(x);
    if (!internalSlots) {
      internalSlots = Object.create(null);
      internalSlotMap.set(x, internalSlots);
    }
    return internalSlots;
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-pluralrules/lib/index.js
  function validateInstance(instance, method) {
    if (!(instance instanceof PluralRules)) {
      throw new TypeError("Method Intl.PluralRules.prototype." + method + " called on incompatible receiver " + String(instance));
    }
  }
  function PluralRuleSelect(locale, type, _n, _a) {
    var IntegerDigits = _a.IntegerDigits, NumberOfFractionDigits = _a.NumberOfFractionDigits, FractionDigits = _a.FractionDigits;
    return PluralRules.localeData[locale].fn(NumberOfFractionDigits ? IntegerDigits + "." + FractionDigits : IntegerDigits, type === "ordinal");
  }
  var PluralRules = function() {
    function PluralRules2(locales, options) {
      var newTarget = this && this instanceof PluralRules2 ? this.constructor : void 0;
      if (!newTarget) {
        throw new TypeError("Intl.PluralRules must be called with 'new'");
      }
      return InitializePluralRules(this, locales, options, {
        availableLocales: PluralRules2.availableLocales,
        relevantExtensionKeys: PluralRules2.relevantExtensionKeys,
        localeData: PluralRules2.localeData,
        getDefaultLocale: PluralRules2.getDefaultLocale,
        getInternalSlots: getInternalSlots
      });
    }
    PluralRules2.prototype.resolvedOptions = function() {
      validateInstance(this, "resolvedOptions");
      var opts = Object.create(null);
      var internalSlots = getInternalSlots(this);
      opts.locale = internalSlots.locale;
      opts.type = internalSlots.type;
      [
        "minimumIntegerDigits",
        "minimumFractionDigits",
        "maximumFractionDigits",
        "minimumSignificantDigits",
        "maximumSignificantDigits"
      ].forEach(function(field) {
        var val = internalSlots[field];
        if (val !== void 0) {
          opts[field] = val;
        }
      });
      opts.pluralCategories = __spreadArray([], PluralRules2.localeData[opts.locale].categories[opts.type]);
      return opts;
    };
    PluralRules2.prototype.select = function(val) {
      var pr = this;
      validateInstance(pr, "select");
      var n = ToNumber(val);
      return ResolvePlural(pr, n, {getInternalSlots: getInternalSlots, PluralRuleSelect: PluralRuleSelect});
    };
    PluralRules2.prototype.toString = function() {
      return "[object Intl.PluralRules]";
    };
    PluralRules2.supportedLocalesOf = function(locales, options) {
      return SupportedLocales(PluralRules2.availableLocales, CanonicalizeLocaleList(locales), options);
    };
    PluralRules2.__addLocaleData = function() {
      var data = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
      }
      for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
        var _b = data_1[_a], d = _b.data, locale = _b.locale;
        PluralRules2.localeData[locale] = d;
        PluralRules2.availableLocales.add(locale);
        if (!PluralRules2.__defaultLocale) {
          PluralRules2.__defaultLocale = locale;
        }
      }
    };
    PluralRules2.getDefaultLocale = function() {
      return PluralRules2.__defaultLocale;
    };
    PluralRules2.localeData = {};
    PluralRules2.availableLocales = new Set();
    PluralRules2.__defaultLocale = "";
    PluralRules2.relevantExtensionKeys = [];
    PluralRules2.polyfilled = true;
    return PluralRules2;
  }();
  try {
    if (typeof Symbol !== "undefined") {
      Object.defineProperty(PluralRules.prototype, Symbol.toStringTag, {
        value: "Intl.PluralRules",
        writable: false,
        enumerable: false,
        configurable: true
      });
    }
    try {
      Object.defineProperty(PluralRules, "length", {
        value: 0,
        writable: false,
        enumerable: false,
        configurable: true
      });
    } catch (error) {
    }
    Object.defineProperty(PluralRules.prototype.constructor, "length", {
      value: 0,
      writable: false,
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(PluralRules.supportedLocalesOf, "length", {
      value: 1,
      writable: false,
      enumerable: false,
      configurable: true
    });
  } catch (ex) {
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-pluralrules/lib/should-polyfill.js
  function shouldPolyfill() {
    return typeof Intl === "undefined" || !("PluralRules" in Intl) || new Intl.PluralRules("en", {minimumFractionDigits: 2}).select(1) === "one";
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-pluralrules/lib/polyfill.js
  if (shouldPolyfill()) {
    Object.defineProperty(Intl, "PluralRules", {
      value: PluralRules,
      writable: true,
      enumerable: false,
      configurable: true
    });
  }
})();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

