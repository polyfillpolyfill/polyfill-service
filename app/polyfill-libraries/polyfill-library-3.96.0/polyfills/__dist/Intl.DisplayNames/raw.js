
// Intl.DisplayNames
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
    var DisplayNames = /** @class */ (function () {
        function DisplayNames(locales, options) {
            var _newTarget = this.constructor;
            if (options === void 0) { options = Object.create(null); }
            if (_newTarget === undefined) {
                throw TypeError("Constructor Intl.DisplayNames requires 'new'");
            }
            var requestedLocales = Intl
                .getCanonicalLocales(locales);
            var matcher = getOption(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
            var r = createResolveLocale(DisplayNames.getDefaultLocale)(DisplayNames.availableLocales, requestedLocales, { localeMatcher: matcher }, [], // there is no relevantExtensionKeys
            DisplayNames.localeData);
            var style = getOption(options, 'style', 'string', ['narrow', 'short', 'long'], 'long');
            setSlot(this, 'style', style);
            var type = getOption(options, 'type', 'string', ['language', 'currency', 'region', 'script'], 'language');
            setSlot(this, 'type', type);
            var fallback = getOption(options, 'fallback', 'string', ['code', 'none'], 'code');
            setSlot(this, 'fallback', fallback);
            setSlot(this, 'locale', r.locale);
            var dataLocale = r.dataLocale;
            var dataLocaleData = DisplayNames.localeData[dataLocale];
            invariant(dataLocaleData !== undefined, "locale data for " + r.locale + " does not exist.");
            setSlot(this, 'localeData', dataLocaleData);
        }
        DisplayNames.supportedLocalesOf = function (locales, options) {
            return supportedLocales(DisplayNames.availableLocales, Intl.getCanonicalLocales(locales), options);
        };
        DisplayNames.__addLocaleData = function () {
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
                        DisplayNames.localeData[locale] = unpackData(locale, datum);
                    }
                    catch (e) {
                        // If we can't unpack this data, ignore the locale
                    }
                }
            }
            DisplayNames.availableLocales = Object.keys(DisplayNames.localeData);
            if (!DisplayNames.__defaultLocale) {
                DisplayNames.__defaultLocale = DisplayNames.availableLocales[0];
            }
        };
        DisplayNames.prototype.of = function (code) {
            checkReceiver(this, 'of');
            var type = getSlot(this, 'type');
            var codeAsString = toString(code);
            if (!isValidCodeForDisplayNames(type, codeAsString)) {
                throw RangeError('invalid code for Intl.DisplayNames.prototype.of');
            }
            var _a = getMultiInternalSlots(__INTERNAL_SLOT_MAP__, this, 'localeData', 'style', 'fallback'), localeData = _a.localeData, style = _a.style, fallback = _a.fallback;
            // Canonicalize the case.
            var canonicalCode;
            // This is only used to store extracted language region.
            var regionSubTag;
            switch (type) {
                // Normalize the locale id and remove the region.
                case 'language': {
                    canonicalCode = Intl
                        .getCanonicalLocales(codeAsString)[0];
                    var regionMatch = /-([a-z]{2}|\d{3})\b/i.exec(canonicalCode);
                    if (regionMatch) {
                        // Remove region subtag
                        canonicalCode =
                            canonicalCode.substring(0, regionMatch.index) +
                                canonicalCode.substring(regionMatch.index + regionMatch[0].length);
                        regionSubTag = regionMatch[1];
                    }
                    break;
                }
                // currency code should be all upper-case.
                case 'currency':
                    canonicalCode = codeAsString.toUpperCase();
                    break;
                // script code should be title case
                case 'script':
                    canonicalCode =
                        codeAsString[0] + codeAsString.substring(1).toLowerCase();
                    break;
                // region shold be all upper-case
                case 'region':
                    canonicalCode = codeAsString.toUpperCase();
                    break;
            }
            var typesData = localeData.types[type];
            // If the style of choice does not exist, fallback to "long".
            var name = typesData[style][canonicalCode] || typesData.long[canonicalCode];
            if (name !== undefined) {
                // If there is a region subtag in the language id, use locale pattern to interpolate the region
                if (regionSubTag) {
                    // Retrieve region display names
                    var regionsData = localeData.types.region;
                    var regionDisplayName = regionsData[style][regionSubTag] || regionsData.long[regionSubTag];
                    if (regionDisplayName || fallback === 'code') {
                        // Interpolate into locale-specific pattern.
                        var pattern = localeData.patterns.locale;
                        return pattern
                            .replace('{0}', name)
                            .replace('{1}', regionDisplayName || regionSubTag);
                    }
                }
                else {
                    return name;
                }
            }
            if (fallback === 'code') {
                return codeAsString;
            }
        };
        DisplayNames.prototype.resolvedOptions = function () {
            checkReceiver(this, 'resolvedOptions');
            return __assign$1({}, getMultiInternalSlots(__INTERNAL_SLOT_MAP__, this, 'locale', 'style', 'type', 'fallback'));
        };
        DisplayNames.getDefaultLocale = function () {
            return DisplayNames.__defaultLocale;
        };
        DisplayNames.localeData = {};
        DisplayNames.availableLocales = [];
        DisplayNames.__defaultLocale = 'en';
        DisplayNames.polyfilled = true;
        return DisplayNames;
    }());
    // https://tc39.es/proposal-intl-displaynames/#sec-isvalidcodefordisplaynames
    function isValidCodeForDisplayNames(type, code) {
        switch (type) {
            case 'language':
                // subset of unicode_language_id
                // languageCode ["-" scriptCode] ["-" regionCode] *("-" variant)
                // where:
                // - languageCode is either a two letters ISO 639-1 language code or a three letters ISO 639-2 language code.
                // - scriptCode is should be an ISO-15924 four letters script code
                // - regionCode is either an ISO-3166 two letters region code, or a three digits UN M49 Geographic Regions.
                return /^[a-z]{2,3}(-[a-z]{4})?(-([a-z]{2}|\d{3}))?(-([a-z\d]{5,8}|\d[a-z\d]{3}))*$/i.test(code);
            case 'region':
                // unicode_region_subtag
                return /^([a-z]{2}|\d{3})$/i.test(code);
            case 'script':
                // unicode_script_subtag
                return /^[a-z]{4}$/i.test(code);
            case 'currency':
                return isWellFormedCurrencyCode(code);
        }
    }
    try {
        // IE11 does not have Symbol
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(DisplayNames.prototype, Symbol.toStringTag, {
                value: 'Intl.DisplayNames',
                configurable: true,
                enumerable: false,
                writable: false,
            });
        }
        Object.defineProperty(DisplayNames, 'length', {
            value: 0,
            writable: false,
            enumerable: false,
            configurable: true,
        });
    }
    catch (e) {
        // Make test 262 compliant
    }
    var __INTERNAL_SLOT_MAP__ = new WeakMap();
    function getSlot(instance, key) {
        return getInternalSlot(__INTERNAL_SLOT_MAP__, instance, key);
    }
    function setSlot(instance, key, value) {
        setInternalSlot(__INTERNAL_SLOT_MAP__, instance, key, value);
    }
    function checkReceiver(receiver, methodName) {
        if (!(receiver instanceof DisplayNames)) {
            throw TypeError("Method Intl.DisplayNames.prototype." + methodName + " called on incompatible receiver");
        }
    }

    if (!Intl.DisplayNames) {
        Object.defineProperty(Intl, 'DisplayNames', {
            value: DisplayNames,
            enumerable: false,
            writable: true,
            configurable: true,
        });
    }

})));

