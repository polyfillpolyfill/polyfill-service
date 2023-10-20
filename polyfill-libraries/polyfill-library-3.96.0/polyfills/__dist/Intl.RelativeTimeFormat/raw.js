
// Intl.RelativeTimeFormat
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
    function setInternalSlot(map, pl, field, value) {
        if (!map.get(pl)) {
            map.set(pl, Object.create(null));
        }
        var slots = map.get(pl);
        slots[field] = value;
    }
    function getInternalSlot(map, pl, field) {
        return getMultiInternalSlots(map, pl, field)[field];
    }
    function getMultiInternalSlots(map, pl) {
        var fields = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            fields[_i - 2] = arguments[_i];
        }
        var slots = map.get(pl);
        if (!slots) {
            throw new TypeError(pl + " InternalSlot has not been initialized");
        }
        return fields.reduce(function (all, f) {
            all[f] = slots[f];
            return all;
        }, Object.create(null));
    }
    function isLiteralPart(patternPart) {
        return patternPart.type === 'literal';
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
    var SHORTENED_SACTION_UNITS = SANCTIONED_UNITS.map(function (unit) {
        return unit.replace(/^(.*?)-/, '');
    });

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
    function isMissingLocaleDataError(e) {
        return e.type === 'MISSING_LOCALE_DATA';
    }
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

    var __values = (undefined && undefined.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    /**
     * https://tc39.es/proposal-intl-relative-time/#sec-singularrelativetimeunit
     * @param unit
     */
    function singularRelativeTimeUnit(unit) {
        invariant(typeof unit === 'string', "unit must be a string, instead got " + typeof unit, TypeError);
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
            throw new RangeError("Invalid unit " + unit);
        }
        return unit;
    }
    var NUMBERING_SYSTEM_REGEX = /^[a-z0-9]{3,8}(-[a-z0-9]{3,8})*$/i;
    /**
     * https://tc39.es/proposal-intl-relative-time/#sec-makepartslist
     * @param pattern
     * @param unit
     * @param parts
     */
    function makePartsList(pattern, unit, parts) {
        var e_1, _a, e_2, _b;
        var patternParts = partitionPattern(pattern);
        var result = [];
        try {
            for (var patternParts_1 = __values(patternParts), patternParts_1_1 = patternParts_1.next(); !patternParts_1_1.done; patternParts_1_1 = patternParts_1.next()) {
                var patternPart = patternParts_1_1.value;
                if (isLiteralPart(patternPart)) {
                    result.push({
                        type: 'literal',
                        value: patternPart.value,
                    });
                }
                else {
                    invariant(patternPart.type === '0', "Malformed pattern " + pattern);
                    try {
                        for (var parts_1 = (e_2 = void 0, __values(parts)), parts_1_1 = parts_1.next(); !parts_1_1.done; parts_1_1 = parts_1.next()) {
                            var part = parts_1_1.value;
                            result.push({
                                type: part.type,
                                value: part.value,
                                unit: unit,
                            });
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (parts_1_1 && !parts_1_1.done && (_b = parts_1.return)) _b.call(parts_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (patternParts_1_1 && !patternParts_1_1.done && (_a = patternParts_1.return)) _a.call(patternParts_1);
            }
            finally { if (e_1) throw e_1.error; }
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
    function toString$1(arg) {
        return arg + '';
    }
    /**
     * PartitionRelativeTimePattern
     * @param rtf
     * @param value
     * @param unit
     */
    function partitionRelativeTimePattern(internalSlotMap, rtf, value, unit) {
        invariant(typeof value === 'number', "value must be number, instead got " + typeof value, TypeError);
        invariant(typeof unit === 'string', "unit must be number, instead got " + typeof value, TypeError);
        if (isNaN(value) || value === Infinity || value === -Infinity) {
            throw new RangeError("Invalid value " + value);
        }
        var resolvedUnit = singularRelativeTimeUnit(unit);
        var fields = getInternalSlot(internalSlotMap, rtf, 'fields');
        var style = getInternalSlot(internalSlotMap, rtf, 'style');
        var entry = resolvedUnit;
        if (style === 'short') {
            entry = unit + "-short";
        }
        else if (style === 'narrow') {
            entry = unit + "-narrow";
        }
        if (!(entry in fields)) {
            entry = unit;
        }
        var patterns = fields[entry];
        var numeric = getInternalSlot(internalSlotMap, rtf, 'numeric');
        if (numeric === 'auto') {
            if (toString$1(value) in patterns) {
                return [
                    {
                        type: 'literal',
                        value: patterns[toString$1(value)],
                    },
                ];
            }
        }
        var tl = 'future';
        if (objectIs(value, -0) || value < 0) {
            tl = 'past';
        }
        var po = patterns[tl];
        var pluralRules = getInternalSlot(internalSlotMap, rtf, 'pluralRules');
        var numberFormat = getInternalSlot(internalSlotMap, rtf, 'numberFormat');
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
        return makePartsList(pattern, resolvedUnit, fv);
    }
    var RelativeTimeFormat = /** @class */ (function () {
        function RelativeTimeFormat(locales, options) {
            // test262/test/intl402/RelativeTimeFormat/constructor/constructor/newtarget-undefined.js
            // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
            var newTarget = this && this instanceof RelativeTimeFormat ? this.constructor : void 0;
            if (!newTarget) {
                throw new TypeError("Intl.RelativeTimeFormat must be called with 'new'");
            }
            setInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'initializedRelativeTimeFormat', true);
            var requestedLocales = Intl
                .getCanonicalLocales(locales);
            var opt = Object.create(null);
            var opts = options === undefined ? Object.create(null) : toObject(options);
            var matcher = getOption(opts, 'localeMatcher', 'string', ['best fit', 'lookup'], 'best fit');
            opt.localeMatcher = matcher;
            var numberingSystem = getOption(opts, 'numberingSystem', 'string', undefined, undefined);
            if (numberingSystem !== undefined) {
                if (!NUMBERING_SYSTEM_REGEX.test(numberingSystem)) {
                    throw new RangeError("Invalid numbering system " + numberingSystem);
                }
            }
            opt.nu = numberingSystem;
            var r = createResolveLocale(RelativeTimeFormat.getDefaultLocale)(RelativeTimeFormat.availableLocales, requestedLocales, opt, RelativeTimeFormat.relevantExtensionKeys, RelativeTimeFormat.localeData);
            var locale = r.locale, nu = r.nu;
            setInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'locale', locale);
            setInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'style', getOption(opts, 'style', 'string', ['long', 'narrow', 'short'], 'long'));
            setInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'numeric', getOption(opts, 'numeric', 'string', ['always', 'auto'], 'always'));
            setInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'fields', RelativeTimeFormat.localeData[locale]);
            setInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'numberFormat', new Intl.NumberFormat(locales));
            setInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'pluralRules', new Intl.PluralRules(locales));
            setInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'numberingSystem', nu);
        }
        RelativeTimeFormat.prototype.format = function (value, unit) {
            if (typeof this !== 'object') {
                throw new TypeError('format was called on a non-object');
            }
            if (!getInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'initializedRelativeTimeFormat')) {
                throw new TypeError('format was called on a invalid context');
            }
            return partitionRelativeTimePattern(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, Number(value), toString$1(unit))
                .map(function (el) { return el.value; })
                .join('');
        };
        RelativeTimeFormat.prototype.formatToParts = function (value, unit) {
            if (typeof this !== 'object') {
                throw new TypeError('formatToParts was called on a non-object');
            }
            if (!getInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'initializedRelativeTimeFormat')) {
                throw new TypeError('formatToParts was called on a invalid context');
            }
            return partitionRelativeTimePattern(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, Number(value), toString$1(unit));
        };
        RelativeTimeFormat.prototype.resolvedOptions = function () {
            if (typeof this !== 'object') {
                throw new TypeError('resolvedOptions was called on a non-object');
            }
            if (!getInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'initializedRelativeTimeFormat')) {
                throw new TypeError('resolvedOptions was called on a invalid context');
            }
            // test262/test/intl402/RelativeTimeFormat/prototype/resolvedOptions/type.js
            return {
                locale: getInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'locale'),
                style: getInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'style'),
                numeric: getInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'numeric'),
                numberingSystem: getInternalSlot(RelativeTimeFormat.__INTERNAL_SLOT_MAP__, this, 'numberingSystem'),
            };
        };
        RelativeTimeFormat.supportedLocalesOf = function (locales, options) {
            return supportedLocales(RelativeTimeFormat.availableLocales, Intl.getCanonicalLocales(locales), options);
        };
        RelativeTimeFormat.__addLocaleData = function () {
            var e_3, _a;
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            var _loop_1 = function (datum) {
                var availableLocales = datum.availableLocales;
                availableLocales.forEach(function (locale) {
                    try {
                        RelativeTimeFormat.localeData[locale] = unpackData(locale, datum);
                    }
                    catch (e) {
                        if (isMissingLocaleDataError(e)) {
                            // If we just don't have data for certain locale, that's ok
                            return;
                        }
                        throw e;
                    }
                });
            };
            try {
                for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                    var datum = data_1_1.value;
                    _loop_1(datum);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            RelativeTimeFormat.availableLocales = Object.keys(RelativeTimeFormat.localeData);
            if (!RelativeTimeFormat.__defaultLocale) {
                RelativeTimeFormat.__defaultLocale =
                    RelativeTimeFormat.availableLocales[0];
            }
        };
        RelativeTimeFormat.getDefaultLocale = function () {
            return RelativeTimeFormat.__defaultLocale;
        };
        RelativeTimeFormat.localeData = {};
        RelativeTimeFormat.availableLocales = [];
        RelativeTimeFormat.__defaultLocale = 'en';
        RelativeTimeFormat.relevantExtensionKeys = ['nu'];
        RelativeTimeFormat.polyfilled = true;
        RelativeTimeFormat.__INTERNAL_SLOT_MAP__ = new WeakMap();
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

    if (!('RelativeTimeFormat' in Intl)) {
        Object.defineProperty(Intl, 'RelativeTimeFormat', {
            value: RelativeTimeFormat,
            writable: true,
            enumerable: false,
            configurable: true,
        });
    }

})));

