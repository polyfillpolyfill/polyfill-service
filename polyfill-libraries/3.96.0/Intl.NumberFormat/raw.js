
// Intl.NumberFormat
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    function invariant(condition, message, Err) {
        if (Err === void 0) { Err = Error; }
        if (!condition) {
            throw new Err(message);
        }
    }

    // https://tc39.es/ecma402/#sec-issanctionedsimpleunitidentifier
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

    function hasOwnProperty(o, key) {
        return Object.prototype.hasOwnProperty.call(o, key);
    }
    /**
     * https://tc39.es/ecma262/#sec-toobject
     * @param arg
     */
    function toObject(arg) {
        if (arg == null) {
            throw new TypeError('undefined/null cannot be converted to object');
        }
        return Object(arg);
    }
    /**
     * https://tc39.es/ecma262/#sec-tostring
     */
    function toString(o) {
        // Only symbol is irregular...
        if (typeof o === 'symbol') {
            throw TypeError('Cannot convert a Symbol value to a string');
        }
        return String(o);
    }
    /**
     * https://tc39.es/ecma402/#sec-getoption
     * @param opts
     * @param prop
     * @param type
     * @param values
     * @param fallback
     */
    function getOption(opts, prop, type, values, fallback) {
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
                value = toString(value);
            }
            if (values !== undefined && !values.filter(function (val) { return val == value; }).length) {
                throw new RangeError(value + " is not within " + values.join(', '));
            }
            return value;
        }
        return fallback;
    }
    /**
     * https://tc39.es/ecma402/#sec-defaultnumberoption
     * @param val
     * @param min
     * @param max
     * @param fallback
     */
    function defaultNumberOption(val, min, max, fallback) {
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
    function getNumberOption(options, property, minimum, maximum, fallback) {
        var val = options[property];
        return defaultNumberOption(val, minimum, maximum, fallback);
    }
    /**
     * https://tc39.es/ecma402/#sec-setnfdigitoptions
     */
    function setNumberFormatDigitOptions(internalSlots, opts, mnfdDefault, mxfdDefault, notation) {
        var mnid = getNumberOption(opts, 'minimumIntegerDigits', 1, 21, 1);
        var mnfd = opts.minimumFractionDigits;
        var mxfd = opts.maximumFractionDigits;
        var mnsd = opts.minimumSignificantDigits;
        var mxsd = opts.maximumSignificantDigits;
        internalSlots.minimumIntegerDigits = mnid;
        if (mnsd !== undefined || mxsd !== undefined) {
            internalSlots.roundingType = 'significantDigits';
            mnsd = defaultNumberOption(mnsd, 1, 21, 1);
            mxsd = defaultNumberOption(mxsd, mnsd, 21, 21);
            internalSlots.minimumSignificantDigits = mnsd;
            internalSlots.maximumSignificantDigits = mxsd;
        }
        else if (mnfd !== undefined || mxfd !== undefined) {
            internalSlots.roundingType = 'fractionDigits';
            mnfd = defaultNumberOption(mnfd, 0, 20, mnfdDefault);
            var mxfdActualDefault = Math.max(mnfd, mxfdDefault);
            mxfd = defaultNumberOption(mxfd, mnfd, 20, mxfdActualDefault);
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
    function objectIs(x, y) {
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
    var NOT_A_Z_REGEX = /[^A-Z]/;
    /**
     * This follows https://tc39.es/ecma402/#sec-case-sensitivity-and-case-mapping
     * @param str string to convert
     */
    function toUpperCase(str) {
        return str.replace(/([a-z])/g, function (_, c) { return c.toUpperCase(); });
    }
    /**
     * https://tc39.es/ecma402/#sec-iswellformedcurrencycode
     */
    function isWellFormedCurrencyCode(currency) {
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
     * https://tc39.es/ecma402/#sec-formatnumberstring
     * TODO: dedup with intl-pluralrules
     */
    function formatNumericToString(internalSlots, x) {
        var isNegative = x < 0 || objectIs(x, -0);
        if (isNegative) {
            x = -x;
        }
        var result;
        var rourndingType = internalSlots.roundingType;
        switch (rourndingType) {
            case 'significantDigits':
                result = toRawPrecision(x, internalSlots.minimumSignificantDigits, internalSlots.maximumSignificantDigits);
                break;
            case 'fractionDigits':
                result = toRawFixed(x, internalSlots.minimumFractionDigits, internalSlots.maximumFractionDigits);
                break;
            default:
                result = toRawPrecision(x, 1, 2);
                if (result.integerDigitsCount > 1) {
                    result = toRawFixed(x, 0, 0);
                }
                break;
        }
        x = result.roundedNumber;
        var string = result.formattedString;
        var int = result.integerDigitsCount;
        var minInteger = internalSlots.minimumIntegerDigits;
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
     * TODO: dedup with intl-pluralrules and support BigInt
     * https://tc39.es/ecma402/#sec-torawfixed
     * @param x a finite non-negative Number or BigInt
     * @param minFraction and integer between 0 and 20
     * @param maxFraction and integer between 0 and 20
     */
    function toRawFixed(x, minFraction, maxFraction) {
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
    // https://tc39.es/ecma402/#sec-torawprecision
    function toRawPrecision(x, minPrecision, maxPrecision) {
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
    /**
     * Cannot do Math.log(x) / Math.log(10) bc if IEEE floating point issue
     * @param x number
     */
    function getMagnitude(x) {
        // Cannot count string length via Number.toString because it may use scientific notation
        // for very small or very large numbers.
        return Math.floor(Math.log(x) * Math.LOG10E);
    }
    /**
     * This follows https://tc39.es/ecma402/#sec-case-sensitivity-and-case-mapping
     * @param str string to convert
     */
    function toLowerCase(str) {
        return str.replace(/([A-Z])/g, function (_, c) { return c.toLowerCase(); });
    }
    var SHORTENED_SACTION_UNITS = SANCTIONED_UNITS.map(function (unit) {
        return unit.replace(/^(.*?)-/, '');
    });
    /**
     * https://tc39.es/ecma402/#sec-iswellformedunitidentifier
     * @param unit
     */
    function isWellFormedUnitIdentifier(unit) {
        unit = toLowerCase(unit);
        if (SHORTENED_SACTION_UNITS.indexOf(unit) > -1) {
            return true;
        }
        var units = unit.split('-per-');
        if (units.length !== 2) {
            return false;
        }
        if (SHORTENED_SACTION_UNITS.indexOf(units[0]) < 0 ||
            SHORTENED_SACTION_UNITS.indexOf(units[1]) < 0) {
            return false;
        }
        return true;
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

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function createResolveLocale(getDefaultLocale) {
        var lookupMatcher = createLookupMatcher(getDefaultLocale);
        var bestFitMatcher = createBestFitMatcher(getDefaultLocale);
        /**
         * https://tc39.es/ecma402/#sec-resolvelocale
         */
        return function resolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData) {
            var matcher = options.localeMatcher;
            var r;
            if (matcher === 'lookup') {
                r = lookupMatcher(availableLocales, requestedLocales);
            }
            else {
                r = bestFitMatcher(availableLocales, requestedLocales);
            }
            var foundLocale = r.locale;
            var result = { locale: '', dataLocale: foundLocale };
            var supportedExtension = '-u';
            for (var _i = 0, relevantExtensionKeys_1 = relevantExtensionKeys; _i < relevantExtensionKeys_1.length; _i++) {
                var key = relevantExtensionKeys_1[_i];
                var foundLocaleData = localeData[foundLocale];
                invariant(typeof foundLocaleData === 'object' && foundLocaleData !== null, "locale data " + key + " must be an object");
                var keyLocaleData = foundLocaleData[key];
                invariant(Array.isArray(keyLocaleData), "keyLocaleData for " + key + " must be an array");
                var value = keyLocaleData[0];
                invariant(typeof value === 'string' || value === null, "value must be string or null but got " + typeof value + " in key " + key);
                var supportedExtensionAddition = '';
                if (r.extension) {
                    var requestedValue = unicodeExtensionValue(r.extension, key);
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
        };
    }
    /**
     * https://tc39.es/ecma402/#sec-unicodeextensionvalue
     * @param extension
     * @param key
     */
    function unicodeExtensionValue(extension, key) {
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
    var UNICODE_EXTENSION_SEQUENCE_REGEX = /-u(?:-[0-9a-z]{2,8})+/gi;
    /**
     * https://tc39.es/ecma402/#sec-bestavailablelocale
     * @param availableLocales
     * @param locale
     */
    function bestAvailableLocale(availableLocales, locale) {
        var candidate = locale;
        while (true) {
            if (~availableLocales.indexOf(candidate)) {
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
    function createLookupMatcher(getDefaultLocale) {
        /**
         * https://tc39.es/ecma402/#sec-lookupmatcher
         */
        return function lookupMatcher(availableLocales, requestedLocales) {
            var result = { locale: '' };
            for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
                var locale = requestedLocales_1[_i];
                var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, '');
                var availableLocale = bestAvailableLocale(availableLocales, noExtensionLocale);
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
        };
    }
    function createBestFitMatcher(getDefaultLocale) {
        return function bestFitMatcher(availableLocales, requestedLocales) {
            var result = { locale: '' };
            for (var _i = 0, requestedLocales_2 = requestedLocales; _i < requestedLocales_2.length; _i++) {
                var locale = requestedLocales_2[_i];
                var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, '');
                var availableLocale = bestAvailableLocale(availableLocales, noExtensionLocale);
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
        };
    }
    function getLocaleHierarchy(locale) {
        var results = [locale];
        var localeParts = locale.split('-');
        for (var i = localeParts.length; i > 1; i--) {
            results.push(localeParts.slice(0, i - 1).join('-'));
        }
        return results;
    }
    function lookupSupportedLocales(availableLocales, requestedLocales) {
        var subset = [];
        for (var _i = 0, requestedLocales_3 = requestedLocales; _i < requestedLocales_3.length; _i++) {
            var locale = requestedLocales_3[_i];
            var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, '');
            var availableLocale = bestAvailableLocale(availableLocales, noExtensionLocale);
            if (availableLocale) {
                subset.push(availableLocale);
            }
        }
        return subset;
    }
    function supportedLocales(availableLocales, requestedLocales, options) {
        var matcher = 'best fit';
        if (options !== undefined) {
            options = toObject(options);
            matcher = getOption(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
        }
        if (matcher === 'best fit') {
            return lookupSupportedLocales(availableLocales, requestedLocales);
        }
        return lookupSupportedLocales(availableLocales, requestedLocales);
    }
    var MissingLocaleDataError = /** @class */ (function (_super) {
        __extends(MissingLocaleDataError, _super);
        function MissingLocaleDataError() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = 'MISSING_LOCALE_DATA';
            return _this;
        }
        return MissingLocaleDataError;
    }(Error));
    function unpackData(locale, localeData, 
    /** By default shallow merge the dictionaries. */
    reducer) {
        if (reducer === void 0) { reducer = function (all, d) { return (__assign(__assign({}, all), d)); }; }
        var localeHierarchy = getLocaleHierarchy(locale);
        var dataToMerge = localeHierarchy
            .map(function (l) { return localeData.data[l]; })
            .filter(Boolean);
        if (!dataToMerge.length) {
            throw new MissingLocaleDataError("Missing locale data for \"" + locale + "\", lookup hierarchy: " + localeHierarchy.join(', '));
        }
        dataToMerge.reverse();
        return dataToMerge.reduce(reducer, {});
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
    	"୐",
    	"୑",
    	"୒",
    	"୓",
    	"୔",
    	"୕",
    	"ୖ",
    	"ୗ",
    	"୘",
    	"୙"
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
    var fullwide = [
    	"༐",
    	"༑",
    	"༒",
    	"༓",
    	"༔",
    	"༕",
    	"༖",
    	"༗",
    	"༘",
    	"༙"
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
    var khmr = [
    	"ߠ",
    	"ߡ",
    	"ߢ",
    	"ߣ",
    	"ߤ",
    	"ߥ",
    	"ߦ",
    	"ߧ",
    	"ߨ",
    	"ߩ"
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
    var limb = [
    	"ॆ",
    	"े",
    	"ै",
    	"ॉ",
    	"ॊ",
    	"ो",
    	"ौ",
    	"्",
    	"ॎ",
    	"ॏ"
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
    var mong = [
    	"ࠐ",
    	"ࠑ",
    	"ࠒ",
    	"ࠓ",
    	"ࠔ",
    	"ࠕ",
    	"ࠖ",
    	"ࠗ",
    	"࠘",
    	"࠙"
    ];
    var mymr = [
    	"@",
    	"A",
    	"B",
    	"C",
    	"D",
    	"E",
    	"F",
    	"G",
    	"H",
    	"I"
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
    var digitMapping = {
    	arab: arab,
    	arabext: arabext,
    	bali: bali,
    	beng: beng,
    	deva: deva,
    	fullwide: fullwide,
    	gujr: gujr,
    	guru: guru,
    	khmr: khmr,
    	knda: knda,
    	laoo: laoo,
    	limb: limb,
    	mlym: mlym,
    	mong: mong,
    	mymr: mymr,
    	orya: orya,
    	tamldec: tamldec,
    	telu: telu,
    	thai: thai,
    	tibt: tibt,
    	hanidec: hanidec
    };

    var digitMapping$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        arab: arab,
        arabext: arabext,
        bali: bali,
        beng: beng,
        deva: deva,
        fullwide: fullwide,
        gujr: gujr,
        guru: guru,
        khmr: khmr,
        knda: knda,
        laoo: laoo,
        limb: limb,
        mlym: mlym,
        mong: mong,
        mymr: mymr,
        orya: orya,
        tamldec: tamldec,
        telu: telu,
        thai: thai,
        tibt: tibt,
        hanidec: hanidec,
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
        // Part 1: partition and interpolate the CLDR number pattern.
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
                numberPattern = sign === 0 ? '0' : sign === -1 ? '-0' : '+0';
            }
            else if (style === 'currency') {
                var currencyData = data.numbers.currency[numberingSystem] ||
                    data.numbers.currency[defaultNumberingSystem];
                // We replace number pattern part with `0` for easier postprocessing.
                numberPattern = getPatternForSign(currencyData[options.currencySign], sign).replace(CLDR_NUMBER_PATTERN, '0');
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
            // a  nd number, because `$` does not match "[:^S:]".
            //
            // Implementation note: here we do the best effort to infer the insertion.
            // We also assume that `beforeInsertBetween` and `afterInsertBetween` will never be `;`.
            var afterCurrency = currencyData.currencySpacing.afterInsertBetween;
            if (afterCurrency && !S_DOLLAR_UNICODE_REGEX.test(nonNameCurrencyPart)) {
                numberPattern = numberPattern.replace('¤0', "\u00A4" + afterCurrency + "0");
            }
            var beforeCurrency = currencyData.currencySpacing.beforeInsertBetween;
            if (beforeCurrency && !CARET_S_UNICODE_REGEX.test(nonNameCurrencyPart)) {
                numberPattern = numberPattern.replace('0¤', "0" + beforeCurrency + "\u00A4");
            }
        }
        // Now we start to substitute patterns
        // 1. replace strings like `0` and `#,##0.00` with `{0}`
        // 2. unquote characters (invariant: the quoted characters does not contain the special tokens)
        numberPattern = numberPattern
            .replace(CLDR_NUMBER_PATTERN, '{0}')
            .replace(/'(.)'/g, '$1');
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
                    !compactNumberPattern && options.useGrouping));
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
        // Part 2: interpolate unit pattern if necessary.
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
                        unitName = selectPlural(pl, 
                        // NOTE: Google Chrome's Intl.NumberFormat uses the original number to determine the plurality,
                        // but the mantissa for unit. We think this is a bug in ICU, but will still replicate the behavior.
                        // TODO: use original number.
                        numberResult.roundedNumber * Math.pow(10, exponent), currencyNameData.displayName);
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
                    unitPattern = selectPlural(pl, numberResult.roundedNumber, data.units.simple[unit][unitDisplay]);
                }
                else {
                    // See: http://unicode.org/reports/tr35/tr35-general.html#perUnitPatterns
                    // If cannot find unit in the simple pattern, it must be "per" compound pattern.
                    // Implementation note: we are not following TR-35 here because we need to format to parts!
                    var _b = unit.split('-per-'), numeratorUnit = _b[0], denominatorUnit = _b[1];
                    unitData = data.units.simple[numeratorUnit];
                    var numeratorUnitPattern = selectPlural(pl, numberResult.roundedNumber, data.units.simple[numeratorUnit][unitDisplay]);
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
    }
    // A subset of https://tc39.es/ecma402/#sec-partitionnotationsubpattern
    // Plus the exponent parts handling.
    function paritionNumberIntoParts(symbols, numberResult, notation, exponent, numberingSystem, useGrouping) {
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
        // The weird compact and x >= 10000 check is to ensure consistency with Node.js and Chrome.
        // Note that `de` does not have compact form for thousands, but Node.js does not insert grouping separator
        // unless the rounded number is greater than 10000:
        //   NumberFormat('de', {notation: 'compact', compactDisplay: 'short'}).format(1234) //=> "1234"
        //   NumberFormat('de').format(1234) //=> "1.234"
        if (useGrouping && (notation !== 'compact' || x >= 10000)) {
            var groupSepSymbol = symbols.group;
            var groups = [];
            // Assuming that the group separator is always inserted between every 3 digits.
            var i = integer.length - 3;
            for (; i > 0; i -= 3) {
                groups.push(integer.slice(i, i + 3));
            }
            groups.push(integer.slice(0, i + 3));
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
            var exponentResult = toRawFixed(exponent, 0, 0);
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

    var internalSlotMap = new WeakMap();
    function getInternalSlots(x) {
        var internalSlots = internalSlotMap.get(x);
        if (!internalSlots) {
            internalSlots = Object.create(null);
            internalSlotMap.set(x, internalSlots);
        }
        return internalSlots;
    }

    var VALID_NUMBERING_SYSTEM_NAMES = new Set(names);
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
     * Chop off the unicode extension from the locale string.
     */
    function removeUnicodeExtensionFromLocale(canonicalLocale) {
        var extensionIndex = canonicalLocale.indexOf('-u-');
        return extensionIndex >= 0
            ? canonicalLocale.slice(0, extensionIndex)
            : canonicalLocale;
    }
    /**
     * https://tc39.es/ecma402/#sec-currencydigits
     */
    function currencyDigits$1(c) {
        return hasOwnProperty(currencyDigitsData, c)
            ? currencyDigitsData[c]
            : 2;
    }
    /**
     * https://tc39.es/ecma402/#sec-initializenumberformat
     */
    function initializeNumberFormat(nf, locales, opts) {
        // @ts-ignore
        var requestedLocales = Intl.getCanonicalLocales(locales);
        var options = opts === undefined ? Object.create(null) : toObject(opts);
        var opt = Object.create(null);
        var matcher = getOption(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
        opt.localeMatcher = matcher;
        var numberingSystem = getOption(options, 'numberingSystem', 'string', undefined, undefined);
        if (numberingSystem !== undefined &&
            !VALID_NUMBERING_SYSTEM_NAMES.has(numberingSystem)) {
            // 8.a. If numberingSystem does not match the Unicode Locale Identifier type nonterminal,
            // throw a RangeError exception.
            throw RangeError("Invalid numberingSystems: " + numberingSystem);
        }
        opt.nu = numberingSystem;
        var localeData = NumberFormat.localeData;
        var r = createResolveLocale(NumberFormat.getDefaultLocale)(NumberFormat.availableLocales, requestedLocales, opt, 
        // [[RelevantExtensionKeys]] slot, which is a constant
        ['nu'], localeData);
        var dataLocaleData = localeData[removeUnicodeExtensionFromLocale(r.locale)];
        var internalSlots = getInternalSlots(nf);
        internalSlots.locale = r.locale;
        internalSlots.dataLocale = r.dataLocale;
        internalSlots.numberingSystem = r.nu;
        internalSlots.dataLocaleData = dataLocaleData;
        setNumberFormatUnitOptions(nf, options);
        var style = internalSlots.style;
        var mnfdDefault;
        var mxfdDefault;
        if (style === 'currency') {
            var currency = internalSlots.currency;
            var cDigits = currencyDigits$1(currency);
            mnfdDefault = cDigits;
            mxfdDefault = cDigits;
        }
        else {
            mnfdDefault = 0;
            mxfdDefault = style === 'percent' ? 0 : 3;
        }
        var notation = getOption(options, 'notation', 'string', ['standard', 'scientific', 'engineering', 'compact'], 'standard');
        internalSlots.notation = notation;
        setNumberFormatDigitOptions(internalSlots, options, mnfdDefault, mxfdDefault, notation);
        var compactDisplay = getOption(options, 'compactDisplay', 'string', ['short', 'long'], 'short');
        if (notation === 'compact') {
            internalSlots.compactDisplay = compactDisplay;
        }
        var useGrouping = getOption(options, 'useGrouping', 'boolean', undefined, true);
        internalSlots.useGrouping = useGrouping;
        var signDisplay = getOption(options, 'signDisplay', 'string', ['auto', 'never', 'always', 'exceptZero'], 'auto');
        internalSlots.signDisplay = signDisplay;
        return nf;
    }
    /**
     * https://tc39.es/ecma402/#sec-formatnumberstring
     */
    function partitionNumberPattern(numberFormat, x) {
        var _a;
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
            _a = computeExponent(numberFormat, x), exponent = _a[0], magnitude = _a[1];
            // Preserve more precision by doing multiplication when exponent is negative.
            x = exponent < 0 ? x * Math.pow(10, -exponent) : x / Math.pow(10, exponent);
            var formatNumberResult = formatNumericToString(internalSlots, x);
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
                if (objectIs(x, 0) || x > 0 || isNaN(x)) {
                    sign = 0;
                }
                else {
                    sign = -1;
                }
                break;
            case 'always':
                if (objectIs(x, 0) || x > 0 || isNaN(x)) {
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
    function formatNumericToParts(numberFormat, x) {
        return partitionNumberPattern(numberFormat, x);
    }
    /**
     * https://tc39.es/ecma402/#sec-intl-numberformat-constructor
     */
    var NumberFormat = function (locales, options) {
        // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
        if (!this || !(this instanceof NumberFormat)) {
            return new NumberFormat(locales, options);
        }
        initializeNumberFormat(this, locales, options);
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
    };
    defineProperty(NumberFormat.prototype, 'formatToParts', {
        value: function formatToParts(x) {
            return formatNumericToParts(this, toNumeric(x));
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
            return supportedLocales(NumberFormat.availableLocales, Intl.getCanonicalLocales(locales), options);
        },
    });
    NumberFormat.__addLocaleData = function __addLocaleData() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
            var datum = data_1[_a];
            var availableLocales = datum.availableLocales;
            for (var _b = 0, availableLocales_1 = availableLocales; _b < availableLocales_1.length; _b++) {
                var locale = availableLocales_1[_b];
                try {
                    NumberFormat.localeData[locale] = unpackData(locale, datum);
                }
                catch (e) {
                    // Ignore if we got no data
                }
            }
        }
        NumberFormat.availableLocales = Object.keys(NumberFormat.localeData);
        if (!NumberFormat.__defaultLocale) {
            NumberFormat.__defaultLocale = NumberFormat.availableLocales[0];
        }
    };
    NumberFormat.__defaultLocale = 'en';
    NumberFormat.localeData = {};
    NumberFormat.availableLocales = [];
    NumberFormat.getDefaultLocale = function () {
        return NumberFormat.__defaultLocale;
    };
    NumberFormat.polyfilled = true;
    /**
     * https://tc39.es/ecma402/#sec-setnumberformatunitoptions
     */
    function setNumberFormatUnitOptions(nf, options) {
        if (options === void 0) { options = Object.create(null); }
        var internalSlots = getInternalSlots(nf);
        var style = getOption(options, 'style', 'string', ['decimal', 'percent', 'currency', 'unit'], 'decimal');
        internalSlots.style = style;
        var currency = getOption(options, 'currency', 'string', undefined, undefined);
        if (currency !== undefined && !isWellFormedCurrencyCode(currency)) {
            throw RangeError('Malformed currency code');
        }
        if (style === 'currency' && currency === undefined) {
            throw TypeError('currency cannot be undefined');
        }
        var currencyDisplay = getOption(options, 'currencyDisplay', 'string', ['code', 'symbol', 'narrowSymbol', 'name'], 'symbol');
        var currencySign = getOption(options, 'currencySign', 'string', ['standard', 'accounting'], 'standard');
        var unit = getOption(options, 'unit', 'string', undefined, undefined);
        if (unit !== undefined && !isWellFormedUnitIdentifier(unit)) {
            throw RangeError('Invalid unit argument for Intl.NumberFormat()');
        }
        if (style === 'unit' && unit === undefined) {
            throw TypeError('unit cannot be undefined');
        }
        var unitDisplay = getOption(options, 'unitDisplay', 'string', ['short', 'narrow', 'long'], 'short');
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
     * The abstract operation ComputeExponent computes an exponent (power of ten) by which to scale x
     * according to the number formatting settings. It handles cases such as 999 rounding up to 1000,
     * requiring a different exponent.
     *
     * NOT IN SPEC: it returns [exponent, magnitude].
     */
    function computeExponent(numberFormat, x) {
        if (x === 0) {
            return [0, 0];
        }
        if (x < 0) {
            x = -x;
        }
        var magnitude = getMagnitude(x);
        var exponent = computeExponentForMagnitude(numberFormat, magnitude);
        // Preserve more precision by doing multiplication when exponent is negative.
        x = exponent < 0 ? x * Math.pow(10, -exponent) : x / Math.pow(10, exponent);
        var formatNumberResult = formatNumericToString(getInternalSlots(numberFormat), x);
        if (formatNumberResult.roundedNumber === 0) {
            return [exponent, magnitude];
        }
        var newMagnitude = getMagnitude(formatNumberResult.roundedNumber);
        if (newMagnitude === magnitude - exponent) {
            return [exponent, magnitude];
        }
        return [
            computeExponentForMagnitude(numberFormat, magnitude + 1),
            magnitude + 1,
        ];
    }
    /**
     * The abstract operation ComputeExponentForMagnitude computes an exponent by which to scale a
     * number of the given magnitude (power of ten of the most significant digit) according to the
     * locale and the desired notation (scientific, engineering, or compact).
     */
    function computeExponentForMagnitude(numberFormat, magnitude) {
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
    function toNumeric(val) {
        if (typeof val === 'bigint') {
            return val;
        }
        return toNumber(val);
    }
    function toNumber(val) {
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

    /* eslint-disable import/no-cycle */
    /**
     * Check if a formatting number with unit is supported
     * @public
     * @param unit unit to check
     */
    function isUnitSupported(unit) {
        try {
            new Intl.NumberFormat(undefined, {
                style: 'unit',
                // @ts-ignore
                unit: unit,
            });
        }
        catch (e) {
            return false;
        }
        return true;
    }

    if (!isUnitSupported('bit')) {
        defineProperty(Intl, 'NumberFormat', { value: NumberFormat });
        defineProperty(Number.prototype, 'toLocaleString', {
            value: function toLocaleString$1(locales, options) {
                return toLocaleString(this, locales, options);
            },
        });
    }

})));

