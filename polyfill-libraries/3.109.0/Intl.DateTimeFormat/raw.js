
// Intl.DateTimeFormat
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
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  function __rest(s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/utils.js
  function defineProperty(target, name, _a) {
    var value = _a.value;
    Object.defineProperty(target, name, {
      configurable: true,
      enumerable: false,
      writable: true,
      value: value
    });
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

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/utils.js
  var DATE_TIME_PROPS = [
    "weekday",
    "era",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "timeZoneName"
  ];
  var removalPenalty = 120;
  var additionPenalty = 20;
  var differentNumericTypePenalty = 15;
  var longLessPenalty = 8;
  var longMorePenalty = 6;
  var shortLessPenalty = 6;
  var shortMorePenalty = 3;

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/types/date-time.js
  var RangePatternType;
  (function(RangePatternType2) {
    RangePatternType2["startRange"] = "startRange";
    RangePatternType2["shared"] = "shared";
    RangePatternType2["endRange"] = "endRange";
  })(RangePatternType || (RangePatternType = {}));

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/skeleton.js
  var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
  var expPatternTrimmer = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  function matchSkeletonPattern(match, result) {
    var len = match.length;
    switch (match[0]) {
      case "G":
        result.era = len === 4 ? "long" : len === 5 ? "narrow" : "short";
        return "{era}";
      case "y":
      case "Y":
      case "u":
      case "U":
      case "r":
        result.year = len === 2 ? "2-digit" : "numeric";
        return "{year}";
      case "q":
      case "Q":
        throw new RangeError("`w/Q` (quarter) patterns are not supported");
      case "M":
      case "L":
        result.month = ["numeric", "2-digit", "short", "long", "narrow"][len - 1];
        return "{month}";
      case "w":
      case "W":
        throw new RangeError("`w/W` (week of year) patterns are not supported");
      case "d":
        result.day = ["numeric", "2-digit"][len - 1];
        return "{day}";
      case "D":
      case "F":
      case "g":
        result.day = "numeric";
        return "{day}";
      case "E":
        result.weekday = len === 4 ? "long" : len === 5 ? "narrow" : "short";
        return "{weekday}";
      case "e":
        result.weekday = [
          void 0,
          void 0,
          "short",
          "long",
          "narrow",
          "short"
        ][len - 1];
        return "{weekday}";
      case "c":
        result.weekday = [
          void 0,
          void 0,
          "short",
          "long",
          "narrow",
          "short"
        ][len - 1];
        return "{weekday}";
      case "a":
      case "b":
      case "B":
        result.hour12 = true;
        return "{ampm}";
      case "h":
        result.hour = ["numeric", "2-digit"][len - 1];
        result.hour12 = true;
        return "{hour}";
      case "H":
        result.hour = ["numeric", "2-digit"][len - 1];
        return "{hour}";
      case "K":
        result.hour = ["numeric", "2-digit"][len - 1];
        result.hour12 = true;
        return "{hour}";
      case "k":
        result.hour = ["numeric", "2-digit"][len - 1];
        return "{hour}";
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      case "m":
        result.minute = ["numeric", "2-digit"][len - 1];
        return "{minute}";
      case "s":
        result.second = ["numeric", "2-digit"][len - 1];
        return "{second}";
      case "S":
      case "A":
        result.second = "numeric";
        return "{second}";
      case "z":
      case "Z":
      case "O":
      case "v":
      case "V":
      case "X":
      case "x":
        result.timeZoneName = len < 4 ? "short" : "long";
        return "{timeZoneName}";
    }
    return "";
  }
  function skeletonTokenToTable2(c) {
    switch (c) {
      case "G":
        return "era";
      case "y":
      case "Y":
      case "u":
      case "U":
      case "r":
        return "year";
      case "M":
      case "L":
        return "month";
      case "d":
      case "D":
      case "F":
      case "g":
        return "day";
      case "a":
      case "b":
      case "B":
        return "ampm";
      case "h":
      case "H":
      case "K":
      case "k":
        return "hour";
      case "m":
        return "minute";
      case "s":
      case "S":
      case "A":
        return "second";
      default:
        throw new RangeError("Invalid range pattern token");
    }
  }
  function processDateTimePattern(pattern, result) {
    var literals = [];
    var pattern12 = pattern.replace(/'{2}/g, "{apostrophe}").replace(/'(.*?)'/g, function(_, literal) {
      literals.push(literal);
      return "$$" + (literals.length - 1) + "$$";
    }).replace(DATE_TIME_REGEX, function(m) {
      return matchSkeletonPattern(m, result || {});
    });
    if (literals.length) {
      pattern12 = pattern12.replace(/\$\$(\d+)\$\$/g, function(_, i) {
        return literals[+i];
      }).replace(/\{apostrophe\}/g, "'");
    }
    return [
      pattern12.replace(/([\s\uFEFF\xA0])\{ampm\}([\s\uFEFF\xA0])/, "$1").replace("{ampm}", "").replace(expPatternTrimmer, ""),
      pattern12
    ];
  }
  function parseDateTimeSkeleton(skeleton, rawPattern, rangePatterns, intervalFormatFallback) {
    if (rawPattern === void 0) {
      rawPattern = skeleton;
    }
    var result = {
      pattern: "",
      pattern12: "",
      skeleton: skeleton,
      rawPattern: rawPattern,
      rangePatterns: {},
      rangePatterns12: {}
    };
    if (rangePatterns) {
      for (var k in rangePatterns) {
        var key = skeletonTokenToTable2(k);
        var rawPattern_1 = rangePatterns[k];
        var intervalResult = {
          patternParts: []
        };
        var _a = processDateTimePattern(rawPattern_1, intervalResult), pattern_1 = _a[0], pattern12_1 = _a[1];
        result.rangePatterns[key] = __assign(__assign({}, intervalResult), {patternParts: splitRangePattern(pattern_1)});
        result.rangePatterns12[key] = __assign(__assign({}, intervalResult), {patternParts: splitRangePattern(pattern12_1)});
      }
    } else if (intervalFormatFallback) {
      var patternParts = splitFallbackRangePattern(intervalFormatFallback);
      result.rangePatterns.default = {
        patternParts: patternParts
      };
      result.rangePatterns12.default = {
        patternParts: patternParts
      };
    }
    skeleton.replace(DATE_TIME_REGEX, function(m) {
      return matchSkeletonPattern(m, result);
    });
    var _b = processDateTimePattern(rawPattern), pattern = _b[0], pattern12 = _b[1];
    result.pattern = pattern;
    result.pattern12 = pattern12;
    return result;
  }
  function splitFallbackRangePattern(pattern) {
    var parts = pattern.split(/(\{[0|1]\})/g).filter(Boolean);
    return parts.map(function(pattern2) {
      switch (pattern2) {
        case "{0}":
          return {
            source: RangePatternType.startRange,
            pattern: pattern2
          };
        case "{1}":
          return {
            source: RangePatternType.endRange,
            pattern: pattern2
          };
        default:
          return {
            source: RangePatternType.shared,
            pattern: pattern2
          };
      }
    });
  }
  function splitRangePattern(pattern) {
    var PART_REGEX = /\{(.*?)\}/g;
    var parts = {};
    var match;
    var splitIndex = 0;
    while (match = PART_REGEX.exec(pattern)) {
      if (!(match[0] in parts)) {
        parts[match[0]] = match.index;
      } else {
        splitIndex = match.index;
        break;
      }
    }
    if (!splitIndex) {
      return [
        {
          source: RangePatternType.startRange,
          pattern: pattern
        }
      ];
    }
    return [
      {
        source: RangePatternType.startRange,
        pattern: pattern.slice(0, splitIndex)
      },
      {
        source: RangePatternType.endRange,
        pattern: pattern.slice(splitIndex)
      }
    ];
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/BestFitFormatMatcher.js
  function isNumericType(t) {
    return t === "numeric" || t === "2-digit";
  }
  function bestFitFormatMatcherScore(options, format) {
    var score = 0;
    if (options.hour12 && !format.hour12) {
      score -= removalPenalty;
    } else if (!options.hour12 && format.hour12) {
      score -= additionPenalty;
    }
    for (var _i = 0, DATE_TIME_PROPS_1 = DATE_TIME_PROPS; _i < DATE_TIME_PROPS_1.length; _i++) {
      var prop = DATE_TIME_PROPS_1[_i];
      var optionsProp = options[prop];
      var formatProp = format[prop];
      if (optionsProp === void 0 && formatProp !== void 0) {
        score -= additionPenalty;
      } else if (optionsProp !== void 0 && formatProp === void 0) {
        score -= removalPenalty;
      } else if (optionsProp !== formatProp) {
        if (isNumericType(optionsProp) !== isNumericType(formatProp)) {
          score -= differentNumericTypePenalty;
        } else {
          var values = ["2-digit", "numeric", "narrow", "short", "long"];
          var optionsPropIndex = values.indexOf(optionsProp);
          var formatPropIndex = values.indexOf(formatProp);
          var delta = Math.max(-2, Math.min(formatPropIndex - optionsPropIndex, 2));
          if (delta === 2) {
            score -= longMorePenalty;
          } else if (delta === 1) {
            score -= shortMorePenalty;
          } else if (delta === -1) {
            score -= shortLessPenalty;
          } else if (delta === -2) {
            score -= longLessPenalty;
          }
        }
      }
    }
    return score;
  }
  function BestFitFormatMatcher(options, formats) {
    var bestScore = -Infinity;
    var bestFormat = formats[0];
    invariant(Array.isArray(formats), "formats should be a list of things");
    for (var _i = 0, formats_1 = formats; _i < formats_1.length; _i++) {
      var format = formats_1[_i];
      var score = bestFitFormatMatcherScore(options, format);
      if (score > bestScore) {
        bestScore = score;
        bestFormat = format;
      }
    }
    var skeletonFormat = __assign({}, bestFormat);
    var patternFormat = {rawPattern: bestFormat.rawPattern};
    processDateTimePattern(bestFormat.rawPattern, patternFormat);
    for (var prop in skeletonFormat) {
      var skeletonValue = skeletonFormat[prop];
      var patternValue = patternFormat[prop];
      var requestedValue = options[prop];
      if (prop === "minute" || prop === "second") {
        continue;
      }
      if (!requestedValue) {
        continue;
      }
      if (isNumericType(patternValue) && !isNumericType(requestedValue)) {
        continue;
      }
      if (skeletonValue === requestedValue) {
        continue;
      }
      patternFormat[prop] = requestedValue;
    }
    patternFormat.pattern = skeletonFormat.pattern;
    patternFormat.pattern12 = skeletonFormat.pattern12;
    patternFormat.skeleton = skeletonFormat.skeleton;
    patternFormat.rangePatterns = skeletonFormat.rangePatterns;
    patternFormat.rangePatterns12 = skeletonFormat.rangePatterns12;
    return patternFormat;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/CanonicalizeLocaleList.js
  function CanonicalizeLocaleList(locales) {
    return Intl.getCanonicalLocales(locales);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/CanonicalizeTimeZoneName.js
  function CanonicalizeTimeZoneName(tz, _a) {
    var tzData = _a.tzData, uppercaseLinks = _a.uppercaseLinks;
    var uppercasedTz = tz.toUpperCase();
    var uppercasedZones = Object.keys(tzData).reduce(function(all, z) {
      all[z.toUpperCase()] = z;
      return all;
    }, {});
    var ianaTimeZone = uppercaseLinks[uppercasedTz] || uppercasedZones[uppercasedTz];
    if (ianaTimeZone === "Etc/UTC" || ianaTimeZone === "Etc/GMT") {
      return "UTC";
    }
    return ianaTimeZone;
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
  function ToInteger(n) {
    var number = ToNumber(n);
    if (isNaN(number) || SameValue(number, -0)) {
      return 0;
    }
    if (isFinite(number)) {
      return number;
    }
    var integer = Math.floor(Math.abs(number));
    if (number < 0) {
      integer = -integer;
    }
    if (SameValue(integer, -0)) {
      return 0;
    }
    return integer;
  }
  function TimeClip(time) {
    if (!isFinite(time)) {
      return NaN;
    }
    if (Math.abs(time) > 8.64 * 1e15) {
      return NaN;
    }
    return ToInteger(time);
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
  function ArrayCreate(len) {
    return new Array(len);
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
  var MS_PER_DAY = 864e5;
  function mod(x, y) {
    return x - Math.floor(x / y) * y;
  }
  function Day(t) {
    return Math.floor(t / MS_PER_DAY);
  }
  function WeekDay(t) {
    return mod(Day(t) + 4, 7);
  }
  function DayFromYear(y) {
    return Date.UTC(y, 0) / MS_PER_DAY;
  }
  function YearFromTime(t) {
    return new Date(t).getUTCFullYear();
  }
  function DaysInYear(y) {
    if (y % 4 !== 0) {
      return 365;
    }
    if (y % 100 !== 0) {
      return 366;
    }
    if (y % 400 !== 0) {
      return 365;
    }
    return 366;
  }
  function DayWithinYear(t) {
    return Day(t) - DayFromYear(YearFromTime(t));
  }
  function InLeapYear(t) {
    return DaysInYear(YearFromTime(t)) === 365 ? 0 : 1;
  }
  function MonthFromTime(t) {
    var dwy = DayWithinYear(t);
    var leap = InLeapYear(t);
    if (dwy >= 0 && dwy < 31) {
      return 0;
    }
    if (dwy < 59 + leap) {
      return 1;
    }
    if (dwy < 90 + leap) {
      return 2;
    }
    if (dwy < 120 + leap) {
      return 3;
    }
    if (dwy < 151 + leap) {
      return 4;
    }
    if (dwy < 181 + leap) {
      return 5;
    }
    if (dwy < 212 + leap) {
      return 6;
    }
    if (dwy < 243 + leap) {
      return 7;
    }
    if (dwy < 273 + leap) {
      return 8;
    }
    if (dwy < 304 + leap) {
      return 9;
    }
    if (dwy < 334 + leap) {
      return 10;
    }
    if (dwy < 365 + leap) {
      return 11;
    }
    throw new Error("Invalid time");
  }
  function DateFromTime(t) {
    var dwy = DayWithinYear(t);
    var mft = MonthFromTime(t);
    var leap = InLeapYear(t);
    if (mft === 0) {
      return dwy + 1;
    }
    if (mft === 1) {
      return dwy - 30;
    }
    if (mft === 2) {
      return dwy - 58 - leap;
    }
    if (mft === 3) {
      return dwy - 89 - leap;
    }
    if (mft === 4) {
      return dwy - 119 - leap;
    }
    if (mft === 5) {
      return dwy - 150 - leap;
    }
    if (mft === 6) {
      return dwy - 180 - leap;
    }
    if (mft === 7) {
      return dwy - 211 - leap;
    }
    if (mft === 8) {
      return dwy - 242 - leap;
    }
    if (mft === 9) {
      return dwy - 272 - leap;
    }
    if (mft === 10) {
      return dwy - 303 - leap;
    }
    if (mft === 11) {
      return dwy - 333 - leap;
    }
    throw new Error("Invalid time");
  }
  var HOURS_PER_DAY = 24;
  var MINUTES_PER_HOUR = 60;
  var SECONDS_PER_MINUTE = 60;
  var MS_PER_SECOND = 1e3;
  var MS_PER_MINUTE = MS_PER_SECOND * SECONDS_PER_MINUTE;
  var MS_PER_HOUR = MS_PER_MINUTE * MINUTES_PER_HOUR;
  function HourFromTime(t) {
    return mod(Math.floor(t / MS_PER_HOUR), HOURS_PER_DAY);
  }
  function MinFromTime(t) {
    return mod(Math.floor(t / MS_PER_MINUTE), MINUTES_PER_HOUR);
  }
  function SecFromTime(t) {
    return mod(Math.floor(t / MS_PER_SECOND), SECONDS_PER_MINUTE);
  }
  function IsCallable(fn) {
    return typeof fn === "function";
  }
  function OrdinaryHasInstance(C, O, internalSlots) {
    if (!IsCallable(C)) {
      return false;
    }
    if (internalSlots === null || internalSlots === void 0 ? void 0 : internalSlots.boundTargetFunction) {
      var BC = internalSlots === null || internalSlots === void 0 ? void 0 : internalSlots.boundTargetFunction;
      return O instanceof BC;
    }
    if (typeof O !== "object") {
      return false;
    }
    var P = C.prototype;
    if (typeof P !== "object") {
      throw new TypeError("OrdinaryHasInstance called on an object with an invalid prototype property.");
    }
    return Object.prototype.isPrototypeOf.call(P, O);
  }
  function msFromTime(t) {
    return mod(t, MS_PER_SECOND);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/BasicFormatMatcher.js
  function BasicFormatMatcher(options, formats) {
    var bestScore = -Infinity;
    var bestFormat = formats[0];
    invariant(Array.isArray(formats), "formats should be a list of things");
    for (var _i = 0, formats_1 = formats; _i < formats_1.length; _i++) {
      var format = formats_1[_i];
      var score = 0;
      for (var _a = 0, DATE_TIME_PROPS_1 = DATE_TIME_PROPS; _a < DATE_TIME_PROPS_1.length; _a++) {
        var prop = DATE_TIME_PROPS_1[_a];
        var optionsProp = options[prop];
        var formatProp = format[prop];
        if (optionsProp === void 0 && formatProp !== void 0) {
          score -= additionPenalty;
        } else if (optionsProp !== void 0 && formatProp === void 0) {
          score -= removalPenalty;
        } else if (optionsProp !== formatProp) {
          var values = void 0;
          if (prop === "fractionalSecondDigits") {
            values = [1, 2, 3];
          } else {
            values = ["2-digit", "numeric", "narrow", "short", "long"];
          }
          var optionsPropIndex = values.indexOf(optionsProp);
          var formatPropIndex = values.indexOf(formatProp);
          var delta = Math.max(-2, Math.min(formatPropIndex - optionsPropIndex, 2));
          if (delta === 2) {
            score -= longMorePenalty;
          } else if (delta === 1) {
            score -= shortMorePenalty;
          } else if (delta === -1) {
            score -= shortLessPenalty;
          } else if (delta === -2) {
            score -= longLessPenalty;
          }
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestFormat = format;
      }
    }
    return __assign({}, bestFormat);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/DateTimeStyleFormat.js
  function DateTimeStyleFormat(dateStyle, timeStyle, dataLocaleData) {
    var dateFormat, timeFormat;
    if (timeStyle !== void 0) {
      invariant(timeStyle === "full" || timeStyle === "long" || timeStyle === "medium" || timeStyle === "short", "invalid timeStyle");
      timeFormat = dataLocaleData.timeFormat[timeStyle];
    }
    if (dateStyle !== void 0) {
      invariant(dateStyle === "full" || dateStyle === "long" || dateStyle === "medium" || dateStyle === "short", "invalid dateStyle");
      dateFormat = dataLocaleData.dateFormat[dateStyle];
    }
    if (dateStyle !== void 0 && timeStyle !== void 0) {
      var format = {};
      for (var field in dateFormat) {
        if (field !== "pattern") {
          format[field] = dateFormat[field];
        }
      }
      for (var field in timeFormat) {
        if (field !== "pattern" && field !== "pattern12") {
          format[field] = timeFormat[field];
        }
      }
      var connector = dataLocaleData.dateTimeFormat[dateStyle];
      var pattern = connector.replace("{0}", timeFormat.pattern).replace("{1}", dateFormat.pattern);
      format.pattern = pattern;
      if ("pattern12" in timeFormat) {
        var pattern12 = connector.replace("{0}", timeFormat.pattern12).replace("{1}", dateFormat.pattern);
        format.pattern12 = pattern12;
      }
      return format;
    }
    if (timeStyle !== void 0) {
      return timeFormat;
    }
    invariant(dateStyle !== void 0, "dateStyle should not be undefined");
    return dateFormat;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/ToLocalTime.js
  function getApplicableZoneData(t, timeZone, tzData) {
    var _a;
    var zoneData = tzData[timeZone];
    if (!zoneData) {
      return [0, false];
    }
    var i = 0;
    var offset = 0;
    var dst = false;
    for (; i <= zoneData.length; i++) {
      if (i === zoneData.length || zoneData[i][0] * 1e3 > t) {
        ;
        _a = zoneData[i - 1], offset = _a[2], dst = _a[3];
        break;
      }
    }
    return [offset * 1e3, dst];
  }
  function ToLocalTime(t, calendar, timeZone, _a) {
    var tzData = _a.tzData;
    invariant(Type(t) === "Number", "invalid time");
    invariant(calendar === "gregory", "We only support Gregory calendar right now");
    var _b = getApplicableZoneData(t, timeZone, tzData), timeZoneOffset = _b[0], inDST = _b[1];
    var tz = t + timeZoneOffset;
    var year = YearFromTime(tz);
    return {
      weekday: WeekDay(tz),
      era: year < 0 ? "BC" : "AD",
      year: year,
      relatedYear: void 0,
      yearName: void 0,
      month: MonthFromTime(tz),
      day: DateFromTime(tz),
      hour: HourFromTime(tz),
      minute: MinFromTime(tz),
      second: SecFromTime(tz),
      millisecond: msFromTime(tz),
      inDST: inDST,
      timeZoneOffset: timeZoneOffset
    };
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/FormatDateTimePattern.js
  function pad(n) {
    if (n < 10) {
      return "0" + n;
    }
    return String(n);
  }
  function offsetToGmtString(gmtFormat, hourFormat, offsetInMs, style) {
    var offsetInMinutes = Math.floor(offsetInMs / 6e4);
    var mins = Math.abs(offsetInMinutes) % 60;
    var hours = Math.floor(Math.abs(offsetInMinutes) / 60);
    var _a = hourFormat.split(";"), positivePattern = _a[0], negativePattern = _a[1];
    var offsetStr = "";
    var pattern = offsetInMs < 0 ? negativePattern : positivePattern;
    if (style === "long") {
      offsetStr = pattern.replace("HH", pad(hours)).replace("H", String(hours)).replace("mm", pad(mins)).replace("m", String(mins));
    } else if (mins || hours) {
      if (!mins) {
        pattern = pattern.replace(/:?m+/, "");
      }
      offsetStr = pattern.replace(/H+/, String(hours)).replace(/m+/, String(mins));
    }
    return gmtFormat.replace("{0}", offsetStr);
  }
  function FormatDateTimePattern(dtf, patternParts, x, _a) {
    var getInternalSlots2 = _a.getInternalSlots, localeData = _a.localeData, getDefaultTimeZone = _a.getDefaultTimeZone, tzData = _a.tzData;
    x = TimeClip(x);
    var internalSlots = getInternalSlots2(dtf);
    var dataLocale = internalSlots.dataLocale;
    var dataLocaleData = localeData[dataLocale];
    var locale = internalSlots.locale;
    var nfOptions = Object.create(null);
    nfOptions.useGrouping = false;
    var nf = new Intl.NumberFormat(locale, nfOptions);
    var nf2Options = Object.create(null);
    nf2Options.minimumIntegerDigits = 2;
    nf2Options.useGrouping = false;
    var nf2 = new Intl.NumberFormat(locale, nf2Options);
    var fractionalSecondDigits = internalSlots.fractionalSecondDigits;
    var nf3;
    if (fractionalSecondDigits !== void 0) {
      var nf3Options = Object.create(null);
      nf3Options.minimumIntegerDigits = fractionalSecondDigits;
      nf3Options.useGrouping = false;
      nf3 = new Intl.NumberFormat(locale, nf3Options);
    }
    var tm = ToLocalTime(x, internalSlots.calendar, internalSlots.timeZone, {tzData: tzData});
    var result = [];
    for (var _i = 0, patternParts_1 = patternParts; _i < patternParts_1.length; _i++) {
      var patternPart = patternParts_1[_i];
      var p = patternPart.type;
      if (p === "literal") {
        result.push({
          type: "literal",
          value: patternPart.value
        });
      } else if (p === "fractionalSecondDigits") {
        var v = Math.floor(tm.millisecond * Math.pow(10, (fractionalSecondDigits || 0) - 3));
        result.push({
          type: "fractionalSecond",
          value: nf3.format(v)
        });
      } else if (DATE_TIME_PROPS.indexOf(p) > -1) {
        var fv = "";
        var f = internalSlots[p];
        var v = tm[p];
        if (p === "year" && v <= 0) {
          v = 1 - v;
        }
        if (p === "month") {
          v++;
        }
        var hourCycle = internalSlots.hourCycle;
        if (p === "hour" && (hourCycle === "h11" || hourCycle === "h12")) {
          v = v % 12;
          if (v === 0 && hourCycle === "h12") {
            v = 12;
          }
        }
        if (p === "hour" && hourCycle === "h24") {
          if (v === 0) {
            v = 24;
          }
        }
        if (f === "numeric") {
          fv = nf.format(v);
        } else if (f === "2-digit") {
          fv = nf2.format(v);
          if (fv.length > 2) {
            fv = fv.slice(fv.length - 2, fv.length);
          }
        } else if (f === "narrow" || f === "short" || f === "long") {
          if (p === "era") {
            fv = dataLocaleData[p][f][v];
          } else if (p === "timeZoneName") {
            var timeZoneName = dataLocaleData.timeZoneName, gmtFormat = dataLocaleData.gmtFormat, hourFormat = dataLocaleData.hourFormat;
            var timeZone = internalSlots.timeZone || getDefaultTimeZone();
            var timeZoneData = timeZoneName[timeZone];
            if (timeZoneData && timeZoneData[f]) {
              fv = timeZoneData[f][+tm.inDST];
            } else {
              fv = offsetToGmtString(gmtFormat, hourFormat, tm.timeZoneOffset, f);
            }
          } else if (p === "month") {
            fv = dataLocaleData.month[f][v - 1];
          } else {
            fv = dataLocaleData[p][f][v];
          }
        }
        result.push({
          type: p,
          value: fv
        });
      } else if (p === "ampm") {
        var v = tm.hour;
        var fv = void 0;
        if (v > 11) {
          fv = dataLocaleData.pm;
        } else {
          fv = dataLocaleData.am;
        }
        result.push({
          type: "dayPeriod",
          value: fv
        });
      } else if (p === "relatedYear") {
        var v = tm.relatedYear;
        var fv = nf.format(v);
        result.push({
          type: "relatedYear",
          value: fv
        });
      } else if (p === "yearName") {
        var v = tm.yearName;
        var fv = nf.format(v);
        result.push({
          type: "yearName",
          value: fv
        });
      }
    }
    return result;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/PartitionPattern.js
  function PartitionPattern(pattern) {
    var result = [];
    var beginIndex = pattern.indexOf("{");
    var endIndex = 0;
    var nextIndex = 0;
    var length = pattern.length;
    while (beginIndex < pattern.length && beginIndex > -1) {
      endIndex = pattern.indexOf("}", beginIndex);
      invariant(endIndex > beginIndex, "Invalid pattern " + pattern);
      if (beginIndex > nextIndex) {
        result.push({
          type: "literal",
          value: pattern.substring(nextIndex, beginIndex)
        });
      }
      result.push({
        type: pattern.substring(beginIndex + 1, endIndex),
        value: void 0
      });
      nextIndex = endIndex + 1;
      beginIndex = pattern.indexOf("{", nextIndex);
    }
    if (nextIndex < length) {
      result.push({
        type: "literal",
        value: pattern.substring(nextIndex, length)
      });
    }
    return result;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/PartitionDateTimePattern.js
  function PartitionDateTimePattern(dtf, x, implDetails) {
    x = TimeClip(x);
    if (isNaN(x)) {
      throw new RangeError("invalid time");
    }
    var getInternalSlots2 = implDetails.getInternalSlots;
    var internalSlots = getInternalSlots2(dtf);
    var pattern = internalSlots.pattern;
    return FormatDateTimePattern(dtf, PartitionPattern(pattern), x, implDetails);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/FormatDateTime.js
  function FormatDateTime(dtf, x, implDetails) {
    var parts = PartitionDateTimePattern(dtf, x, implDetails);
    var result = "";
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
      var part = parts_1[_i];
      result += part.value;
    }
    return result;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/PartitionDateTimeRangePattern.js
  var TABLE_2_FIELDS = [
    "era",
    "year",
    "month",
    "day",
    "ampm",
    "hour",
    "minute",
    "second",
    "fractionalSecondDigits"
  ];
  function PartitionDateTimeRangePattern(dtf, x, y, implDetails) {
    x = TimeClip(x);
    if (isNaN(x)) {
      throw new RangeError("Invalid start time");
    }
    y = TimeClip(y);
    if (isNaN(y)) {
      throw new RangeError("Invalid end time");
    }
    var getInternalSlots2 = implDetails.getInternalSlots, tzData = implDetails.tzData;
    var internalSlots = getInternalSlots2(dtf);
    var tm1 = ToLocalTime(x, internalSlots.calendar, internalSlots.timeZone, {tzData: tzData});
    var tm2 = ToLocalTime(y, internalSlots.calendar, internalSlots.timeZone, {tzData: tzData});
    var pattern = internalSlots.pattern, rangePatterns = internalSlots.rangePatterns;
    var rangePattern;
    var dateFieldsPracticallyEqual = true;
    var patternContainsLargerDateField = false;
    for (var _i = 0, TABLE_2_FIELDS_1 = TABLE_2_FIELDS; _i < TABLE_2_FIELDS_1.length; _i++) {
      var fieldName = TABLE_2_FIELDS_1[_i];
      if (dateFieldsPracticallyEqual && !patternContainsLargerDateField) {
        if (fieldName === "ampm") {
          var rp = rangePatterns.ampm;
          if (rangePattern !== void 0 && rp === void 0) {
            patternContainsLargerDateField = true;
          } else {
            var v1 = tm1.hour;
            var v2 = tm2.hour;
            if (v1 > 11 && v2 < 11 || v1 < 11 && v2 > 11) {
              dateFieldsPracticallyEqual = false;
            }
            rangePattern = rp;
          }
        } else if (fieldName === "fractionalSecondDigits") {
          var fractionalSecondDigits = internalSlots.fractionalSecondDigits;
          if (fractionalSecondDigits === void 0) {
            fractionalSecondDigits = 3;
          }
          var v1 = Math.floor(tm1.millisecond * Math.pow(10, fractionalSecondDigits - 3));
          var v2 = Math.floor(tm2.millisecond * Math.pow(10, fractionalSecondDigits - 3));
          if (v1 !== v2) {
            dateFieldsPracticallyEqual = false;
          }
        } else {
          var rp = rangePatterns[fieldName];
          if (rangePattern !== void 0 && rp === void 0) {
            patternContainsLargerDateField = true;
          } else {
            var v1 = tm1[fieldName];
            var v2 = tm2[fieldName];
            if (!SameValue(v1, v2)) {
              dateFieldsPracticallyEqual = false;
            }
            rangePattern = rp;
          }
        }
      }
    }
    if (dateFieldsPracticallyEqual) {
      var result_2 = FormatDateTimePattern(dtf, PartitionPattern(pattern), x, implDetails);
      for (var _a = 0, result_1 = result_2; _a < result_1.length; _a++) {
        var r = result_1[_a];
        r.source = RangePatternType.shared;
      }
      return result_2;
    }
    var result = [];
    if (rangePattern === void 0) {
      rangePattern = rangePatterns.default;
      for (var _b = 0, _c = rangePattern.patternParts; _b < _c.length; _b++) {
        var patternPart = _c[_b];
        if (patternPart.pattern === "{0}" || patternPart.pattern === "{1}") {
          patternPart.pattern = pattern;
        }
      }
    }
    for (var _d = 0, _e = rangePattern.patternParts; _d < _e.length; _d++) {
      var rangePatternPart = _e[_d];
      var source = rangePatternPart.source, pattern_1 = rangePatternPart.pattern;
      var z = void 0;
      if (source === RangePatternType.startRange || source === RangePatternType.shared) {
        z = x;
      } else {
        z = y;
      }
      var patternParts = PartitionPattern(pattern_1);
      var partResult = FormatDateTimePattern(dtf, patternParts, z, implDetails);
      for (var _f = 0, partResult_1 = partResult; _f < partResult_1.length; _f++) {
        var r = partResult_1[_f];
        r.source = source;
      }
      result = result.concat(partResult);
    }
    return result;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/FormatDateTimeRange.js
  function FormatDateTimeRange(dtf, x, y, implDetails) {
    var parts = PartitionDateTimeRangePattern(dtf, x, y, implDetails);
    var result = "";
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
      var part = parts_1[_i];
      result += part.value;
    }
    return result;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/FormatDateTimeRangeToParts.js
  function FormatDateTimeRangeToParts(dtf, x, y, implDetails) {
    var parts = PartitionDateTimeRangePattern(dtf, x, y, implDetails);
    var result = new Array(0);
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
      var part = parts_1[_i];
      result.push({
        type: part.type,
        value: part.value,
        source: part.source
      });
    }
    return result;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/FormatDateTimeToParts.js
  function FormatDateTimeToParts(dtf, x, implDetails) {
    var parts = PartitionDateTimePattern(dtf, x, implDetails);
    var result = ArrayCreate(0);
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
      var part = parts_1[_i];
      result.push({
        type: part.type,
        value: part.value
      });
    }
    return result;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/ToDateTimeOptions.js
  function ToDateTimeOptions(options, required, defaults) {
    if (options === void 0) {
      options = null;
    } else {
      options = ToObject(options);
    }
    options = Object.create(options);
    var needDefaults = true;
    if (required === "date" || required === "any") {
      for (var _i = 0, _a = ["weekday", "year", "month", "day"]; _i < _a.length; _i++) {
        var prop = _a[_i];
        var value = options[prop];
        if (value !== void 0) {
          needDefaults = false;
        }
      }
    }
    if (required === "time" || required === "any") {
      for (var _b = 0, _c = [
        "dayPeriod",
        "hour",
        "minute",
        "second",
        "fractionalSecondDigits"
      ]; _b < _c.length; _b++) {
        var prop = _c[_b];
        var value = options[prop];
        if (value !== void 0) {
          needDefaults = false;
        }
      }
    }
    if (options.dateStyle !== void 0 || options.timeStyle !== void 0) {
      needDefaults = false;
    }
    if (required === "date" && options.timeStyle) {
      throw new TypeError("Intl.DateTimeFormat date was required but timeStyle was included");
    }
    if (required === "time" && options.dateStyle) {
      throw new TypeError("Intl.DateTimeFormat time was required but dateStyle was included");
    }
    if (needDefaults && (defaults === "date" || defaults === "all")) {
      for (var _d = 0, _e = ["year", "month", "day"]; _d < _e.length; _d++) {
        var prop = _e[_d];
        options[prop] = "numeric";
      }
    }
    if (needDefaults && (defaults === "time" || defaults === "all")) {
      for (var _f = 0, _g = ["hour", "minute", "second"]; _f < _g.length; _f++) {
        var prop = _g[_f];
        options[prop] = "numeric";
      }
    }
    return options;
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

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/IsValidTimeZoneName.js
  function IsValidTimeZoneName(tz, _a) {
    var tzData = _a.tzData, uppercaseLinks = _a.uppercaseLinks;
    var uppercasedTz = tz.toUpperCase();
    var zoneNames = new Set();
    Object.keys(tzData).map(function(z) {
      return z.toUpperCase();
    }).forEach(function(z) {
      return zoneNames.add(z);
    });
    return zoneNames.has(uppercasedTz) || uppercasedTz in uppercaseLinks;
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

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/InitializeDateTimeFormat.js
  function isTimeRelated(opt) {
    for (var _i = 0, _a = ["hour", "minute", "second"]; _i < _a.length; _i++) {
      var prop = _a[_i];
      var value = opt[prop];
      if (value !== void 0) {
        return true;
      }
    }
    return false;
  }
  function resolveHourCycle(hc, hcDefault, hour12) {
    if (hc == null) {
      hc = hcDefault;
    }
    if (hour12 !== void 0) {
      if (hour12) {
        if (hcDefault === "h11" || hcDefault === "h23") {
          hc = "h11";
        } else {
          hc = "h12";
        }
      } else {
        invariant(!hour12, "hour12 must not be set");
        if (hcDefault === "h11" || hcDefault === "h23") {
          hc = "h23";
        } else {
          hc = "h24";
        }
      }
    }
    return hc;
  }
  var TYPE_REGEX = /^[a-z0-9]{3,8}$/i;
  function InitializeDateTimeFormat(dtf, locales, opts, _a) {
    var getInternalSlots2 = _a.getInternalSlots, availableLocales = _a.availableLocales, localeData = _a.localeData, getDefaultLocale = _a.getDefaultLocale, getDefaultTimeZone = _a.getDefaultTimeZone, relevantExtensionKeys = _a.relevantExtensionKeys, tzData = _a.tzData, uppercaseLinks = _a.uppercaseLinks;
    var requestedLocales = CanonicalizeLocaleList(locales);
    var options = ToDateTimeOptions(opts, "any", "date");
    var opt = Object.create(null);
    var matcher = GetOption(options, "localeMatcher", "string", ["lookup", "best fit"], "best fit");
    opt.localeMatcher = matcher;
    var calendar = GetOption(options, "calendar", "string", void 0, void 0);
    if (calendar !== void 0 && !TYPE_REGEX.test(calendar)) {
      throw new RangeError("Malformed calendar");
    }
    var internalSlots = getInternalSlots2(dtf);
    opt.ca = calendar;
    var numberingSystem = GetOption(options, "numberingSystem", "string", void 0, void 0);
    if (numberingSystem !== void 0 && !TYPE_REGEX.test(numberingSystem)) {
      throw new RangeError("Malformed numbering system");
    }
    opt.nu = numberingSystem;
    var hour12 = GetOption(options, "hour12", "boolean", void 0, void 0);
    var hourCycle = GetOption(options, "hourCycle", "string", ["h11", "h12", "h23", "h24"], void 0);
    if (hour12 !== void 0) {
      hourCycle = null;
    }
    opt.hc = hourCycle;
    var r = ResolveLocale(availableLocales, requestedLocales, opt, relevantExtensionKeys, localeData, getDefaultLocale);
    internalSlots.locale = r.locale;
    calendar = r.ca;
    internalSlots.calendar = calendar;
    internalSlots.hourCycle = r.hc;
    internalSlots.numberingSystem = r.nu;
    var dataLocale = r.dataLocale;
    internalSlots.dataLocale = dataLocale;
    var timeZone = options.timeZone;
    if (timeZone !== void 0) {
      timeZone = String(timeZone);
      if (!IsValidTimeZoneName(timeZone, {tzData: tzData, uppercaseLinks: uppercaseLinks})) {
        throw new RangeError("Invalid timeZoneName");
      }
      timeZone = CanonicalizeTimeZoneName(timeZone, {tzData: tzData, uppercaseLinks: uppercaseLinks});
    } else {
      timeZone = getDefaultTimeZone();
    }
    internalSlots.timeZone = timeZone;
    opt = Object.create(null);
    opt.weekday = GetOption(options, "weekday", "string", ["narrow", "short", "long"], void 0);
    opt.era = GetOption(options, "era", "string", ["narrow", "short", "long"], void 0);
    opt.year = GetOption(options, "year", "string", ["2-digit", "numeric"], void 0);
    opt.month = GetOption(options, "month", "string", ["2-digit", "numeric", "narrow", "short", "long"], void 0);
    opt.day = GetOption(options, "day", "string", ["2-digit", "numeric"], void 0);
    opt.hour = GetOption(options, "hour", "string", ["2-digit", "numeric"], void 0);
    opt.minute = GetOption(options, "minute", "string", ["2-digit", "numeric"], void 0);
    opt.second = GetOption(options, "second", "string", ["2-digit", "numeric"], void 0);
    opt.timeZoneName = GetOption(options, "timeZoneName", "string", ["short", "long"], void 0);
    opt.fractionalSecondDigits = GetNumberOption(options, "fractionalSecondDigits", 1, 3, void 0);
    var dataLocaleData = localeData[dataLocale];
    invariant(!!dataLocaleData, "Missing locale data for " + dataLocale);
    var formats = dataLocaleData.formats[calendar];
    if (!formats) {
      throw new RangeError('Calendar "' + calendar + '" is not supported. Try setting "calendar" to 1 of the following: ' + Object.keys(dataLocaleData.formats).join(", "));
    }
    var formatMatcher = GetOption(options, "formatMatcher", "string", ["basic", "best fit"], "best fit");
    var dateStyle = GetOption(options, "dateStyle", "string", ["full", "long", "medium", "short"], void 0);
    internalSlots.dateStyle = dateStyle;
    var timeStyle = GetOption(options, "timeStyle", "string", ["full", "long", "medium", "short"], void 0);
    internalSlots.timeStyle = timeStyle;
    var bestFormat;
    if (dateStyle === void 0 && timeStyle === void 0) {
      if (formatMatcher === "basic") {
        bestFormat = BasicFormatMatcher(opt, formats);
      } else {
        if (isTimeRelated(opt)) {
          var hc = resolveHourCycle(internalSlots.hourCycle, dataLocaleData.hourCycle, hour12);
          opt.hour12 = hc === "h11" || hc === "h12";
        }
        bestFormat = BestFitFormatMatcher(opt, formats);
      }
    } else {
      for (var _i = 0, DATE_TIME_PROPS_1 = DATE_TIME_PROPS; _i < DATE_TIME_PROPS_1.length; _i++) {
        var prop = DATE_TIME_PROPS_1[_i];
        var p = opt[prop];
        if (p !== void 0) {
          throw new TypeError("Intl.DateTimeFormat can't set option " + prop + " when " + (dateStyle ? "dateStyle" : "timeStyle") + " is used");
        }
      }
      bestFormat = DateTimeStyleFormat(dateStyle, timeStyle, dataLocaleData);
    }
    internalSlots.format = bestFormat;
    for (var prop in opt) {
      var p = bestFormat[prop];
      if (p !== void 0) {
        internalSlots[prop] = p;
      }
    }
    var pattern;
    var rangePatterns;
    if (internalSlots.hour !== void 0) {
      var hc = resolveHourCycle(internalSlots.hourCycle, dataLocaleData.hourCycle, hour12);
      internalSlots.hourCycle = hc;
      if (hc === "h11" || hc === "h12") {
        pattern = bestFormat.pattern12;
        rangePatterns = bestFormat.rangePatterns12;
      } else {
        pattern = bestFormat.pattern;
        rangePatterns = bestFormat.rangePatterns;
      }
    } else {
      internalSlots.hourCycle = void 0;
      pattern = bestFormat.pattern;
      rangePatterns = bestFormat.rangePatterns;
    }
    internalSlots.pattern = pattern;
    internalSlots.rangePatterns = rangePatterns;
    return dtf;
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

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/regex.generated.js
  var S_UNICODE_REGEX = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BF\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEE0-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDD78\uDD7A-\uDDCB\uDDCD-\uDE53\uDE60-\uDE6D\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6\uDF00-\uDF92\uDF94-\uDFCA]/;

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/format_to_parts.js
  var CARET_S_UNICODE_REGEX = new RegExp("^" + S_UNICODE_REGEX.source);
  var S_DOLLAR_UNICODE_REGEX = new RegExp(S_UNICODE_REGEX.source + "$");

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

  // bazel-out/darwin-fastbuild/bin/packages/intl-datetimeformat/lib/src/get_internal_slots.js
  var internalSlotMap = new WeakMap();
  function getInternalSlots(x) {
    var internalSlots = internalSlotMap.get(x);
    if (!internalSlots) {
      internalSlots = Object.create(null);
      internalSlotMap.set(x, internalSlots);
    }
    return internalSlots;
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-datetimeformat/lib/src/data/links.js
  var links_default = {
    "Africa/Asmera": "Africa/Nairobi",
    "Africa/Timbuktu": "Africa/Abidjan",
    "America/Argentina/ComodRivadavia": "America/Argentina/Catamarca",
    "America/Atka": "America/Adak",
    "America/Buenos_Aires": "America/Argentina/Buenos_Aires",
    "America/Catamarca": "America/Argentina/Catamarca",
    "America/Coral_Harbour": "America/Atikokan",
    "America/Cordoba": "America/Argentina/Cordoba",
    "America/Ensenada": "America/Tijuana",
    "America/Fort_Wayne": "America/Indiana/Indianapolis",
    "America/Godthab": "America/Nuuk",
    "America/Indianapolis": "America/Indiana/Indianapolis",
    "America/Jujuy": "America/Argentina/Jujuy",
    "America/Knox_IN": "America/Indiana/Knox",
    "America/Louisville": "America/Kentucky/Louisville",
    "America/Mendoza": "America/Argentina/Mendoza",
    "America/Montreal": "America/Toronto",
    "America/Porto_Acre": "America/Rio_Branco",
    "America/Rosario": "America/Argentina/Cordoba",
    "America/Santa_Isabel": "America/Tijuana",
    "America/Shiprock": "America/Denver",
    "America/Virgin": "America/Port_of_Spain",
    "Antarctica/South_Pole": "Pacific/Auckland",
    "Asia/Ashkhabad": "Asia/Ashgabat",
    "Asia/Calcutta": "Asia/Kolkata",
    "Asia/Chongqing": "Asia/Shanghai",
    "Asia/Chungking": "Asia/Shanghai",
    "Asia/Dacca": "Asia/Dhaka",
    "Asia/Harbin": "Asia/Shanghai",
    "Asia/Kashgar": "Asia/Urumqi",
    "Asia/Katmandu": "Asia/Kathmandu",
    "Asia/Macao": "Asia/Macau",
    "Asia/Rangoon": "Asia/Yangon",
    "Asia/Saigon": "Asia/Ho_Chi_Minh",
    "Asia/Tel_Aviv": "Asia/Jerusalem",
    "Asia/Thimbu": "Asia/Thimphu",
    "Asia/Ujung_Pandang": "Asia/Makassar",
    "Asia/Ulan_Bator": "Asia/Ulaanbaatar",
    "Atlantic/Faeroe": "Atlantic/Faroe",
    "Atlantic/Jan_Mayen": "Europe/Oslo",
    "Australia/ACT": "Australia/Sydney",
    "Australia/Canberra": "Australia/Sydney",
    "Australia/Currie": "Australia/Hobart",
    "Australia/LHI": "Australia/Lord_Howe",
    "Australia/NSW": "Australia/Sydney",
    "Australia/North": "Australia/Darwin",
    "Australia/Queensland": "Australia/Brisbane",
    "Australia/South": "Australia/Adelaide",
    "Australia/Tasmania": "Australia/Hobart",
    "Australia/Victoria": "Australia/Melbourne",
    "Australia/West": "Australia/Perth",
    "Australia/Yancowinna": "Australia/Broken_Hill",
    "Brazil/Acre": "America/Rio_Branco",
    "Brazil/DeNoronha": "America/Noronha",
    "Brazil/East": "America/Sao_Paulo",
    "Brazil/West": "America/Manaus",
    "Canada/Atlantic": "America/Halifax",
    "Canada/Central": "America/Winnipeg",
    "Canada/Eastern": "America/Toronto",
    "Canada/Mountain": "America/Edmonton",
    "Canada/Newfoundland": "America/St_Johns",
    "Canada/Pacific": "America/Vancouver",
    "Canada/Saskatchewan": "America/Regina",
    "Canada/Yukon": "America/Whitehorse",
    "Chile/Continental": "America/Santiago",
    "Chile/EasterIsland": "Pacific/Easter",
    "Cuba": "America/Havana",
    "Egypt": "Africa/Cairo",
    "Eire": "Europe/Dublin",
    "Etc/UCT": "Etc/UTC",
    "Europe/Belfast": "Europe/London",
    "Europe/Tiraspol": "Europe/Chisinau",
    "GB": "Europe/London",
    "GB-Eire": "Europe/London",
    "GMT+0": "Etc/GMT",
    "GMT-0": "Etc/GMT",
    "GMT0": "Etc/GMT",
    "Greenwich": "Etc/GMT",
    "Hongkong": "Asia/Hong_Kong",
    "Iceland": "Atlantic/Reykjavik",
    "Iran": "Asia/Tehran",
    "Israel": "Asia/Jerusalem",
    "Jamaica": "America/Jamaica",
    "Japan": "Asia/Tokyo",
    "Kwajalein": "Pacific/Kwajalein",
    "Libya": "Africa/Tripoli",
    "Mexico/BajaNorte": "America/Tijuana",
    "Mexico/BajaSur": "America/Mazatlan",
    "Mexico/General": "America/Mexico_City",
    "NZ": "Pacific/Auckland",
    "NZ-CHAT": "Pacific/Chatham",
    "Navajo": "America/Denver",
    "PRC": "Asia/Shanghai",
    "Pacific/Johnston": "Pacific/Honolulu",
    "Pacific/Ponape": "Pacific/Pohnpei",
    "Pacific/Samoa": "Pacific/Pago_Pago",
    "Pacific/Truk": "Pacific/Chuuk",
    "Pacific/Yap": "Pacific/Chuuk",
    "Poland": "Europe/Warsaw",
    "Portugal": "Europe/Lisbon",
    "ROC": "Asia/Taipei",
    "ROK": "Asia/Seoul",
    "Singapore": "Asia/Singapore",
    "Turkey": "Europe/Istanbul",
    "UCT": "Etc/UTC",
    "US/Alaska": "America/Anchorage",
    "US/Aleutian": "America/Adak",
    "US/Arizona": "America/Phoenix",
    "US/Central": "America/Chicago",
    "US/East-Indiana": "America/Indiana/Indianapolis",
    "US/Eastern": "America/New_York",
    "US/Hawaii": "Pacific/Honolulu",
    "US/Indiana-Starke": "America/Indiana/Knox",
    "US/Michigan": "America/Detroit",
    "US/Mountain": "America/Denver",
    "US/Pacific": "America/Los_Angeles",
    "US/Samoa": "Pacific/Pago_Pago",
    "UTC": "Etc/UTC",
    "Universal": "Etc/UTC",
    "W-SU": "Europe/Moscow",
    "Zulu": "Etc/UTC"
  };

  // bazel-out/darwin-fastbuild/bin/packages/intl-datetimeformat/lib/src/packer.js
  function unpack(data) {
    var abbrvs = data.abbrvs.split("|");
    var offsets = data.offsets.split("|").map(function(n) {
      return parseInt(n, 36);
    });
    var packedZones = data.zones;
    var zones = {};
    for (var _i = 0, packedZones_1 = packedZones; _i < packedZones_1.length; _i++) {
      var d = packedZones_1[_i];
      var _a = d.split("|"), zone = _a[0], zoneData = _a.slice(1);
      zones[zone] = zoneData.map(function(z) {
        return z.split(",");
      }).map(function(_a2) {
        var ts = _a2[0], abbrvIndex = _a2[1], offsetIndex = _a2[2], dst = _a2[3];
        return [
          ts === "" ? -Infinity : parseInt(ts, 36),
          abbrvs[+abbrvIndex],
          offsets[+offsetIndex],
          dst === "1"
        ];
      });
    }
    return zones;
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-datetimeformat/lib/src/core.js
  var UPPERCASED_LINKS = Object.keys(links_default).reduce(function(all, l) {
    all[l.toUpperCase()] = links_default[l];
    return all;
  }, {});
  var RESOLVED_OPTIONS_KEYS = [
    "locale",
    "calendar",
    "numberingSystem",
    "dateStyle",
    "timeStyle",
    "timeZone",
    "hourCycle",
    "weekday",
    "era",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "timeZoneName"
  ];
  var formatDescriptor = {
    enumerable: false,
    configurable: true,
    get: function() {
      if (typeof this !== "object" || !OrdinaryHasInstance(DateTimeFormat, this)) {
        throw TypeError("Intl.DateTimeFormat format property accessor called on incompatible receiver");
      }
      var internalSlots = getInternalSlots(this);
      var dtf = this;
      var boundFormat = internalSlots.boundFormat;
      if (boundFormat === void 0) {
        boundFormat = function(date) {
          var x;
          if (date === void 0) {
            x = Date.now();
          } else {
            x = Number(date);
          }
          return FormatDateTime(dtf, x, {
            getInternalSlots: getInternalSlots,
            localeData: DateTimeFormat.localeData,
            tzData: DateTimeFormat.tzData,
            getDefaultTimeZone: DateTimeFormat.getDefaultTimeZone
          });
        };
        try {
          Object.defineProperty(boundFormat, "name", {
            configurable: true,
            enumerable: false,
            writable: false,
            value: ""
          });
        } catch (e) {
        }
        internalSlots.boundFormat = boundFormat;
      }
      return boundFormat;
    }
  };
  try {
    Object.defineProperty(formatDescriptor.get, "name", {
      configurable: true,
      enumerable: false,
      writable: false,
      value: "get format"
    });
  } catch (e) {
  }
  var DateTimeFormat = function(locales, options) {
    if (!this || !OrdinaryHasInstance(DateTimeFormat, this)) {
      return new DateTimeFormat(locales, options);
    }
    InitializeDateTimeFormat(this, locales, options, {
      tzData: DateTimeFormat.tzData,
      uppercaseLinks: UPPERCASED_LINKS,
      availableLocales: DateTimeFormat.availableLocales,
      relevantExtensionKeys: DateTimeFormat.relevantExtensionKeys,
      getDefaultLocale: DateTimeFormat.getDefaultLocale,
      getDefaultTimeZone: DateTimeFormat.getDefaultTimeZone,
      getInternalSlots: getInternalSlots,
      localeData: DateTimeFormat.localeData
    });
    var internalSlots = getInternalSlots(this);
    var dataLocale = internalSlots.dataLocale;
    var dataLocaleData = DateTimeFormat.localeData[dataLocale];
    invariant(dataLocaleData !== void 0, "Cannot load locale-dependent data for " + dataLocale + ".");
  };
  defineProperty(DateTimeFormat, "supportedLocalesOf", {
    value: function supportedLocalesOf(locales, options) {
      return SupportedLocales(DateTimeFormat.availableLocales, CanonicalizeLocaleList(locales), options);
    }
  });
  defineProperty(DateTimeFormat.prototype, "resolvedOptions", {
    value: function resolvedOptions() {
      if (typeof this !== "object" || !OrdinaryHasInstance(DateTimeFormat, this)) {
        throw TypeError("Method Intl.DateTimeFormat.prototype.resolvedOptions called on incompatible receiver");
      }
      var internalSlots = getInternalSlots(this);
      var ro = {};
      for (var _i = 0, RESOLVED_OPTIONS_KEYS_1 = RESOLVED_OPTIONS_KEYS; _i < RESOLVED_OPTIONS_KEYS_1.length; _i++) {
        var key = RESOLVED_OPTIONS_KEYS_1[_i];
        var value = internalSlots[key];
        if (key === "hourCycle") {
          var hour12 = value === "h11" || value === "h12" ? true : value === "h23" || value === "h24" ? false : void 0;
          if (hour12 !== void 0) {
            ro.hour12 = hour12;
          }
        }
        if (DATE_TIME_PROPS.indexOf(key) > -1) {
          if (internalSlots.dateStyle !== void 0 || internalSlots.timeStyle !== void 0) {
            value = void 0;
          }
        }
        if (value !== void 0) {
          ro[key] = value;
        }
      }
      return ro;
    }
  });
  defineProperty(DateTimeFormat.prototype, "formatToParts", {
    value: function formatToParts2(date) {
      if (date === void 0) {
        date = Date.now();
      } else {
        date = ToNumber(date);
      }
      return FormatDateTimeToParts(this, date, {
        getInternalSlots: getInternalSlots,
        localeData: DateTimeFormat.localeData,
        tzData: DateTimeFormat.tzData,
        getDefaultTimeZone: DateTimeFormat.getDefaultTimeZone
      });
    }
  });
  defineProperty(DateTimeFormat.prototype, "formatRangeToParts", {
    value: function formatRangeToParts(startDate, endDate) {
      var dtf = this;
      if (typeof dtf !== "object") {
        throw new TypeError();
      }
      if (startDate === void 0 || endDate === void 0) {
        throw new TypeError("startDate/endDate cannot be undefined");
      }
      var x = ToNumber(startDate);
      var y = ToNumber(endDate);
      return FormatDateTimeRangeToParts(dtf, x, y, {
        getInternalSlots: getInternalSlots,
        localeData: DateTimeFormat.localeData,
        tzData: DateTimeFormat.tzData,
        getDefaultTimeZone: DateTimeFormat.getDefaultTimeZone
      });
    }
  });
  defineProperty(DateTimeFormat.prototype, "formatRange", {
    value: function formatRange(startDate, endDate) {
      var dtf = this;
      if (typeof dtf !== "object") {
        throw new TypeError();
      }
      if (startDate === void 0 || endDate === void 0) {
        throw new TypeError("startDate/endDate cannot be undefined");
      }
      var x = ToNumber(startDate);
      var y = ToNumber(endDate);
      return FormatDateTimeRange(dtf, x, y, {
        getInternalSlots: getInternalSlots,
        localeData: DateTimeFormat.localeData,
        tzData: DateTimeFormat.tzData,
        getDefaultTimeZone: DateTimeFormat.getDefaultTimeZone
      });
    }
  });
  var DEFAULT_TIMEZONE = "UTC";
  DateTimeFormat.__setDefaultTimeZone = function(timeZone) {
    if (timeZone !== void 0) {
      timeZone = String(timeZone);
      if (!IsValidTimeZoneName(timeZone, {
        tzData: DateTimeFormat.tzData,
        uppercaseLinks: UPPERCASED_LINKS
      })) {
        throw new RangeError("Invalid timeZoneName");
      }
      timeZone = CanonicalizeTimeZoneName(timeZone, {
        tzData: DateTimeFormat.tzData,
        uppercaseLinks: UPPERCASED_LINKS
      });
    } else {
      timeZone = DEFAULT_TIMEZONE;
    }
    DateTimeFormat.__defaultTimeZone = timeZone;
  };
  DateTimeFormat.relevantExtensionKeys = ["nu", "ca", "hc"];
  DateTimeFormat.__defaultTimeZone = DEFAULT_TIMEZONE;
  DateTimeFormat.getDefaultTimeZone = function() {
    return DateTimeFormat.__defaultTimeZone;
  };
  DateTimeFormat.__addLocaleData = function __addLocaleData() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      data[_i] = arguments[_i];
    }
    var _loop_1 = function(d2, locale2) {
      var dateFormat = d2.dateFormat, timeFormat = d2.timeFormat, dateTimeFormat = d2.dateTimeFormat, formats = d2.formats, intervalFormats = d2.intervalFormats, rawData = __rest(d2, ["dateFormat", "timeFormat", "dateTimeFormat", "formats", "intervalFormats"]);
      var processedData = __assign(__assign({}, rawData), {dateFormat: {
        full: parseDateTimeSkeleton(dateFormat.full),
        long: parseDateTimeSkeleton(dateFormat.long),
        medium: parseDateTimeSkeleton(dateFormat.medium),
        short: parseDateTimeSkeleton(dateFormat.short)
      }, timeFormat: {
        full: parseDateTimeSkeleton(timeFormat.full),
        long: parseDateTimeSkeleton(timeFormat.long),
        medium: parseDateTimeSkeleton(timeFormat.medium),
        short: parseDateTimeSkeleton(timeFormat.short)
      }, dateTimeFormat: {
        full: parseDateTimeSkeleton(dateTimeFormat.full).pattern,
        long: parseDateTimeSkeleton(dateTimeFormat.long).pattern,
        medium: parseDateTimeSkeleton(dateTimeFormat.medium).pattern,
        short: parseDateTimeSkeleton(dateTimeFormat.short).pattern
      }, formats: {}});
      var _loop_2 = function(calendar2) {
        processedData.formats[calendar2] = Object.keys(formats[calendar2]).map(function(skeleton) {
          return parseDateTimeSkeleton(skeleton, formats[calendar2][skeleton], intervalFormats[skeleton], intervalFormats.intervalFormatFallback);
        });
      };
      for (var calendar in formats) {
        _loop_2(calendar);
      }
      var minimizedLocale = new Intl.Locale(locale2).minimize().toString();
      DateTimeFormat.localeData[locale2] = DateTimeFormat.localeData[minimizedLocale] = processedData;
      DateTimeFormat.availableLocales.add(locale2);
      DateTimeFormat.availableLocales.add(minimizedLocale);
      if (!DateTimeFormat.__defaultLocale) {
        DateTimeFormat.__defaultLocale = minimizedLocale;
      }
    };
    for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
      var _b = data_1[_a], d = _b.data, locale = _b.locale;
      _loop_1(d, locale);
    }
  };
  Object.defineProperty(DateTimeFormat.prototype, "format", formatDescriptor);
  DateTimeFormat.__defaultLocale = "";
  DateTimeFormat.localeData = {};
  DateTimeFormat.availableLocales = new Set();
  DateTimeFormat.getDefaultLocale = function() {
    return DateTimeFormat.__defaultLocale;
  };
  DateTimeFormat.polyfilled = true;
  DateTimeFormat.tzData = {};
  DateTimeFormat.__addTZData = function(d) {
    DateTimeFormat.tzData = unpack(d);
  };
  try {
    if (typeof Symbol !== "undefined") {
      Object.defineProperty(DateTimeFormat.prototype, Symbol.toStringTag, {
        value: "Intl.DateTimeFormat",
        writable: false,
        enumerable: false,
        configurable: true
      });
    }
    Object.defineProperty(DateTimeFormat.prototype.constructor, "length", {
      value: 1,
      writable: false,
      enumerable: false,
      configurable: true
    });
  } catch (e) {
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-datetimeformat/lib/should-polyfill.js
  function supportsDateStyle() {
    try {
      return !!new Intl.DateTimeFormat(void 0, {
        dateStyle: "short"
      }).resolvedOptions().dateStyle;
    } catch (e) {
      return false;
    }
  }
  function hasChromeLt71Bug() {
    try {
      return new Intl.DateTimeFormat("en", {
        hourCycle: "h11",
        hour: "numeric"
      }).formatToParts(0)[2].type !== "dayPeriod";
    } catch (e) {
      return false;
    }
  }
  function hasUnthrownDateTimeStyleBug() {
    try {
      return !!new Intl.DateTimeFormat("en", {
        dateStyle: "short",
        hour: "numeric"
      }).format(new Date(0));
    } catch (e) {
      return false;
    }
  }
  function shouldPolyfill() {
    return !("DateTimeFormat" in Intl) || !("formatToParts" in Intl.DateTimeFormat.prototype) || !("formatRange" in Intl.DateTimeFormat.prototype) || hasChromeLt71Bug() || hasUnthrownDateTimeStyleBug() || !supportsDateStyle();
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-datetimeformat/lib/src/to_locale_string.js
  function toLocaleString(x, locales, options) {
    var dtf = new DateTimeFormat(locales, options);
    return dtf.format(x);
  }
  function toLocaleDateString(x, locales, options) {
    var dtf = new DateTimeFormat(locales, ToDateTimeOptions(options, "date", "date"));
    return dtf.format(x);
  }
  function toLocaleTimeString(x, locales, options) {
    var dtf = new DateTimeFormat(locales, ToDateTimeOptions(options, "time", "time"));
    return dtf.format(x);
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-datetimeformat/lib/polyfill.js
  if (shouldPolyfill()) {
    defineProperty(Intl, "DateTimeFormat", {value: DateTimeFormat});
    defineProperty(Date.prototype, "toLocaleString", {
      value: function toLocaleString2(locales, options) {
        return toLocaleString(this, locales, options);
      }
    });
    defineProperty(Date.prototype, "toLocaleDateString", {
      value: function toLocaleDateString2(locales, options) {
        return toLocaleDateString(this, locales, options);
      }
    });
    defineProperty(Date.prototype, "toLocaleTimeString", {
      value: function toLocaleTimeString2(locales, options) {
        return toLocaleTimeString(this, locales, options);
      }
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

