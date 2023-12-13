
// Intl.RelativeTimeFormat
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  /**
   * Cannot do Math.log(x) / Math.log(10) bc if IEEE floating point issue
   * @param x number
   */
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
   * https://www.ecma-international.org/ecma-262/11.0/index.html#sec-type
   * @param x
   */
  function Type(x) {
      if (x === null) {
          return 'Null';
      }
      if (typeof x === 'undefined') {
          return 'Undefined';
      }
      if (typeof x === 'function' || typeof x === 'object') {
          return 'Object';
      }
      if (typeof x === 'number') {
          return 'Number';
      }
      if (typeof x === 'boolean') {
          return 'Boolean';
      }
      if (typeof x === 'string') {
          return 'String';
      }
      if (typeof x === 'symbol') {
          return 'Symbol';
      }
      if (typeof x === 'bigint') {
          return 'BigInt';
      }
  }

  /**
   * https://tc39.es/ecma402/#sec-partitionpattern
   * @param pattern
   */
  function PartitionPattern(pattern) {
      var result = [];
      var beginIndex = pattern.indexOf('{');
      var endIndex = 0;
      var nextIndex = 0;
      var length = pattern.length;
      while (beginIndex < pattern.length && beginIndex > -1) {
          endIndex = pattern.indexOf('}', beginIndex);
          invariant(endIndex > beginIndex, "Invalid pattern " + pattern);
          if (beginIndex > nextIndex) {
              result.push({
                  type: 'literal',
                  value: pattern.substring(nextIndex, beginIndex),
              });
          }
          result.push({
              type: pattern.substring(beginIndex + 1, endIndex),
              value: undefined,
          });
          nextIndex = endIndex + 1;
          beginIndex = pattern.indexOf('{', nextIndex);
      }
      if (nextIndex < length) {
          result.push({
              type: 'literal',
              value: pattern.substring(nextIndex, length),
          });
      }
      return result;
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
   * https://tc39.es/proposal-intl-relative-time/#sec-singularrelativetimeunit
   * @param unit
   */
  function SingularRelativeTimeUnit(unit) {
      invariant(Type(unit) === 'String', 'unit must be a string');
      if (unit === 'seconds')
          return 'second';
      if (unit === 'minutes')
          return 'minute';
      if (unit === 'hours')
          return 'hour';
      if (unit === 'days')
          return 'day';
      if (unit === 'weeks')
          return 'week';
      if (unit === 'months')
          return 'month';
      if (unit === 'quarters')
          return 'quarter';
      if (unit === 'years')
          return 'year';
      if (unit !== 'second' &&
          unit !== 'minute' &&
          unit !== 'hour' &&
          unit !== 'day' &&
          unit !== 'week' &&
          unit !== 'month' &&
          unit !== 'quarter' &&
          unit !== 'year') {
          throw new RangeError('invalid unit');
      }
      return unit;
  }

  function MakePartsList(pattern, unit, parts) {
      var patternParts = PartitionPattern(pattern);
      var result = [];
      for (var _i = 0, patternParts_1 = patternParts; _i < patternParts_1.length; _i++) {
          var patternPart = patternParts_1[_i];
          if (patternPart.type === 'literal') {
              result.push({
                  type: 'literal',
                  value: patternPart.value,
              });
          }
          else {
              invariant(patternPart.type === '0', "Malformed pattern " + pattern);
              for (var _a = 0, parts_1 = parts; _a < parts_1.length; _a++) {
                  var part = parts_1[_a];
                  result.push({
                      type: part.type,
                      value: part.value,
                      unit: unit,
                  });
              }
          }
      }
      return result;
  }

  function PartitionRelativeTimePattern(rtf, value, unit, _a) {
      var getInternalSlots = _a.getInternalSlots;
      invariant(Type(value) === 'Number', "value must be number, instead got " + typeof value, TypeError);
      invariant(Type(unit) === 'String', "unit must be number, instead got " + typeof value, TypeError);
      if (isNaN(value) || !isFinite(value)) {
          throw new RangeError("Invalid value " + value);
      }
      var resolvedUnit = SingularRelativeTimeUnit(unit);
      var _b = getInternalSlots(rtf), fields = _b.fields, style = _b.style, numeric = _b.numeric, pluralRules = _b.pluralRules, numberFormat = _b.numberFormat;
      var entry = resolvedUnit;
      if (style === 'short') {
          entry = resolvedUnit + "-short";
      }
      else if (style === 'narrow') {
          entry = resolvedUnit + "-narrow";
      }
      if (!(entry in fields)) {
          entry = resolvedUnit;
      }
      var patterns = fields[entry];
      if (numeric === 'auto') {
          if (ToString(value) in patterns) {
              return [
                  {
                      type: 'literal',
                      value: patterns[ToString(value)],
                  },
              ];
          }
      }
      var tl = 'future';
      if (SameValue(value, -0) || value < 0) {
          tl = 'past';
      }
      var po = patterns[tl];
      var fv = typeof numberFormat.formatToParts === 'function'
          ? numberFormat.formatToParts(Math.abs(value))
          : // TODO: If formatToParts is not supported, we assume the whole formatted
              // number is a part
              [
                  {
                      type: 'literal',
                      value: numberFormat.format(Math.abs(value)),
                      unit: unit,
                  },
              ];
      var pr = pluralRules.select(value);
      var pattern = po[pr];
      return MakePartsList(pattern, resolvedUnit, fv);
  }

  var NUMBERING_SYSTEM_REGEX = /^[a-z0-9]{3,8}(-[a-z0-9]{3,8})*$/i;
  function InitializeRelativeTimeFormat(rtf, locales, options, _a) {
      var getInternalSlots = _a.getInternalSlots, availableLocales = _a.availableLocales, relevantExtensionKeys = _a.relevantExtensionKeys, localeData = _a.localeData, getDefaultLocale = _a.getDefaultLocale;
      var internalSlots = getInternalSlots(rtf);
      internalSlots.initializedRelativeTimeFormat = true;
      var requestedLocales = CanonicalizeLocaleList(locales);
      var opt = Object.create(null);
      var opts = options === undefined ? Object.create(null) : ToObject(options);
      var matcher = GetOption(opts, 'localeMatcher', 'string', ['best fit', 'lookup'], 'best fit');
      opt.localeMatcher = matcher;
      var numberingSystem = GetOption(opts, 'numberingSystem', 'string', undefined, undefined);
      if (numberingSystem !== undefined) {
          if (!NUMBERING_SYSTEM_REGEX.test(numberingSystem)) {
              throw new RangeError("Invalid numbering system " + numberingSystem);
          }
      }
      opt.nu = numberingSystem;
      var r = ResolveLocale(availableLocales, requestedLocales, opt, relevantExtensionKeys, localeData, getDefaultLocale);
      var locale = r.locale, nu = r.nu;
      internalSlots.locale = locale;
      internalSlots.style = GetOption(opts, 'style', 'string', ['long', 'narrow', 'short'], 'long');
      internalSlots.numeric = GetOption(opts, 'numeric', 'string', ['always', 'auto'], 'always');
      var fields = localeData[r.dataLocale];
      invariant(!!fields, "Missing locale data for " + r.dataLocale);
      internalSlots.fields = fields;
      internalSlots.numberFormat = new Intl.NumberFormat(locales);
      internalSlots.pluralRules = new Intl.PluralRules(locales);
      internalSlots.numberingSystem = nu;
      return rtf;
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

  // Type-only circular import
  // eslint-disable-next-line import/no-cycle
  var internalSlotMap = new WeakMap();
  function getInternalSlots(x) {
      var internalSlots = internalSlotMap.get(x);
      if (!internalSlots) {
          internalSlots = Object.create(null);
          internalSlotMap.set(x, internalSlots);
      }
      return internalSlots;
  }

  var RelativeTimeFormat = /** @class */ (function () {
      function RelativeTimeFormat(locales, options) {
          // test262/test/intl402/RelativeTimeFormat/constructor/constructor/newtarget-undefined.js
          // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
          var newTarget = this && this instanceof RelativeTimeFormat ? this.constructor : void 0;
          if (!newTarget) {
              throw new TypeError("Intl.RelativeTimeFormat must be called with 'new'");
          }
          return InitializeRelativeTimeFormat(this, locales, options, {
              getInternalSlots: getInternalSlots,
              availableLocales: RelativeTimeFormat.availableLocales,
              relevantExtensionKeys: RelativeTimeFormat.relevantExtensionKeys,
              localeData: RelativeTimeFormat.localeData,
              getDefaultLocale: RelativeTimeFormat.getDefaultLocale,
          });
      }
      RelativeTimeFormat.prototype.format = function (value, unit) {
          if (typeof this !== 'object') {
              throw new TypeError('format was called on a non-object');
          }
          var internalSlots = getInternalSlots(this);
          if (!internalSlots.initializedRelativeTimeFormat) {
              throw new TypeError('format was called on a invalid context');
          }
          return PartitionRelativeTimePattern(this, Number(value), ToString(unit), {
              getInternalSlots: getInternalSlots,
          })
              .map(function (el) { return el.value; })
              .join('');
      };
      RelativeTimeFormat.prototype.formatToParts = function (value, unit) {
          if (typeof this !== 'object') {
              throw new TypeError('formatToParts was called on a non-object');
          }
          var internalSlots = getInternalSlots(this);
          if (!internalSlots.initializedRelativeTimeFormat) {
              throw new TypeError('formatToParts was called on a invalid context');
          }
          return PartitionRelativeTimePattern(this, Number(value), ToString(unit), { getInternalSlots: getInternalSlots });
      };
      RelativeTimeFormat.prototype.resolvedOptions = function () {
          if (typeof this !== 'object') {
              throw new TypeError('resolvedOptions was called on a non-object');
          }
          var internalSlots = getInternalSlots(this);
          if (!internalSlots.initializedRelativeTimeFormat) {
              throw new TypeError('resolvedOptions was called on a invalid context');
          }
          // test262/test/intl402/RelativeTimeFormat/prototype/resolvedOptions/type.js
          return {
              locale: internalSlots.locale,
              style: internalSlots.style,
              numeric: internalSlots.numeric,
              numberingSystem: internalSlots.numberingSystem,
          };
      };
      RelativeTimeFormat.supportedLocalesOf = function (locales, options) {
          return SupportedLocales(RelativeTimeFormat.availableLocales, CanonicalizeLocaleList(locales), options);
      };
      RelativeTimeFormat.__addLocaleData = function () {
          var data = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              data[_i] = arguments[_i];
          }
          for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
              var _b = data_1[_a], d = _b.data, locale = _b.locale;
              var minimizedLocale = new Intl.Locale(locale)
                  .minimize()
                  .toString();
              RelativeTimeFormat.localeData[locale] = RelativeTimeFormat.localeData[minimizedLocale] = d;
              RelativeTimeFormat.availableLocales.add(minimizedLocale);
              RelativeTimeFormat.availableLocales.add(locale);
              if (!RelativeTimeFormat.__defaultLocale) {
                  RelativeTimeFormat.__defaultLocale = minimizedLocale;
              }
          }
      };
      RelativeTimeFormat.getDefaultLocale = function () {
          return RelativeTimeFormat.__defaultLocale;
      };
      RelativeTimeFormat.localeData = {};
      RelativeTimeFormat.availableLocales = new Set();
      RelativeTimeFormat.__defaultLocale = '';
      RelativeTimeFormat.relevantExtensionKeys = ['nu'];
      RelativeTimeFormat.polyfilled = true;
      return RelativeTimeFormat;
  }());
  try {
      // IE11 does not have Symbol
      if (typeof Symbol !== 'undefined') {
          Object.defineProperty(RelativeTimeFormat.prototype, Symbol.toStringTag, {
              value: 'Intl.RelativeTimeFormat',
              writable: false,
              enumerable: false,
              configurable: true,
          });
      }
      // https://github.com/tc39/test262/blob/master/test/intl402/RelativeTimeFormat/constructor/length.js
      Object.defineProperty(RelativeTimeFormat.prototype.constructor, 'length', {
          value: 0,
          writable: false,
          enumerable: false,
          configurable: true,
      });
      // https://github.com/tc39/test262/blob/master/test/intl402/RelativeTimeFormat/constructor/supportedLocalesOf/length.js
      Object.defineProperty(RelativeTimeFormat.supportedLocalesOf, 'length', {
          value: 1,
          writable: false,
          enumerable: false,
          configurable: true,
      });
  }
  catch (e) {
      // Meta fix so we're test262-compliant, not important
  }

  function shouldPolyfill() {
      return typeof Intl === 'undefined' || !('RelativeTimeFormat' in Intl);
  }

  if (shouldPolyfill()) {
      Object.defineProperty(Intl, 'RelativeTimeFormat', {
          value: RelativeTimeFormat,
          writable: true,
          enumerable: false,
          configurable: true,
      });
  }

})));

