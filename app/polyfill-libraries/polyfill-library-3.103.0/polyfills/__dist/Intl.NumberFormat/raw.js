
// Intl.NumberFormat
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  /**
   * Cannot do Math.log(x) / Math.log(10) bc if IEEE floating point issue
   * @param x number
   */
  function getMagnitude(x) {
      // Cannot count string length via Number.toString because it may use scientific notation
      // for very small or very large numbers.
      return Math.floor(Math.log(x) * Math.LOG10E);
  }
  function repeat(s, times) {
      if (typeof s.repeat === 'function') {
          return s.repeat(times);
      }
      var arr = new Array(times);
      for (var i = 0; i < arr.length; i++) {
          arr[i] = s;
      }
      return arr.join('');
  }
  /*
    17 ECMAScript Standard Built-in Objects:
      Every built-in Function object, including constructors, that is not
      identified as an anonymous function has a name property whose value
      is a String.

      Unless otherwise specified, the name property of a built-in Function
      object, if it exists, has the attributes { [[Writable]]: false,
      [[Enumerable]]: false, [[Configurable]]: true }.
  */
  function defineProperty(target, name, _a) {
      var value = _a.value;
      Object.defineProperty(target, name, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: value,
      });
  }
  var UNICODE_EXTENSION_SEQUENCE_REGEX = /-u(?:-[0-9a-z]{2,8})+/gi;
  function invariant(condition, message, Err) {
      if (Err === void 0) { Err = Error; }
      if (!condition) {
          throw new Err(message);
      }
  }

  /**
   * http://ecma-international.org/ecma-402/7.0/index.html#sec-canonicalizelocalelist
   * @param locales
   */
  function CanonicalizeLocaleList(locales) {
      // TODO
      return Intl.getCanonicalLocales(locales);
  }

  /**
   * https://tc39.es/ecma262/#sec-tostring
   */
  function ToString(o) {
      // Only symbol is irregular...
      if (typeof o === 'symbol') {
          throw TypeError('Cannot convert a Symbol value to a string');
      }
      return String(o);
  }
  /**
   * https://tc39.es/ecma262/#sec-tonumber
   * @param val
   */
  function ToNumber(val) {
      if (val === undefined) {
          return NaN;
      }
      if (val === null) {
          return +0;
      }
      if (typeof val === 'boolean') {
          return val ? 1 : +0;
      }
      if (typeof val === 'number') {
          return val;
      }
      if (typeof val === 'symbol' || typeof val === 'bigint') {
          throw new TypeError('Cannot convert symbol/bigint to number');
      }
      return Number(val);
  }
  /**
   * https://tc39.es/ecma262/#sec-toobject
   * @param arg
   */
  function ToObject(arg) {
      if (arg == null) {
          throw new TypeError('undefined/null cannot be converted to object');
      }
      return Object(arg);
  }
  /**
   * https://www.ecma-international.org/ecma-262/11.0/index.html#sec-samevalue
   * @param x
   * @param y
   */
  function SameValue(x, y) {
      if (Object.is) {
          return Object.is(x, y);
      }
      // SameValue algorithm
      if (x === y) {
          // Steps 1-5, 7-10
          // Steps 6.b-6.e: +0 != -0
          return x !== 0 || 1 / x === 1 / y;
      }
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
  }
  /**
   * https://www.ecma-international.org/ecma-262/11.0/index.html#sec-arraycreate
   * @param len
   */
  function ArrayCreate(len) {
      return new Array(len);
  }
  /**
   * https://www.ecma-international.org/ecma-262/11.0/index.html#sec-hasownproperty
   * @param o
   * @param prop
   */
  function HasOwnProperty(o, prop) {
      return Object.prototype.hasOwnProperty.call(o, prop);
  }

  /**
   * https://tc39.es/ecma402/#sec-getoption
   * @param opts
   * @param prop
   * @param type
   * @param values
   * @param fallback
   */
  function GetOption(opts, prop, type, values, fallback) {
      // const descriptor = Object.getOwnPropertyDescriptor(opts, prop);
      var value = opts[prop];
      if (value !== undefined) {
          if (type !== 'boolean' && type !== 'string') {
              throw new TypeError('invalid type');
          }
          if (type === 'boolean') {
              value = Boolean(value);
          }
          if (type === 'string') {
              value = ToString(value);
          }
          if (values !== undefined && !values.filter(function (val) { return val == value; }).length) {
              throw new RangeError(value + " is not within " + values.join(', '));
          }
          return value;
      }
      return fallback;
  }

  /**
   * https://tc39.es/ecma402/#sec-bestavailablelocale
   * @param availableLocales
   * @param locale
   */
  function BestAvailableLocale(availableLocales, locale) {
      var candidate = locale;
      while (true) {
          if (availableLocales.has(candidate)) {
              return candidate;
          }
          var pos = candidate.lastIndexOf('-');
          if (!~pos) {
              return undefined;
          }
          if (pos >= 2 && candidate[pos - 2] === '-') {
              pos -= 2;
          }
          candidate = candidate.slice(0, pos);
      }
  }

  /**
   * https://tc39.es/ecma402/#sec-lookupmatcher
   * @param availableLocales
   * @param requestedLocales
   * @param getDefaultLocale
   */
  function LookupMatcher(availableLocales, requestedLocales, getDefaultLocale) {
      var result = { locale: '' };
      for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
          var locale = requestedLocales_1[_i];
          var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, '');
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

  /**
   * https://tc39.es/ecma402/#sec-bestfitmatcher
   * @param availableLocales
   * @param requestedLocales
   * @param getDefaultLocale
   */
  function BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale) {
      var minimizedAvailableLocaleMap = {};
      var minimizedAvailableLocales = new Set();
      availableLocales.forEach(function (locale) {
          var minimizedLocale = new Intl.Locale(locale)
              .minimize()
              .toString();
          minimizedAvailableLocaleMap[minimizedLocale] = locale;
          minimizedAvailableLocales.add(minimizedLocale);
      });
      var foundLocale;
      for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
          var l = requestedLocales_1[_i];
          if (foundLocale) {
              break;
          }
          var noExtensionLocale = l.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, '');
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
          // Check minimized locale
          if (minimizedAvailableLocales.has(minimizedRequestedLocale)) {
              foundLocale = minimizedAvailableLocaleMap[minimizedRequestedLocale];
              break;
          }
          // Lookup algo on maximized locale
          foundLocale = BestAvailableLocale(minimizedAvailableLocales, maximizedRequestedLocale);
      }
      return {
          locale: foundLocale || getDefaultLocale(),
      };
  }

  /**
   * https://tc39.es/ecma402/#sec-unicodeextensionvalue
   * @param extension
   * @param key
   */
  function UnicodeExtensionValue(extension, key) {
      invariant(key.length === 2, 'key must have 2 elements');
      var size = extension.length;
      var searchValue = "-" + key + "-";
      var pos = extension.indexOf(searchValue);
      if (pos !== -1) {
          var start = pos + 4;
          var end = start;
          var k = start;
          var done = false;
          while (!done) {
              var e = extension.indexOf('-', k);
              var len = void 0;
              if (e === -1) {
                  len = size - k;
              }
              else {
                  len = e - k;
              }
              if (len === 2) {
                  done = true;
              }
              else if (e === -1) {
                  end = size;
                  done = true;
              }
              else {
                  end = e;
                  k = e + 1;
              }
          }
          return extension.slice(start, end);
      }
      searchValue = "-" + key;
      pos = extension.indexOf(searchValue);
      if (pos !== -1 && pos + 3 === size) {
          return '';
      }
      return undefined;
  }

  /**
   * https://tc39.es/ecma402/#sec-resolvelocale
   */
  function ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData, getDefaultLocale) {
      var matcher = options.localeMatcher;
      var r;
      if (matcher === 'lookup') {
          r = LookupMatcher(availableLocales, requestedLocales, getDefaultLocale);
      }
      else {
          r = BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale);
      }
      var foundLocale = r.locale;
      var result = { locale: '', dataLocale: foundLocale };
      var supportedExtension = '-u';
      for (var _i = 0, relevantExtensionKeys_1 = relevantExtensionKeys; _i < relevantExtensionKeys_1.length; _i++) {
          var key = relevantExtensionKeys_1[_i];
          invariant(foundLocale in localeData, "Missing locale data for " + foundLocale);
          var foundLocaleData = localeData[foundLocale];
          invariant(typeof foundLocaleData === 'object' && foundLocaleData !== null, "locale data " + key + " must be an object");
          var keyLocaleData = foundLocaleData[key];
          invariant(Array.isArray(keyLocaleData), "keyLocaleData for " + key + " must be an array");
          var value = keyLocaleData[0];
          invariant(typeof value === 'string' || value === null, "value must be string or null but got " + typeof value + " in key " + key);
          var supportedExtensionAddition = '';
          if (r.extension) {
              var requestedValue = UnicodeExtensionValue(r.extension, key);
              if (requestedValue !== undefined) {
                  if (requestedValue !== '') {
                      if (~keyLocaleData.indexOf(requestedValue)) {
                          value = requestedValue;
                          supportedExtensionAddition = "-" + key + "-" + value;
                      }
                  }
                  else if (~requestedValue.indexOf('true')) {
                      value = 'true';
                      supportedExtensionAddition = "-" + key;
                  }
              }
          }
          if (key in options) {
              var optionsValue = options[key];
              invariant(typeof optionsValue === 'string' ||
                  typeof optionsValue === 'undefined' ||
                  optionsValue === null, 'optionsValue must be String, Undefined or Null');
              if (~keyLocaleData.indexOf(optionsValue)) {
                  if (optionsValue !== value) {
                      value = optionsValue;
                      supportedExtensionAddition = '';
                  }
              }
          }
          result[key] = value;
          supportedExtension += supportedExtensionAddition;
      }
      if (supportedExtension.length > 2) {
          var privateIndex = foundLocale.indexOf('-x-');
          if (privateIndex === -1) {
              foundLocale = foundLocale + supportedExtension;
          }
          else {
              var preExtension = foundLocale.slice(0, privateIndex);
              var postExtension = foundLocale.slice(privateIndex, foundLocale.length);
              foundLocale = preExtension + supportedExtension + postExtension;
          }
          foundLocale = Intl.getCanonicalLocales(foundLocale)[0];
      }
      result.locale = foundLocale;
      return result;
  }

  /**
   * This follows https://tc39.es/ecma402/#sec-case-sensitivity-and-case-mapping
   * @param str string to convert
   */
  function toUpperCase(str) {
      return str.replace(/([a-z])/g, function (_, c) { return c.toUpperCase(); });
  }
  var NOT_A_Z_REGEX = /[^A-Z]/;
  /**
   * https://tc39.es/ecma402/#sec-iswellformedcurrencycode
   */
  function IsWellFormedCurrencyCode(currency) {
      currency = toUpperCase(currency);
      if (currency.length !== 3) {
          return false;
      }
      if (NOT_A_Z_REGEX.test(currency)) {
          return false;
      }
      return true;
  }

  /**
   * https://tc39.es/ecma402/#sec-defaultnumberoption
   * @param val
   * @param min
   * @param max
   * @param fallback
   */
  function DefaultNumberOption(val, min, max, fallback) {
      if (val !== undefined) {
          val = Number(val);
          if (isNaN(val) || val < min || val > max) {
              throw new RangeError(val + " is outside of range [" + min + ", " + max + "]");
          }
          return Math.floor(val);
      }
      return fallback;
  }

  /**
   * https://tc39.es/ecma402/#sec-getnumberoption
   * @param options
   * @param property
   * @param min
   * @param max
   * @param fallback
   */
  function GetNumberOption(options, property, minimum, maximum, fallback) {
      var val = options[property];
      return DefaultNumberOption(val, minimum, maximum, fallback);
  }

  /**
   * https://tc39.es/ecma402/#table-sanctioned-simple-unit-identifiers
   */
  var SANCTIONED_UNITS = [
      'angle-degree',
      'area-acre',
      'area-hectare',
      'concentr-percent',
      'digital-bit',
      'digital-byte',
      'digital-gigabit',
      'digital-gigabyte',
      'digital-kilobit',
      'digital-kilobyte',
      'digital-megabit',
      'digital-megabyte',
      'digital-petabyte',
      'digital-terabit',
      'digital-terabyte',
      'duration-day',
      'duration-hour',
      'duration-millisecond',
      'duration-minute',
      'duration-month',
      'duration-second',
      'duration-week',
      'duration-year',
      'length-centimeter',
      'length-foot',
      'length-inch',
      'length-kilometer',
      'length-meter',
      'length-mile-scandinavian',
      'length-mile',
      'length-millimeter',
      'length-yard',
      'mass-gram',
      'mass-kilogram',
      'mass-ounce',
      'mass-pound',
      'mass-stone',
      'temperature-celsius',
      'temperature-fahrenheit',
      'volume-fluid-ounce',
      'volume-gallon',
      'volume-liter',
      'volume-milliliter',
  ];
  // In CLDR, the unit name always follows the form `namespace-unit` pattern.
  // For example: `digital-bit` instead of `bit`. This function removes the namespace prefix.
  function removeUnitNamespace(unit) {
      return unit.slice(unit.indexOf('-') + 1);
  }
  /**
   * https://tc39.es/ecma402/#table-sanctioned-simple-unit-identifiers
   */
  var SIMPLE_UNITS = SANCTIONED_UNITS.map(removeUnitNamespace);
  /**
   * https://tc39.es/ecma402/#sec-issanctionedsimpleunitidentifier
   */
  function IsSanctionedSimpleUnitIdentifier(unitIdentifier) {
      return SIMPLE_UNITS.indexOf(unitIdentifier) > -1;
  }

  /**
   * This follows https://tc39.es/ecma402/#sec-case-sensitivity-and-case-mapping
   * @param str string to convert
   */
  function toLowerCase(str) {
      return str.replace(/([A-Z])/g, function (_, c) { return c.toLowerCase(); });
  }
  /**
   * https://tc39.es/ecma402/#sec-iswellformedunitidentifier
   * @param unit
   */
  function IsWellFormedUnitIdentifier(unit) {
      unit = toLowerCase(unit);
      if (IsSanctionedSimpleUnitIdentifier(unit)) {
          return true;
      }
      var units = unit.split('-per-');
      if (units.length !== 2) {
          return false;
      }
      var numerator = units[0], denominator = units[1];
      if (!IsSanctionedSimpleUnitIdentifier(numerator) ||
          !IsSanctionedSimpleUnitIdentifier(denominator)) {
          return false;
      }
      return true;
  }

  /**
   * The abstract operation ComputeExponentForMagnitude computes an exponent by which to scale a
   * number of the given magnitude (power of ten of the most significant digit) according to the
   * locale and the desired notation (scientific, engineering, or compact).
   */
  function ComputeExponentForMagnitude(numberFormat, magnitude, _a) {
      var getInternalSlots = _a.getInternalSlots;
      var internalSlots = getInternalSlots(numberFormat);
      var notation = internalSlots.notation, dataLocaleData = internalSlots.dataLocaleData, numberingSystem = internalSlots.numberingSystem;
      switch (notation) {
          case 'standard':
              return 0;
          case 'scientific':
              return magnitude;
          case 'engineering':
              return Math.floor(magnitude / 3) * 3;
          default: {
              // Let exponent be an implementation- and locale-dependent (ILD) integer by which to scale a
              // number of the given magnitude in compact notation for the current locale.
              var compactDisplay = internalSlots.compactDisplay, style = internalSlots.style, currencyDisplay = internalSlots.currencyDisplay;
              var thresholdMap = void 0;
              if (style === 'currency' && currencyDisplay !== 'name') {
                  var currency = dataLocaleData.numbers.currency[numberingSystem] ||
                      dataLocaleData.numbers.currency[dataLocaleData.numbers.nu[0]];
                  thresholdMap = currency.short;
              }
              else {
                  var decimal = dataLocaleData.numbers.decimal[numberingSystem] ||
                      dataLocaleData.numbers.decimal[dataLocaleData.numbers.nu[0]];
                  thresholdMap = compactDisplay === 'long' ? decimal.long : decimal.short;
              }
              if (!thresholdMap) {
                  return 0;
              }
              var num = String(Math.pow(10, magnitude));
              var thresholds = Object.keys(thresholdMap); // TODO: this can be pre-processed
              if (num < thresholds[0]) {
                  return 0;
              }
              if (num > thresholds[thresholds.length - 1]) {
                  return thresholds[thresholds.length - 1].length - 1;
              }
              var i = thresholds.indexOf(num);
              if (i === -1) {
                  return 0;
              }
              // See https://unicode.org/reports/tr35/tr35-numbers.html#Compact_Number_Formats
              // Special handling if the pattern is precisely `0`.
              var magnitudeKey = thresholds[i];
              // TODO: do we need to handle plural here?
              var compactPattern = thresholdMap[magnitudeKey].other;
              if (compactPattern === '0') {
                  return 0;
              }
              // Example: in zh-TW, `10000000` maps to `0000萬`. So we need to return 8 - 4 = 4 here.
              return (magnitudeKey.length -
                  thresholdMap[magnitudeKey].other.match(/0+/)[0].length);
          }
      }
  }

  function ToRawPrecision(x, minPrecision, maxPrecision) {
      var p = maxPrecision;
      var m;
      var e;
      var xFinal;
      if (x === 0) {
          m = repeat('0', p);
          e = 0;
          xFinal = 0;
      }
      else {
          var xToString = x.toString();
          // If xToString is formatted as scientific notation, the number is either very small or very
          // large. If the precision of the formatted string is lower that requested max precision, we
          // should still infer them from the formatted string, otherwise the formatted result might have
          // precision loss (e.g. 1e41 will not have 0 in every trailing digits).
          var xToStringExponentIndex = xToString.indexOf('e');
          var _a = xToString.split('e'), xToStringMantissa = _a[0], xToStringExponent = _a[1];
          var xToStringMantissaWithoutDecimalPoint = xToStringMantissa.replace('.', '');
          if (xToStringExponentIndex >= 0 &&
              xToStringMantissaWithoutDecimalPoint.length <= p) {
              e = +xToStringExponent;
              m =
                  xToStringMantissaWithoutDecimalPoint +
                      repeat('0', p - xToStringMantissaWithoutDecimalPoint.length);
              xFinal = x;
          }
          else {
              e = getMagnitude(x);
              var decimalPlaceOffset = e - p + 1;
              // n is the integer containing the required precision digits. To derive the formatted string,
              // we will adjust its decimal place in the logic below.
              var n = Math.round(adjustDecimalPlace(x, decimalPlaceOffset));
              // The rounding caused the change of magnitude, so we should increment `e` by 1.
              if (adjustDecimalPlace(n, p - 1) >= 10) {
                  e = e + 1;
                  // Divide n by 10 to swallow one precision.
                  n = Math.floor(n / 10);
              }
              m = n.toString();
              // Equivalent of n * 10 ** (e - p + 1)
              xFinal = adjustDecimalPlace(n, p - 1 - e);
          }
      }
      var int;
      if (e >= p - 1) {
          m = m + repeat('0', e - p + 1);
          int = e + 1;
      }
      else if (e >= 0) {
          m = m.slice(0, e + 1) + "." + m.slice(e + 1);
          int = e + 1;
      }
      else {
          m = "0." + repeat('0', -e - 1) + m;
          int = 1;
      }
      if (m.indexOf('.') >= 0 && maxPrecision > minPrecision) {
          var cut = maxPrecision - minPrecision;
          while (cut > 0 && m[m.length - 1] === '0') {
              m = m.slice(0, -1);
              cut--;
          }
          if (m[m.length - 1] === '.') {
              m = m.slice(0, -1);
          }
      }
      return { formattedString: m, roundedNumber: xFinal, integerDigitsCount: int };
      // x / (10 ** magnitude), but try to preserve as much floating point precision as possible.
      function adjustDecimalPlace(x, magnitude) {
          return magnitude < 0 ? x * Math.pow(10, -magnitude) : x / Math.pow(10, magnitude);
      }
  }

  /**
   * TODO: dedup with intl-pluralrules and support BigInt
   * https://tc39.es/ecma402/#sec-torawfixed
   * @param x a finite non-negative Number or BigInt
   * @param minFraction and integer between 0 and 20
   * @param maxFraction and integer between 0 and 20
   */
  function ToRawFixed(x, minFraction, maxFraction) {
      var f = maxFraction;
      var n = Math.round(x * Math.pow(10, f));
      var xFinal = n / Math.pow(10, f);
      // n is a positive integer, but it is possible to be greater than 1e21.
      // In such case we will go the slow path.
      // See also: https://tc39.es/ecma262/#sec-numeric-types-number-tostring
      var m;
      if (n < 1e21) {
          m = n.toString();
      }
      else {
          m = n.toString();
          var _a = m.split('e'), mantissa = _a[0], exponent = _a[1];
          m = mantissa.replace('.', '');
          m = m + repeat('0', Math.max(+exponent - m.length + 1, 0));
      }
      var int;
      if (f !== 0) {
          var k = m.length;
          if (k <= f) {
              var z = repeat('0', f + 1 - k);
              m = z + m;
              k = f + 1;
          }
          var a = m.slice(0, k - f);
          var b = m.slice(k - f);
          m = a + "." + b;
          int = a.length;
      }
      else {
          int = m.length;
      }
      var cut = maxFraction - minFraction;
      while (cut > 0 && m[m.length - 1] === '0') {
          m = m.slice(0, -1);
          cut--;
      }
      if (m[m.length - 1] === '.') {
          m = m.slice(0, -1);
      }
      return { formattedString: m, roundedNumber: xFinal, integerDigitsCount: int };
  }

  /**
   * https://tc39.es/ecma402/#sec-formatnumberstring
   */
  function FormatNumericToString(intlObject, x) {
      var isNegative = x < 0 || SameValue(x, -0);
      if (isNegative) {
          x = -x;
      }
      var result;
      var rourndingType = intlObject.roundingType;
      switch (rourndingType) {
          case 'significantDigits':
              result = ToRawPrecision(x, intlObject.minimumSignificantDigits, intlObject.maximumSignificantDigits);
              break;
          case 'fractionDigits':
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
          var forwardZeros = repeat('0', minInteger - int);
          string = forwardZeros + string;
      }
      if (isNegative) {
          x = -x;
      }
      return { roundedNumber: x, formattedString: string };
  }

  /**
   * The abstract operation ComputeExponent computes an exponent (power of ten) by which to scale x
   * according to the number formatting settings. It handles cases such as 999 rounding up to 1000,
   * requiring a different exponent.
   *
   * NOT IN SPEC: it returns [exponent, magnitude].
   */
  function ComputeExponent(numberFormat, x, _a) {
      var getInternalSlots = _a.getInternalSlots;
      if (x === 0) {
          return [0, 0];
      }
      if (x < 0) {
          x = -x;
      }
      var magnitude = getMagnitude(x);
      var exponent = ComputeExponentForMagnitude(numberFormat, magnitude, {
          getInternalSlots: getInternalSlots,
      });
      // Preserve more precision by doing multiplication when exponent is negative.
      x = exponent < 0 ? x * Math.pow(10, -exponent) : x / Math.pow(10, exponent);
      var formatNumberResult = FormatNumericToString(getInternalSlots(numberFormat), x);
      if (formatNumberResult.roundedNumber === 0) {
          return [exponent, magnitude];
      }
      var newMagnitude = getMagnitude(formatNumberResult.roundedNumber);
      if (newMagnitude === magnitude - exponent) {
          return [exponent, magnitude];
      }
      return [
          ComputeExponentForMagnitude(numberFormat, magnitude + 1, {
              getInternalSlots: getInternalSlots,
          }),
          magnitude + 1,
      ];
  }

  /**
   * https://tc39.es/ecma402/#sec-currencydigits
   */
  function CurrencyDigits(c, _a) {
      var currencyDigitsData = _a.currencyDigitsData;
      return HasOwnProperty(currencyDigitsData, c)
          ? currencyDigitsData[c]
          : 2;
  }

  var adlm = [
  	"𞥐",
  	"𞥑",
  	"𞥒",
  	"𞥓",
  	"𞥔",
  	"𞥕",
  	"𞥖",
  	"𞥗",
  	"𞥘",
  	"𞥙"
  ];
  var ahom = [
  	"𑜰",
  	"𑜱",
  	"𑜲",
  	"𑜳",
  	"𑜴",
  	"𑜵",
  	"𑜶",
  	"𑜷",
  	"𑜸",
  	"𑜹"
  ];
  var arab = [
  	"٠",
  	"١",
  	"٢",
  	"٣",
  	"٤",
  	"٥",
  	"٦",
  	"٧",
  	"٨",
  	"٩"
  ];
  var arabext = [
  	"۰",
  	"۱",
  	"۲",
  	"۳",
  	"۴",
  	"۵",
  	"۶",
  	"۷",
  	"۸",
  	"۹"
  ];
  var bali = [
  	"᭐",
  	"᭑",
  	"᭒",
  	"᭓",
  	"᭔",
  	"᭕",
  	"᭖",
  	"᭗",
  	"᭘",
  	"᭙"
  ];
  var beng = [
  	"০",
  	"১",
  	"২",
  	"৩",
  	"৪",
  	"৫",
  	"৬",
  	"৭",
  	"৮",
  	"৯"
  ];
  var bhks = [
  	"𑱐",
  	"𑱑",
  	"𑱒",
  	"𑱓",
  	"𑱔",
  	"𑱕",
  	"𑱖",
  	"𑱗",
  	"𑱘",
  	"𑱙"
  ];
  var brah = [
  	"𑁦",
  	"𑁧",
  	"𑁨",
  	"𑁩",
  	"𑁪",
  	"𑁫",
  	"𑁬",
  	"𑁭",
  	"𑁮",
  	"𑁯"
  ];
  var cakm = [
  	"𑄶",
  	"𑄷",
  	"𑄸",
  	"𑄹",
  	"𑄺",
  	"𑄻",
  	"𑄼",
  	"𑄽",
  	"𑄾",
  	"𑄿"
  ];
  var cham = [
  	"꩐",
  	"꩑",
  	"꩒",
  	"꩓",
  	"꩔",
  	"꩕",
  	"꩖",
  	"꩗",
  	"꩘",
  	"꩙"
  ];
  var deva = [
  	"०",
  	"१",
  	"२",
  	"३",
  	"४",
  	"५",
  	"६",
  	"७",
  	"८",
  	"९"
  ];
  var diak = [
  	"𑥐",
  	"𑥑",
  	"𑥒",
  	"𑥓",
  	"𑥔",
  	"𑥕",
  	"𑥖",
  	"𑥗",
  	"𑥘",
  	"𑥙"
  ];
  var fullwide = [
  	"０",
  	"１",
  	"２",
  	"３",
  	"４",
  	"５",
  	"６",
  	"７",
  	"８",
  	"９"
  ];
  var gong = [
  	"𑶠",
  	"𑶡",
  	"𑶢",
  	"𑶣",
  	"𑶤",
  	"𑶥",
  	"𑶦",
  	"𑶧",
  	"𑶨",
  	"𑶩"
  ];
  var gonm = [
  	"𑵐",
  	"𑵑",
  	"𑵒",
  	"𑵓",
  	"𑵔",
  	"𑵕",
  	"𑵖",
  	"𑵗",
  	"𑵘",
  	"𑵙"
  ];
  var gujr = [
  	"૦",
  	"૧",
  	"૨",
  	"૩",
  	"૪",
  	"૫",
  	"૬",
  	"૭",
  	"૮",
  	"૯"
  ];
  var guru = [
  	"੦",
  	"੧",
  	"੨",
  	"੩",
  	"੪",
  	"੫",
  	"੬",
  	"੭",
  	"੮",
  	"੯"
  ];
  var hanidec = [
  	"〇",
  	"一",
  	"二",
  	"三",
  	"四",
  	"五",
  	"六",
  	"七",
  	"八",
  	"九"
  ];
  var hmng = [
  	"𖭐",
  	"𖭑",
  	"𖭒",
  	"𖭓",
  	"𖭔",
  	"𖭕",
  	"𖭖",
  	"𖭗",
  	"𖭘",
  	"𖭙"
  ];
  var hmnp = [
  	"𞅀",
  	"𞅁",
  	"𞅂",
  	"𞅃",
  	"𞅄",
  	"𞅅",
  	"𞅆",
  	"𞅇",
  	"𞅈",
  	"𞅉"
  ];
  var java = [
  	"꧐",
  	"꧑",
  	"꧒",
  	"꧓",
  	"꧔",
  	"꧕",
  	"꧖",
  	"꧗",
  	"꧘",
  	"꧙"
  ];
  var kali = [
  	"꤀",
  	"꤁",
  	"꤂",
  	"꤃",
  	"꤄",
  	"꤅",
  	"꤆",
  	"꤇",
  	"꤈",
  	"꤉"
  ];
  var khmr = [
  	"០",
  	"១",
  	"២",
  	"៣",
  	"៤",
  	"៥",
  	"៦",
  	"៧",
  	"៨",
  	"៩"
  ];
  var knda = [
  	"೦",
  	"೧",
  	"೨",
  	"೩",
  	"೪",
  	"೫",
  	"೬",
  	"೭",
  	"೮",
  	"೯"
  ];
  var lana = [
  	"᪀",
  	"᪁",
  	"᪂",
  	"᪃",
  	"᪄",
  	"᪅",
  	"᪆",
  	"᪇",
  	"᪈",
  	"᪉"
  ];
  var lanatham = [
  	"᪐",
  	"᪑",
  	"᪒",
  	"᪓",
  	"᪔",
  	"᪕",
  	"᪖",
  	"᪗",
  	"᪘",
  	"᪙"
  ];
  var laoo = [
  	"໐",
  	"໑",
  	"໒",
  	"໓",
  	"໔",
  	"໕",
  	"໖",
  	"໗",
  	"໘",
  	"໙"
  ];
  var lepc = [
  	"᪐",
  	"᪑",
  	"᪒",
  	"᪓",
  	"᪔",
  	"᪕",
  	"᪖",
  	"᪗",
  	"᪘",
  	"᪙"
  ];
  var limb = [
  	"᥆",
  	"᥇",
  	"᥈",
  	"᥉",
  	"᥊",
  	"᥋",
  	"᥌",
  	"᥍",
  	"᥎",
  	"᥏"
  ];
  var mathbold = [
  	"𝟎",
  	"𝟏",
  	"𝟐",
  	"𝟑",
  	"𝟒",
  	"𝟓",
  	"𝟔",
  	"𝟕",
  	"𝟖",
  	"𝟗"
  ];
  var mathdbl = [
  	"𝟘",
  	"𝟙",
  	"𝟚",
  	"𝟛",
  	"𝟜",
  	"𝟝",
  	"𝟞",
  	"𝟟",
  	"𝟠",
  	"𝟡"
  ];
  var mathmono = [
  	"𝟶",
  	"𝟷",
  	"𝟸",
  	"𝟹",
  	"𝟺",
  	"𝟻",
  	"𝟼",
  	"𝟽",
  	"𝟾",
  	"𝟿"
  ];
  var mathsanb = [
  	"𝟬",
  	"𝟭",
  	"𝟮",
  	"𝟯",
  	"𝟰",
  	"𝟱",
  	"𝟲",
  	"𝟳",
  	"𝟴",
  	"𝟵"
  ];
  var mathsans = [
  	"𝟢",
  	"𝟣",
  	"𝟤",
  	"𝟥",
  	"𝟦",
  	"𝟧",
  	"𝟨",
  	"𝟩",
  	"𝟪",
  	"𝟫"
  ];
  var mlym = [
  	"൦",
  	"൧",
  	"൨",
  	"൩",
  	"൪",
  	"൫",
  	"൬",
  	"൭",
  	"൮",
  	"൯"
  ];
  var modi = [
  	"𑙐",
  	"𑙑",
  	"𑙒",
  	"𑙓",
  	"𑙔",
  	"𑙕",
  	"𑙖",
  	"𑙗",
  	"𑙘",
  	"𑙙"
  ];
  var mong = [
  	"᠐",
  	"᠑",
  	"᠒",
  	"᠓",
  	"᠔",
  	"᠕",
  	"᠖",
  	"᠗",
  	"᠘",
  	"᠙"
  ];
  var mroo = [
  	"𖩠",
  	"𖩡",
  	"𖩢",
  	"𖩣",
  	"𖩤",
  	"𖩥",
  	"𖩦",
  	"𖩧",
  	"𖩨",
  	"𖩩"
  ];
  var mtei = [
  	"꯰",
  	"꯱",
  	"꯲",
  	"꯳",
  	"꯴",
  	"꯵",
  	"꯶",
  	"꯷",
  	"꯸",
  	"꯹"
  ];
  var mymr = [
  	"၀",
  	"၁",
  	"၂",
  	"၃",
  	"၄",
  	"၅",
  	"၆",
  	"၇",
  	"၈",
  	"၉"
  ];
  var mymrshan = [
  	"႐",
  	"႑",
  	"႒",
  	"႓",
  	"႔",
  	"႕",
  	"႖",
  	"႗",
  	"႘",
  	"႙"
  ];
  var mymrtlng = [
  	"꧰",
  	"꧱",
  	"꧲",
  	"꧳",
  	"꧴",
  	"꧵",
  	"꧶",
  	"꧷",
  	"꧸",
  	"꧹"
  ];
  var newa = [
  	"𑑐",
  	"𑑑",
  	"𑑒",
  	"𑑓",
  	"𑑔",
  	"𑑕",
  	"𑑖",
  	"𑑗",
  	"𑑘",
  	"𑑙"
  ];
  var nkoo = [
  	"߀",
  	"߁",
  	"߂",
  	"߃",
  	"߄",
  	"߅",
  	"߆",
  	"߇",
  	"߈",
  	"߉"
  ];
  var olck = [
  	"᱐",
  	"᱑",
  	"᱒",
  	"᱓",
  	"᱔",
  	"᱕",
  	"᱖",
  	"᱗",
  	"᱘",
  	"᱙"
  ];
  var orya = [
  	"୦",
  	"୧",
  	"୨",
  	"୩",
  	"୪",
  	"୫",
  	"୬",
  	"୭",
  	"୮",
  	"୯"
  ];
  var osma = [
  	"𐒠",
  	"𐒡",
  	"𐒢",
  	"𐒣",
  	"𐒤",
  	"𐒥",
  	"𐒦",
  	"𐒧",
  	"𐒨",
  	"𐒩"
  ];
  var rohg = [
  	"𐴰",
  	"𐴱",
  	"𐴲",
  	"𐴳",
  	"𐴴",
  	"𐴵",
  	"𐴶",
  	"𐴷",
  	"𐴸",
  	"𐴹"
  ];
  var saur = [
  	"꣐",
  	"꣑",
  	"꣒",
  	"꣓",
  	"꣔",
  	"꣕",
  	"꣖",
  	"꣗",
  	"꣘",
  	"꣙"
  ];
  var segment = [
  	"🯰",
  	"🯱",
  	"🯲",
  	"🯳",
  	"🯴",
  	"🯵",
  	"🯶",
  	"🯷",
  	"🯸",
  	"🯹"
  ];
  var shrd = [
  	"𑇐",
  	"𑇑",
  	"𑇒",
  	"𑇓",
  	"𑇔",
  	"𑇕",
  	"𑇖",
  	"𑇗",
  	"𑇘",
  	"𑇙"
  ];
  var sind = [
  	"𑋰",
  	"𑋱",
  	"𑋲",
  	"𑋳",
  	"𑋴",
  	"𑋵",
  	"𑋶",
  	"𑋷",
  	"𑋸",
  	"𑋹"
  ];
  var sinh = [
  	"෦",
  	"෧",
  	"෨",
  	"෩",
  	"෪",
  	"෫",
  	"෬",
  	"෭",
  	"෮",
  	"෯"
  ];
  var sora = [
  	"𑃰",
  	"𑃱",
  	"𑃲",
  	"𑃳",
  	"𑃴",
  	"𑃵",
  	"𑃶",
  	"𑃷",
  	"𑃸",
  	"𑃹"
  ];
  var sund = [
  	"᮰",
  	"᮱",
  	"᮲",
  	"᮳",
  	"᮴",
  	"᮵",
  	"᮶",
  	"᮷",
  	"᮸",
  	"᮹"
  ];
  var takr = [
  	"𑛀",
  	"𑛁",
  	"𑛂",
  	"𑛃",
  	"𑛄",
  	"𑛅",
  	"𑛆",
  	"𑛇",
  	"𑛈",
  	"𑛉"
  ];
  var talu = [
  	"᧐",
  	"᧑",
  	"᧒",
  	"᧓",
  	"᧔",
  	"᧕",
  	"᧖",
  	"᧗",
  	"᧘",
  	"᧙"
  ];
  var tamldec = [
  	"௦",
  	"௧",
  	"௨",
  	"௩",
  	"௪",
  	"௫",
  	"௬",
  	"௭",
  	"௮",
  	"௯"
  ];
  var telu = [
  	"౦",
  	"౧",
  	"౨",
  	"౩",
  	"౪",
  	"౫",
  	"౬",
  	"౭",
  	"౮",
  	"౯"
  ];
  var thai = [
  	"๐",
  	"๑",
  	"๒",
  	"๓",
  	"๔",
  	"๕",
  	"๖",
  	"๗",
  	"๘",
  	"๙"
  ];
  var tibt = [
  	"༠",
  	"༡",
  	"༢",
  	"༣",
  	"༤",
  	"༥",
  	"༦",
  	"༧",
  	"༨",
  	"༩"
  ];
  var tirh = [
  	"𑓐",
  	"𑓑",
  	"𑓒",
  	"𑓓",
  	"𑓔",
  	"𑓕",
  	"𑓖",
  	"𑓗",
  	"𑓘",
  	"𑓙"
  ];
  var vaii = [
  	"ᘠ",
  	"ᘡ",
  	"ᘢ",
  	"ᘣ",
  	"ᘤ",
  	"ᘥ",
  	"ᘦ",
  	"ᘧ",
  	"ᘨ",
  	"ᘩ"
  ];
  var wara = [
  	"𑣠",
  	"𑣡",
  	"𑣢",
  	"𑣣",
  	"𑣤",
  	"𑣥",
  	"𑣦",
  	"𑣧",
  	"𑣨",
  	"𑣩"
  ];
  var wcho = [
  	"𞋰",
  	"𞋱",
  	"𞋲",
  	"𞋳",
  	"𞋴",
  	"𞋵",
  	"𞋶",
  	"𞋷",
  	"𞋸",
  	"𞋹"
  ];
  var digitMapping = {
  	adlm: adlm,
  	ahom: ahom,
  	arab: arab,
  	arabext: arabext,
  	bali: bali,
  	beng: beng,
  	bhks: bhks,
  	brah: brah,
  	cakm: cakm,
  	cham: cham,
  	deva: deva,
  	diak: diak,
  	fullwide: fullwide,
  	gong: gong,
  	gonm: gonm,
  	gujr: gujr,
  	guru: guru,
  	hanidec: hanidec,
  	hmng: hmng,
  	hmnp: hmnp,
  	java: java,
  	kali: kali,
  	khmr: khmr,
  	knda: knda,
  	lana: lana,
  	lanatham: lanatham,
  	laoo: laoo,
  	lepc: lepc,
  	limb: limb,
  	mathbold: mathbold,
  	mathdbl: mathdbl,
  	mathmono: mathmono,
  	mathsanb: mathsanb,
  	mathsans: mathsans,
  	mlym: mlym,
  	modi: modi,
  	mong: mong,
  	mroo: mroo,
  	mtei: mtei,
  	mymr: mymr,
  	mymrshan: mymrshan,
  	mymrtlng: mymrtlng,
  	newa: newa,
  	nkoo: nkoo,
  	olck: olck,
  	orya: orya,
  	osma: osma,
  	rohg: rohg,
  	saur: saur,
  	segment: segment,
  	shrd: shrd,
  	sind: sind,
  	sinh: sinh,
  	sora: sora,
  	sund: sund,
  	takr: takr,
  	talu: talu,
  	tamldec: tamldec,
  	telu: telu,
  	thai: thai,
  	tibt: tibt,
  	tirh: tirh,
  	vaii: vaii,
  	wara: wara,
  	wcho: wcho
  };

  var digitMapping$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    adlm: adlm,
    ahom: ahom,
    arab: arab,
    arabext: arabext,
    bali: bali,
    beng: beng,
    bhks: bhks,
    brah: brah,
    cakm: cakm,
    cham: cham,
    deva: deva,
    diak: diak,
    fullwide: fullwide,
    gong: gong,
    gonm: gonm,
    gujr: gujr,
    guru: guru,
    hanidec: hanidec,
    hmng: hmng,
    hmnp: hmnp,
    java: java,
    kali: kali,
    khmr: khmr,
    knda: knda,
    lana: lana,
    lanatham: lanatham,
    laoo: laoo,
    lepc: lepc,
    limb: limb,
    mathbold: mathbold,
    mathdbl: mathdbl,
    mathmono: mathmono,
    mathsanb: mathsanb,
    mathsans: mathsans,
    mlym: mlym,
    modi: modi,
    mong: mong,
    mroo: mroo,
    mtei: mtei,
    mymr: mymr,
    mymrshan: mymrshan,
    mymrtlng: mymrtlng,
    newa: newa,
    nkoo: nkoo,
    olck: olck,
    orya: orya,
    osma: osma,
    rohg: rohg,
    saur: saur,
    segment: segment,
    shrd: shrd,
    sind: sind,
    sinh: sinh,
    sora: sora,
    sund: sund,
    takr: takr,
    talu: talu,
    tamldec: tamldec,
    telu: telu,
    thai: thai,
    tibt: tibt,
    tirh: tirh,
    vaii: vaii,
    wara: wara,
    wcho: wcho,
    'default': digitMapping
  });

  // This is from: unicode-12.1.0/General_Category/Symbol/regex.js
  // IE11 does not support unicode flag, otherwise this is just /\p{S}/u.
  var S_UNICODE_REGEX = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BF\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B98-\u2BFF\u2CE5-\u2CEA\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9B\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD10-\uDD6C\uDD70-\uDDAC\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED5\uDEE0-\uDEEC\uDEF0-\uDEFA\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD00-\uDD0B\uDD0D-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDE53\uDE60-\uDE6D\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95]/;
  // /^\p{S}/u
  var CARET_S_UNICODE_REGEX = new RegExp("^" + S_UNICODE_REGEX.source);
  // /\p{S}$/u
  var S_DOLLAR_UNICODE_REGEX = new RegExp(S_UNICODE_REGEX.source + "$");
  var CLDR_NUMBER_PATTERN = /[#0](?:[\.,][#0]+)*/g;
  function formatToParts(numberResult, data, pl, options) {
      var sign = numberResult.sign, exponent = numberResult.exponent, magnitude = numberResult.magnitude;
      var notation = options.notation, style = options.style, numberingSystem = options.numberingSystem;
      var defaultNumberingSystem = data.numbers.nu[0];
      // #region Part 1: partition and interpolate the CLDR number pattern.
      // ----------------------------------------------------------
      var compactNumberPattern = null;
      if (notation === 'compact' && magnitude) {
          compactNumberPattern = getCompactDisplayPattern(numberResult, pl, data, style, options.compactDisplay, options.currencyDisplay, numberingSystem);
      }
      // This is used multiple times
      var nonNameCurrencyPart;
      if (style === 'currency' && options.currencyDisplay !== 'name') {
          var byCurrencyDisplay = data.currencies[options.currency];
          if (byCurrencyDisplay) {
              switch (options.currencyDisplay) {
                  case 'code':
                      nonNameCurrencyPart = options.currency;
                      break;
                  case 'symbol':
                      nonNameCurrencyPart = byCurrencyDisplay.symbol;
                      break;
                  default:
                      nonNameCurrencyPart = byCurrencyDisplay.narrow;
                      break;
              }
          }
          else {
              // Fallback for unknown currency
              nonNameCurrencyPart = options.currency;
          }
      }
      var numberPattern;
      if (!compactNumberPattern) {
          // Note: if the style is unit, or is currency and the currency display is name,
          // its unit parts will be interpolated in part 2. So here we can fallback to decimal.
          if (style === 'decimal' ||
              style === 'unit' ||
              (style === 'currency' && options.currencyDisplay === 'name')) {
              // Shortcut for decimal
              var decimalData = data.numbers.decimal[numberingSystem] ||
                  data.numbers.decimal[defaultNumberingSystem];
              numberPattern = getPatternForSign(decimalData.standard, sign);
          }
          else if (style === 'currency') {
              var currencyData = data.numbers.currency[numberingSystem] ||
                  data.numbers.currency[defaultNumberingSystem];
              // We replace number pattern part with `0` for easier postprocessing.
              numberPattern = getPatternForSign(currencyData[options.currencySign], sign);
          }
          else {
              // percent
              var percentPattern = data.numbers.percent[numberingSystem] ||
                  data.numbers.percent[defaultNumberingSystem];
              numberPattern = getPatternForSign(percentPattern, sign);
          }
      }
      else {
          numberPattern = compactNumberPattern;
      }
      // Extract the decimal number pattern string. It looks like "#,##0,00", which will later be
      // used to infer decimal group sizes.
      var decimalNumberPattern = CLDR_NUMBER_PATTERN.exec(numberPattern)[0];
      // Now we start to substitute patterns
      // 1. replace strings like `0` and `#,##0.00` with `{0}`
      // 2. unquote characters (invariant: the quoted characters does not contain the special tokens)
      numberPattern = numberPattern
          .replace(CLDR_NUMBER_PATTERN, '{0}')
          .replace(/'(.)'/g, '$1');
      // Handle currency spacing (both compact and non-compact).
      if (style === 'currency' && options.currencyDisplay !== 'name') {
          var currencyData = data.numbers.currency[numberingSystem] ||
              data.numbers.currency[defaultNumberingSystem];
          // See `currencySpacing` substitution rule in TR-35.
          // Here we always assume the currencyMatch is "[:^S:]" and surroundingMatch is "[:digit:]".
          //
          // Example 1: for pattern "#,##0.00¤" with symbol "US$", we replace "¤" with the symbol,
          // but insert an extra non-break space before the symbol, because "[:^S:]" matches "U" in
          // "US$" and "[:digit:]" matches the latn numbering system digits.
          //
          // Example 2: for pattern "¤#,##0.00" with symbol "US$", there is no spacing between symbol
          // and number, because `$` does not match "[:^S:]".
          //
          // Implementation note: here we do the best effort to infer the insertion.
          // We also assume that `beforeInsertBetween` and `afterInsertBetween` will never be `;`.
          var afterCurrency = currencyData.currencySpacing.afterInsertBetween;
          if (afterCurrency && !S_DOLLAR_UNICODE_REGEX.test(nonNameCurrencyPart)) {
              numberPattern = numberPattern.replace('¤{0}', "\u00A4" + afterCurrency + "{0}");
          }
          var beforeCurrency = currencyData.currencySpacing.beforeInsertBetween;
          if (beforeCurrency && !CARET_S_UNICODE_REGEX.test(nonNameCurrencyPart)) {
              numberPattern = numberPattern.replace('{0}¤', "{0}" + beforeCurrency + "\u00A4");
          }
      }
      // The following tokens are special: `{0}`, `¤`, `%`, `-`, `+`, `{c:...}.
      var numberPatternParts = numberPattern.split(/({c:[^}]+}|\{0\}|[¤%\-\+])/g);
      var numberParts = [];
      var symbols = data.numbers.symbols[numberingSystem] ||
          data.numbers.symbols[defaultNumberingSystem];
      for (var _i = 0, numberPatternParts_1 = numberPatternParts; _i < numberPatternParts_1.length; _i++) {
          var part = numberPatternParts_1[_i];
          if (!part) {
              continue;
          }
          switch (part) {
              case '{0}': {
                  // We only need to handle scientific and engineering notation here.
                  numberParts.push.apply(numberParts, paritionNumberIntoParts(symbols, numberResult, notation, exponent, numberingSystem, 
                  // If compact number pattern exists, do not insert group separators.
                  !compactNumberPattern && options.useGrouping, decimalNumberPattern));
                  break;
              }
              case '-':
                  numberParts.push({ type: 'minusSign', value: symbols.minusSign });
                  break;
              case '+':
                  numberParts.push({ type: 'plusSign', value: symbols.plusSign });
                  break;
              case '%':
                  numberParts.push({ type: 'percentSign', value: symbols.percentSign });
                  break;
              case '¤':
                  // Computed above when handling currency spacing.
                  numberParts.push({ type: 'currency', value: nonNameCurrencyPart });
                  break;
              default:
                  if (/^\{c:/.test(part)) {
                      numberParts.push({
                          type: 'compact',
                          value: part.substring(3, part.length - 1),
                      });
                  }
                  else {
                      // literal
                      numberParts.push({ type: 'literal', value: part });
                  }
                  break;
          }
      }
      // #endregion
      // #region Part 2: interpolate unit pattern if necessary.
      // ----------------------------------------------
      switch (style) {
          case 'currency': {
              // `currencyDisplay: 'name'` has similar pattern handling as units.
              if (options.currencyDisplay === 'name') {
                  var unitPattern = (data.numbers.currency[numberingSystem] ||
                      data.numbers.currency[defaultNumberingSystem]).unitPattern;
                  // Select plural
                  var unitName = void 0;
                  var currencyNameData = data.currencies[options.currency];
                  if (currencyNameData) {
                      unitName = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), currencyNameData.displayName);
                  }
                  else {
                      // Fallback for unknown currency
                      unitName = options.currency;
                  }
                  // Do {0} and {1} substitution
                  var unitPatternParts = unitPattern.split(/(\{[01]\})/g);
                  var result = [];
                  for (var _a = 0, unitPatternParts_1 = unitPatternParts; _a < unitPatternParts_1.length; _a++) {
                      var part = unitPatternParts_1[_a];
                      switch (part) {
                          case '{0}':
                              result.push.apply(result, numberParts);
                              break;
                          case '{1}':
                              result.push({ type: 'currency', value: unitName });
                              break;
                          default:
                              if (part) {
                                  result.push({ type: 'literal', value: part });
                              }
                              break;
                      }
                  }
                  return result;
              }
              else {
                  return numberParts;
              }
          }
          case 'unit': {
              var unit = options.unit, unitDisplay = options.unitDisplay;
              var unitData = data.units.simple[unit];
              var unitPattern = void 0;
              if (unitData) {
                  // Simple unit pattern
                  unitPattern = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), data.units.simple[unit][unitDisplay]);
              }
              else {
                  // See: http://unicode.org/reports/tr35/tr35-general.html#perUnitPatterns
                  // If cannot find unit in the simple pattern, it must be "per" compound pattern.
                  // Implementation note: we are not following TR-35 here because we need to format to parts!
                  var _b = unit.split('-per-'), numeratorUnit = _b[0], denominatorUnit = _b[1];
                  unitData = data.units.simple[numeratorUnit];
                  var numeratorUnitPattern = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), data.units.simple[numeratorUnit][unitDisplay]);
                  var perUnitPattern = data.units.simple[denominatorUnit].perUnit[unitDisplay];
                  if (perUnitPattern) {
                      // perUnitPattern exists, combine it with numeratorUnitPattern
                      unitPattern = perUnitPattern.replace('{0}', numeratorUnitPattern);
                  }
                  else {
                      // get compoundUnit pattern (e.g. "{0} per {1}"), repalce {0} with numerator pattern and {1} with
                      // the denominator pattern in singular form.
                      var perPattern = data.units.compound.per[unitDisplay];
                      var denominatorPattern = selectPlural(pl, 1, data.units.simple[denominatorUnit][unitDisplay]);
                      unitPattern = unitPattern = perPattern
                          .replace('{0}', numeratorUnitPattern)
                          .replace('{1}', denominatorPattern.replace('{0}', ''));
                  }
              }
              var result = [];
              // We need spacing around "{0}" because they are not treated as "unit" parts, but "literal".
              for (var _c = 0, _d = unitPattern.split(/(\s*\{0\}\s*)/); _c < _d.length; _c++) {
                  var part = _d[_c];
                  var interpolateMatch = /^(\s*)\{0\}(\s*)$/.exec(part);
                  if (interpolateMatch) {
                      // Space before "{0}"
                      if (interpolateMatch[1]) {
                          result.push({ type: 'literal', value: interpolateMatch[1] });
                      }
                      // "{0}" itself
                      result.push.apply(result, numberParts);
                      // Space after "{0}"
                      if (interpolateMatch[2]) {
                          result.push({ type: 'literal', value: interpolateMatch[2] });
                      }
                  }
                  else if (part) {
                      result.push({ type: 'unit', value: part });
                  }
              }
              return result;
          }
          default:
              return numberParts;
      }
      // #endregion
  }
  // A subset of https://tc39.es/ecma402/#sec-partitionnotationsubpattern
  // Plus the exponent parts handling.
  function paritionNumberIntoParts(symbols, numberResult, notation, exponent, numberingSystem, useGrouping, 
  /**
   * This is the decimal number pattern without signs or symbols.
   * It is used to infer the group size when `useGrouping` is true.
   *
   * A typical value looks like "#,##0.00" (primary group size is 3).
   * Some locales like Hindi has secondary group size of 2 (e.g. "#,##,##0.00").
   */
  decimalNumberPattern) {
      var result = [];
      // eslint-disable-next-line prefer-const
      var n = numberResult.formattedString, x = numberResult.roundedNumber;
      if (isNaN(x)) {
          return [{ type: 'nan', value: n }];
      }
      else if (!isFinite(x)) {
          return [{ type: 'infinity', value: n }];
      }
      var digitReplacementTable = digitMapping$1[numberingSystem];
      if (digitReplacementTable) {
          n = n.replace(/\d/g, function (digit) { return digitReplacementTable[+digit] || digit; });
      }
      // TODO: Else use an implementation dependent algorithm to map n to the appropriate
      // representation of n in the given numbering system.
      var decimalSepIndex = n.indexOf('.');
      var integer;
      var fraction;
      if (decimalSepIndex > 0) {
          integer = n.slice(0, decimalSepIndex);
          fraction = n.slice(decimalSepIndex + 1);
      }
      else {
          integer = n;
      }
      // #region Grouping integer digits
      // The weird compact and x >= 10000 check is to ensure consistency with Node.js and Chrome.
      // Note that `de` does not have compact form for thousands, but Node.js does not insert grouping separator
      // unless the rounded number is greater than 10000:
      //   NumberFormat('de', {notation: 'compact', compactDisplay: 'short'}).format(1234) //=> "1234"
      //   NumberFormat('de').format(1234) //=> "1.234"
      if (useGrouping && (notation !== 'compact' || x >= 10000)) {
          var groupSepSymbol = symbols.group;
          var groups = [];
          // > There may be two different grouping sizes: The primary grouping size used for the least
          // > significant integer group, and the secondary grouping size used for more significant groups.
          // > If a pattern contains multiple grouping separators, the interval between the last one and the
          // > end of the integer defines the primary grouping size, and the interval between the last two
          // > defines the secondary grouping size. All others are ignored.
          var integerNumberPattern = decimalNumberPattern.split('.')[0];
          var patternGroups = integerNumberPattern.split(',');
          var primaryGroupingSize = 3;
          var secondaryGroupingSize = 3;
          if (patternGroups.length > 1) {
              primaryGroupingSize = patternGroups[patternGroups.length - 1].length;
          }
          if (patternGroups.length > 2) {
              secondaryGroupingSize = patternGroups[patternGroups.length - 2].length;
          }
          var i = integer.length - primaryGroupingSize;
          if (i > 0) {
              // Slice the least significant integer group
              groups.push(integer.slice(i, i + primaryGroupingSize));
              // Then iteratively push the more signicant groups
              // TODO: handle surrogate pairs in some numbering system digits
              for (i -= secondaryGroupingSize; i > 0; i -= secondaryGroupingSize) {
                  groups.push(integer.slice(i, i + secondaryGroupingSize));
              }
              groups.push(integer.slice(0, i + secondaryGroupingSize));
          }
          else {
              groups.push(integer);
          }
          while (groups.length > 0) {
              var integerGroup = groups.pop();
              result.push({ type: 'integer', value: integerGroup });
              if (groups.length > 0) {
                  result.push({ type: 'group', value: groupSepSymbol });
              }
          }
      }
      else {
          result.push({ type: 'integer', value: integer });
      }
      // #endregion
      if (fraction !== undefined) {
          result.push({ type: 'decimal', value: symbols.decimal }, { type: 'fraction', value: fraction });
      }
      if ((notation === 'scientific' || notation === 'engineering') &&
          isFinite(x)) {
          result.push({ type: 'exponentSeparator', value: symbols.exponential });
          if (exponent < 0) {
              result.push({ type: 'exponentMinusSign', value: symbols.minusSign });
              exponent = -exponent;
          }
          var exponentResult = ToRawFixed(exponent, 0, 0);
          result.push({
              type: 'exponentInteger',
              value: exponentResult.formattedString,
          });
      }
      return result;
  }
  function getPatternForSign(pattern, sign) {
      if (pattern.indexOf(';') < 0) {
          pattern = pattern + ";-" + pattern;
      }
      var _a = pattern.split(';'), zeroPattern = _a[0], negativePattern = _a[1];
      switch (sign) {
          case 0:
              return zeroPattern;
          case -1:
              return negativePattern;
          default:
              return negativePattern.indexOf('-') >= 0
                  ? negativePattern.replace(/-/g, '+')
                  : "+" + zeroPattern;
      }
  }
  // Find the CLDR pattern for compact notation based on the magnitude of data and style.
  //
  // Example return value: "¤ {c:laki}000;¤{c:laki} -0" (`sw` locale):
  // - Notice the `{c:...}` token that wraps the compact literal.
  // - The consecutive zeros are normalized to single zero to match CLDR_NUMBER_PATTERN.
  //
  // Returning null means the compact display pattern cannot be found.
  function getCompactDisplayPattern(numberResult, pl, data, style, compactDisplay, currencyDisplay, numberingSystem) {
      var _a;
      var roundedNumber = numberResult.roundedNumber, sign = numberResult.sign, magnitude = numberResult.magnitude;
      var magnitudeKey = String(Math.pow(10, magnitude));
      var defaultNumberingSystem = data.numbers.nu[0];
      var pattern;
      if (style === 'currency' && currencyDisplay !== 'name') {
          var byNumberingSystem = data.numbers.currency;
          var currencyData = byNumberingSystem[numberingSystem] ||
              byNumberingSystem[defaultNumberingSystem];
          // NOTE: compact notation ignores currencySign!
          var compactPluralRules = (_a = currencyData.short) === null || _a === void 0 ? void 0 : _a[magnitudeKey];
          if (!compactPluralRules) {
              return null;
          }
          pattern = selectPlural(pl, roundedNumber, compactPluralRules);
      }
      else {
          var byNumberingSystem = data.numbers.decimal;
          var byCompactDisplay = byNumberingSystem[numberingSystem] ||
              byNumberingSystem[defaultNumberingSystem];
          var compactPlaralRule = byCompactDisplay[compactDisplay][magnitudeKey];
          if (!compactPlaralRule) {
              return null;
          }
          pattern = selectPlural(pl, roundedNumber, compactPlaralRule);
      }
      // See https://unicode.org/reports/tr35/tr35-numbers.html#Compact_Number_Formats
      // > If the value is precisely “0”, either explicit or defaulted, then the normal number format
      // > pattern for that sort of object is supplied.
      if (pattern === '0') {
          return null;
      }
      pattern = getPatternForSign(pattern, sign)
          // Extract compact literal from the pattern
          .replace(/([^\s;\-\+\d¤]+)/g, '{c:$1}')
          // We replace one or more zeros with a single zero so it matches `CLDR_NUMBER_PATTERN`.
          .replace(/0+/, '0');
      return pattern;
  }
  function selectPlural(pl, x, rules) {
      return rules[pl.select(x)] || rules.other;
  }

  /**
   * https://tc39.es/ecma402/#sec-formatnumberstring
   */
  function PartitionNumberPattern(numberFormat, x, _a) {
      var _b;
      var getInternalSlots = _a.getInternalSlots;
      var internalSlots = getInternalSlots(numberFormat);
      var pl = internalSlots.pl, dataLocaleData = internalSlots.dataLocaleData, numberingSystem = internalSlots.numberingSystem;
      var symbols = dataLocaleData.numbers.symbols[numberingSystem] ||
          dataLocaleData.numbers.symbols[dataLocaleData.numbers.nu[0]];
      var magnitude = 0;
      var exponent = 0;
      var n;
      if (isNaN(x)) {
          n = symbols.nan;
      }
      else if (!isFinite(x)) {
          n = symbols.infinity;
      }
      else {
          if (internalSlots.style === 'percent') {
              x *= 100;
          }
          _b = ComputeExponent(numberFormat, x, {
              getInternalSlots: getInternalSlots,
          }), exponent = _b[0], magnitude = _b[1];
          // Preserve more precision by doing multiplication when exponent is negative.
          x = exponent < 0 ? x * Math.pow(10, -exponent) : x / Math.pow(10, exponent);
          var formatNumberResult = FormatNumericToString(internalSlots, x);
          n = formatNumberResult.formattedString;
          x = formatNumberResult.roundedNumber;
      }
      // Based on https://tc39.es/ecma402/#sec-getnumberformatpattern
      // We need to do this before `x` is rounded.
      var sign;
      var signDisplay = internalSlots.signDisplay;
      switch (signDisplay) {
          case 'never':
              sign = 0;
              break;
          case 'auto':
              if (SameValue(x, 0) || x > 0 || isNaN(x)) {
                  sign = 0;
              }
              else {
                  sign = -1;
              }
              break;
          case 'always':
              if (SameValue(x, 0) || x > 0 || isNaN(x)) {
                  sign = 1;
              }
              else {
                  sign = -1;
              }
              break;
          default:
              // x === 0 -> x is 0 or x is -0
              if (x === 0 || isNaN(x)) {
                  sign = 0;
              }
              else if (x > 0) {
                  sign = 1;
              }
              else {
                  sign = -1;
              }
      }
      return formatToParts({ roundedNumber: x, formattedString: n, exponent: exponent, magnitude: magnitude, sign: sign }, internalSlots.dataLocaleData, pl, internalSlots);
  }

  function FormatNumericToParts(nf, x, implDetails) {
      var parts = PartitionNumberPattern(nf, x, implDetails);
      var result = ArrayCreate(0);
      for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
          var part = parts_1[_i];
          result.push({
              type: part.type,
              value: part.value,
          });
      }
      return result;
  }

  /**
   * https://tc39.es/ecma402/#sec-setnumberformatunitoptions
   */
  function SetNumberFormatUnitOptions(nf, options, _a) {
      if (options === void 0) { options = Object.create(null); }
      var getInternalSlots = _a.getInternalSlots;
      var internalSlots = getInternalSlots(nf);
      var style = GetOption(options, 'style', 'string', ['decimal', 'percent', 'currency', 'unit'], 'decimal');
      internalSlots.style = style;
      var currency = GetOption(options, 'currency', 'string', undefined, undefined);
      if (currency !== undefined && !IsWellFormedCurrencyCode(currency)) {
          throw RangeError('Malformed currency code');
      }
      if (style === 'currency' && currency === undefined) {
          throw TypeError('currency cannot be undefined');
      }
      var currencyDisplay = GetOption(options, 'currencyDisplay', 'string', ['code', 'symbol', 'narrowSymbol', 'name'], 'symbol');
      var currencySign = GetOption(options, 'currencySign', 'string', ['standard', 'accounting'], 'standard');
      var unit = GetOption(options, 'unit', 'string', undefined, undefined);
      if (unit !== undefined && !IsWellFormedUnitIdentifier(unit)) {
          throw RangeError('Invalid unit argument for Intl.NumberFormat()');
      }
      if (style === 'unit' && unit === undefined) {
          throw TypeError('unit cannot be undefined');
      }
      var unitDisplay = GetOption(options, 'unitDisplay', 'string', ['short', 'narrow', 'long'], 'short');
      if (style === 'currency') {
          internalSlots.currency = currency.toUpperCase();
          internalSlots.currencyDisplay = currencyDisplay;
          internalSlots.currencySign = currencySign;
      }
      if (style === 'unit') {
          internalSlots.unit = unit;
          internalSlots.unitDisplay = unitDisplay;
      }
  }

  /**
   * https://tc39.es/ecma402/#sec-setnfdigitoptions
   */
  function SetNumberFormatDigitOptions(internalSlots, opts, mnfdDefault, mxfdDefault, notation) {
      var mnid = GetNumberOption(opts, 'minimumIntegerDigits', 1, 21, 1);
      var mnfd = opts.minimumFractionDigits;
      var mxfd = opts.maximumFractionDigits;
      var mnsd = opts.minimumSignificantDigits;
      var mxsd = opts.maximumSignificantDigits;
      internalSlots.minimumIntegerDigits = mnid;
      if (mnsd !== undefined || mxsd !== undefined) {
          internalSlots.roundingType = 'significantDigits';
          mnsd = DefaultNumberOption(mnsd, 1, 21, 1);
          mxsd = DefaultNumberOption(mxsd, mnsd, 21, 21);
          internalSlots.minimumSignificantDigits = mnsd;
          internalSlots.maximumSignificantDigits = mxsd;
      }
      else if (mnfd !== undefined || mxfd !== undefined) {
          internalSlots.roundingType = 'fractionDigits';
          mnfd = DefaultNumberOption(mnfd, 0, 20, mnfdDefault);
          var mxfdActualDefault = Math.max(mnfd, mxfdDefault);
          mxfd = DefaultNumberOption(mxfd, mnfd, 20, mxfdActualDefault);
          internalSlots.minimumFractionDigits = mnfd;
          internalSlots.maximumFractionDigits = mxfd;
      }
      else if (notation === 'compact') {
          internalSlots.roundingType = 'compactRounding';
      }
      else {
          internalSlots.roundingType = 'fractionDigits';
          internalSlots.minimumFractionDigits = mnfdDefault;
          internalSlots.maximumFractionDigits = mxfdDefault;
      }
  }

  /**
   * https://tc39.es/ecma402/#sec-initializenumberformat
   */
  function InitializeNumberFormat(nf, locales, opts, _a) {
      var getInternalSlots = _a.getInternalSlots, localeData = _a.localeData, availableLocales = _a.availableLocales, numberingSystemNames = _a.numberingSystemNames, getDefaultLocale = _a.getDefaultLocale, currencyDigitsData = _a.currencyDigitsData;
      // @ts-ignore
      var requestedLocales = CanonicalizeLocaleList(locales);
      var options = opts === undefined ? Object.create(null) : ToObject(opts);
      var opt = Object.create(null);
      var matcher = GetOption(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
      opt.localeMatcher = matcher;
      var numberingSystem = GetOption(options, 'numberingSystem', 'string', undefined, undefined);
      if (numberingSystem !== undefined &&
          numberingSystemNames.indexOf(numberingSystem) < 0) {
          // 8.a. If numberingSystem does not match the Unicode Locale Identifier type nonterminal,
          // throw a RangeError exception.
          throw RangeError("Invalid numberingSystems: " + numberingSystem);
      }
      opt.nu = numberingSystem;
      var r = ResolveLocale(availableLocales, requestedLocales, opt, 
      // [[RelevantExtensionKeys]] slot, which is a constant
      ['nu'], localeData, getDefaultLocale);
      var dataLocaleData = localeData[r.dataLocale];
      invariant(!!dataLocaleData, "Missing locale data for " + r.dataLocale);
      var internalSlots = getInternalSlots(nf);
      internalSlots.locale = r.locale;
      internalSlots.dataLocale = r.dataLocale;
      internalSlots.numberingSystem = r.nu;
      internalSlots.dataLocaleData = dataLocaleData;
      SetNumberFormatUnitOptions(nf, options, { getInternalSlots: getInternalSlots });
      var style = internalSlots.style;
      var mnfdDefault;
      var mxfdDefault;
      if (style === 'currency') {
          var currency = internalSlots.currency;
          var cDigits = CurrencyDigits(currency, { currencyDigitsData: currencyDigitsData });
          mnfdDefault = cDigits;
          mxfdDefault = cDigits;
      }
      else {
          mnfdDefault = 0;
          mxfdDefault = style === 'percent' ? 0 : 3;
      }
      var notation = GetOption(options, 'notation', 'string', ['standard', 'scientific', 'engineering', 'compact'], 'standard');
      internalSlots.notation = notation;
      SetNumberFormatDigitOptions(internalSlots, options, mnfdDefault, mxfdDefault, notation);
      var compactDisplay = GetOption(options, 'compactDisplay', 'string', ['short', 'long'], 'short');
      if (notation === 'compact') {
          internalSlots.compactDisplay = compactDisplay;
      }
      var useGrouping = GetOption(options, 'useGrouping', 'boolean', undefined, true);
      internalSlots.useGrouping = useGrouping;
      var signDisplay = GetOption(options, 'signDisplay', 'string', ['auto', 'never', 'always', 'exceptZero'], 'auto');
      internalSlots.signDisplay = signDisplay;
      return nf;
  }

  /**
   * https://tc39.es/ecma402/#sec-lookupsupportedlocales
   * @param availableLocales
   * @param requestedLocales
   */
  function LookupSupportedLocales(availableLocales, requestedLocales) {
      var subset = [];
      for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
          var locale = requestedLocales_1[_i];
          var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, '');
          var availableLocale = BestAvailableLocale(availableLocales, noExtensionLocale);
          if (availableLocale) {
              subset.push(availableLocale);
          }
      }
      return subset;
  }

  /**
   * https://tc39.es/ecma402/#sec-supportedlocales
   * @param availableLocales
   * @param requestedLocales
   * @param options
   */
  function SupportedLocales(availableLocales, requestedLocales, options) {
      var matcher = 'best fit';
      if (options !== undefined) {
          options = ToObject(options);
          matcher = GetOption(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
      }
      if (matcher === 'best fit') {
          return LookupSupportedLocales(availableLocales, requestedLocales);
      }
      return LookupSupportedLocales(availableLocales, requestedLocales);
  }

  var ADP = 0;
  var AFN = 0;
  var ALL = 0;
  var AMD = 2;
  var BHD = 3;
  var BIF = 0;
  var BYN = 2;
  var BYR = 0;
  var CAD = 2;
  var CHF = 2;
  var CLF = 4;
  var CLP = 0;
  var COP = 2;
  var CRC = 2;
  var CZK = 2;
  var DEFAULT = 2;
  var DJF = 0;
  var DKK = 2;
  var ESP = 0;
  var GNF = 0;
  var GYD = 2;
  var HUF = 2;
  var IDR = 2;
  var IQD = 0;
  var IRR = 0;
  var ISK = 0;
  var ITL = 0;
  var JOD = 3;
  var JPY = 0;
  var KMF = 0;
  var KPW = 0;
  var KRW = 0;
  var KWD = 3;
  var LAK = 0;
  var LBP = 0;
  var LUF = 0;
  var LYD = 3;
  var MGA = 0;
  var MGF = 0;
  var MMK = 0;
  var MNT = 2;
  var MRO = 0;
  var MUR = 2;
  var NOK = 2;
  var OMR = 3;
  var PKR = 2;
  var PYG = 0;
  var RSD = 0;
  var RWF = 0;
  var SEK = 2;
  var SLL = 0;
  var SOS = 0;
  var STD = 0;
  var SYP = 0;
  var TMM = 0;
  var TND = 3;
  var TRL = 0;
  var TWD = 2;
  var TZS = 2;
  var UGX = 0;
  var UYI = 0;
  var UYW = 4;
  var UZS = 2;
  var VEF = 2;
  var VND = 0;
  var VUV = 0;
  var XAF = 0;
  var XOF = 0;
  var XPF = 0;
  var YER = 0;
  var ZMK = 0;
  var ZWD = 0;
  var currencyDigits = {
  	ADP: ADP,
  	AFN: AFN,
  	ALL: ALL,
  	AMD: AMD,
  	BHD: BHD,
  	BIF: BIF,
  	BYN: BYN,
  	BYR: BYR,
  	CAD: CAD,
  	CHF: CHF,
  	CLF: CLF,
  	CLP: CLP,
  	COP: COP,
  	CRC: CRC,
  	CZK: CZK,
  	DEFAULT: DEFAULT,
  	DJF: DJF,
  	DKK: DKK,
  	ESP: ESP,
  	GNF: GNF,
  	GYD: GYD,
  	HUF: HUF,
  	IDR: IDR,
  	IQD: IQD,
  	IRR: IRR,
  	ISK: ISK,
  	ITL: ITL,
  	JOD: JOD,
  	JPY: JPY,
  	KMF: KMF,
  	KPW: KPW,
  	KRW: KRW,
  	KWD: KWD,
  	LAK: LAK,
  	LBP: LBP,
  	LUF: LUF,
  	LYD: LYD,
  	MGA: MGA,
  	MGF: MGF,
  	MMK: MMK,
  	MNT: MNT,
  	MRO: MRO,
  	MUR: MUR,
  	NOK: NOK,
  	OMR: OMR,
  	PKR: PKR,
  	PYG: PYG,
  	RSD: RSD,
  	RWF: RWF,
  	SEK: SEK,
  	SLL: SLL,
  	SOS: SOS,
  	STD: STD,
  	SYP: SYP,
  	TMM: TMM,
  	TND: TND,
  	TRL: TRL,
  	TWD: TWD,
  	TZS: TZS,
  	UGX: UGX,
  	UYI: UYI,
  	UYW: UYW,
  	UZS: UZS,
  	VEF: VEF,
  	VND: VND,
  	VUV: VUV,
  	XAF: XAF,
  	XOF: XOF,
  	XPF: XPF,
  	YER: YER,
  	ZMK: ZMK,
  	ZWD: ZWD
  };

  var currencyDigitsData = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ADP: ADP,
    AFN: AFN,
    ALL: ALL,
    AMD: AMD,
    BHD: BHD,
    BIF: BIF,
    BYN: BYN,
    BYR: BYR,
    CAD: CAD,
    CHF: CHF,
    CLF: CLF,
    CLP: CLP,
    COP: COP,
    CRC: CRC,
    CZK: CZK,
    DEFAULT: DEFAULT,
    DJF: DJF,
    DKK: DKK,
    ESP: ESP,
    GNF: GNF,
    GYD: GYD,
    HUF: HUF,
    IDR: IDR,
    IQD: IQD,
    IRR: IRR,
    ISK: ISK,
    ITL: ITL,
    JOD: JOD,
    JPY: JPY,
    KMF: KMF,
    KPW: KPW,
    KRW: KRW,
    KWD: KWD,
    LAK: LAK,
    LBP: LBP,
    LUF: LUF,
    LYD: LYD,
    MGA: MGA,
    MGF: MGF,
    MMK: MMK,
    MNT: MNT,
    MRO: MRO,
    MUR: MUR,
    NOK: NOK,
    OMR: OMR,
    PKR: PKR,
    PYG: PYG,
    RSD: RSD,
    RWF: RWF,
    SEK: SEK,
    SLL: SLL,
    SOS: SOS,
    STD: STD,
    SYP: SYP,
    TMM: TMM,
    TND: TND,
    TRL: TRL,
    TWD: TWD,
    TZS: TZS,
    UGX: UGX,
    UYI: UYI,
    UYW: UYW,
    UZS: UZS,
    VEF: VEF,
    VND: VND,
    VUV: VUV,
    XAF: XAF,
    XOF: XOF,
    XPF: XPF,
    YER: YER,
    ZMK: ZMK,
    ZWD: ZWD,
    'default': currencyDigits
  });

  var names = [
  	"adlm",
  	"ahom",
  	"arab",
  	"arabext",
  	"armn",
  	"armnlow",
  	"bali",
  	"beng",
  	"bhks",
  	"brah",
  	"cakm",
  	"cham",
  	"cyrl",
  	"deva",
  	"diak",
  	"ethi",
  	"fullwide",
  	"geor",
  	"gong",
  	"gonm",
  	"grek",
  	"greklow",
  	"gujr",
  	"guru",
  	"hanidays",
  	"hanidec",
  	"hans",
  	"hansfin",
  	"hant",
  	"hantfin",
  	"hebr",
  	"hmng",
  	"hmnp",
  	"java",
  	"jpan",
  	"jpanfin",
  	"jpanyear",
  	"kali",
  	"khmr",
  	"knda",
  	"lana",
  	"lanatham",
  	"laoo",
  	"latn",
  	"lepc",
  	"limb",
  	"mathbold",
  	"mathdbl",
  	"mathmono",
  	"mathsanb",
  	"mathsans",
  	"mlym",
  	"modi",
  	"mong",
  	"mroo",
  	"mtei",
  	"mymr",
  	"mymrshan",
  	"mymrtlng",
  	"newa",
  	"nkoo",
  	"olck",
  	"orya",
  	"osma",
  	"rohg",
  	"roman",
  	"romanlow",
  	"saur",
  	"segment",
  	"shrd",
  	"sind",
  	"sinh",
  	"sora",
  	"sund",
  	"takr",
  	"talu",
  	"taml",
  	"tamldec",
  	"telu",
  	"thai",
  	"tibt",
  	"tirh",
  	"vaii",
  	"wara",
  	"wcho"
  ];

  // Type-only circular import
  var internalSlotMap = new WeakMap();
  function getInternalSlots(x) {
      var internalSlots = internalSlotMap.get(x);
      if (!internalSlots) {
          internalSlots = Object.create(null);
          internalSlotMap.set(x, internalSlots);
      }
      return internalSlots;
  }

  var numberingSystemNames = names;
  var RESOLVED_OPTIONS_KEYS = [
      'locale',
      'numberingSystem',
      'style',
      'currency',
      'currencyDisplay',
      'currencySign',
      'unit',
      'unitDisplay',
      'minimumIntegerDigits',
      'minimumFractionDigits',
      'maximumFractionDigits',
      'minimumSignificantDigits',
      'maximumSignificantDigits',
      'useGrouping',
      'notation',
      'compactDisplay',
      'signDisplay',
  ];
  /**
   * https://tc39.es/ecma402/#sec-intl-numberformat-constructor
   */
  var NumberFormat = function (locales, options) {
      // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
      if (!this || !(this instanceof NumberFormat)) {
          return new NumberFormat(locales, options);
      }
      InitializeNumberFormat(this, locales, options, {
          getInternalSlots: getInternalSlots,
          localeData: NumberFormat.localeData,
          availableLocales: NumberFormat.availableLocales,
          getDefaultLocale: NumberFormat.getDefaultLocale,
          currencyDigitsData: currencyDigitsData,
          numberingSystemNames: numberingSystemNames,
      });
      var internalSlots = getInternalSlots(this);
      var dataLocale = internalSlots.dataLocale;
      var dataLocaleData = NumberFormat.localeData[dataLocale];
      invariant(dataLocaleData !== undefined, "Cannot load locale-dependent data for " + dataLocale + ".");
      internalSlots.pl = new Intl.PluralRules(dataLocale, {
          minimumFractionDigits: internalSlots.minimumFractionDigits,
          maximumFractionDigits: internalSlots.maximumFractionDigits,
          minimumIntegerDigits: internalSlots.minimumIntegerDigits,
          minimumSignificantDigits: internalSlots.minimumSignificantDigits,
          maximumSignificantDigits: internalSlots.maximumSignificantDigits,
      });
      return this;
  };
  defineProperty(NumberFormat.prototype, 'formatToParts', {
      value: function formatToParts(x) {
          return FormatNumericToParts(this, toNumeric(x), {
              getInternalSlots: getInternalSlots,
          });
      },
  });
  defineProperty(NumberFormat.prototype, 'resolvedOptions', {
      value: function resolvedOptions() {
          if (typeof this !== 'object' || !(this instanceof NumberFormat)) {
              throw TypeError('Method Intl.NumberFormat.prototype.resolvedOptions called on incompatible receiver');
          }
          var internalSlots = getInternalSlots(this);
          var ro = {};
          for (var _i = 0, RESOLVED_OPTIONS_KEYS_1 = RESOLVED_OPTIONS_KEYS; _i < RESOLVED_OPTIONS_KEYS_1.length; _i++) {
              var key = RESOLVED_OPTIONS_KEYS_1[_i];
              var value = internalSlots[key];
              if (value !== undefined) {
                  ro[key] = value;
              }
          }
          return ro;
      },
  });
  var formatDescriptor = {
      enumerable: false,
      configurable: true,
      get: function () {
          if (typeof this !== 'object' || !(this instanceof NumberFormat)) {
              throw TypeError('Intl.NumberFormat format property accessor called on incompatible receiver');
          }
          var internalSlots = getInternalSlots(this);
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          var numberFormat = this;
          var boundFormat = internalSlots.boundFormat;
          if (boundFormat === undefined) {
              // https://tc39.es/proposal-unified-intl-numberformat/section11/numberformat_diff_out.html#sec-number-format-functions
              boundFormat = function (value) {
                  // TODO: check bigint
                  var x = toNumeric(value);
                  return numberFormat
                      .formatToParts(x)
                      .map(function (x) { return x.value; })
                      .join('');
              };
              try {
                  // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/prototype/format/format-function-name.js
                  Object.defineProperty(boundFormat, 'name', {
                      configurable: true,
                      enumerable: false,
                      writable: false,
                      value: '',
                  });
              }
              catch (e) {
                  // In older browser (e.g Chrome 36 like polyfill.io)
                  // TypeError: Cannot redefine property: name
              }
              internalSlots.boundFormat = boundFormat;
          }
          return boundFormat;
      },
  };
  try {
      // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/prototype/format/name.js
      Object.defineProperty(formatDescriptor.get, 'name', {
          configurable: true,
          enumerable: false,
          writable: false,
          value: 'get format',
      });
  }
  catch (e) {
      // In older browser (e.g Chrome 36 like polyfill.io)
      // TypeError: Cannot redefine property: name
  }
  Object.defineProperty(NumberFormat.prototype, 'format', formatDescriptor);
  // Static properties
  defineProperty(NumberFormat, 'supportedLocalesOf', {
      value: function supportedLocalesOf(locales, options) {
          return SupportedLocales(NumberFormat.availableLocales, CanonicalizeLocaleList(locales), options);
      },
  });
  NumberFormat.__addLocaleData = function __addLocaleData() {
      var data = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          data[_i] = arguments[_i];
      }
      for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
          var _b = data_1[_a], d = _b.data, locale = _b.locale;
          var minimizedLocale = new Intl.Locale(locale)
              .minimize()
              .toString();
          NumberFormat.localeData[locale] = NumberFormat.localeData[minimizedLocale] = d;
          NumberFormat.availableLocales.add(minimizedLocale);
          NumberFormat.availableLocales.add(locale);
          if (!NumberFormat.__defaultLocale) {
              NumberFormat.__defaultLocale = minimizedLocale;
          }
      }
  };
  NumberFormat.__addUnitData = function __addUnitData(locale, unitsData) {
      var _a = NumberFormat.localeData, _b = locale, existingData = _a[_b];
      if (!existingData) {
          throw new Error("Locale data for \"" + locale + "\" has not been loaded in NumberFormat. \nPlease __addLocaleData before adding additional unit data");
      }
      for (var unit in unitsData.simple) {
          existingData.units.simple[unit] = unitsData.simple[unit];
      }
      for (var unit in unitsData.compound) {
          existingData.units.compound[unit] = unitsData.compound[unit];
      }
  };
  NumberFormat.__defaultLocale = '';
  NumberFormat.localeData = {};
  NumberFormat.availableLocales = new Set();
  NumberFormat.getDefaultLocale = function () {
      return NumberFormat.__defaultLocale;
  };
  NumberFormat.polyfilled = true;
  function toNumeric(val) {
      if (typeof val === 'bigint') {
          return val;
      }
      return ToNumber(val);
  }
  try {
      // IE11 does not have Symbol
      if (typeof Symbol !== 'undefined') {
          Object.defineProperty(NumberFormat.prototype, Symbol.toStringTag, {
              configurable: true,
              enumerable: false,
              writable: false,
              value: 'Intl.NumberFormat',
          });
      }
      // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/length.js
      Object.defineProperty(NumberFormat.prototype.constructor, 'length', {
          configurable: true,
          enumerable: false,
          writable: false,
          value: 0,
      });
      // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/supportedLocalesOf/length.js
      Object.defineProperty(NumberFormat.supportedLocalesOf, 'length', {
          configurable: true,
          enumerable: false,
          writable: false,
          value: 1,
      });
      Object.defineProperty(NumberFormat, 'prototype', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: NumberFormat.prototype,
      });
  }
  catch (e) {
      // Meta fix so we're test262-compliant, not important
  }

  // eslint-disable-next-line import/no-cycle
  /**
   * Number.prototype.toLocaleString ponyfill
   * https://tc39.es/ecma402/#sup-number.prototype.tolocalestring
   */
  function toLocaleString(x, locales, options) {
      var numberFormat = new NumberFormat(locales, options);
      return numberFormat.format(x);
  }

  /**
   * Check if Intl.NumberFormat is ES2020 compatible.
   * Caveat: we are not checking `toLocaleString`.
   *
   * @public
   * @param unit unit to check
   */
  function supportsES2020() {
      try {
          var s = new Intl.NumberFormat('en', {
              style: 'unit',
              // @ts-expect-error the built-in typing isn't supporting ES2020 yet.
              unit: 'bit',
              unitDisplay: 'long',
              notation: 'scientific',
          }).format(10000);
          // Check for a plurality bug in environment that uses the older versions of ICU:
          // https://unicode-org.atlassian.net/browse/ICU-13836
          if (s !== '1E4 bits') {
              return false;
          }
      }
      catch (e) {
          return false;
      }
      return true;
  }
  function shouldPolyfill() {
      return (typeof Intl === 'undefined' ||
          !('NumberFormat' in Intl) ||
          !supportsES2020());
  }

  if (shouldPolyfill()) {
      defineProperty(Intl, 'NumberFormat', { value: NumberFormat });
      defineProperty(Number.prototype, 'toLocaleString', {
          value: function toLocaleString$1(locales, options) {
              return toLocaleString(this, locales, options);
          },
      });
  }

})));

