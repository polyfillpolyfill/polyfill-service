
// Intl.DateTimeFormat
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

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    /**
     * Cannot do Math.log(x) / Math.log(10) bc if IEEE floating point issue
     * @param x number
     */
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

    var DATE_TIME_PROPS = [
        'weekday',
        'era',
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'second',
        'timeZoneName',
    ];
    var removalPenalty = 120;
    var additionPenalty = 20;
    var differentNumericTypePenalty = 15;
    var longLessPenalty = 8;
    var longMorePenalty = 6;
    var shortLessPenalty = 6;
    var shortMorePenalty = 3;

    /**
     * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     * Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
     * with some tweaks
     */
    var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
    // trim patterns after transformations
    var expPatternTrimmer = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    function matchSkeletonPattern(match, result) {
        var len = match.length;
        switch (match[0]) {
            // Era
            case 'G':
                result.era = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
                return '{era}';
            // Year
            case 'y':
            case 'Y':
            case 'u':
            case 'U':
            case 'r':
                result.year = len === 2 ? '2-digit' : 'numeric';
                return '{year}';
            // Quarter
            case 'q':
            case 'Q':
                throw new RangeError('`w/Q` (quarter) patterns are not supported');
            // Month
            case 'M':
            case 'L':
                result.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1];
                return '{month}';
            // Week
            case 'w':
            case 'W':
                throw new RangeError('`w/W` (week of year) patterns are not supported');
            case 'd':
                result.day = ['numeric', '2-digit'][len - 1];
                return '{day}';
            case 'D':
            case 'F':
            case 'g':
                result.day = 'numeric';
                return '{day}';
            // Weekday
            case 'E':
                result.weekday = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
                return '{weekday}';
            case 'e':
                result.weekday = [
                    'numeric',
                    '2-digit',
                    'short',
                    'long',
                    'narrow',
                    'short',
                ][len - 1];
                return '{weekday}';
            case 'c':
                result.weekday = [
                    'numeric',
                    undefined,
                    'short',
                    'long',
                    'narrow',
                    'short',
                ][len - 1];
                return '{weekday}';
            // Period
            case 'a': // AM, PM
            case 'b': // am, pm, noon, midnight
            case 'B': // flexible day periods
                result.hour12 = true;
                return '{ampm}';
            // Hour
            case 'h':
                result.hour = ['numeric', '2-digit'][len - 1];
                result.hour12 = true;
                return '{hour}';
            case 'H':
                result.hour = ['numeric', '2-digit'][len - 1];
                return '{hour}';
            case 'K':
                result.hour = ['numeric', '2-digit'][len - 1];
                result.hour12 = true;
                return '{hour}';
            case 'k':
                result.hour = ['numeric', '2-digit'][len - 1];
                return '{hour}';
            case 'j':
            case 'J':
            case 'C':
                throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
            // Minute
            case 'm':
                result.minute = ['numeric', '2-digit'][len - 1];
                return '{minute}';
            // Second
            case 's':
                result.second = ['numeric', '2-digit'][len - 1];
                return '{second}';
            case 'S':
            case 'A':
                result.second = 'numeric';
                return '{second}';
            // Zone
            case 'z': // 1..3, 4: specific non-location format
            case 'Z': // 1..3, 4, 5: The ISO8601 varios formats
            case 'O': // 1, 4: miliseconds in day short, long
            case 'v': // 1, 4: generic non-location format
            case 'V': // 1, 2, 3, 4: time zone ID or city
            case 'X': // 1, 2, 3, 4: The ISO8601 varios formats
            case 'x': // 1, 2, 3, 4: The ISO8601 varios formats
                result.timeZoneName = len < 4 ? 'short' : 'long';
                return '{timeZoneName}';
        }
        return '';
    }
    function skeletonTokenToTable2(c) {
        switch (c) {
            // Era
            case 'G':
                return 'era';
            // Year
            case 'y':
            case 'Y':
            case 'u':
            case 'U':
            case 'r':
                return 'year';
            // Month
            case 'M':
            case 'L':
                return 'month';
            // Day
            case 'd':
            case 'D':
            case 'F':
            case 'g':
                return 'day';
            // Period
            case 'a': // AM, PM
            case 'b': // am, pm, noon, midnight
            case 'B': // flexible day periods
                return 'ampm';
            // Hour
            case 'h':
            case 'H':
            case 'K':
            case 'k':
                return 'hour';
            // Minute
            case 'm':
                return 'minute';
            // Second
            case 's':
            case 'S':
            case 'A':
                return 'second';
            default:
                throw new RangeError('Invalid range pattern token');
        }
    }
    function processDateTimePattern(pattern, result) {
        var literals = [];
        // Use skeleton to populate result, but use mapped pattern to populate pattern
        var pattern12 = pattern
            // Double apostrophe
            .replace(/'{2}/g, '{apostrophe}')
            // Apostrophe-escaped
            .replace(/'(.*?)'/g, function (_, literal) {
            literals.push(literal);
            return "$$" + (literals.length - 1) + "$$";
        })
            .replace(DATE_TIME_REGEX, function (m) { return matchSkeletonPattern(m, result || {}); });
        //Restore literals
        if (literals.length) {
            pattern12 = pattern12
                .replace(/\$\$(\d+)\$\$/g, function (_, i) {
                return literals[+i];
            })
                .replace(/\{apostrophe\}/g, "'");
        }
        // Handle apostrophe-escaped things
        return [
            pattern12
                .replace(/([\s\uFEFF\xA0])\{ampm\}([\s\uFEFF\xA0])/, '$1')
                .replace('{ampm}', '')
                .replace(expPatternTrimmer, ''),
            pattern12,
        ];
    }
    /**
     * Parse Date time skeleton into Intl.DateTimeFormatOptions
     * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     * @public
     * @param skeleton skeleton string
     */
    function parseDateTimeSkeleton(skeleton, rawPattern, rangePatterns, intervalFormatFallback) {
        if (rawPattern === void 0) { rawPattern = skeleton; }
        var result = {
            pattern: '',
            pattern12: '',
            skeleton: skeleton,
            rawPattern: rawPattern,
            rangePatterns: {},
            rangePatterns12: {},
        };
        if (rangePatterns) {
            for (var k in rangePatterns) {
                var key = skeletonTokenToTable2(k);
                var rawPattern_1 = rangePatterns[k];
                var intervalResult = {
                    patternParts: [],
                };
                var _a = processDateTimePattern(rawPattern_1, intervalResult), pattern_1 = _a[0], pattern12_1 = _a[1];
                result.rangePatterns[key] = __assign(__assign({}, intervalResult), { patternParts: splitRangePattern(pattern_1) });
                result.rangePatterns12[key] = __assign(__assign({}, intervalResult), { patternParts: splitRangePattern(pattern12_1) });
            }
        }
        else if (intervalFormatFallback) {
            var patternParts = splitFallbackRangePattern(intervalFormatFallback);
            result.rangePatterns.default = {
                patternParts: patternParts,
            };
            result.rangePatterns12.default = {
                patternParts: patternParts,
            };
        }
        // Process skeleton
        skeleton.replace(DATE_TIME_REGEX, function (m) { return matchSkeletonPattern(m, result); });
        var _b = processDateTimePattern(rawPattern), pattern = _b[0], pattern12 = _b[1];
        result.pattern = pattern;
        result.pattern12 = pattern12;
        return result;
    }
    function splitFallbackRangePattern(pattern) {
        var parts = pattern.split(/(\{[0|1]\})/g).filter(Boolean);
        return parts.map(function (pattern) {
            switch (pattern) {
                case '{0}':
                    return {
                        source: "startRange" /* startRange */,
                        pattern: pattern,
                    };
                case '{1}':
                    return {
                        source: "endRange" /* endRange */,
                        pattern: pattern,
                    };
                default:
                    return {
                        source: "shared" /* shared */,
                        pattern: pattern,
                    };
            }
        });
    }
    function splitRangePattern(pattern) {
        var PART_REGEX = /\{(.*?)\}/g;
        // Map of part and index within the string
        var parts = {};
        var match;
        var splitIndex = 0;
        while ((match = PART_REGEX.exec(pattern))) {
            if (!(match[0] in parts)) {
                parts[match[0]] = match.index;
            }
            else {
                splitIndex = match.index;
                break;
            }
        }
        if (!splitIndex) {
            return [
                {
                    source: "startRange" /* startRange */,
                    pattern: pattern,
                },
            ];
        }
        return [
            {
                source: "startRange" /* startRange */,
                pattern: pattern.slice(0, splitIndex),
            },
            {
                source: "endRange" /* endRange */,
                pattern: pattern.slice(splitIndex),
            },
        ];
    }

    function isNumericType(t) {
        return t === 'numeric' || t === '2-digit';
    }
    /**
     * Credit: https://github.com/andyearnshaw/Intl.js/blob/0958dc1ad8153f1056653ea22b8208f0df289a4e/src/12.datetimeformat.js#L611
     * with some modifications
     * @param options
     * @param format
     */
    function bestFitFormatMatcherScore(options, format) {
        var score = 0;
        if (options.hour12 && !format.hour12) {
            score -= removalPenalty;
        }
        else if (!options.hour12 && format.hour12) {
            score -= additionPenalty;
        }
        for (var _i = 0, DATE_TIME_PROPS_1 = DATE_TIME_PROPS; _i < DATE_TIME_PROPS_1.length; _i++) {
            var prop = DATE_TIME_PROPS_1[_i];
            var optionsProp = options[prop];
            var formatProp = format[prop];
            if (optionsProp === undefined && formatProp !== undefined) {
                score -= additionPenalty;
            }
            else if (optionsProp !== undefined && formatProp === undefined) {
                score -= removalPenalty;
            }
            else if (optionsProp !== formatProp) {
                // extra penalty for numeric vs non-numeric
                if (isNumericType(optionsProp) !==
                    isNumericType(formatProp)) {
                    score -= differentNumericTypePenalty;
                }
                else {
                    var values = ['2-digit', 'numeric', 'narrow', 'short', 'long'];
                    var optionsPropIndex = values.indexOf(optionsProp);
                    var formatPropIndex = values.indexOf(formatProp);
                    var delta = Math.max(-2, Math.min(formatPropIndex - optionsPropIndex, 2));
                    if (delta === 2) {
                        score -= longMorePenalty;
                    }
                    else if (delta === 1) {
                        score -= shortMorePenalty;
                    }
                    else if (delta === -1) {
                        score -= shortLessPenalty;
                    }
                    else if (delta === -2) {
                        score -= longLessPenalty;
                    }
                }
            }
        }
        return score;
    }
    /**
     * https://tc39.es/ecma402/#sec-bestfitformatmatcher
     * Just alias to basic for now
     * @param options
     * @param formats
     * @param implDetails Implementation details
     */
    function BestFitFormatMatcher(options, formats) {
        var bestScore = -Infinity;
        var bestFormat = formats[0];
        invariant(Array.isArray(formats), 'formats should be a list of things');
        for (var _i = 0, formats_1 = formats; _i < formats_1.length; _i++) {
            var format = formats_1[_i];
            var score = bestFitFormatMatcherScore(options, format);
            if (score > bestScore) {
                bestScore = score;
                bestFormat = format;
            }
        }
        var skeletonFormat = __assign({}, bestFormat);
        var patternFormat = { rawPattern: bestFormat.rawPattern };
        processDateTimePattern(bestFormat.rawPattern, patternFormat);
        // Kinda following https://github.com/unicode-org/icu/blob/dd50e38f459d84e9bf1b0c618be8483d318458ad/icu4j/main/classes/core/src/com/ibm/icu/text/DateTimePatternGenerator.java
        // Method adjustFieldTypes
        for (var prop in skeletonFormat) {
            var skeletonValue = skeletonFormat[prop];
            var patternValue = patternFormat[prop];
            var requestedValue = options[prop];
            // Don't mess with minute/second or we can get in the situation of
            // 7:0:0 which is weird
            if (prop === 'minute' || prop === 'second') {
                continue;
            }
            // Nothing to do here
            if (!requestedValue) {
                continue;
            }
            // https://unicode.org/reports/tr35/tr35-dates.html#Matching_Skeletons
            // Looks like we should not convert numeric to alphabetic but the other way
            // around is ok
            if (isNumericType(patternValue) &&
                !isNumericType(requestedValue)) {
                continue;
            }
            if (skeletonValue === requestedValue) {
                continue;
            }
            patternFormat[prop] = requestedValue;
        }
        // Copy those over
        patternFormat.pattern = skeletonFormat.pattern;
        patternFormat.pattern12 = skeletonFormat.pattern12;
        patternFormat.skeleton = skeletonFormat.skeleton;
        patternFormat.rangePatterns = skeletonFormat.rangePatterns;
        patternFormat.rangePatterns12 = skeletonFormat.rangePatterns12;
        return patternFormat;
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
     * https://tc39.es/ecma402/#sec-canonicalizetimezonename
     * @param tz
     */
    function CanonicalizeTimeZoneName(tz, _a) {
        var tzData = _a.tzData, uppercaseLinks = _a.uppercaseLinks;
        var uppercasedTz = tz.toUpperCase();
        var uppercasedZones = Object.keys(tzData).reduce(function (all, z) {
            all[z.toUpperCase()] = z;
            return all;
        }, {});
        var ianaTimeZone = uppercaseLinks[uppercasedTz] || uppercasedZones[uppercasedTz];
        if (ianaTimeZone === 'Etc/UTC' || ianaTimeZone === 'Etc/GMT') {
            return 'UTC';
        }
        return ianaTimeZone;
    }

    /**
     * https://tc39.es/ecma402/#sec-basicformatmatcher
     * @param options
     * @param formats
     */
    function BasicFormatMatcher(options, formats) {
        var bestScore = -Infinity;
        var bestFormat = formats[0];
        invariant(Array.isArray(formats), 'formats should be a list of things');
        for (var _i = 0, formats_1 = formats; _i < formats_1.length; _i++) {
            var format = formats_1[_i];
            var score = 0;
            for (var _a = 0, DATE_TIME_PROPS_1 = DATE_TIME_PROPS; _a < DATE_TIME_PROPS_1.length; _a++) {
                var prop = DATE_TIME_PROPS_1[_a];
                var optionsProp = options[prop];
                var formatProp = format[prop];
                if (optionsProp === undefined && formatProp !== undefined) {
                    score -= additionPenalty;
                }
                else if (optionsProp !== undefined && formatProp === undefined) {
                    score -= removalPenalty;
                }
                else if (optionsProp !== formatProp) {
                    var values = ['2-digit', 'numeric', 'narrow', 'short', 'long'];
                    var optionsPropIndex = values.indexOf(optionsProp);
                    var formatPropIndex = values.indexOf(formatProp);
                    var delta = Math.max(-2, Math.min(formatPropIndex - optionsPropIndex, 2));
                    if (delta === 2) {
                        score -= longMorePenalty;
                    }
                    else if (delta === 1) {
                        score -= shortMorePenalty;
                    }
                    else if (delta === -1) {
                        score -= shortLessPenalty;
                    }
                    else if (delta === -2) {
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

    function DateTimeStyleFormat(dateStyle, timeStyle, dataLocaleData) {
        var dateFormat, timeFormat;
        if (timeStyle !== undefined) {
            invariant(timeStyle === 'full' ||
                timeStyle === 'long' ||
                timeStyle === 'medium' ||
                timeStyle === 'short', 'invalid timeStyle');
            timeFormat = dataLocaleData.timeFormat[timeStyle];
        }
        if (dateStyle !== undefined) {
            invariant(dateStyle === 'full' ||
                dateStyle === 'long' ||
                dateStyle === 'medium' ||
                dateStyle === 'short', 'invalid dateStyle');
            dateFormat = dataLocaleData.dateFormat[dateStyle];
        }
        if (dateStyle !== undefined && timeStyle !== undefined) {
            var format = {};
            for (var field in dateFormat) {
                if (field !== 'pattern') {
                    // @ts-ignore
                    format[field] = dateFormat[field];
                }
            }
            for (var field in timeFormat) {
                if (field !== 'pattern' && field !== 'pattern12') {
                    // @ts-ignore
                    format[field] = timeFormat[field];
                }
            }
            var connector = dataLocaleData.dateTimeFormat[dateStyle];
            var pattern = connector
                .replace('{0}', timeFormat.pattern)
                .replace('{1}', dateFormat.pattern);
            format.pattern = pattern;
            if ('pattern12' in timeFormat) {
                var pattern12 = connector
                    .replace('{0}', timeFormat.pattern12)
                    .replace('{1}', dateFormat.pattern);
                format.pattern12 = pattern12;
            }
            return format;
        }
        if (timeStyle !== undefined) {
            return timeFormat;
        }
        invariant(dateStyle !== undefined, 'dateStyle should not be undefined');
        return dateFormat;
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
     * https://tc39.es/ecma262/#sec-tointeger
     * @param n
     */
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
    /**
     * https://tc39.es/ecma262/#sec-timeclip
     * @param time
     */
    function TimeClip(time) {
        if (!isFinite(time)) {
            return NaN;
        }
        if (Math.abs(time) > 8.64 * 1e16) {
            return NaN;
        }
        return ToInteger(time);
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
    var MS_PER_DAY = 86400000;
    /**
     * https://www.ecma-international.org/ecma-262/11.0/index.html#eqn-modulo
     * @param x
     * @param y
     * @return k of the same sign as y
     */
    function mod(x, y) {
        return x - Math.floor(x / y) * y;
    }
    /**
     * https://tc39.es/ecma262/#eqn-Day
     * @param t
     */
    function Day(t) {
        return Math.floor(t / MS_PER_DAY);
    }
    /**
     * https://tc39.es/ecma262/#sec-week-day
     * @param t
     */
    function WeekDay(t) {
        return mod(Day(t) + 4, 7);
    }
    /**
     * https://tc39.es/ecma262/#sec-year-number
     * @param y
     */
    function DayFromYear(y) {
        return (365 * (y - 1970) +
            Math.floor((y - 1969) / 4) -
            Math.floor((y - 1901) / 100) +
            Math.floor((y - 1601) / 400));
    }
    /**
     * https://tc39.es/ecma262/#sec-year-number
     * @param y
     */
    function TimeFromYear(y) {
        return MS_PER_DAY * DayFromYear(y);
    }
    /**
     * https://tc39.es/ecma262/#sec-year-number
     * @param t
     */
    function YearFromTime(t) {
        var min = Math.ceil(t / MS_PER_DAY / 366);
        var y = min;
        while (TimeFromYear(y) <= t) {
            y++;
        }
        return y - 1;
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
    /**
     * https://tc39.es/ecma262/#sec-month-number
     * @param t
     */
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
        throw new Error('Invalid time');
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
        throw new Error('Invalid time');
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

    function getApplicableZoneData(t, timeZone, tzData) {
        var _a;
        var zoneData = tzData[timeZone];
        // We don't have data for this so just say it's UTC
        if (!zoneData) {
            return [0, false];
        }
        var i = 0;
        var offset = 0;
        var dst = false;
        for (; i <= zoneData.length; i++) {
            if (i === zoneData.length || zoneData[i][0] * 1e3 > t) {
                _a = zoneData[i - 1], offset = _a[2], dst = _a[3];
                break;
            }
        }
        return [offset * 1e3, dst];
    }
    /**
     * https://tc39.es/ecma402/#sec-tolocaltime
     * @param t
     * @param calendar
     * @param timeZone
     */
    function ToLocalTime(t, calendar, timeZone, _a) {
        var tzData = _a.tzData;
        invariant(Type(t) === 'Number', 'invalid time');
        invariant(calendar === 'gregory', 'We only support Gregory calendar right now');
        var _b = getApplicableZoneData(t, timeZone, tzData), timeZoneOffset = _b[0], inDST = _b[1];
        var tz = t + timeZoneOffset;
        var year = YearFromTime(tz);
        return {
            weekday: WeekDay(tz),
            era: year < 0 ? 'BC' : 'AD',
            year: year,
            relatedYear: undefined,
            yearName: undefined,
            month: MonthFromTime(tz),
            day: DateFromTime(tz),
            hour: HourFromTime(tz),
            minute: MinFromTime(tz),
            second: SecFromTime(tz),
            inDST: inDST,
            // IMPORTANT: Not in spec
            timeZoneOffset: timeZoneOffset,
        };
    }

    function pad(n) {
        if (n < 10) {
            return "0" + n;
        }
        return String(n);
    }
    function offsetToGmtString(gmtFormat, hourFormat, offsetInMs, style) {
        var offsetInMinutes = Math.floor(offsetInMs / 60000);
        var mins = Math.abs(offsetInMinutes) % 60;
        var hours = Math.floor(Math.abs(offsetInMinutes) / 60);
        var _a = hourFormat.split(';'), positivePattern = _a[0], negativePattern = _a[1];
        var offsetStr = '';
        var pattern = offsetInMs < 0 ? negativePattern : positivePattern;
        if (style === 'long') {
            offsetStr = pattern
                .replace('HH', pad(hours))
                .replace('H', String(hours))
                .replace('mm', pad(mins))
                .replace('m', String(mins));
        }
        else if (mins || hours) {
            if (!mins) {
                pattern = pattern.replace(/:?m+/, '');
            }
            offsetStr = pattern
                .replace(/H+/, String(hours))
                .replace(/m+/, String(mins));
        }
        return gmtFormat.replace('{0}', offsetStr);
    }
    /**
     * https://tc39.es/ecma402/#sec-partitiondatetimepattern
     * @param dtf
     * @param x
     */
    function FormatDateTimePattern(dtf, patternParts, x, _a) {
        var getInternalSlots = _a.getInternalSlots, localeData = _a.localeData, getDefaultTimeZone = _a.getDefaultTimeZone, tzData = _a.tzData;
        x = TimeClip(x);
        /** IMPL START */
        var internalSlots = getInternalSlots(dtf);
        var dataLocale = internalSlots.dataLocale;
        var dataLocaleData = localeData[dataLocale];
        /** IMPL END */
        var locale = internalSlots.locale;
        var nfOptions = Object.create(null);
        nfOptions.useGrouping = false;
        var nf = new Intl.NumberFormat(locale, nfOptions);
        var nf2Options = Object.create(null);
        nf2Options.minimumIntegerDigits = 2;
        nf2Options.useGrouping = false;
        var nf2 = new Intl.NumberFormat(locale, nf2Options);
        var tm = ToLocalTime(x, 
        // @ts-ignore
        internalSlots.calendar, internalSlots.timeZone, { tzData: tzData });
        var result = [];
        for (var _i = 0, patternParts_1 = patternParts; _i < patternParts_1.length; _i++) {
            var patternPart = patternParts_1[_i];
            var p = patternPart.type;
            if (p === 'literal') {
                result.push({
                    type: 'literal',
                    value: patternPart.value,
                });
            }
            else if (DATE_TIME_PROPS.indexOf(p) > -1) {
                var fv = '';
                var f = internalSlots[p];
                // @ts-ignore
                var v = tm[p];
                if (p === 'year' && v <= 0) {
                    v = 1 - v;
                }
                if (p === 'month') {
                    v++;
                }
                var hourCycle = internalSlots.hourCycle;
                if (p === 'hour' && (hourCycle === 'h11' || hourCycle === 'h12')) {
                    v = v % 12;
                    if (v === 0 && hourCycle === 'h12') {
                        v = 12;
                    }
                }
                if (p === 'hour' && hourCycle === 'h24') {
                    if (v === 0) {
                        v = 24;
                    }
                }
                if (f === 'numeric') {
                    fv = nf.format(v);
                }
                else if (f === '2-digit') {
                    fv = nf2.format(v);
                    if (fv.length > 2) {
                        fv = fv.slice(fv.length - 2, fv.length);
                    }
                }
                else if (f === 'narrow' || f === 'short' || f === 'long') {
                    if (p === 'era') {
                        fv = dataLocaleData[p][f][v];
                    }
                    else if (p === 'timeZoneName') {
                        var timeZoneName = dataLocaleData.timeZoneName, gmtFormat = dataLocaleData.gmtFormat, hourFormat = dataLocaleData.hourFormat;
                        var timeZone = internalSlots.timeZone || getDefaultTimeZone();
                        var timeZoneData = timeZoneName[timeZone];
                        if (timeZoneData && timeZoneData[f]) {
                            fv = timeZoneData[f][+tm.inDST];
                        }
                        else {
                            // Fallback to gmtFormat
                            fv = offsetToGmtString(gmtFormat, hourFormat, tm.timeZoneOffset, f);
                        }
                    }
                    else if (p === 'month') {
                        fv = dataLocaleData.month[f][v - 1];
                    }
                    else {
                        fv = dataLocaleData[p][f][v];
                    }
                }
                result.push({
                    type: p,
                    value: fv,
                });
            }
            else if (p === 'ampm') {
                var v = tm.hour;
                var fv = void 0;
                if (v > 11) {
                    fv = dataLocaleData.pm;
                }
                else {
                    fv = dataLocaleData.am;
                }
                result.push({
                    type: 'dayPeriod',
                    value: fv,
                });
            }
            else if (p === 'relatedYear') {
                var v = tm.relatedYear;
                // @ts-ignore
                var fv = nf.format(v);
                result.push({
                    // @ts-ignore TODO: Fix TS type
                    type: 'relatedYear',
                    value: fv,
                });
            }
            else if (p === 'yearName') {
                var v = tm.yearName;
                // @ts-ignore
                var fv = nf.format(v);
                result.push({
                    // @ts-ignore TODO: Fix TS type
                    type: 'yearName',
                    value: fv,
                });
            }
        }
        return result;
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
     * https://tc39.es/ecma402/#sec-partitiondatetimepattern
     * @param dtf
     * @param x
     */
    function PartitionDateTimePattern(dtf, x, implDetails) {
        x = TimeClip(x);
        if (isNaN(x)) {
            throw new RangeError('invalid time');
        }
        /** IMPL START */
        var getInternalSlots = implDetails.getInternalSlots;
        var internalSlots = getInternalSlots(dtf);
        /** IMPL END */
        var pattern = internalSlots.pattern;
        return FormatDateTimePattern(dtf, PartitionPattern(pattern), x, implDetails);
    }

    /**
     * https://tc39.es/ecma402/#sec-formatdatetime
     * @param dtf DateTimeFormat
     * @param x
     */
    function FormatDateTime(dtf, x, implDetails) {
        var parts = PartitionDateTimePattern(dtf, x, implDetails);
        var result = '';
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            result += part.value;
        }
        return result;
    }

    var TABLE_2_FIELDS = [
        'era',
        'year',
        'month',
        'day',
        'ampm',
        'hour',
        'minute',
        'second',
    ];
    function PartitionDateTimeRangePattern(dtf, x, y, implDetails) {
        x = TimeClip(x);
        if (isNaN(x)) {
            throw new RangeError('Invalid start time');
        }
        y = TimeClip(y);
        if (isNaN(y)) {
            throw new RangeError('Invalid end time');
        }
        /** IMPL START */
        var getInternalSlots = implDetails.getInternalSlots, tzData = implDetails.tzData;
        var internalSlots = getInternalSlots(dtf);
        /** IMPL END */
        var tm1 = ToLocalTime(x, 
        // @ts-ignore
        internalSlots.calendar, internalSlots.timeZone, { tzData: tzData });
        var tm2 = ToLocalTime(y, 
        // @ts-ignore
        internalSlots.calendar, internalSlots.timeZone, { tzData: tzData });
        var pattern = internalSlots.pattern, rangePatterns = internalSlots.rangePatterns;
        var rangePattern;
        var dateFieldsPracticallyEqual = true;
        var patternContainsLargerDateField = false;
        for (var _i = 0, TABLE_2_FIELDS_1 = TABLE_2_FIELDS; _i < TABLE_2_FIELDS_1.length; _i++) {
            var fieldName = TABLE_2_FIELDS_1[_i];
            if (dateFieldsPracticallyEqual && !patternContainsLargerDateField) {
                if (fieldName === 'ampm') {
                    var rp = rangePatterns.ampm;
                    if (rangePattern !== undefined && rp === undefined) {
                        patternContainsLargerDateField = true;
                    }
                    else {
                        var v1 = tm1.hour;
                        var v2 = tm2.hour;
                        if ((v1 > 11 && v2 < 11) || (v1 < 11 && v2 > 11)) {
                            dateFieldsPracticallyEqual = false;
                        }
                        rangePattern = rp;
                    }
                }
                else {
                    var rp = rangePatterns[fieldName];
                    if (rangePattern !== undefined && rp === undefined) {
                        patternContainsLargerDateField = true;
                    }
                    else {
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
                r.source = "shared" /* shared */;
            }
            return result_2;
        }
        var result = [];
        if (rangePattern === undefined) {
            rangePattern = rangePatterns.default;
            /** IMPL DETAILS */
            // Now we have to replace {0} & {1} with actual pattern
            for (var _b = 0, _c = rangePattern.patternParts; _b < _c.length; _b++) {
                var patternPart = _c[_b];
                if (patternPart.pattern === '{0}' || patternPart.pattern === '{1}') {
                    patternPart.pattern = pattern;
                }
            }
        }
        for (var _d = 0, _e = rangePattern.patternParts; _d < _e.length; _d++) {
            var rangePatternPart = _e[_d];
            var source = rangePatternPart.source, pattern_1 = rangePatternPart.pattern;
            var z = void 0;
            if (source === "startRange" /* startRange */ ||
                source === "shared" /* shared */) {
                z = x;
            }
            else {
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

    function FormatDateTimeRange(dtf, x, y, implDetails) {
        var parts = PartitionDateTimeRangePattern(dtf, x, y, implDetails);
        var result = '';
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            result += part.value;
        }
        return result;
    }

    function FormatDateTimeRangeToParts(dtf, x, y, implDetails) {
        var parts = PartitionDateTimeRangePattern(dtf, x, y, implDetails);
        var result = new Array(0);
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            result.push({
                type: part.type,
                value: part.value,
                source: part.source,
            });
        }
        return result;
    }

    /**
     * https://tc39.es/ecma402/#sec-formatdatetimetoparts
     *
     * @param dtf
     * @param x
     * @param implDetails
     */
    function FormatDateTimeToParts(dtf, x, implDetails) {
        var parts = PartitionDateTimePattern(dtf, x, implDetails);
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
     * https://tc39.es/ecma402/#sec-todatetimeoptions
     * @param options
     * @param required
     * @param defaults
     */
    function ToDateTimeOptions(options, required, defaults) {
        if (options === undefined) {
            options = null;
        }
        else {
            options = ToObject(options);
        }
        options = Object.create(options);
        var needDefaults = true;
        if (required === 'date' || required === 'any') {
            for (var _i = 0, _a = ['weekday', 'year', 'month', 'day']; _i < _a.length; _i++) {
                var prop = _a[_i];
                var value = options[prop];
                if (value !== undefined) {
                    needDefaults = false;
                }
            }
        }
        if (required === 'time' || required === 'any') {
            for (var _b = 0, _c = ['hour', 'minute', 'second']; _b < _c.length; _b++) {
                var prop = _c[_b];
                var value = options[prop];
                if (value !== undefined) {
                    needDefaults = false;
                }
            }
        }
        if (options.dateStyle !== undefined || options.timeStyle !== undefined) {
            needDefaults = false;
        }
        if (required === 'date' && options.timeStyle) {
            throw new TypeError('Intl.DateTimeFormat date was required but timeStyle was included');
        }
        if (required === 'time' && options.dateStyle) {
            throw new TypeError('Intl.DateTimeFormat time was required but dateStyle was included');
        }
        if (needDefaults && (defaults === 'date' || defaults === 'all')) {
            for (var _d = 0, _e = ['year', 'month', 'day']; _d < _e.length; _d++) {
                var prop = _e[_d];
                options[prop] = 'numeric';
            }
        }
        if (needDefaults && (defaults === 'time' || defaults === 'all')) {
            for (var _f = 0, _g = ['hour', 'minute', 'second']; _f < _g.length; _f++) {
                var prop = _g[_f];
                options[prop] = 'numeric';
            }
        }
        return options;
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
     * https://tc39.es/ecma402/#sec-isvalidtimezonename
     * @param tz
     * @param implDetails implementation details
     */
    function IsValidTimeZoneName(tz, _a) {
        var tzData = _a.tzData, uppercaseLinks = _a.uppercaseLinks;
        var uppercasedTz = tz.toUpperCase();
        var zoneNames = new Set(Object.keys(tzData).map(function (z) { return z.toUpperCase(); }));
        return zoneNames.has(uppercasedTz) || uppercasedTz in uppercaseLinks;
    }

    function isTimeRelated(opt) {
        for (var _i = 0, _a = ['hour', 'minute', 'second']; _i < _a.length; _i++) {
            var prop = _a[_i];
            var value = opt[prop];
            if (value !== undefined) {
                return true;
            }
        }
        return false;
    }
    function resolveHourCycle(hc, hcDefault, hour12) {
        if (hc == null) {
            hc = hcDefault;
        }
        if (hour12 !== undefined) {
            if (hour12) {
                if (hcDefault === 'h11' || hcDefault === 'h23') {
                    hc = 'h11';
                }
                else {
                    hc = 'h12';
                }
            }
            else {
                invariant(!hour12, 'hour12 must not be set');
                if (hcDefault === 'h11' || hcDefault === 'h23') {
                    hc = 'h23';
                }
                else {
                    hc = 'h24';
                }
            }
        }
        return hc;
    }
    var TYPE_REGEX = /^[a-z0-9]{3,8}$/i;
    /**
     * https://tc39.es/ecma402/#sec-initializedatetimeformat
     * @param dtf DateTimeFormat
     * @param locales locales
     * @param opts options
     */
    function InitializeDateTimeFormat(dtf, locales, opts, _a) {
        var getInternalSlots = _a.getInternalSlots, availableLocales = _a.availableLocales, localeData = _a.localeData, getDefaultLocale = _a.getDefaultLocale, getDefaultTimeZone = _a.getDefaultTimeZone, relevantExtensionKeys = _a.relevantExtensionKeys, tzData = _a.tzData, uppercaseLinks = _a.uppercaseLinks;
        // @ts-ignore
        var requestedLocales = CanonicalizeLocaleList(locales);
        var options = ToDateTimeOptions(opts, 'any', 'date');
        var opt = Object.create(null);
        var matcher = GetOption(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
        opt.localeMatcher = matcher;
        var calendar = GetOption(options, 'calendar', 'string', undefined, undefined);
        if (calendar !== undefined && !TYPE_REGEX.test(calendar)) {
            throw new RangeError('Malformed calendar');
        }
        var internalSlots = getInternalSlots(dtf);
        opt.ca = calendar;
        var numberingSystem = GetOption(options, 'numberingSystem', 'string', undefined, undefined);
        if (numberingSystem !== undefined && !TYPE_REGEX.test(numberingSystem)) {
            throw new RangeError('Malformed numbering system');
        }
        opt.nu = numberingSystem;
        var hour12 = GetOption(options, 'hour12', 'boolean', undefined, undefined);
        var hourCycle = GetOption(options, 'hourCycle', 'string', ['h11', 'h12', 'h23', 'h24'], undefined);
        if (hour12 !== undefined) {
            // @ts-ignore
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
        if (timeZone !== undefined) {
            timeZone = String(timeZone);
            if (!IsValidTimeZoneName(timeZone, { tzData: tzData, uppercaseLinks: uppercaseLinks })) {
                throw new RangeError('Invalid timeZoneName');
            }
            timeZone = CanonicalizeTimeZoneName(timeZone, { tzData: tzData, uppercaseLinks: uppercaseLinks });
        }
        else {
            timeZone = getDefaultTimeZone();
        }
        internalSlots.timeZone = timeZone;
        opt = Object.create(null);
        opt.weekday = GetOption(options, 'weekday', 'string', ['narrow', 'short', 'long'], undefined);
        opt.era = GetOption(options, 'era', 'string', ['narrow', 'short', 'long'], undefined);
        opt.year = GetOption(options, 'year', 'string', ['2-digit', 'numeric'], undefined);
        opt.month = GetOption(options, 'month', 'string', ['2-digit', 'numeric', 'narrow', 'short', 'long'], undefined);
        opt.day = GetOption(options, 'day', 'string', ['2-digit', 'numeric'], undefined);
        opt.hour = GetOption(options, 'hour', 'string', ['2-digit', 'numeric'], undefined);
        opt.minute = GetOption(options, 'minute', 'string', ['2-digit', 'numeric'], undefined);
        opt.second = GetOption(options, 'second', 'string', ['2-digit', 'numeric'], undefined);
        opt.timeZoneName = GetOption(options, 'timeZoneName', 'string', ['short', 'long'], undefined);
        var dataLocaleData = localeData[dataLocale];
        invariant(!!dataLocaleData, "Missing locale data for " + dataLocale);
        var formats = dataLocaleData.formats[calendar];
        // UNSPECCED: IMPLEMENTATION DETAILS
        if (!formats) {
            throw new RangeError("Calendar \"" + calendar + "\" is not supported. Try setting \"calendar\" to 1 of the following: " + Object.keys(dataLocaleData.formats).join(', '));
        }
        matcher = GetOption(options, 'formatMatcher', 'string', ['basic', 'best fit'], 'best fit');
        var dateStyle = GetOption(options, 'dateStyle', 'string', ['full', 'long', 'medium', 'short'], undefined);
        internalSlots.dateStyle = dateStyle;
        var timeStyle = GetOption(options, 'timeStyle', 'string', ['full', 'long', 'medium', 'short'], undefined);
        internalSlots.timeStyle = timeStyle;
        var bestFormat;
        if (dateStyle === undefined && timeStyle === undefined) {
            if (matcher === 'basic') {
                bestFormat = BasicFormatMatcher(opt, formats);
            }
            else {
                // IMPL DETAILS START
                if (isTimeRelated(opt)) {
                    var hc = resolveHourCycle(internalSlots.hourCycle, dataLocaleData.hourCycle, hour12);
                    opt.hour12 = hc === 'h11' || hc === 'h12';
                }
                // IMPL DETAILS END
                bestFormat = BestFitFormatMatcher(opt, formats);
            }
        }
        else {
            for (var _i = 0, DATE_TIME_PROPS_1 = DATE_TIME_PROPS; _i < DATE_TIME_PROPS_1.length; _i++) {
                var prop = DATE_TIME_PROPS_1[_i];
                var p = opt[prop];
                if (p !== undefined) {
                    throw new TypeError("Intl.DateTimeFormat can't set option " + prop + " when " + (dateStyle ? 'dateStyle' : 'timeStyle') + " is used");
                }
            }
            bestFormat = DateTimeStyleFormat(dateStyle, timeStyle, dataLocaleData);
        }
        // IMPL DETAIL START
        // For debugging
        internalSlots.format = bestFormat;
        // IMPL DETAIL END
        for (var prop in opt) {
            var p = bestFormat[prop];
            if (p !== undefined) {
                internalSlots[prop] = p;
            }
        }
        var pattern;
        var rangePatterns;
        if (internalSlots.hour !== undefined) {
            var hc = resolveHourCycle(internalSlots.hourCycle, dataLocaleData.hourCycle, hour12);
            internalSlots.hourCycle = hc;
            if (hc === 'h11' || hc === 'h12') {
                pattern = bestFormat.pattern12;
                rangePatterns = bestFormat.rangePatterns12;
            }
            else {
                pattern = bestFormat.pattern;
                rangePatterns = bestFormat.rangePatterns;
            }
        }
        else {
            // @ts-ignore
            internalSlots.hourCycle = undefined;
            pattern = bestFormat.pattern;
            rangePatterns = bestFormat.rangePatterns;
        }
        internalSlots.pattern = pattern;
        internalSlots.rangePatterns = rangePatterns;
        return dtf;
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

    // @generated
    // prettier-ignore
    var links = {
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

    function unpack(data) {
        var abbrvs = data.abbrvs.split('|');
        var offsets = data.offsets.split('|').map(function (n) { return parseInt(n, 36); });
        var packedZones = data.zones;
        var zones = {};
        for (var _i = 0, packedZones_1 = packedZones; _i < packedZones_1.length; _i++) {
            var d = packedZones_1[_i];
            var _a = d.split('|'), zone = _a[0], zoneData = _a.slice(1);
            zones[zone] = zoneData
                .map(function (z) { return z.split(','); })
                .map(function (_a) {
                var ts = _a[0], abbrvIndex = _a[1], offsetIndex = _a[2], dst = _a[3];
                return [
                    ts === '' ? -Infinity : parseInt(ts, 36),
                    abbrvs[+abbrvIndex],
                    offsets[+offsetIndex],
                    dst === '1',
                ];
            });
        }
        return zones;
    }

    var UPPERCASED_LINKS = Object.keys(links).reduce(function (all, l) {
        all[l.toUpperCase()] = links[l];
        return all;
    }, {});
    var RESOLVED_OPTIONS_KEYS = [
        'locale',
        'calendar',
        'numberingSystem',
        'dateStyle',
        'timeStyle',
        'timeZone',
        'hourCycle',
        'weekday',
        'era',
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'second',
        'timeZoneName',
    ];
    var formatDescriptor = {
        enumerable: false,
        configurable: true,
        get: function () {
            if (typeof this !== 'object' || !(this instanceof DateTimeFormat)) {
                throw TypeError('Intl.DateTimeFormat format property accessor called on incompatible receiver');
            }
            var internalSlots = getInternalSlots(this);
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var dtf = this;
            var boundFormat = internalSlots.boundFormat;
            if (boundFormat === undefined) {
                // https://tc39.es/proposal-unified-intl-numberformat/section11/numberformat_diff_out.html#sec-number-format-functions
                boundFormat = function (date) {
                    var x;
                    if (date === undefined) {
                        x = Date.now();
                    }
                    else {
                        x = Number(date);
                    }
                    return FormatDateTime(dtf, x, {
                        getInternalSlots: getInternalSlots,
                        localeData: DateTimeFormat.localeData,
                        tzData: DateTimeFormat.tzData,
                        getDefaultTimeZone: DateTimeFormat.getDefaultTimeZone,
                    });
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
    var DateTimeFormat = function (locales, options) {
        // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
        if (!this || !(this instanceof DateTimeFormat)) {
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
            localeData: DateTimeFormat.localeData,
        });
        /** IMPL START */
        var internalSlots = getInternalSlots(this);
        var dataLocale = internalSlots.dataLocale;
        var dataLocaleData = DateTimeFormat.localeData[dataLocale];
        invariant(dataLocaleData !== undefined, "Cannot load locale-dependent data for " + dataLocale + ".");
        /** IMPL END */
    };
    // Static properties
    defineProperty(DateTimeFormat, 'supportedLocalesOf', {
        value: function supportedLocalesOf(locales, options) {
            return SupportedLocales(DateTimeFormat.availableLocales, CanonicalizeLocaleList(locales), options);
        },
    });
    defineProperty(DateTimeFormat.prototype, 'resolvedOptions', {
        value: function resolvedOptions() {
            if (typeof this !== 'object' || !(this instanceof DateTimeFormat)) {
                throw TypeError('Method Intl.DateTimeFormat.prototype.resolvedOptions called on incompatible receiver');
            }
            var internalSlots = getInternalSlots(this);
            var ro = {};
            for (var _i = 0, RESOLVED_OPTIONS_KEYS_1 = RESOLVED_OPTIONS_KEYS; _i < RESOLVED_OPTIONS_KEYS_1.length; _i++) {
                var key = RESOLVED_OPTIONS_KEYS_1[_i];
                var value = internalSlots[key];
                if (key === 'hourCycle') {
                    var hour12 = value === 'h11' || value === 'h12'
                        ? true
                        : value === 'h23' || value === 'h24'
                            ? false
                            : undefined;
                    if (hour12 !== undefined) {
                        ro.hour12 = hour12;
                    }
                }
                if (DATE_TIME_PROPS.indexOf(key) > -1) {
                    if (internalSlots.dateStyle !== undefined ||
                        internalSlots.timeStyle !== undefined) {
                        value = undefined;
                    }
                }
                if (value !== undefined) {
                    ro[key] = value;
                }
            }
            return ro;
        },
    });
    defineProperty(DateTimeFormat.prototype, 'formatToParts', {
        value: function formatToParts(date) {
            if (date === undefined) {
                date = Date.now();
            }
            else {
                date = ToNumber(date);
            }
            return FormatDateTimeToParts(this, date, {
                getInternalSlots: getInternalSlots,
                localeData: DateTimeFormat.localeData,
                tzData: DateTimeFormat.tzData,
                getDefaultTimeZone: DateTimeFormat.getDefaultTimeZone,
            });
        },
    });
    defineProperty(DateTimeFormat.prototype, 'formatRangeToParts', {
        value: function formatRangeToParts(startDate, endDate) {
            var dtf = this;
            if (typeof dtf !== 'object') {
                throw new TypeError();
            }
            if (startDate === undefined || endDate === undefined) {
                throw new TypeError('startDate/endDate cannot be undefined');
            }
            var x = ToNumber(startDate);
            var y = ToNumber(endDate);
            return FormatDateTimeRangeToParts(dtf, x, y, {
                getInternalSlots: getInternalSlots,
                localeData: DateTimeFormat.localeData,
                tzData: DateTimeFormat.tzData,
                getDefaultTimeZone: DateTimeFormat.getDefaultTimeZone,
            });
        },
    });
    defineProperty(DateTimeFormat.prototype, 'formatRange', {
        value: function formatRange(startDate, endDate) {
            var dtf = this;
            if (typeof dtf !== 'object') {
                throw new TypeError();
            }
            if (startDate === undefined || endDate === undefined) {
                throw new TypeError('startDate/endDate cannot be undefined');
            }
            var x = ToNumber(startDate);
            var y = ToNumber(endDate);
            return FormatDateTimeRange(dtf, x, y, {
                getInternalSlots: getInternalSlots,
                localeData: DateTimeFormat.localeData,
                tzData: DateTimeFormat.tzData,
                getDefaultTimeZone: DateTimeFormat.getDefaultTimeZone,
            });
        },
    });
    var DEFAULT_TIMEZONE = 'UTC';
    DateTimeFormat.__setDefaultTimeZone = function (timeZone) {
        if (timeZone !== undefined) {
            timeZone = String(timeZone);
            if (!IsValidTimeZoneName(timeZone, {
                tzData: DateTimeFormat.tzData,
                uppercaseLinks: UPPERCASED_LINKS,
            })) {
                throw new RangeError('Invalid timeZoneName');
            }
            timeZone = CanonicalizeTimeZoneName(timeZone, {
                tzData: DateTimeFormat.tzData,
                uppercaseLinks: UPPERCASED_LINKS,
            });
        }
        else {
            timeZone = DEFAULT_TIMEZONE;
        }
        DateTimeFormat.__defaultTimeZone = timeZone;
    };
    DateTimeFormat.relevantExtensionKeys = ['nu', 'ca', 'hc'];
    DateTimeFormat.__defaultTimeZone = DEFAULT_TIMEZONE;
    DateTimeFormat.getDefaultTimeZone = function () { return DateTimeFormat.__defaultTimeZone; };
    DateTimeFormat.__addLocaleData = function __addLocaleData() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        var _loop_1 = function (d, locale) {
            var dateFormat = d.dateFormat, timeFormat = d.timeFormat, dateTimeFormat = d.dateTimeFormat, formats = d.formats, intervalFormats = d.intervalFormats, rawData = __rest(d, ["dateFormat", "timeFormat", "dateTimeFormat", "formats", "intervalFormats"]);
            var processedData = __assign(__assign({}, rawData), { dateFormat: {
                    full: parseDateTimeSkeleton(dateFormat.full),
                    long: parseDateTimeSkeleton(dateFormat.long),
                    medium: parseDateTimeSkeleton(dateFormat.medium),
                    short: parseDateTimeSkeleton(dateFormat.short),
                }, timeFormat: {
                    full: parseDateTimeSkeleton(timeFormat.full),
                    long: parseDateTimeSkeleton(timeFormat.long),
                    medium: parseDateTimeSkeleton(timeFormat.medium),
                    short: parseDateTimeSkeleton(timeFormat.short),
                }, dateTimeFormat: {
                    full: parseDateTimeSkeleton(dateTimeFormat.full).pattern,
                    long: parseDateTimeSkeleton(dateTimeFormat.long).pattern,
                    medium: parseDateTimeSkeleton(dateTimeFormat.medium).pattern,
                    short: parseDateTimeSkeleton(dateTimeFormat.short).pattern,
                }, formats: {} });
            var _loop_2 = function (calendar) {
                processedData.formats[calendar] = Object.keys(formats[calendar]).map(function (skeleton) {
                    return parseDateTimeSkeleton(skeleton, formats[calendar][skeleton], intervalFormats[skeleton], intervalFormats.intervalFormatFallback);
                });
            };
            for (var calendar in formats) {
                _loop_2(calendar);
            }
            var minimizedLocale = new Intl.Locale(locale)
                .minimize()
                .toString();
            DateTimeFormat.localeData[locale] = DateTimeFormat.localeData[minimizedLocale] = processedData;
            DateTimeFormat.availableLocales.add(locale);
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
    Object.defineProperty(DateTimeFormat.prototype, 'format', formatDescriptor);
    DateTimeFormat.__defaultLocale = '';
    DateTimeFormat.localeData = {};
    DateTimeFormat.availableLocales = new Set();
    DateTimeFormat.getDefaultLocale = function () {
        return DateTimeFormat.__defaultLocale;
    };
    DateTimeFormat.polyfilled = true;
    DateTimeFormat.tzData = {};
    DateTimeFormat.__addTZData = function (d) {
        DateTimeFormat.tzData = unpack(d);
    };
    try {
        if (typeof Symbol !== 'undefined') {
            Object.defineProperty(DateTimeFormat.prototype, Symbol.toStringTag, {
                value: 'Intl.DateTimeFormat',
                writable: false,
                enumerable: false,
                configurable: true,
            });
        }
        Object.defineProperty(DateTimeFormat.prototype.constructor, 'length', {
            value: 1,
            writable: false,
            enumerable: false,
            configurable: true,
        });
    }
    catch (e) {
        // Meta fix so we're test262-compliant, not important
    }

    function supportsDateStyle() {
        return !!new Intl.DateTimeFormat(undefined, {
            dateStyle: 'short',
        }).resolvedOptions().dateStyle;
    }
    /**
     * https://bugs.chromium.org/p/chromium/issues/detail?id=865351
     */
    function hasChromeLt71Bug() {
        return (new Intl.DateTimeFormat('en', {
            hourCycle: 'h11',
            hour: 'numeric',
        }).formatToParts(0)[2].type !== 'dayPeriod');
    }
    /**
     * Node 14's version of Intl.DateTimeFormat does not throw
     * when dateStyle/timeStyle is used with other options.
     * This was fixed in newer V8 versions
     */
    function hasUnthrownDateTimeStyleBug() {
        try {
            return !!new Intl.DateTimeFormat('en', {
                dateStyle: 'short',
                hour: 'numeric',
            }).format(new Date(0));
        }
        catch (e) {
            return false;
        }
    }
    function shouldPolyfill() {
        return (!('DateTimeFormat' in Intl) ||
            !('formatToParts' in Intl.DateTimeFormat.prototype) ||
            !('formatRange' in Intl.DateTimeFormat.prototype) ||
            hasChromeLt71Bug() ||
            hasUnthrownDateTimeStyleBug() ||
            !supportsDateStyle());
    }

    // eslint-disable-next-line import/no-cycle
    /**
     * Number.prototype.toLocaleString ponyfill
     * https://tc39.es/ecma402/#sup-number.prototype.tolocalestring
     */
    function toLocaleString(x, locales, options) {
        var dtf = new DateTimeFormat(locales, options);
        return dtf.format(x);
    }
    function toLocaleDateString(x, locales, options) {
        var dtf = new DateTimeFormat(locales, ToDateTimeOptions(options, 'date', 'date'));
        return dtf.format(x);
    }
    function toLocaleTimeString(x, locales, options) {
        var dtf = new DateTimeFormat(locales, ToDateTimeOptions(options, 'time', 'time'));
        return dtf.format(x);
    }

    if (shouldPolyfill()) {
        defineProperty(Intl, 'DateTimeFormat', { value: DateTimeFormat });
        defineProperty(Date.prototype, 'toLocaleString', {
            value: function toLocaleString$1(locales, options) {
                return toLocaleString(this, locales, options);
            },
        });
        defineProperty(Date.prototype, 'toLocaleDateString', {
            value: function toLocaleDateString$1(locales, options) {
                return toLocaleDateString(this, locales, options);
            },
        });
        defineProperty(Date.prototype, 'toLocaleTimeString', {
            value: function toLocaleTimeString$1(locales, options) {
                return toLocaleTimeString(this, locales, options);
            },
        });
    }

})));

