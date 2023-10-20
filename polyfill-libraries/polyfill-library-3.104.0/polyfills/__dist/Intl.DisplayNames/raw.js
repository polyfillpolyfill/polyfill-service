
// Intl.DisplayNames
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

    /**
     * Cannot do Math.log(x) / Math.log(10) bc if IEEE floating point issue
     * @param x number
     */
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

    var DisplayNames = /** @class */ (function () {
        function DisplayNames(locales, options) {
            var _newTarget = this.constructor;
            if (_newTarget === undefined) {
                throw TypeError("Constructor Intl.DisplayNames requires 'new'");
            }
            var requestedLocales = CanonicalizeLocaleList(locales);
            options = ToObject(options);
            var opt = Object.create(null);
            var localeData = DisplayNames.localeData;
            var matcher = GetOption(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
            opt.localeMatcher = matcher;
            var r = ResolveLocale(DisplayNames.availableLocales, requestedLocales, opt, [], // there is no relevantExtensionKeys
            DisplayNames.localeData, DisplayNames.getDefaultLocale);
            var style = GetOption(options, 'style', 'string', ['narrow', 'short', 'long'], 'long');
            setSlot(this, 'style', style);
            var type = GetOption(options, 'type', 'string', ['language', 'currency', 'region', 'script'], undefined);
            if (type === undefined) {
                throw TypeError("Intl.DisplayNames constructor requires \"type\" option");
            }
            setSlot(this, 'type', type);
            var fallback = GetOption(options, 'fallback', 'string', ['code', 'none'], 'code');
            setSlot(this, 'fallback', fallback);
            setSlot(this, 'locale', r.locale);
            var dataLocale = r.dataLocale;
            var dataLocaleData = localeData[dataLocale];
            invariant(!!dataLocaleData, "Missing locale data for " + dataLocale);
            setSlot(this, 'localeData', dataLocaleData);
            invariant(dataLocaleData !== undefined, "locale data for " + r.locale + " does not exist.");
            var types = dataLocaleData.types;
            invariant(typeof types === 'object' && types != null, 'invalid types data');
            var typeFields = types[type];
            invariant(typeof typeFields === 'object' && typeFields != null, 'invalid typeFields data');
            var styleFields = typeFields[style];
            invariant(typeof styleFields === 'object' && styleFields != null, 'invalid styleFields data');
            setSlot(this, 'fields', styleFields);
        }
        DisplayNames.supportedLocalesOf = function (locales, options) {
            return SupportedLocales(DisplayNames.availableLocales, CanonicalizeLocaleList(locales), options);
        };
        DisplayNames.__addLocaleData = function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
                var _b = data_1[_a], d = _b.data, locale = _b.locale;
                var minimizedLocale = new Intl.Locale(locale)
                    .minimize()
                    .toString();
                DisplayNames.localeData[locale] = DisplayNames.localeData[minimizedLocale] = d;
                DisplayNames.availableLocales.add(minimizedLocale);
                DisplayNames.availableLocales.add(locale);
                if (!DisplayNames.__defaultLocale) {
                    DisplayNames.__defaultLocale = minimizedLocale;
                }
            }
        };
        DisplayNames.prototype.of = function (code) {
            checkReceiver(this, 'of');
            var type = getSlot(this, 'type');
            var codeAsString = ToString(code);
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
                    canonicalCode = CanonicalizeLocaleList(codeAsString)[0];
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
            return __assign({}, getMultiInternalSlots(__INTERNAL_SLOT_MAP__, this, 'locale', 'style', 'type', 'fallback'));
        };
        DisplayNames.getDefaultLocale = function () {
            return DisplayNames.__defaultLocale;
        };
        DisplayNames.localeData = {};
        DisplayNames.availableLocales = new Set();
        DisplayNames.__defaultLocale = '';
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
                return IsWellFormedCurrencyCode(code);
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
            value: 2,
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

    /**
     * https://bugs.chromium.org/p/chromium/issues/detail?id=1097432
     */
    function hasMissingICUBug() {
        if (Intl.DisplayNames) {
            var regionNames = new Intl.DisplayNames(['en'], {
                type: 'region',
            });
            return regionNames.of('CA') === 'CA';
        }
        return false;
    }
    function shouldPolyfill() {
        return !Intl.DisplayNames || hasMissingICUBug();
    }

    if (shouldPolyfill()) {
        Object.defineProperty(Intl, 'DisplayNames', {
            value: DisplayNames,
            enumerable: false,
            writable: true,
            configurable: true,
        });
    }

})));

