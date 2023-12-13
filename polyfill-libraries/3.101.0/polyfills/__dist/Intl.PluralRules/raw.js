
// Intl.PluralRules
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

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

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
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
     * http://ecma-international.org/ecma-402/7.0/index.html#sec-getoperands
     * @param s
     */
    function GetOperands(s) {
        invariant(typeof s === 'string', "GetOperands should have been called with a string");
        var n = ToNumber(s);
        invariant(isFinite(n), 'n should be finite');
        var dp = s.indexOf('.');
        var iv;
        var f;
        var v;
        var fv = '';
        if (dp === -1) {
            iv = n;
            f = 0;
            v = 0;
        }
        else {
            iv = s.slice(0, dp);
            fv = s.slice(dp, s.length);
            f = ToNumber(fv);
            v = fv.length;
        }
        var i = Math.abs(ToNumber(iv));
        var w;
        var t;
        if (f !== 0) {
            var ft = fv.replace(/0+$/, '');
            w = ft.length;
            t = ToNumber(ft);
        }
        else {
            w = 0;
            t = 0;
        }
        return {
            Number: n,
            IntegerDigits: i,
            NumberOfFractionDigits: v,
            NumberOfFractionDigitsWithoutTrailing: w,
            FractionDigits: f,
            FractionDigitsWithoutTrailing: t,
        };
    }

    function InitializePluralRules(pl, locales, options, _a) {
        var availableLocales = _a.availableLocales, relevantExtensionKeys = _a.relevantExtensionKeys, localeData = _a.localeData, getDefaultLocale = _a.getDefaultLocale, getInternalSlots = _a.getInternalSlots;
        var requestedLocales = CanonicalizeLocaleList(locales);
        var opt = Object.create(null);
        var opts = options === undefined ? Object.create(null) : ToObject(options);
        var internalSlots = getInternalSlots(pl);
        internalSlots.initializedPluralRules = true;
        var matcher = GetOption(opts, 'localeMatcher', 'string', ['best fit', 'lookup'], 'best fit');
        opt.localeMatcher = matcher;
        internalSlots.type = GetOption(opts, 'type', 'string', ['cardinal', 'ordinal'], 'cardinal');
        SetNumberFormatDigitOptions(internalSlots, opts, 0, 3, 'standard');
        var r = ResolveLocale(availableLocales, requestedLocales, opt, relevantExtensionKeys, localeData, getDefaultLocale);
        internalSlots.locale = r.locale;
        return pl;
    }

    /**
     * http://ecma-international.org/ecma-402/7.0/index.html#sec-resolveplural
     * @param pl
     * @param n
     * @param PluralRuleSelect Has to pass in bc it's implementation-specific
     */
    function ResolvePlural(pl, n, _a) {
        var getInternalSlots = _a.getInternalSlots, PluralRuleSelect = _a.PluralRuleSelect;
        var internalSlots = getInternalSlots(pl);
        invariant(Type(internalSlots) === 'Object', 'pl has to be an object');
        invariant('initializedPluralRules' in internalSlots, 'pluralrules must be initialized');
        invariant(Type(n) === 'Number', 'n must be a number');
        if (!isFinite(n)) {
            return 'other';
        }
        var locale = internalSlots.locale, type = internalSlots.type;
        var res = FormatNumericToString(internalSlots, n);
        var s = res.formattedString;
        var operands = GetOperands(s);
        return PluralRuleSelect(locale, type, n, operands);
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

    var internalSlotMap = new WeakMap();
    function getInternalSlots(x) {
        var internalSlots = internalSlotMap.get(x);
        if (!internalSlots) {
            internalSlots = Object.create(null);
            internalSlotMap.set(x, internalSlots);
        }
        return internalSlots;
    }

    function validateInstance(instance, method) {
        if (!(instance instanceof PluralRules)) {
            throw new TypeError("Method Intl.PluralRules.prototype." + method + " called on incompatible receiver " + String(instance));
        }
    }
    /**
     * http://ecma-international.org/ecma-402/7.0/index.html#sec-pluralruleselect
     * @param locale
     * @param type
     * @param _n
     * @param param3
     */
    function PluralRuleSelect(locale, type, _n, _a) {
        var IntegerDigits = _a.IntegerDigits, NumberOfFractionDigits = _a.NumberOfFractionDigits, FractionDigits = _a.FractionDigits;
        return PluralRules.localeData[locale].fn(NumberOfFractionDigits
            ? IntegerDigits + "." + FractionDigits
            : IntegerDigits, type === 'ordinal');
    }
    var PluralRules = /** @class */ (function () {
        function PluralRules(locales, options) {
            // test262/test/intl402/RelativeTimeFormat/constructor/constructor/newtarget-undefined.js
            // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
            var newTarget = this && this instanceof PluralRules ? this.constructor : void 0;
            if (!newTarget) {
                throw new TypeError("Intl.PluralRules must be called with 'new'");
            }
            return InitializePluralRules(this, locales, options, {
                availableLocales: PluralRules.availableLocales,
                relevantExtensionKeys: PluralRules.relevantExtensionKeys,
                localeData: PluralRules.localeData,
                getDefaultLocale: PluralRules.getDefaultLocale,
                getInternalSlots: getInternalSlots,
            });
        }
        PluralRules.prototype.resolvedOptions = function () {
            validateInstance(this, 'resolvedOptions');
            var opts = Object.create(null);
            var internalSlots = getInternalSlots(this);
            opts.locale = internalSlots.locale;
            opts.type = internalSlots.type;
            [
                'minimumIntegerDigits',
                'minimumFractionDigits',
                'maximumFractionDigits',
                'minimumSignificantDigits',
                'maximumSignificantDigits',
            ].forEach(function (field) {
                var val = internalSlots[field];
                if (val !== undefined) {
                    opts[field] = val;
                }
            });
            opts.pluralCategories = __spreadArrays(PluralRules.localeData[opts.locale].categories[opts.type]);
            return opts;
        };
        PluralRules.prototype.select = function (val) {
            var pr = this;
            validateInstance(pr, 'select');
            var n = ToNumber(val);
            return ResolvePlural(pr, n, { getInternalSlots: getInternalSlots, PluralRuleSelect: PluralRuleSelect });
        };
        PluralRules.prototype.toString = function () {
            return '[object Intl.PluralRules]';
        };
        PluralRules.supportedLocalesOf = function (locales, options) {
            return SupportedLocales(PluralRules.availableLocales, CanonicalizeLocaleList(locales), options);
        };
        PluralRules.__addLocaleData = function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
                var _b = data_1[_a], d = _b.data, locale = _b.locale;
                PluralRules.localeData[locale] = d;
                PluralRules.availableLocales.add(locale);
                if (!PluralRules.__defaultLocale) {
                    PluralRules.__defaultLocale = locale;
                }
            }
        };
        PluralRules.getDefaultLocale = function () {
            return PluralRules.__defaultLocale;
        };
        PluralRules.localeData = {};
        PluralRules.availableLocales = new Set();
        PluralRules.__defaultLocale = '';
        PluralRules.relevantExtensionKeys = [];
        PluralRules.polyfilled = true;
        return PluralRules;
    }());
    try {
        // IE11 does not have Symbol
        if (typeof Symbol !== 'undefined') {
            Object.defineProperty(PluralRules.prototype, Symbol.toStringTag, {
                value: 'Intl.PluralRules',
                writable: false,
                enumerable: false,
                configurable: true,
            });
        }
        try {
            // https://github.com/tc39/test262/blob/master/test/intl402/PluralRules/length.js
            Object.defineProperty(PluralRules, 'length', {
                value: 0,
                writable: false,
                enumerable: false,
                configurable: true,
            });
        }
        catch (error) {
            // IE 11 sets Function.prototype.length to be non-configurable which will cause the
            // above Object.defineProperty to throw an error.
        }
        // https://github.com/tc39/test262/blob/master/test/intl402/RelativeTimeFormat/constructor/length.js
        Object.defineProperty(PluralRules.prototype.constructor, 'length', {
            value: 0,
            writable: false,
            enumerable: false,
            configurable: true,
        });
        // https://github.com/tc39/test262/blob/master/test/intl402/RelativeTimeFormat/constructor/supportedLocalesOf/length.js
        Object.defineProperty(PluralRules.supportedLocalesOf, 'length', {
            value: 1,
            writable: false,
            enumerable: false,
            configurable: true,
        });
    }
    catch (ex) {
        // Meta fixes for test262
    }

    function shouldPolyfill() {
        return (typeof Intl === 'undefined' ||
            !('PluralRules' in Intl) ||
            new Intl.PluralRules('en', { minimumFractionDigits: 2 }).select(1) ===
                'one');
    }

    if (shouldPolyfill()) {
        Object.defineProperty(Intl, 'PluralRules', {
            value: PluralRules,
            writable: true,
            enumerable: false,
            configurable: true,
        });
    }

})));

