
// Intl.PluralRules
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    function metaFix(PluralRules) {
        if (typeof Intl.PluralRules !== 'undefined') {
            return;
        }
        try {
            Object.defineProperty(Intl, 'PluralRules', {
                value: PluralRules,
                writable: true,
                enumerable: false,
                configurable: true,
            });
            Object.defineProperty(PluralRules, 'supportedLocalesOf', {
                writable: true,
                enumerable: false,
                configurable: true,
            });
            // IE11 does not have Symbol
            if (typeof Symbol !== 'undefined') {
                Object.defineProperty(PluralRules.prototype, Symbol.toStringTag, {
                    value: 'Object',
                    writable: false,
                    enumerable: false,
                    configurable: true,
                });
            }
            Object.defineProperty(Intl.PluralRules, 'name', {
                value: 'PluralRules',
                writable: false,
                enumerable: false,
                configurable: true,
            });
            Object.defineProperty(PluralRules.prototype, 'select', {
                writable: true,
                enumerable: false,
                configurable: true,
            });
            Object.defineProperty(PluralRules.prototype, 'resolvedOptions', {
                writable: true,
                enumerable: false,
                configurable: true,
            });
            Object.defineProperty(Intl.PluralRules, 'prototype', {
                writable: false,
                enumerable: false,
                configurable: false,
            });
            // https://github.com/tc39/test262/blob/master/test/intl402/PluralRules/length.js
            Object.defineProperty(PluralRules, 'length', {
                value: 0,
                writable: false,
                enumerable: false,
                configurable: true,
            });
            // This is bc transpilation process sets class properties to anonymous function
            Object.defineProperty(PluralRules.prototype.resolvedOptions, 'name', {
                value: 'resolvedOptions',
            });
            Object.defineProperty(PluralRules.prototype.select, 'name', {
                value: 'select',
            });
            Object.defineProperty(PluralRules.supportedLocalesOf, 'name', {
                value: 'supportedLocalesOf',
            });
        }
        catch (ex) {
            // Some crashes are due to a bug in JSC on iOS 9. We can safely ignore the error.
            // See https://github.com/formatjs/formatjs/issues/128.
        }
    }

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

    var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    var DEFAULT_LOCALE = 'en';
    function validateInstance(instance, method) {
        if (!(instance instanceof PluralRules)) {
            throw new TypeError("Method Intl.PluralRules.prototype." + method + " called on incompatible receiver " + String(instance));
        }
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
    function getNumberOption(options, property, min, max, fallback) {
        var val = options[property];
        return defaultNumberOption(val, min, max, fallback);
    }
    /**
     * https://tc39.es/ecma402/#sec-setnfdigitoptions
     * @param pl
     * @param opts
     * @param mnfdDefault
     * @param mxfdDefault
     */
    function setNumberFormatDigitOptions(pl, opts, mnfdDefault, mxfdDefault) {
        var mnid = getNumberOption(opts, 'minimumIntegerDigits', 1, 21, 1);
        var mnfd = getNumberOption(opts, 'minimumFractionDigits', 0, 20, mnfdDefault);
        var mxfdActualDefault = Math.max(mnfd, mxfdDefault);
        var mxfd = getNumberOption(opts, 'maximumFractionDigits', mnfd, 20, mxfdActualDefault);
        var mnsd = opts.minimumSignificantDigits;
        var mxsd = opts.maximumSignificantDigits;
        pl['[[MinimumIntegerDigits]]'] = mnid;
        pl['[[MinimumFractionDigits]]'] = mnfd;
        pl['[[MaximumFractionDigits]]'] = mxfd;
        if (mnsd !== undefined || mxsd !== undefined) {
            mnsd = defaultNumberOption(mnsd, 1, 21, 1);
            mxsd = defaultNumberOption(mxsd, mnsd, 21, 21);
            pl['[[MinimumSignificantDigits]]'] = mnsd;
            pl['[[MaximumSignificantDigits]]'] = mxsd;
        }
    }
    var PluralRules = /** @class */ (function () {
        function PluralRules(locales, options) {
            this['[[Type]]'] = 'cardinal';
            // test262/test/intl402/RelativeTimeFormat/constructor/constructor/newtarget-undefined.js
            // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
            var newTarget = this && this instanceof PluralRules ? this.constructor : void 0;
            if (!newTarget) {
                throw new TypeError("Intl.PluralRules must be called with 'new'");
            }
            var opts = options === undefined ? Object.create(null) : toObject(options);
            if (locales === undefined) {
                this['[[Locale]]'] = DEFAULT_LOCALE;
            }
            else {
                var resolvedLocales = resolveSupportedLocales(__spreadArrays((Array.isArray(locales) ? locales : [locales]), [DEFAULT_LOCALE]), PluralRules.__localeData__);
                if (resolvedLocales.length < 1) {
                    throw new Error('No locale data has been added to IntlPluralRules for: ' +
                        resolvedLocales.join(', ') +
                        ', or the default locale: ' +
                        DEFAULT_LOCALE);
                }
                this['[[Locale]]'] = resolvedLocales[0];
            }
            this['[[Type]]'] = getOption(opts, 'type', 'string', ['cardinal', 'ordinal'], 'cardinal');
            // test262/test/intl402/PluralRules/constructor-options-throwing-getters.js
            getOption(opts, 'localeMatcher', 'string', ['best fit', 'lookup'], 'best fit');
            this.pluralRuleData = PluralRules.__localeData__[this['[[Locale]]']];
            setNumberFormatDigitOptions(this, opts, 0, 3);
        }
        PluralRules.prototype.resolvedOptions = function () {
            validateInstance(this, 'resolvedOptions');
            var opts = Object.create(Object.prototype);
            Object.defineProperties(opts, {
                locale: {
                    value: this['[[Locale]]'],
                    writable: true,
                    enumerable: true,
                    configurable: true,
                },
                type: {
                    value: this['[[Type]]'].valueOf(),
                    writable: true,
                    enumerable: true,
                    configurable: true,
                },
            });
            if (this['[[MinimumIntegerDigits]]'] !== undefined) {
                Object.defineProperty(opts, 'minimumIntegerDigits', {
                    value: this['[[MinimumIntegerDigits]]'],
                    writable: true,
                    enumerable: true,
                    configurable: true,
                });
            }
            if (this['[[MinimumFractionDigits]]'] !== undefined) {
                Object.defineProperty(opts, 'minimumFractionDigits', {
                    value: this['[[MinimumFractionDigits]]'],
                    writable: true,
                    enumerable: true,
                    configurable: true,
                });
            }
            if (this['[[MaximumFractionDigits]]'] !== undefined) {
                Object.defineProperty(opts, 'maximumFractionDigits', {
                    value: this['[[MaximumFractionDigits]]'],
                    writable: true,
                    enumerable: true,
                    configurable: true,
                });
            }
            if (this['[[MinimumSignificantDigits]]'] !== undefined) {
                Object.defineProperty(opts, 'minimumSignificantDigits', {
                    value: this['[[MinimumSignificantDigits]]'],
                    writable: true,
                    enumerable: true,
                    configurable: true,
                });
            }
            if (this['[[MaximumSignificantDigits]]'] !== undefined) {
                Object.defineProperty(opts, 'maximumSignificantDigits', {
                    value: this['[[MaximumSignificantDigits]]'],
                    writable: true,
                    enumerable: true,
                    configurable: true,
                });
            }
            Object.defineProperty(opts, 'pluralCategories', {
                value: __spreadArrays(this.pluralRuleData.categories[this['[[Type]]'].valueOf()]),
                writable: true,
                enumerable: true,
                configurable: true,
            });
            return opts;
        };
        PluralRules.prototype.select = function (val) {
            validateInstance(this, 'select');
            return this.pluralRuleData.fn(Math.abs(Number(val)), this['[[Type]]'] == 'ordinal');
        };
        PluralRules.prototype.toString = function () {
            return '[object Intl.PluralRules]';
        };
        PluralRules.supportedLocalesOf = function (locales) {
            return resolveSupportedLocales(locales, PluralRules.__localeData__);
        };
        PluralRules.__addLocaleData = function (data) {
            PluralRules.__localeData__[data.locale] = data;
        };
        PluralRules.__localeData__ = {};
        PluralRules.polyfilled = true;
        return PluralRules;
    }());

    metaFix(PluralRules);

}));

