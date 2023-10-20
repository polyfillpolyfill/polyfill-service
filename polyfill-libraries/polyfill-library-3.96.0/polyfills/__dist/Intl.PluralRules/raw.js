
// Intl.PluralRules
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

    var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    function validateInstance(instance, method) {
        if (!(instance instanceof PluralRules)) {
            throw new TypeError("Method Intl.PluralRules.prototype." + method + " called on incompatible receiver " + String(instance));
        }
    }
    /**
     * https://tc39.es/ecma402/#sec-torawprecision
     * @param x
     * @param minPrecision
     * @param maxPrecision
     */
    function toRawPrecision(x, minPrecision, maxPrecision) {
        var m = x.toPrecision(maxPrecision);
        if (~m.indexOf('.') && maxPrecision > minPrecision) {
            var cut = maxPrecision - minPrecision;
            while (cut > 0 && m[m.length - 1] === '0') {
                m = m.slice(0, m.length - 1);
                cut--;
            }
            if (m[m.length - 1] === '.') {
                return m.slice(0, m.length - 1);
            }
        }
        return m;
    }
    /**
     * https://tc39.es/ecma402/#sec-torawfixed
     * @param x
     * @param minInteger
     * @param minFraction
     * @param maxFraction
     */
    function toRawFixed(x, minInteger, minFraction, maxFraction) {
        var cut = maxFraction - minFraction;
        var m = x.toFixed(maxFraction);
        while (cut > 0 && m[m.length - 1] === '0') {
            m = m.slice(0, m.length - 1);
            cut--;
        }
        if (m[m.length - 1] === '.') {
            m = m.slice(0, m.length - 1);
        }
        var int = m.split('.')[0].length;
        if (int < minInteger) {
            var z = '';
            for (; z.length < minInteger - int; z += '0')
                ;
            m = z + m;
        }
        return m;
    }
    function formatNumericToString(internalSlotMap, pl, x) {
        var minimumSignificantDigits = getInternalSlot(internalSlotMap, pl, 'minimumSignificantDigits');
        var maximumSignificantDigits = getInternalSlot(internalSlotMap, pl, 'maximumSignificantDigits');
        if (minimumSignificantDigits !== undefined &&
            maximumSignificantDigits !== undefined) {
            return toRawPrecision(x, minimumSignificantDigits, maximumSignificantDigits);
        }
        return toRawFixed(x, getInternalSlot(internalSlotMap, pl, 'minimumIntegerDigits'), getInternalSlot(internalSlotMap, pl, 'minimumFractionDigits'), getInternalSlot(internalSlotMap, pl, 'maximumFractionDigits'));
    }
    var PluralRules = /** @class */ (function () {
        function PluralRules(locales, options) {
            // test262/test/intl402/RelativeTimeFormat/constructor/constructor/newtarget-undefined.js
            // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
            var newTarget = this && this instanceof PluralRules ? this.constructor : void 0;
            if (!newTarget) {
                throw new TypeError("Intl.PluralRules must be called with 'new'");
            }
            var requestedLocales = Intl
                .getCanonicalLocales(locales);
            var opt = Object.create(null);
            var opts = options === undefined ? Object.create(null) : toObject(options);
            setInternalSlot(PluralRules.__INTERNAL_SLOT_MAP__, this, 'initializedPluralRules', true);
            var matcher = getOption(opts, 'localeMatcher', 'string', ['best fit', 'lookup'], 'best fit');
            opt.localeMatcher = matcher;
            setInternalSlot(PluralRules.__INTERNAL_SLOT_MAP__, this, 'type', getOption(opts, 'type', 'string', ['cardinal', 'ordinal'], 'cardinal'));
            setNumberFormatDigitOptions(PluralRules.__INTERNAL_SLOT_MAP__.get(this), opts, 0, 3, 'standard');
            var r = createResolveLocale(PluralRules.getDefaultLocale)(PluralRules.availableLocales, requestedLocales, opt, PluralRules.relevantExtensionKeys, PluralRules.localeData);
            setInternalSlot(PluralRules.__INTERNAL_SLOT_MAP__, this, 'locale', r.locale);
        }
        PluralRules.prototype.resolvedOptions = function () {
            var _this = this;
            validateInstance(this, 'resolvedOptions');
            var opts = Object.create(null);
            opts.locale = getInternalSlot(PluralRules.__INTERNAL_SLOT_MAP__, this, 'locale');
            opts.type = getInternalSlot(PluralRules.__INTERNAL_SLOT_MAP__, this, 'type');
            [
                'minimumIntegerDigits',
                'minimumFractionDigits',
                'maximumFractionDigits',
                'minimumSignificantDigits',
                'maximumSignificantDigits',
            ].forEach(function (field) {
                var val = getInternalSlot(PluralRules.__INTERNAL_SLOT_MAP__, _this, field);
                if (val !== undefined) {
                    opts[field] = val;
                }
            });
            opts.pluralCategories = __spreadArrays(PluralRules.localeData[opts.locale].categories[opts.type]);
            return opts;
        };
        PluralRules.prototype.select = function (val) {
            validateInstance(this, 'select');
            var locale = getInternalSlot(PluralRules.__INTERNAL_SLOT_MAP__, this, 'locale');
            var type = getInternalSlot(PluralRules.__INTERNAL_SLOT_MAP__, this, 'type');
            return PluralRules.localeData[locale].fn(formatNumericToString(PluralRules.__INTERNAL_SLOT_MAP__, this, Math.abs(Number(val))), type == 'ordinal');
        };
        PluralRules.prototype.toString = function () {
            return '[object Intl.PluralRules]';
        };
        PluralRules.supportedLocalesOf = function (locales, options) {
            return supportedLocales(PluralRules.availableLocales, Intl.getCanonicalLocales(locales), options);
        };
        PluralRules.__addLocaleData = function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            var _loop_1 = function (datum) {
                var availableLocales = datum.availableLocales;
                availableLocales.forEach(function (locale) {
                    try {
                        PluralRules.localeData[locale] = unpackData(locale, datum);
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
            for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
                var datum = data_1[_a];
                _loop_1(datum);
            }
            PluralRules.availableLocales = Object.keys(PluralRules.localeData);
            if (!PluralRules.__defaultLocale) {
                PluralRules.__defaultLocale = PluralRules.availableLocales[0];
            }
        };
        PluralRules.getDefaultLocale = function () {
            return PluralRules.__defaultLocale;
        };
        PluralRules.localeData = {};
        PluralRules.availableLocales = [];
        PluralRules.__defaultLocale = 'en';
        PluralRules.relevantExtensionKeys = [];
        PluralRules.polyfilled = true;
        PluralRules.__INTERNAL_SLOT_MAP__ = new WeakMap();
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
        // https://github.com/tc39/test262/blob/master/test/intl402/PluralRules/length.js
        Object.defineProperty(PluralRules, 'length', {
            value: 0,
            writable: false,
            enumerable: false,
            configurable: true,
        });
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

    if (!('PluralRules' in Intl) ||
        new Intl.PluralRules('en', { minimumFractionDigits: 2 }).select(1) ===
            'one') {
        Object.defineProperty(Intl, 'PluralRules', {
            value: PluralRules,
            writable: true,
            enumerable: false,
            configurable: true,
        });
    }

})));

