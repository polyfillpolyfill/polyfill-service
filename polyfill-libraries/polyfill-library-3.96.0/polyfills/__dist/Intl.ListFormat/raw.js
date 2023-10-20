
// Intl.ListFormat
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
    function validateInstance(instance, method) {
        if (!(instance instanceof ListFormat)) {
            throw new TypeError("Method Intl.ListFormat.prototype." + method + " called on incompatible receiver " + String(instance));
        }
    }
    /**
     * https://tc39.es/proposal-intl-list-format/#sec-createstringlistfromiterable
     * @param list list
     */
    function stringListFromIterable(list) {
        if (list === undefined) {
            return [];
        }
        var result = [];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var el = list_1[_i];
            if (typeof el !== 'string') {
                throw new TypeError("array list[" + list.indexOf(el) + "] is not type String");
            }
            result.push(el);
        }
        return result;
    }
    function createPartsFromList(internalSlotMap, lf, list) {
        var size = list.length;
        if (size === 0) {
            return [];
        }
        if (size === 2) {
            var pattern = getInternalSlot(internalSlotMap, lf, 'templatePair');
            var first = { type: 'element', value: list[0] };
            var second = { type: 'element', value: list[1] };
            return deconstructPattern(pattern, { '0': first, '1': second });
        }
        var last = {
            type: 'element',
            value: list[size - 1],
        };
        var parts = last;
        var i = size - 2;
        while (i >= 0) {
            var pattern = void 0;
            if (i === 0) {
                pattern = getInternalSlot(internalSlotMap, lf, 'templateStart');
            }
            else if (i < size - 2) {
                pattern = getInternalSlot(internalSlotMap, lf, 'templateMiddle');
            }
            else {
                pattern = getInternalSlot(internalSlotMap, lf, 'templateEnd');
            }
            var head = { type: 'element', value: list[i] };
            parts = deconstructPattern(pattern, { '0': head, '1': parts });
            i--;
        }
        return parts;
    }
    function deconstructPattern(pattern, placeables) {
        var patternParts = partitionPattern(pattern);
        var result = [];
        for (var _i = 0, patternParts_1 = patternParts; _i < patternParts_1.length; _i++) {
            var patternPart = patternParts_1[_i];
            var part = patternPart.type;
            if (isLiteralPart(patternPart)) {
                result.push({
                    type: 'literal',
                    value: patternPart.value,
                });
            }
            else {
                invariant(part in placeables, part + " is missing from placables");
                var subst = placeables[part];
                if (Array.isArray(subst)) {
                    result.push.apply(result, subst);
                }
                else {
                    result.push(subst);
                }
            }
        }
        return result;
    }
    var ListFormat = /** @class */ (function () {
        function ListFormat(locales, options) {
            // test262/test/intl402/ListFormat/constructor/constructor/newtarget-undefined.js
            // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
            var newTarget = this && this instanceof ListFormat ? this.constructor : void 0;
            if (!newTarget) {
                throw new TypeError("Intl.ListFormat must be called with 'new'");
            }
            setInternalSlot(ListFormat.__INTERNAL_SLOT_MAP__, this, 'initializedListFormat', true);
            var requestedLocales = Intl
                .getCanonicalLocales(locales);
            var opt = Object.create(null);
            var opts = options === undefined ? Object.create(null) : toObject(options);
            var matcher = getOption(opts, 'localeMatcher', 'string', ['best fit', 'lookup'], 'best fit');
            opt.localeMatcher = matcher;
            var localeData = ListFormat.localeData;
            var r = createResolveLocale(ListFormat.getDefaultLocale)(ListFormat.availableLocales, requestedLocales, opt, ListFormat.relevantExtensionKeys, localeData);
            setInternalSlot(ListFormat.__INTERNAL_SLOT_MAP__, this, 'locale', r.locale);
            var type = getOption(opts, 'type', 'string', ['conjunction', 'disjunction', 'unit'], 'conjunction');
            setInternalSlot(ListFormat.__INTERNAL_SLOT_MAP__, this, 'type', type);
            var style = getOption(opts, 'style', 'string', ['long', 'short', 'narrow'], 'long');
            setInternalSlot(ListFormat.__INTERNAL_SLOT_MAP__, this, 'style', style);
            var dataLocale = r.dataLocale;
            var dataLocaleData = localeData[dataLocale];
            var dataLocaleTypes = dataLocaleData[type];
            var templates = dataLocaleTypes[style];
            setInternalSlot(ListFormat.__INTERNAL_SLOT_MAP__, this, 'templatePair', templates.pair);
            setInternalSlot(ListFormat.__INTERNAL_SLOT_MAP__, this, 'templateStart', templates.start);
            setInternalSlot(ListFormat.__INTERNAL_SLOT_MAP__, this, 'templateMiddle', templates.middle);
            setInternalSlot(ListFormat.__INTERNAL_SLOT_MAP__, this, 'templateEnd', templates.end);
        }
        ListFormat.prototype.format = function (elements) {
            validateInstance(this, 'format');
            var result = '';
            var parts = createPartsFromList(ListFormat.__INTERNAL_SLOT_MAP__, this, stringListFromIterable(elements));
            if (!Array.isArray(parts)) {
                return parts.value;
            }
            for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
                var p = parts_1[_i];
                result += p.value;
            }
            return result;
        };
        ListFormat.prototype.formatToParts = function (elements) {
            validateInstance(this, 'format');
            var parts = createPartsFromList(ListFormat.__INTERNAL_SLOT_MAP__, this, stringListFromIterable(elements));
            if (!Array.isArray(parts)) {
                return [parts];
            }
            var result = [];
            for (var _i = 0, parts_2 = parts; _i < parts_2.length; _i++) {
                var part = parts_2[_i];
                result.push(__assign$1({}, part));
            }
            return result;
        };
        ListFormat.prototype.resolvedOptions = function () {
            validateInstance(this, 'resolvedOptions');
            return {
                locale: getInternalSlot(ListFormat.__INTERNAL_SLOT_MAP__, this, 'locale'),
                type: getInternalSlot(ListFormat.__INTERNAL_SLOT_MAP__, this, 'type'),
                style: getInternalSlot(ListFormat.__INTERNAL_SLOT_MAP__, this, 'style'),
            };
        };
        ListFormat.supportedLocalesOf = function (locales, options) {
            // test262/test/intl402/ListFormat/constructor/supportedLocalesOf/result-type.js
            return supportedLocales(ListFormat.availableLocales, Intl.getCanonicalLocales(locales), options);
        };
        ListFormat.__addLocaleData = function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            var _loop_1 = function (datum) {
                var availableLocales = datum.availableLocales;
                availableLocales.forEach(function (locale) {
                    try {
                        ListFormat.localeData[locale] = unpackData(locale, datum);
                    }
                    catch (e) {
                        // If we can't unpack this data, ignore the locale
                    }
                });
            };
            for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
                var datum = data_1[_a];
                _loop_1(datum);
            }
            ListFormat.availableLocales = Object.keys(ListFormat.localeData);
            if (!ListFormat.__defaultLocale) {
                ListFormat.__defaultLocale = ListFormat.availableLocales[0];
            }
        };
        ListFormat.getDefaultLocale = function () {
            return ListFormat.__defaultLocale;
        };
        ListFormat.localeData = {};
        ListFormat.availableLocales = [];
        ListFormat.__defaultLocale = 'en';
        ListFormat.relevantExtensionKeys = [];
        ListFormat.polyfilled = true;
        ListFormat.__INTERNAL_SLOT_MAP__ = new WeakMap();
        return ListFormat;
    }());
    try {
        // IE11 does not have Symbol
        if (typeof Symbol !== 'undefined') {
            Object.defineProperty(ListFormat.prototype, Symbol.toStringTag, {
                value: 'Intl.ListFormat',
                writable: false,
                enumerable: false,
                configurable: true,
            });
        }
        // https://github.com/tc39/test262/blob/master/test/intl402/ListFormat/constructor/length.js
        Object.defineProperty(ListFormat.prototype.constructor, 'length', {
            value: 0,
            writable: false,
            enumerable: false,
            configurable: true,
        });
        // https://github.com/tc39/test262/blob/master/test/intl402/ListFormat/constructor/supportedLocalesOf/length.js
        Object.defineProperty(ListFormat.supportedLocalesOf, 'length', {
            value: 1,
            writable: false,
            enumerable: false,
            configurable: true,
        });
    }
    catch (e) {
        // Meta fix so we're test262-compliant, not important
    }

    if (!('ListFormat' in Intl)) {
        Object.defineProperty(Intl, 'ListFormat', {
            value: ListFormat,
            writable: true,
            enumerable: false,
            configurable: true,
        });
    }

})));

