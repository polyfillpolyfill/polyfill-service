
// Intl.RelativeTimeFormat
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    function fixMeta(RelativeTimeFormat) {
        if (typeof Intl.RelativeTimeFormat !== 'undefined') {
            return;
        }
        Object.defineProperty(Intl, 'RelativeTimeFormat', {
            value: RelativeTimeFormat,
            writable: true,
            enumerable: false,
            configurable: true,
        });
        Object.defineProperty(RelativeTimeFormat, 'supportedLocalesOf', {
            writable: true,
            enumerable: false,
            configurable: true,
        });
        // IE11 does not have Symbol
        if (typeof Symbol !== 'undefined') {
            Object.defineProperty(RelativeTimeFormat.prototype, Symbol.toStringTag, {
                value: 'Intl.RelativeTimeFormat',
                writable: false,
                enumerable: false,
                configurable: true,
            });
        }
        Object.defineProperty(RelativeTimeFormat.prototype, 'format', {
            writable: true,
            enumerable: false,
            configurable: true,
        });
        Object.defineProperty(RelativeTimeFormat.prototype, 'formatToParts', {
            writable: true,
            enumerable: false,
            configurable: true,
        });
        Object.defineProperty(RelativeTimeFormat.prototype, 'resolvedOptions', {
            writable: true,
            enumerable: false,
            configurable: true,
        });
        Object.defineProperty(Intl.RelativeTimeFormat, 'prototype', {
            writable: false,
            enumerable: false,
            configurable: false,
        });
        try {
            // This is bc transpilation process sets class properties to anonymous function
            Object.defineProperty(RelativeTimeFormat.prototype.resolvedOptions, 'name', {
                value: 'resolvedOptions',
            });
            Object.defineProperty(RelativeTimeFormat.prototype.format, 'name', {
                value: 'format',
            });
            Object.defineProperty(RelativeTimeFormat.prototype.formatToParts, 'name', {
                value: 'formatToParts',
            });
            Object.defineProperty(RelativeTimeFormat.supportedLocalesOf, 'name', {
                value: 'supportedLocalesOf',
            });
        }
        catch (ex) {
            // This crashes due to a bug in JSC on iOS 9. We can safely ignore the error.
            // See https://github.com/formatjs/formatjs/issues/128.
        }
    }

    var VALID_UNITS = [
        'second',
        'minute',
        'hour',
        'day',
        'week',
        'month',
        'quarter',
        'year',
        'seconds',
        'minutes',
        'hours',
        'days',
        'weeks',
        'months',
        'quarters',
        'years',
    ];

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

    /* @generated */
    // prettier-ignore  
    var aliases = { "aa-SAAHO": "ssy", "aam": "aas", "aar": "aa", "abk": "ab", "adp": "dz", "afr": "af", "aju": "jrb", "aka": "ak", "alb": "sq", "als": "sq", "amh": "am", "ara": "ar", "arb": "ar", "arg": "an", "arm": "hy", "art-lojban": "jbo", "asm": "as", "aue": "ktz", "ava": "av", "ave": "ae", "aym": "ay", "ayr": "ay", "ayx": "nun", "az-AZ": "az-Latn-AZ", "aze": "az", "azj": "az", "bak": "ba", "bam": "bm", "baq": "eu", "bcc": "bal", "bcl": "bik", "bel": "be", "ben": "bn", "bgm": "bcg", "bh": "bho", "bih": "bho", "bis": "bi", "bjd": "drl", "bod": "bo", "bos": "bs", "bre": "br", "bs-BA": "bs-Latn-BA", "bul": "bg", "bur": "my", "bxk": "luy", "bxr": "bua", "cat": "ca", "ccq": "rki", "cel-gaulish": "xtg-x-cel-gaulish", "ces": "cs", "cha": "ch", "che": "ce", "chi": "zh", "chu": "cu", "chv": "cv", "cjr": "mom", "cka": "cmr", "cld": "syr", "cmk": "xch", "cmn": "zh", "cnr": "sr-ME", "cor": "kw", "cos": "co", "coy": "pij", "cqu": "quh", "cre": "cr", "cwd": "cr", "cym": "cy", "cze": "cs", "dan": "da", "deu": "de", "dgo": "doi", "dhd": "mwr", "dik": "din", "diq": "zza", "div": "dv", "drh": "mn", "drw": "fa-af", "dut": "nl", "dzo": "dz", "ekk": "et", "ell": "el", "emk": "man", "eng": "en", "epo": "eo", "esk": "ik", "est": "et", "eus": "eu", "ewe": "ee", "fao": "fo", "fas": "fa", "fat": "ak", "fij": "fj", "fin": "fi", "fra": "fr", "fre": "fr", "fry": "fy", "fuc": "ff", "ful": "ff", "gav": "dev", "gaz": "om", "gbo": "grb", "geo": "ka", "ger": "de", "gfx": "vaj", "ggn": "gvr", "gla": "gd", "gle": "ga", "glg": "gl", "glv": "gv", "gno": "gon", "gre": "el", "grn": "gn", "gti": "nyc", "gug": "gn", "guj": "gu", "guv": "duz", "gya": "gba", "ha-Latn-GH": "ha-GH", "ha-Latn-NE": "ha-NE", "ha-Latn-NG": "ha-NG", "hat": "ht", "hau": "ha", "hbs": "sr-Latn", "hdn": "hai", "hea": "hmn", "heb": "he", "her": "hz", "him": "srx", "hin": "hi", "hmo": "ho", "hrr": "jal", "hrv": "hr", "hun": "hu", "hye": "hy", "i-ami": "ami", "i-bnn": "bnn", "i-hak": "hak", "i-klingon": "tlh", "i-lux": "lb", "i-navajo": "nv", "i-pwn": "pwn", "i-tao": "tao", "i-tay": "tay", "i-tsu": "tsu", "i-default": "en-x-i-default", "i-enochian": "und-x-i-enochian", "i-mingo": "see-x-i-mingo", "ibi": "opa", "ibo": "ig", "ice": "is", "ido": "io", "iii": "ii", "ike": "iu", "iku": "iu", "ile": "ie", "ilw": "gal", "in": "id", "ina": "ia", "ind": "id", "ipk": "ik", "isl": "is", "ita": "it", "iw": "he", "jav": "jv", "jeg": "oyb", "ji": "yi", "jpn": "ja", "jw": "jv", "kal": "kl", "kan": "kn", "kas": "ks", "kat": "ka", "kau": "kr", "kaz": "kk", "kgc": "tdf", "kgh": "kml", "khk": "mn", "khm": "km", "kik": "ki", "kin": "rw", "kir": "ky", "kk-Cyrl-KZ": "kk-KZ", "kmr": "ku", "knc": "kr", "kng": "kg", "knn": "kok", "koj": "kwv", "kom": "kv", "kon": "kg", "kor": "ko", "kpv": "kv", "krm": "bmf", "ks-Arab-IN": "ks-IN", "ktr": "dtp", "kua": "kj", "kur": "ku", "kvs": "gdj", "kwq": "yam", "kxe": "tvd", "ky-Cyrl-KG": "ky-KG", "kzj": "dtp", "kzt": "dtp", "lao": "lo", "lat": "la", "lav": "lv", "lbk": "bnc", "lii": "raq", "lim": "li", "lin": "ln", "lit": "lt", "lmm": "rmx", "ltz": "lb", "lub": "lu", "lug": "lg", "lvs": "lv", "mac": "mk", "mah": "mh", "mal": "ml", "mao": "mi", "mar": "mr", "may": "ms", "meg": "cir", "mhr": "chm", "mkd": "mk", "mlg": "mg", "mlt": "mt", "mn-Cyrl-MN": "mn-MN", "mnk": "man", "mo": "ro", "mol": "ro", "mon": "mn", "mri": "mi", "ms-Latn-BN": "ms-BN", "ms-Latn-MY": "ms-MY", "ms-Latn-SG": "ms-SG", "msa": "ms", "mst": "mry", "mup": "raj", "mwj": "vaj", "mya": "my", "myt": "mry", "nad": "xny", "nau": "na", "nav": "nv", "nbl": "nr", "ncp": "kdz", "nde": "nd", "ndo": "ng", "nep": "ne", "nld": "nl", "nno": "nn", "nnx": "ngv", "no": "nb", "no-bok": "nb", "no-BOKMAL": "nb", "no-nyn": "nn", "no-NYNORSK": "nn", "nob": "nb", "nor": "nb", "npi": "ne", "nts": "pij", "nya": "ny", "oci": "oc", "ojg": "oj", "oji": "oj", "ori": "or", "orm": "om", "ory": "or", "oss": "os", "oun": "vaj", "pa-IN": "pa-Guru-IN", "pa-PK": "pa-Arab-PK", "pan": "pa", "pbu": "ps", "pcr": "adx", "per": "fa", "pes": "fa", "pli": "pi", "plt": "mg", "pmc": "huw", "pmu": "phr", "pnb": "lah", "pol": "pl", "por": "pt", "ppa": "bfy", "ppr": "lcq", "prs": "fa-AF", "pry": "prt", "pus": "ps", "puz": "pub", "que": "qu", "quz": "qu", "rmy": "rom", "roh": "rm", "ron": "ro", "rum": "ro", "run": "rn", "rus": "ru", "sag": "sg", "san": "sa", "sca": "hle", "scc": "sr", "scr": "hr", "sgn-BE-FR": "sfb", "sgn-BE-NL": "vgt", "sgn-CH-DE": "sgg", "sh": "sr-Latn", "shi-MA": "shi-Tfng-MA", "sin": "si", "skk": "oyb", "slk": "sk", "slo": "sk", "slv": "sl", "sme": "se", "smo": "sm", "sna": "sn", "snd": "sd", "som": "so", "sot": "st", "spa": "es", "spy": "kln", "sqi": "sq", "sr-BA": "sr-Cyrl-BA", "sr-ME": "sr-Latn-ME", "sr-RS": "sr-Cyrl-RS", "sr-XK": "sr-Cyrl-XK", "src": "sc", "srd": "sc", "srp": "sr", "ssw": "ss", "sun": "su", "swa": "sw", "swc": "sw-CD", "swe": "sv", "swh": "sw", "tah": "ty", "tam": "ta", "tat": "tt", "tdu": "dtp", "tel": "te", "tgk": "tg", "tgl": "fil", "tha": "th", "thc": "tpo", "thx": "oyb", "tib": "bo", "tie": "ras", "tir": "ti", "tkk": "twm", "tl": "fil", "tlw": "weo", "tmp": "tyj", "tne": "kak", "tnf": "fa-af", "ton": "to", "tsf": "taj", "tsn": "tn", "tso": "ts", "ttq": "tmh", "tuk": "tk", "tur": "tr", "tw": "ak", "twi": "ak", "tzm-Latn-MA": "tzm-MA", "ug-Arab-CN": "ug-CN", "uig": "ug", "ukr": "uk", "umu": "del", "uok": "ema", "urd": "ur", "uz-AF": "uz-Arab-AF", "uz-UZ": "uz-Latn-UZ", "uzb": "uz", "uzn": "uz", "vai-LR": "vai-Vaii-LR", "ven": "ve", "vie": "vi", "vol": "vo", "wel": "cy", "wln": "wa", "wol": "wo", "xba": "cax", "xho": "xh", "xia": "acn", "xkh": "waw", "xpe": "kpe", "xsj": "suj", "xsl": "den", "ybd": "rki", "ydd": "yi", "yid": "yi", "yma": "lrr", "ymt": "mtm", "yor": "yo", "yos": "zom", "yue-CN": "yue-Hans-CN", "yue-HK": "yue-Hant-HK", "yuu": "yug", "zai": "zap", "zh-CN": "zh-Hans-CN", "zh-guoyu": "zh", "zh-hakka": "hak", "zh-HK": "zh-Hant-HK", "zh-min-nan": "nan", "zh-MO": "zh-Hant-MO", "zh-SG": "zh-Hans-SG", "zh-TW": "zh-Hant-TW", "zh-xiang": "hsn", "zh-min": "nan-x-zh-min", "zha": "za", "zho": "zh", "zsm": "ms", "zul": "zu", "zyb": "za" };

    function resolveSupportedLocales(locales, localeData) {
        var resolvedLocales = (Array.isArray(locales) ? locales : [locales])
            .filter(function (s) { return typeof s === 'string'; })
            .map(function (l) { return aliases[l] || l; });
        var i, len, localeParts, data;
        var supportedLocales = [];
        // Using the set of locales + the default locale, we look for the first one
        // which that has been registered. When data does not exist for a locale, we
        // traverse its ancestors to find something that's been registered within
        // its hierarchy of locales. Since we lack the proper `parentLocale` data
        // here, we must take a naive approach to traversal.
        for (i = 0, len = resolvedLocales.length; i < len; i += 1) {
            localeParts = resolvedLocales[i].toLowerCase().split('-');
            while (localeParts.length) {
                if (localeData) {
                    data = localeData[localeParts.join('-')];
                    if (data) {
                        // Return the normalized locale string; e.g., we return "en-US",
                        // instead of "en-us".
                        supportedLocales.push(data.locale);
                        break;
                    }
                    localeParts.pop();
                }
            }
        }
        return supportedLocales;
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
                value = new Boolean(value);
            }
            if (type === 'string') {
                value = new String(value);
            }
            if (values !== undefined && !values.filter(function (val) { return val == value; }).length) {
                throw new RangeError(value + " in not within " + values);
            }
            return value;
        }
        return fallback;
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
    var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    /**
     * Find the correct field data in our CLDR data
     * @param locale locale
     */
    function findFields(locale) {
        var localeData = RelativeTimeFormat.__localeData__;
        var data = localeData[locale.toLowerCase()];
        // The locale data is de-duplicated, so we have to traverse the locale's
        // hierarchy until we find `fields` to return.
        while (data) {
            if (data.fields) {
                return data.fields;
            }
            data = data.parentLocale
                ? localeData[data.parentLocale.toLowerCase()]
                : undefined;
        }
        throw new Error("Locale data added to RelativeTimeFormat is missing 'fields' for \"" + locale + "\"");
    }
    function findFieldData(fields, unit, style) {
        if (style == 'long') {
            return fields[unit];
        }
        if (style == 'narrow') {
            return (fields[unit + "-narrow"] ||
                fields[unit + "-short"]);
        }
        return fields[unit + "-short"];
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
    function resolvePastOrFuture(value) {
        return objectIs(value, -0)
            ? 'past'
            : objectIs(value, +0)
                ? 'future'
                : value < 0
                    ? 'past'
                    : 'future';
    }
    function validateInstance(instance, method) {
        if (!(instance instanceof RelativeTimeFormat)) {
            throw new TypeError("Method Intl.RelativeTimeFormat.prototype." + method + " called on incompatible receiver " + String(instance));
        }
    }
    function validateUnit(unit) {
        // `unit + ''` to guard against `Symbol()`
        if (!~VALID_UNITS.indexOf(unit + '')) {
            throw new RangeError("Invalid unit argument for format() '" + String(unit) + "'");
        }
        var resolvedUnit = (unit[unit.length - 1] === 's'
            ? unit.slice(0, unit.length - 1)
            : unit);
        return resolvedUnit;
    }
    function validateValue(value, method) {
        if (method === void 0) { method = 'format'; }
        var parsedValue = typeof value === 'string' ? new Number(value).valueOf() : value;
        if (!isFinite(parsedValue)) {
            throw new RangeError("Value need to be finite number for Intl.RelativeTimeFormat.prototype." + method + "()");
        }
        return parsedValue;
    }
    function isString(s) {
        return !!s;
    }
    var DEFAULT_LOCALE = new Intl.NumberFormat().resolvedOptions().locale;
    var RelativeTimeFormat = /** @class */ (function () {
        function RelativeTimeFormat() {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var locales = _a[0], options = _a[1];
            // test262/test/intl402/RelativeTimeFormat/constructor/constructor/newtarget-undefined.js
            // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
            var newTarget = this && this instanceof RelativeTimeFormat ? this.constructor : void 0;
            if (!newTarget) {
                throw new TypeError("Intl.RelativeTimeFormat must be called with 'new'");
            }
            var opts = options === undefined ? Object.create(null) : toObject(options);
            if (locales === undefined) {
                this._locale = DEFAULT_LOCALE;
            }
            else {
                var resolvedLocales = resolveSupportedLocales(__spreadArrays(Intl.NumberFormat.supportedLocalesOf(locales), [DEFAULT_LOCALE]), RelativeTimeFormat.__localeData__);
                if (resolvedLocales.length < 1) {
                    throw new Error('No locale data has been added to IntlRelativeTimeFormat for: ' +
                        resolvedLocales.join(', ') +
                        ', or the default locale: ' +
                        DEFAULT_LOCALE);
                }
                this._locale = resolvedLocales[0];
            }
            this._localeMatcher = getOption(opts, 'localeMatcher', 'string', ['best fit', 'lookup'], 'best fit');
            this._style = getOption(opts, 'style', 'string', ['long', 'narrow', 'short'], 'long');
            this._numeric = getOption(opts, 'numeric', 'string', ['always', 'auto'], 'always');
            this._fields = findFields(this._locale);
            this._nf = new Intl.NumberFormat(this._locale);
            this._pl = new Intl.PluralRules(this._locale);
            this._numberingSystem = this._nf.resolvedOptions().numberingSystem;
        }
        RelativeTimeFormat.prototype.format = function (value, unit) {
            validateInstance(this, 'format');
            var resolvedUnit = validateUnit(unit);
            var parsedValue = validateValue(value);
            var _a = this, style = _a._style, numeric = _a._numeric;
            var fieldData = findFieldData(this._fields, resolvedUnit, style);
            if (!fieldData) {
                throw new Error("Unsupported unit " + unit);
            }
            var relative = fieldData.relative, relativeTime = fieldData.relativeTime;
            var result = '';
            // We got a match for things like yesterday
            if (numeric == 'auto' &&
                (result = relative[String(parsedValue)] || '')) {
                return result;
            }
            var selector = this._pl.select(parsedValue);
            var futureOrPastData = relativeTime[resolvePastOrFuture(parsedValue)];
            var msg = futureOrPastData[selector] || futureOrPastData.other;
            return msg.replace(/\{0\}/, this._nf.format(Math.abs(parsedValue)));
        };
        RelativeTimeFormat.prototype.formatToParts = function (value, unit) {
            validateInstance(this, 'format');
            var resolvedUnit = validateUnit(unit);
            var parsedValue = validateValue(value, 'formatToParts');
            var _a = this, style = _a._style, numeric = _a._numeric;
            var fieldData = findFieldData(this._fields, resolvedUnit, style);
            if (!fieldData) {
                throw new Error("Unsupported unit " + unit);
            }
            var relative = fieldData.relative, relativeTime = fieldData.relativeTime;
            var result = '';
            // We got a match for things like yesterday
            if (numeric == 'auto' &&
                (result = relative[String(parsedValue)] || '')) {
                return [
                    {
                        type: 'literal',
                        value: result,
                    },
                ];
            }
            var selector = this._pl.select(parsedValue);
            var futureOrPastData = relativeTime[resolvePastOrFuture(parsedValue)];
            var msg = futureOrPastData[selector] || futureOrPastData.other;
            var valueParts = this._nf
                .formatToParts(Math.abs(parsedValue))
                .map(function (p) { return (__assign$1(__assign$1({}, p), { unit: resolvedUnit })); });
            return msg
                .split(/(\{0\})/)
                .filter(isString)
                .reduce(function (parts, str) { return __spreadArrays(parts, (str === '{0}'
                ? valueParts
                : [{ type: 'literal', value: str }])); }, []);
        };
        RelativeTimeFormat.prototype.resolvedOptions = function () {
            validateInstance(this, 'resolvedOptions');
            // test262/test/intl402/RelativeTimeFormat/prototype/resolvedOptions/type.js
            var opts = Object.create(Object.prototype);
            Object.defineProperties(opts, {
                locale: {
                    value: this._locale,
                    writable: true,
                    enumerable: true,
                    configurable: true,
                },
                style: {
                    value: this._style.valueOf(),
                    writable: true,
                    enumerable: true,
                    configurable: true,
                },
                numeric: {
                    value: this._numeric.valueOf(),
                    writable: true,
                    enumerable: true,
                    configurable: true,
                },
                numberingSystem: {
                    value: this._numberingSystem.valueOf(),
                    writable: true,
                    enumerable: true,
                    configurable: true,
                },
            });
            return opts;
        };
        RelativeTimeFormat.prototype.toString = function () {
            return '[object Intl.RelativeTimeFormat]';
        };
        RelativeTimeFormat.__addLocaleData = function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
                var datum = data_1[_a];
                if (!(datum && datum.locale)) {
                    throw new Error('Locale data provided to RelativeTimeFormat is missing a ' +
                        '`locale` property value');
                }
                RelativeTimeFormat.__localeData__[datum.locale.toLowerCase()] = datum;
            }
        };
        RelativeTimeFormat.supportedLocalesOf = function (locales) {
            var _a = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                _a[_i - 1] = arguments[_i];
            }
            var opts = _a[0];
            // test262/test/intl402/RelativeTimeFormat/constructor/supportedLocalesOf/options-toobject.js
            var localeMatcher = 'best fit';
            // test262/test/intl402/RelativeTimeFormat/constructor/supportedLocalesOf/options-null.js
            if (opts === null) {
                throw new TypeError('opts cannot be null');
            }
            if (opts) {
                localeMatcher = getOption(opts, 'localeMatcher', 'string', ['best fit', 'lookup'], 'best fit');
            }
            // test262/test/intl402/RelativeTimeFormat/constructor/supportedLocalesOf/result-type.js
            return resolveSupportedLocales(Intl.PluralRules.supportedLocalesOf(locales, { localeMatcher: localeMatcher }), RelativeTimeFormat.__localeData__);
        };
        RelativeTimeFormat.__localeData__ = {};
        RelativeTimeFormat.polyfilled = true;
        return RelativeTimeFormat;
    }());

    /* @generated */
    // prettier-ignore  
    var defaultLocale = { "locale": "en", "fields": { "year": { "displayName": "year", "relative": { "0": "this year", "1": "next year", "-1": "last year" }, "relativeTime": { "future": { "one": "in {0} year", "other": "in {0} years" }, "past": { "one": "{0} year ago", "other": "{0} years ago" } }, "relativePeriod": undefined }, "year-short": { "displayName": "yr.", "relative": { "0": "this yr.", "1": "next yr.", "-1": "last yr." }, "relativeTime": { "future": { "one": "in {0} yr.", "other": "in {0} yr." }, "past": { "one": "{0} yr. ago", "other": "{0} yr. ago" } }, "relativePeriod": undefined }, "year-narrow": { "displayName": "yr.", "relative": { "0": "this yr.", "1": "next yr.", "-1": "last yr." }, "relativeTime": { "future": { "one": "in {0} yr.", "other": "in {0} yr." }, "past": { "one": "{0} yr. ago", "other": "{0} yr. ago" } }, "relativePeriod": undefined }, "quarter": { "displayName": "quarter", "relative": { "0": "this quarter", "1": "next quarter", "-1": "last quarter" }, "relativeTime": { "future": { "one": "in {0} quarter", "other": "in {0} quarters" }, "past": { "one": "{0} quarter ago", "other": "{0} quarters ago" } }, "relativePeriod": undefined }, "quarter-short": { "displayName": "qtr.", "relative": { "0": "this qtr.", "1": "next qtr.", "-1": "last qtr." }, "relativeTime": { "future": { "one": "in {0} qtr.", "other": "in {0} qtrs." }, "past": { "one": "{0} qtr. ago", "other": "{0} qtrs. ago" } }, "relativePeriod": undefined }, "quarter-narrow": { "displayName": "qtr.", "relative": { "0": "this qtr.", "1": "next qtr.", "-1": "last qtr." }, "relativeTime": { "future": { "one": "in {0} qtr.", "other": "in {0} qtrs." }, "past": { "one": "{0} qtr. ago", "other": "{0} qtrs. ago" } }, "relativePeriod": undefined }, "month": { "displayName": "month", "relative": { "0": "this month", "1": "next month", "-1": "last month" }, "relativeTime": { "future": { "one": "in {0} month", "other": "in {0} months" }, "past": { "one": "{0} month ago", "other": "{0} months ago" } }, "relativePeriod": undefined }, "month-short": { "displayName": "mo.", "relative": { "0": "this mo.", "1": "next mo.", "-1": "last mo." }, "relativeTime": { "future": { "one": "in {0} mo.", "other": "in {0} mo." }, "past": { "one": "{0} mo. ago", "other": "{0} mo. ago" } }, "relativePeriod": undefined }, "month-narrow": { "displayName": "mo.", "relative": { "0": "this mo.", "1": "next mo.", "-1": "last mo." }, "relativeTime": { "future": { "one": "in {0} mo.", "other": "in {0} mo." }, "past": { "one": "{0} mo. ago", "other": "{0} mo. ago" } }, "relativePeriod": undefined }, "week": { "displayName": "week", "relative": { "0": "this week", "1": "next week", "-1": "last week" }, "relativeTime": { "future": { "one": "in {0} week", "other": "in {0} weeks" }, "past": { "one": "{0} week ago", "other": "{0} weeks ago" } }, "relativePeriod": "the week of {0}" }, "week-short": { "displayName": "wk.", "relative": { "0": "this wk.", "1": "next wk.", "-1": "last wk." }, "relativeTime": { "future": { "one": "in {0} wk.", "other": "in {0} wk." }, "past": { "one": "{0} wk. ago", "other": "{0} wk. ago" } }, "relativePeriod": "the week of {0}" }, "week-narrow": { "displayName": "wk.", "relative": { "0": "this wk.", "1": "next wk.", "-1": "last wk." }, "relativeTime": { "future": { "one": "in {0} wk.", "other": "in {0} wk." }, "past": { "one": "{0} wk. ago", "other": "{0} wk. ago" } }, "relativePeriod": "the week of {0}" }, "day": { "displayName": "day", "relative": { "0": "today", "1": "tomorrow", "-1": "yesterday" }, "relativeTime": { "future": { "one": "in {0} day", "other": "in {0} days" }, "past": { "one": "{0} day ago", "other": "{0} days ago" } }, "relativePeriod": undefined }, "day-short": { "displayName": "day", "relative": { "0": "today", "1": "tomorrow", "-1": "yesterday" }, "relativeTime": { "future": { "one": "in {0} day", "other": "in {0} days" }, "past": { "one": "{0} day ago", "other": "{0} days ago" } }, "relativePeriod": undefined }, "day-narrow": { "displayName": "day", "relative": { "0": "today", "1": "tomorrow", "-1": "yesterday" }, "relativeTime": { "future": { "one": "in {0} day", "other": "in {0} days" }, "past": { "one": "{0} day ago", "other": "{0} days ago" } }, "relativePeriod": undefined }, "hour": { "displayName": "hour", "relative": { "0": "this hour" }, "relativeTime": { "future": { "one": "in {0} hour", "other": "in {0} hours" }, "past": { "one": "{0} hour ago", "other": "{0} hours ago" } }, "relativePeriod": undefined }, "hour-short": { "displayName": "hr.", "relative": { "0": "this hour" }, "relativeTime": { "future": { "one": "in {0} hr.", "other": "in {0} hr." }, "past": { "one": "{0} hr. ago", "other": "{0} hr. ago" } }, "relativePeriod": undefined }, "hour-narrow": { "displayName": "hr.", "relative": { "0": "this hour" }, "relativeTime": { "future": { "one": "in {0} hr.", "other": "in {0} hr." }, "past": { "one": "{0} hr. ago", "other": "{0} hr. ago" } }, "relativePeriod": undefined }, "minute": { "displayName": "minute", "relative": { "0": "this minute" }, "relativeTime": { "future": { "one": "in {0} minute", "other": "in {0} minutes" }, "past": { "one": "{0} minute ago", "other": "{0} minutes ago" } }, "relativePeriod": undefined }, "minute-short": { "displayName": "min.", "relative": { "0": "this minute" }, "relativeTime": { "future": { "one": "in {0} min.", "other": "in {0} min." }, "past": { "one": "{0} min. ago", "other": "{0} min. ago" } }, "relativePeriod": undefined }, "minute-narrow": { "displayName": "min.", "relative": { "0": "this minute" }, "relativeTime": { "future": { "one": "in {0} min.", "other": "in {0} min." }, "past": { "one": "{0} min. ago", "other": "{0} min. ago" } }, "relativePeriod": undefined }, "second": { "displayName": "second", "relative": { "0": "now" }, "relativeTime": { "future": { "one": "in {0} second", "other": "in {0} seconds" }, "past": { "one": "{0} second ago", "other": "{0} seconds ago" } }, "relativePeriod": undefined }, "second-short": { "displayName": "sec.", "relative": { "0": "now" }, "relativeTime": { "future": { "one": "in {0} sec.", "other": "in {0} sec." }, "past": { "one": "{0} sec. ago", "other": "{0} sec. ago" } }, "relativePeriod": undefined }, "second-narrow": { "displayName": "sec.", "relative": { "0": "now" }, "relativeTime": { "future": { "one": "in {0} sec.", "other": "in {0} sec." }, "past": { "one": "{0} sec. ago", "other": "{0} sec. ago" } }, "relativePeriod": undefined } } };

    RelativeTimeFormat.__addLocaleData(defaultLocale);

    fixMeta(RelativeTimeFormat);

}));

