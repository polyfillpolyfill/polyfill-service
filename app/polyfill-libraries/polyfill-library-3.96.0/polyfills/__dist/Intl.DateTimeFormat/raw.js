
// Intl.DateTimeFormat
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
    function partitionPattern(pattern) {
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
    var SHORTENED_SACTION_UNITS = SANCTIONED_UNITS.map(function (unit) {
        return unit.replace(/^(.*?)-/, '');
    });
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
    var links = { "Africa/Asmera": "Africa/Nairobi", "Africa/Timbuktu": "Africa/Abidjan", "America/Argentina/ComodRivadavia": "America/Argentina/Catamarca", "America/Atka": "America/Adak", "America/Buenos_Aires": "America/Argentina/Buenos_Aires", "America/Catamarca": "America/Argentina/Catamarca", "America/Coral_Harbour": "America/Atikokan", "America/Cordoba": "America/Argentina/Cordoba", "America/Ensenada": "America/Tijuana", "America/Fort_Wayne": "America/Indiana/Indianapolis", "America/Godthab": "America/Nuuk", "America/Indianapolis": "America/Indiana/Indianapolis", "America/Jujuy": "America/Argentina/Jujuy", "America/Knox_IN": "America/Indiana/Knox", "America/Louisville": "America/Kentucky/Louisville", "America/Mendoza": "America/Argentina/Mendoza", "America/Montreal": "America/Toronto", "America/Porto_Acre": "America/Rio_Branco", "America/Rosario": "America/Argentina/Cordoba", "America/Santa_Isabel": "America/Tijuana", "America/Shiprock": "America/Denver", "America/Virgin": "America/Port_of_Spain", "Antarctica/South_Pole": "Pacific/Auckland", "Asia/Ashkhabad": "Asia/Ashgabat", "Asia/Calcutta": "Asia/Kolkata", "Asia/Chongqing": "Asia/Shanghai", "Asia/Chungking": "Asia/Shanghai", "Asia/Dacca": "Asia/Dhaka", "Asia/Harbin": "Asia/Shanghai", "Asia/Kashgar": "Asia/Urumqi", "Asia/Katmandu": "Asia/Kathmandu", "Asia/Macao": "Asia/Macau", "Asia/Rangoon": "Asia/Yangon", "Asia/Saigon": "Asia/Ho_Chi_Minh", "Asia/Tel_Aviv": "Asia/Jerusalem", "Asia/Thimbu": "Asia/Thimphu", "Asia/Ujung_Pandang": "Asia/Makassar", "Asia/Ulan_Bator": "Asia/Ulaanbaatar", "Atlantic/Faeroe": "Atlantic/Faroe", "Atlantic/Jan_Mayen": "Europe/Oslo", "Australia/ACT": "Australia/Sydney", "Australia/Canberra": "Australia/Sydney", "Australia/LHI": "Australia/Lord_Howe", "Australia/NSW": "Australia/Sydney", "Australia/North": "Australia/Darwin", "Australia/Queensland": "Australia/Brisbane", "Australia/South": "Australia/Adelaide", "Australia/Tasmania": "Australia/Hobart", "Australia/Victoria": "Australia/Melbourne", "Australia/West": "Australia/Perth", "Australia/Yancowinna": "Australia/Broken_Hill", "Brazil/Acre": "America/Rio_Branco", "Brazil/DeNoronha": "America/Noronha", "Brazil/East": "America/Sao_Paulo", "Brazil/West": "America/Manaus", "Canada/Atlantic": "America/Halifax", "Canada/Central": "America/Winnipeg", "Canada/Eastern": "America/Toronto", "Canada/Mountain": "America/Edmonton", "Canada/Newfoundland": "America/St_Johns", "Canada/Pacific": "America/Vancouver", "Canada/Saskatchewan": "America/Regina", "Canada/Yukon": "America/Whitehorse", "Chile/Continental": "America/Santiago", "Chile/EasterIsland": "Pacific/Easter", "Cuba": "America/Havana", "Egypt": "Africa/Cairo", "Eire": "Europe/Dublin", "Etc/UCT": "Etc/UTC", "Europe/Belfast": "Europe/London", "Europe/Tiraspol": "Europe/Chisinau", "GB": "Europe/London", "GB-Eire": "Europe/London", "GMT+0": "Etc/GMT", "GMT-0": "Etc/GMT", "GMT0": "Etc/GMT", "Greenwich": "Etc/GMT", "Hongkong": "Asia/Hong_Kong", "Iceland": "Atlantic/Reykjavik", "Iran": "Asia/Tehran", "Israel": "Asia/Jerusalem", "Jamaica": "America/Jamaica", "Japan": "Asia/Tokyo", "Kwajalein": "Pacific/Kwajalein", "Libya": "Africa/Tripoli", "Mexico/BajaNorte": "America/Tijuana", "Mexico/BajaSur": "America/Mazatlan", "Mexico/General": "America/Mexico_City", "NZ": "Pacific/Auckland", "NZ-CHAT": "Pacific/Chatham", "Navajo": "America/Denver", "PRC": "Asia/Shanghai", "Pacific/Johnston": "Pacific/Honolulu", "Pacific/Ponape": "Pacific/Pohnpei", "Pacific/Samoa": "Pacific/Pago_Pago", "Pacific/Truk": "Pacific/Chuuk", "Pacific/Yap": "Pacific/Chuuk", "Poland": "Europe/Warsaw", "Portugal": "Europe/Lisbon", "ROC": "Asia/Taipei", "ROK": "Asia/Seoul", "Singapore": "Asia/Singapore", "Turkey": "Europe/Istanbul", "UCT": "Etc/UTC", "US/Alaska": "America/Anchorage", "US/Aleutian": "America/Adak", "US/Arizona": "America/Phoenix", "US/Central": "America/Chicago", "US/East-Indiana": "America/Indiana/Indianapolis", "US/Eastern": "America/New_York", "US/Hawaii": "Pacific/Honolulu", "US/Indiana-Starke": "America/Indiana/Knox", "US/Michigan": "America/Detroit", "US/Mountain": "America/Denver", "US/Pacific": "America/Los_Angeles", "US/Samoa": "Pacific/Pago_Pago", "UTC": "Etc/UTC", "Universal": "Etc/UTC", "W-SU": "Europe/Moscow", "Zulu": "Etc/UTC" };

    var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
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

    /**
     * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     * Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
     * with some tweaks
     */
    var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
    // trim patterns after transformations
    var expPatternTrimmer = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    /**
     * Parse Date time skeleton into Intl.DateTimeFormatOptions
     * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     * @public
     * @param skeleton skeleton string
     */
    function parseDateTimeSkeleton(skeleton) {
        var result = {
            pattern: '',
            pattern12: '',
            skeleton: skeleton,
        };
        var literals = [];
        result.pattern12 = skeleton
            // Double apostrophe
            .replace(/'{2}/g, '{apostrophe}')
            // Apostrophe-escaped
            .replace(/'(.*?)'/g, function (_, literal) {
            literals.push(literal);
            return "$$" + (literals.length - 1) + "$$";
        })
            .replace(DATE_TIME_REGEX, function (match) {
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
                    return '{quarter}';
                // Month
                case 'M':
                case 'L':
                    result.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1];
                    return '{month}';
                // Week
                case 'w':
                case 'W':
                    return '{weekday}';
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
                    return '{hour}';
                case 'H':
                    result.hour = ['numeric', '2-digit'][len - 1];
                    return '{hour}';
                case 'K':
                    result.hour = ['numeric', '2-digit'][len - 1];
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
        });
        //Restore literals
        if (literals.length) {
            result.pattern12 = result.pattern12
                .replace(/\$\$(\d+)\$\$/g, function (_, i) {
                return literals[+i];
            })
                .replace(/\{apostrophe\}/g, "'");
        }
        // Handle apostrophe-escaped things
        result.pattern = result.pattern12
            .replace(/([\s\uFEFF\xA0])\{ampm\}([\s\uFEFF\xA0])/, '$1')
            .replace('{ampm}', '')
            .replace(expPatternTrimmer, '');
        return result;
    }

    var __assign$1 = (undefined && undefined.__assign) || function () {
        __assign$1 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };
    var __rest = (undefined && undefined.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    var UPPERCASED_LINKS = Object.keys(links).reduce(function (all, l) {
        all[l.toUpperCase()] = links[l];
        return all;
    }, {});
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
    var RESOLVED_OPTIONS_KEYS = [
        'locale',
        'calendar',
        'numberingSystem',
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
    var TYPE_REGEX = /^[a-z0-9]{3,8}$/i;
    /**
     * https://tc39.es/ecma402/#sec-isvalidtimezonename
     * @param tz
     */
    function isValidTimeZoneName(tz) {
        var uppercasedTz = tz.toUpperCase();
        var zoneNames = new Set(Object.keys(DateTimeFormat.tzData).map(function (z) { return z.toUpperCase(); }));
        return zoneNames.has(uppercasedTz) || uppercasedTz in UPPERCASED_LINKS;
    }
    /**
     * https://tc39.es/ecma402/#sec-canonicalizetimezonename
     * @param tz
     */
    function canonicalizeTimeZoneName(tz) {
        var uppercasedTz = tz.toUpperCase();
        var uppercasedZones = Object.keys(DateTimeFormat.tzData).reduce(function (all, z) {
            all[z.toUpperCase()] = z;
            return all;
        }, {});
        var ianaTimeZone = UPPERCASED_LINKS[uppercasedTz] || uppercasedZones[uppercasedTz];
        if (ianaTimeZone === 'Etc/UTC' || ianaTimeZone === 'Etc/GMT') {
            return 'UTC';
        }
        return ianaTimeZone;
    }
    /**
     * https://tc39.es/ecma262/#sec-tonumber
     * @param val
     */
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
    /**
     * https://tc39.es/ecma262/#sec-tointeger
     * @param n
     */
    function toInteger(n) {
        var number = toNumber(n);
        if (isNaN(number) || objectIs(number, -0)) {
            return 0;
        }
        if (isFinite(number)) {
            return number;
        }
        var integer = Math.floor(Math.abs(number));
        if (number < 0) {
            integer = -integer;
        }
        if (objectIs(integer, -0)) {
            return 0;
        }
        return integer;
    }
    /**
     * https://tc39.es/ecma262/#sec-timeclip
     * @param time
     */
    function timeClip(time) {
        if (!isFinite(time)) {
            return NaN;
        }
        if (Math.abs(time) > 8.64 * 1e16) {
            return NaN;
        }
        return toInteger(time);
    }
    /**
     * https://tc39.es/ecma402/#sec-initializedatetimeformat
     * @param dtf DateTimeFormat
     * @param locales locales
     * @param opts options
     */
    function initializeDateTimeFormat(dtf, locales, opts) {
        // @ts-ignore
        var requestedLocales = Intl.getCanonicalLocales(locales);
        var options = toDateTimeOptions(opts, 'any', 'date');
        var opt = Object.create(null);
        var matcher = getOption(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
        opt.localeMatcher = matcher;
        var calendar = getOption(options, 'calendar', 'string', undefined, undefined);
        if (calendar !== undefined && !TYPE_REGEX.test(calendar)) {
            throw new RangeError('Malformed calendar');
        }
        var internalSlots = getInternalSlots(dtf);
        opt.ca = calendar;
        var numberingSystem = getOption(options, 'numberingSystem', 'string', undefined, undefined);
        if (numberingSystem !== undefined && !TYPE_REGEX.test(numberingSystem)) {
            throw new RangeError('Malformed numbering system');
        }
        opt.nu = numberingSystem;
        var hour12 = getOption(options, 'hour12', 'boolean', undefined, undefined);
        var hourCycle = getOption(options, 'hourCycle', 'string', ['h11', 'h12', 'h23', 'h24'], undefined);
        if (hour12 !== undefined) {
            // @ts-ignore
            hourCycle = null;
        }
        opt.hc = hourCycle;
        var r = createResolveLocale(DateTimeFormat.getDefaultLocale)(DateTimeFormat.availableLocales, requestedLocales, 
        // TODO: Fix the type
        opt, 
        // [[RelevantExtensionKeys]] slot, which is a constant
        ['nu', 'ca', 'hc'], DateTimeFormat.localeData);
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
            if (!isValidTimeZoneName(timeZone)) {
                throw new RangeError('Invalid timeZoneName');
            }
            timeZone = canonicalizeTimeZoneName(timeZone);
        }
        else {
            timeZone = DateTimeFormat.__defaultLocale;
        }
        internalSlots.timeZone = timeZone;
        opt = Object.create(null);
        opt.weekday = getOption(options, 'weekday', 'string', ['narrow', 'short', 'long'], undefined);
        opt.era = getOption(options, 'era', 'string', ['narrow', 'short', 'long'], undefined);
        opt.year = getOption(options, 'year', 'string', ['2-digit', 'numeric'], undefined);
        opt.month = getOption(options, 'month', 'string', ['2-digit', 'numeric', 'narrow', 'short', 'long'], undefined);
        opt.day = getOption(options, 'day', 'string', ['2-digit', 'numeric'], undefined);
        opt.hour = getOption(options, 'hour', 'string', ['2-digit', 'numeric'], undefined);
        opt.minute = getOption(options, 'minute', 'string', ['2-digit', 'numeric'], undefined);
        opt.second = getOption(options, 'second', 'string', ['2-digit', 'numeric'], undefined);
        opt.timeZoneName = getOption(options, 'timeZoneName', 'string', ['short', 'long'], undefined);
        var dataLocaleData = DateTimeFormat.localeData[dataLocale];
        var formats = dataLocaleData.formats[calendar];
        matcher = getOption(options, 'formatMatcher', 'string', ['basic', 'best fit'], 'best fit');
        var bestFormat;
        if (matcher === 'basic') {
            bestFormat = basicFormatMatcher(opt, formats);
        }
        else {
            opt.hour12 =
                internalSlots.hourCycle === 'h11' || internalSlots.hourCycle === 'h12';
            bestFormat = bestFitFormatMatcher(opt, formats);
        }
        for (var prop in opt) {
            var p = bestFormat[prop];
            if (p !== undefined) {
                internalSlots[prop] = p;
            }
        }
        var pattern;
        if (internalSlots.hour !== undefined) {
            var hcDefault = dataLocaleData.hourCycle;
            var hc = internalSlots.hourCycle;
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
            internalSlots.hourCycle = hc;
            if (hc === 'h11' || hc === 'h12') {
                pattern = bestFormat.pattern12;
            }
            else {
                pattern = bestFormat.pattern;
            }
        }
        else {
            // @ts-ignore
            internalSlots.hourCycle = undefined;
            pattern = bestFormat.pattern;
        }
        internalSlots.pattern = pattern;
        return dtf;
    }
    /**
     * https://tc39.es/ecma402/#sec-todatetimeoptions
     * @param options
     * @param required
     * @param defaults
     */
    function toDateTimeOptions(options, required, defaults) {
        if (options === undefined) {
            options = null;
        }
        else {
            options = toObject(options);
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
    var BASIC_FORMAT_MATCHER_VALUES = [
        '2-digit',
        'numeric',
        'narrow',
        'short',
        'long',
    ];
    var removalPenalty = 120;
    var additionPenalty = 20;
    var longLessPenalty = 8;
    var longMorePenalty = 6;
    var shortLessPenalty = 6;
    var shortMorePenalty = 3;
    function basicFormatMatcherScore(options, format) {
        var score = 0;
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
                var optionsPropIndex = BASIC_FORMAT_MATCHER_VALUES.indexOf(optionsProp);
                var formatPropIndex = BASIC_FORMAT_MATCHER_VALUES.indexOf(formatProp);
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
        return score;
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
        for (var _i = 0, DATE_TIME_PROPS_2 = DATE_TIME_PROPS; _i < DATE_TIME_PROPS_2.length; _i++) {
            var prop = DATE_TIME_PROPS_2[_i];
            var optionsProp = options[prop];
            var formatProp = format[prop];
            if (optionsProp === undefined && formatProp !== undefined) {
                score -= additionPenalty;
            }
            else if (optionsProp !== undefined && formatProp === undefined) {
                score -= removalPenalty;
            }
            else if (optionsProp !== formatProp) {
                var optionsPropIndex = BASIC_FORMAT_MATCHER_VALUES.indexOf(optionsProp);
                var formatPropIndex = BASIC_FORMAT_MATCHER_VALUES.indexOf(formatProp);
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
        return score;
    }
    /**
     * https://tc39.es/ecma402/#sec-basicformatmatcher
     * @param options
     * @param formats
     */
    function basicFormatMatcher(options, formats) {
        var bestScore = -Infinity;
        var bestFormat = formats[0];
        invariant(Array.isArray(formats), 'formats should be a list of things');
        for (var _i = 0, formats_1 = formats; _i < formats_1.length; _i++) {
            var format = formats_1[_i];
            var score = basicFormatMatcherScore(options, format);
            if (score > bestScore) {
                bestScore = score;
                bestFormat = format;
            }
        }
        return __assign$1({}, bestFormat);
    }
    function isNumericType(t) {
        return t === 'numeric' || t === '2-digit';
    }
    /**
     * https://tc39.es/ecma402/#sec-bestfitformatmatcher
     * Just alias to basic for now
     * @param options
     * @param formats
     */
    function bestFitFormatMatcher(options, formats) {
        var bestScore = -Infinity;
        var bestFormat = formats[0];
        invariant(Array.isArray(formats), 'formats should be a list of things');
        for (var _i = 0, formats_2 = formats; _i < formats_2.length; _i++) {
            var format = formats_2[_i];
            var score = bestFitFormatMatcherScore(options, format);
            if (score > bestScore) {
                bestScore = score;
                bestFormat = format;
            }
        }
        bestFormat = __assign$1({}, bestFormat);
        // Kinda following https://github.com/unicode-org/icu/blob/dd50e38f459d84e9bf1b0c618be8483d318458ad/icu4j/main/classes/core/src/com/ibm/icu/text/DateTimePatternGenerator.java
        for (var prop in bestFormat) {
            var bestValue = bestFormat[prop];
            var inputValue = options[prop];
            // Don't mess with minute/second or we can get in the situation of
            // 7:0:0 which is weird
            if (prop === 'minute' || prop === 'second') {
                continue;
            }
            // Nothing to do here
            if (!inputValue) {
                continue;
            }
            // https://unicode.org/reports/tr35/tr35-dates.html#Matching_Skeletons
            // Looks like we should not convert numeric to alphabetic but the other way
            // around is ok
            if (isNumericType(bestValue) &&
                !isNumericType(inputValue)) {
                continue;
            }
            // Otherwise use the input value
            bestFormat[prop] = inputValue;
        }
        return bestFormat;
    }
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
                    return formatDateTime(dtf, x);
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
    function partitionDateTimePattern(dtf, x) {
        x = timeClip(x);
        if (isNaN(x)) {
            throw new RangeError('invalid time');
        }
        /** IMPL START */
        var internalSlots = getInternalSlots(dtf);
        var dataLocale = internalSlots.dataLocale;
        var dataLocaleData = DateTimeFormat.localeData[dataLocale];
        /** IMPL END */
        var locale = internalSlots.locale;
        var nfOptions = Object.create(null);
        nfOptions.useGrouping = false;
        var nf = new Intl.NumberFormat(locale, nfOptions);
        var nf2Options = Object.create(null);
        nf2Options.minimumIntegerDigits = 2;
        nf2Options.useGrouping = false;
        var nf2 = new Intl.NumberFormat(locale, nf2Options);
        var tm = toLocalTime(x, 
        // @ts-ignore
        internalSlots.calendar, internalSlots.timeZone);
        var result = [];
        var patternParts = partitionPattern(internalSlots.pattern);
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
                        var timeZone = internalSlots.timeZone || DateTimeFormat.__defaultTimeZone;
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
                if (v >= 11) {
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
                    type: 'relatedYear',
                    value: fv,
                });
            }
            else if (p === 'yearName') {
                var v = tm.yearName;
                // @ts-ignore
                var fv = nf.format(v);
                result.push({
                    type: 'yearName',
                    value: fv,
                });
            }
            else {
                result.push({
                    type: 'unknown',
                    value: x,
                });
            }
        }
        return result;
    }
    /**
     * https://tc39.es/ecma402/#sec-formatdatetime
     * @param dtf DateTimeFormat
     * @param x
     */
    function formatDateTime(dtf, x) {
        var parts = partitionDateTimePattern(dtf, x);
        var result = '';
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            result += part.value;
        }
        return result;
    }
    /**
     * https://tc39.es/ecma402/#sec-formatdatetimetoparts
     * @param dtf DateTimeFormat
     * @param x
     */
    function formatDateTimeParts(dtf, x) {
        return partitionDateTimePattern(dtf, x);
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
    function day(t) {
        return Math.floor(t / MS_PER_DAY);
    }
    /**
     * https://tc39.es/ecma262/#sec-week-day
     * @param t
     */
    function weekDay(t) {
        return mod(day(t) + 4, 7);
    }
    function dayFromYear(y) {
        return (365 * (y - 1970) +
            Math.floor((y - 1969) / 4) -
            Math.floor((y - 1901) / 100) +
            Math.floor((y - 1601) / 400));
    }
    function timeFromYear(y) {
        return MS_PER_DAY * dayFromYear(y);
    }
    function yearFromTime(t) {
        var min = Math.ceil(t / MS_PER_DAY / 366);
        var y = min;
        while (timeFromYear(y) <= t) {
            y++;
        }
        return y - 1;
    }
    function daysInYear(y) {
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
    function dayWithinYear(t) {
        return day(t) - dayFromYear(yearFromTime(t));
    }
    function inLeapYear(t) {
        return daysInYear(yearFromTime(t)) === 365 ? 0 : 1;
    }
    function monthFromTime(t) {
        var dwy = dayWithinYear(t);
        var leap = inLeapYear(t);
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
    function dateFromTime(t) {
        var dwy = dayWithinYear(t);
        var mft = monthFromTime(t);
        var leap = inLeapYear(t);
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
    function hourFromTime(t) {
        return mod(Math.floor(t / MS_PER_HOUR), HOURS_PER_DAY);
    }
    function minFromTime(t) {
        return mod(Math.floor(t / MS_PER_MINUTE), MINUTES_PER_HOUR);
    }
    function secFromTime(t) {
        return mod(Math.floor(t / MS_PER_SECOND), SECONDS_PER_MINUTE);
    }
    function getApplicableZoneData(t, timeZone) {
        var tzData = DateTimeFormat.tzData;
        var zoneData = tzData[timeZone];
        // We don't have data for this so just say it's UTC
        if (!zoneData) {
            return [0, false];
        }
        for (var i = 0; i < zoneData.length; i++) {
            if (zoneData[i][0] * 1e3 >= t) {
                var _a = zoneData[i - 1], offset = _a[2], dst = _a[3];
                return [offset * 1e3, dst];
            }
        }
        return [0, false];
    }
    function toLocalTime(t, calendar, timeZone) {
        invariant(typeof t === 'number', 'invalid time');
        invariant(calendar === 'gregory', 'We only support Gregory calendar right now');
        var _a = getApplicableZoneData(t, timeZone), timeZoneOffset = _a[0], inDST = _a[1];
        var tz = t + timeZoneOffset;
        var year = yearFromTime(tz);
        return {
            weekday: weekDay(tz),
            era: year < 0 ? 'BC' : 'AD',
            year: year,
            relatedYear: undefined,
            yearName: undefined,
            month: monthFromTime(tz),
            day: dateFromTime(tz),
            hour: hourFromTime(tz),
            minute: minFromTime(tz),
            second: secFromTime(tz),
            inDST: inDST,
            // IMPORTANT: Not in spec
            timeZoneOffset: timeZoneOffset,
        };
    }
    var DateTimeFormat = function (locales, options) {
        // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
        if (!this || !(this instanceof DateTimeFormat)) {
            return new DateTimeFormat(locales, options);
        }
        initializeDateTimeFormat(this, locales, options);
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
            return supportedLocales(DateTimeFormat.availableLocales, Intl.getCanonicalLocales(locales), options);
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
                    ro.hour12 =
                        value === 'h11' || value === 'h12'
                            ? true
                            : value === 'h23' || value === 'h24'
                                ? false
                                : undefined;
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
                date = toNumber(date);
            }
            return formatDateTimeParts(this, date);
        },
    });
    DateTimeFormat.__defaultTimeZone = 'UTC';
    DateTimeFormat.__addLocaleData = function __addLocaleData() {
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
                    var _c = unpackData(locale, datum), formats = _c.formats, rawData = __rest(_c, ["formats"]);
                    var processedData = __assign$1(__assign$1({}, rawData), { formats: {} });
                    for (var calendar in formats) {
                        processedData.formats[calendar] = formats[calendar].map(parseDateTimeSkeleton);
                    }
                    DateTimeFormat.localeData[locale] = processedData;
                }
                catch (e) {
                    // Ignore if we got no data
                }
            }
        }
        DateTimeFormat.availableLocales = Object.keys(DateTimeFormat.localeData);
        if (!DateTimeFormat.__defaultLocale) {
            DateTimeFormat.__defaultLocale = DateTimeFormat.availableLocales[0];
        }
    };
    Object.defineProperty(DateTimeFormat.prototype, 'format', formatDescriptor);
    DateTimeFormat.__defaultLocale = '';
    DateTimeFormat.localeData = {};
    DateTimeFormat.availableLocales = [];
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

    // eslint-disable-next-line import/no-cycle
    /**
     * Number.prototype.toLocaleString ponyfill
     * https://tc39.es/ecma402/#sup-number.prototype.tolocalestring
     */
    function toLocaleString(x, locales, options) {
        var dtf = new DateTimeFormat(locales, options);
        return dtf.format(x);
    }
    function toLocaleTimeString(x, locales, options) {
        var dtf = new DateTimeFormat(locales, toDateTimeOptions(options, 'time', 'time'));
        return dtf.format(x);
    }

    // function supportsDateStyle() {
    //   return !!(new Intl.DateTimeFormat(undefined, {
    //     dateStyle: 'short',
    //   } as any).resolvedOptions() as any).dateStyle;
    // }
    /**
     * https://bugs.chromium.org/p/chromium/issues/detail?id=865351
     */
    function hasChromeLt71Bug() {
        return (new Intl.DateTimeFormat('en', {
            hourCycle: 'h11',
            hour: 'numeric',
        }).formatToParts(0)[2].type !== 'dayPeriod');
    }
    if (!('DateTimeFormat' in Intl) ||
        !('formatToParts' in Intl.DateTimeFormat.prototype) ||
        hasChromeLt71Bug()
    // !supportsDateStyle()
    ) {
        defineProperty(Intl, 'DateTimeFormat', { value: DateTimeFormat });
        defineProperty(Date.prototype, 'toLocaleString', {
            value: function toLocaleString$1(locales, options) {
                return toLocaleString(this, locales, options);
            },
        });
        // defineProperty(Date.prototype, 'toLocaleDateString', {
        //   value: function toLocaleDateString(
        //     locales?: string | string[],
        //     options?: DateTimeFormatOptions
        //   ) {
        //     return _toLocaleDateString(this, locales, options);
        //   },
        // });
        defineProperty(Date.prototype, 'toLocaleTimeString', {
            value: function toLocaleTimeString$1(locales, options) {
                return toLocaleTimeString(this, locales, options);
            },
        });
    }

})));

