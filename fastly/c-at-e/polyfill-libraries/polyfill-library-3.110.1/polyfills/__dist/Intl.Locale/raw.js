
// Intl.Locale
(function() {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = function(target) {
    return __defProp(target, "__esModule", {value: true});
  };
  var __commonJS = function(cb, mod) {
    return function __require() {
      return mod || (0, cb[Object.keys(cb)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
    };
  };
  var __reExport = function(target, module, desc) {
    if (module && typeof module === "object" || typeof module === "function")
      for (var keys = __getOwnPropNames(module), i = 0, n = keys.length, key; i < n; i++) {
        key = keys[i];
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: function(k) {
            return module[k];
          }.bind(null, key), enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
      }
    return target;
  };
  var __toModule = function(module) {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: function() {
      return module.default;
    }, enumerable: true} : {value: module, enumerable: true})), module);
  };

  // node_modules/tslib/tslib.js
  var require_tslib = __commonJS({
    "node_modules/tslib/tslib.js": function(exports, module) {
      var __extends2;
      var __assign5;
      var __rest;
      var __decorate;
      var __param;
      var __metadata;
      var __awaiter;
      var __generator;
      var __exportStar;
      var __values;
      var __read;
      var __spread;
      var __spreadArrays;
      var __spreadArray2;
      var __await;
      var __asyncGenerator;
      var __asyncDelegator;
      var __asyncValues;
      var __makeTemplateObject;
      var __importStar;
      var __importDefault;
      var __classPrivateFieldGet;
      var __classPrivateFieldSet;
      var __createBinding;
      (function(factory) {
        var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
        if (typeof define === "function" && define.amd) {
          define("tslib", ["exports"], function(exports2) {
            factory(createExporter(root, createExporter(exports2)));
          });
        } else if (typeof module === "object" && typeof module.exports === "object") {
          factory(createExporter(root, createExporter(module.exports)));
        } else {
          factory(createExporter(root));
        }
        function createExporter(exports2, previous) {
          if (exports2 !== root) {
            if (typeof Object.create === "function") {
              Object.defineProperty(exports2, "__esModule", {value: true});
            } else {
              exports2.__esModule = true;
            }
          }
          return function(id, v) {
            return exports2[id] = previous ? previous(id, v) : v;
          };
        }
      })(function(exporter) {
        var extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p))
              d[p] = b[p];
        };
        __extends2 = function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        __assign5 = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        __rest = function(s, e) {
          var t = {};
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
          if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
            }
          return t;
        };
        __decorate = function(decorators, target, key, desc) {
          var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        __param = function(paramIndex, decorator) {
          return function(target, key) {
            decorator(target, key, paramIndex);
          };
        };
        __metadata = function(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
        };
        __awaiter = function(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        };
        __generator = function(thisArg, body) {
          var _ = {label: 0, sent: function() {
            if (t[0] & 1)
              throw t[1];
            return t[1];
          }, trys: [], ops: []}, f, y, t, g;
          return g = {next: verb(0), "throw": verb(1), "return": verb(2)}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f)
              throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                  return t;
                if (y = 0, t)
                  op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return {value: op[1], done: false};
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2])
                      _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5)
              throw op[1];
            return {value: op[0] ? op[1] : void 0, done: true};
          }
        };
        __exportStar = function(m, o) {
          for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
              __createBinding(o, m, p);
        };
        __createBinding = Object.create ? function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          Object.defineProperty(o, k2, {enumerable: true, get: function() {
            return m[k];
          }});
        } : function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          o[k2] = m[k];
        };
        __values = function(o) {
          var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
          if (m)
            return m.call(o);
          if (o && typeof o.length === "number")
            return {
              next: function() {
                if (o && i >= o.length)
                  o = void 0;
                return {value: o && o[i++], done: !o};
              }
            };
          throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        __read = function(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m)
            return o;
          var i = m.call(o), r, ar = [], e;
          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
          } catch (error) {
            e = {error: error};
          } finally {
            try {
              if (r && !r.done && (m = i["return"]))
                m.call(i);
            } finally {
              if (e)
                throw e.error;
            }
          }
          return ar;
        };
        __spread = function() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
          return ar;
        };
        __spreadArrays = function() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        };
        __spreadArray2 = function(to, from) {
          for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
          return to;
        };
        __await = function(v) {
          return this instanceof __await ? (this.v = v, this) : new __await(v);
        };
        __asyncGenerator = function(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []), i, q = [];
          return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i;
          function verb(n) {
            if (g[n])
              i[n] = function(v) {
                return new Promise(function(a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v);
                });
              };
          }
          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }
          function step(r) {
            r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f, v) {
            if (f(v), q.shift(), q.length)
              resume(q[0][0], q[0][1]);
          }
        };
        __asyncDelegator = function(o) {
          var i, p;
          return i = {}, verb("next"), verb("throw", function(e) {
            throw e;
          }), verb("return"), i[Symbol.iterator] = function() {
            return this;
          }, i;
          function verb(n, f) {
            i[n] = o[n] ? function(v) {
              return (p = !p) ? {value: __await(o[n](v)), done: n === "return"} : f ? f(v) : v;
            } : f;
          }
        };
        __asyncValues = function(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator], i;
          return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i);
          function verb(n) {
            i[n] = o[n] && function(v) {
              return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
              });
            };
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function(v2) {
              resolve({value: v2, done: d});
            }, reject);
          }
        };
        __makeTemplateObject = function(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", {value: raw});
          } else {
            cooked.raw = raw;
          }
          return cooked;
        };
        var __setModuleDefault = Object.create ? function(o, v) {
          Object.defineProperty(o, "default", {enumerable: true, value: v});
        } : function(o, v) {
          o["default"] = v;
        };
        __importStar = function(mod) {
          if (mod && mod.__esModule)
            return mod;
          var result = {};
          if (mod != null) {
            for (var k in mod)
              if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          }
          __setModuleDefault(result, mod);
          return result;
        };
        __importDefault = function(mod) {
          return mod && mod.__esModule ? mod : {"default": mod};
        };
        __classPrivateFieldGet = function(receiver, state, kind, f) {
          if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
          if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
          return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
        };
        __classPrivateFieldSet = function(receiver, state, value, kind, f) {
          if (kind === "m")
            throw new TypeError("Private method is not writable");
          if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
          if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
          return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
        };
        exporter("__extends", __extends2);
        exporter("__assign", __assign5);
        exporter("__rest", __rest);
        exporter("__decorate", __decorate);
        exporter("__param", __param);
        exporter("__metadata", __metadata);
        exporter("__awaiter", __awaiter);
        exporter("__generator", __generator);
        exporter("__exportStar", __exportStar);
        exporter("__createBinding", __createBinding);
        exporter("__values", __values);
        exporter("__read", __read);
        exporter("__spread", __spread);
        exporter("__spreadArrays", __spreadArrays);
        exporter("__spreadArray", __spreadArray2);
        exporter("__await", __await);
        exporter("__asyncGenerator", __asyncGenerator);
        exporter("__asyncDelegator", __asyncDelegator);
        exporter("__asyncValues", __asyncValues);
        exporter("__makeTemplateObject", __makeTemplateObject);
        exporter("__importStar", __importStar);
        exporter("__importDefault", __importDefault);
        exporter("__classPrivateFieldGet", __classPrivateFieldGet);
        exporter("__classPrivateFieldSet", __classPrivateFieldSet);
      });
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/parser.js
  var require_parser = __commonJS({
    "bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/parser.js": function(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {value: true});
      exports.parseUnicodeLocaleId = exports.parseUnicodeLanguageId = exports.isUnicodeVariantSubtag = exports.isUnicodeScriptSubtag = exports.isUnicodeRegionSubtag = exports.isStructurallyValidLanguageTag = exports.isUnicodeLanguageSubtag = exports.SEPARATOR = void 0;
      var tslib_1 = require_tslib();
      var ALPHANUM_1_8 = /^[a-z0-9]{1,8}$/i;
      var ALPHANUM_2_8 = /^[a-z0-9]{2,8}$/i;
      var ALPHANUM_3_8 = /^[a-z0-9]{3,8}$/i;
      var KEY_REGEX = /^[a-z0-9][a-z]$/i;
      var TYPE_REGEX = /^[a-z0-9]{3,8}$/i;
      var ALPHA_4 = /^[a-z]{4}$/i;
      var OTHER_EXTENSION_TYPE = /^[0-9a-svwyz]$/i;
      var UNICODE_REGION_SUBTAG_REGEX = /^([a-z]{2}|[0-9]{3})$/i;
      var UNICODE_VARIANT_SUBTAG_REGEX = /^([a-z0-9]{5,8}|[0-9][a-z0-9]{3})$/i;
      var UNICODE_LANGUAGE_SUBTAG_REGEX = /^([a-z]{2,3}|[a-z]{5,8})$/i;
      var TKEY_REGEX = /^[a-z][0-9]$/i;
      exports.SEPARATOR = "-";
      function isUnicodeLanguageSubtag2(lang) {
        return UNICODE_LANGUAGE_SUBTAG_REGEX.test(lang);
      }
      exports.isUnicodeLanguageSubtag = isUnicodeLanguageSubtag2;
      function isStructurallyValidLanguageTag2(tag) {
        try {
          parseUnicodeLanguageId2(tag.split(exports.SEPARATOR));
        } catch (e) {
          return false;
        }
        return true;
      }
      exports.isStructurallyValidLanguageTag = isStructurallyValidLanguageTag2;
      function isUnicodeRegionSubtag2(region) {
        return UNICODE_REGION_SUBTAG_REGEX.test(region);
      }
      exports.isUnicodeRegionSubtag = isUnicodeRegionSubtag2;
      function isUnicodeScriptSubtag2(script) {
        return ALPHA_4.test(script);
      }
      exports.isUnicodeScriptSubtag = isUnicodeScriptSubtag2;
      function isUnicodeVariantSubtag(variant) {
        return UNICODE_VARIANT_SUBTAG_REGEX.test(variant);
      }
      exports.isUnicodeVariantSubtag = isUnicodeVariantSubtag;
      function parseUnicodeLanguageId2(chunks) {
        if (typeof chunks === "string") {
          chunks = chunks.split(exports.SEPARATOR);
        }
        var lang = chunks.shift();
        if (!lang) {
          throw new RangeError("Missing unicode_language_subtag");
        }
        if (lang === "root") {
          return {lang: "root", variants: []};
        }
        if (!isUnicodeLanguageSubtag2(lang)) {
          throw new RangeError("Malformed unicode_language_subtag");
        }
        var script;
        if (chunks.length && isUnicodeScriptSubtag2(chunks[0])) {
          script = chunks.shift();
        }
        var region;
        if (chunks.length && isUnicodeRegionSubtag2(chunks[0])) {
          region = chunks.shift();
        }
        var variants = {};
        while (chunks.length && isUnicodeVariantSubtag(chunks[0])) {
          var variant = chunks.shift();
          if (variant in variants) {
            throw new RangeError('Duplicate variant "' + variant + '"');
          }
          variants[variant] = 1;
        }
        return {
          lang: lang,
          script: script,
          region: region,
          variants: Object.keys(variants)
        };
      }
      exports.parseUnicodeLanguageId = parseUnicodeLanguageId2;
      function parseUnicodeExtension(chunks) {
        var keywords = [];
        var keyword;
        while (chunks.length && (keyword = parseKeyword(chunks))) {
          keywords.push(keyword);
        }
        if (keywords.length) {
          return {
            type: "u",
            keywords: keywords,
            attributes: []
          };
        }
        var attributes = [];
        while (chunks.length && ALPHANUM_3_8.test(chunks[0])) {
          attributes.push(chunks.shift());
        }
        while (chunks.length && (keyword = parseKeyword(chunks))) {
          keywords.push(keyword);
        }
        if (keywords.length || attributes.length) {
          return {
            type: "u",
            attributes: attributes,
            keywords: keywords
          };
        }
        throw new RangeError("Malformed unicode_extension");
      }
      function parseKeyword(chunks) {
        var key;
        if (!KEY_REGEX.test(chunks[0])) {
          return;
        }
        key = chunks.shift();
        var type = [];
        while (chunks.length && TYPE_REGEX.test(chunks[0])) {
          type.push(chunks.shift());
        }
        var value = "";
        if (type.length) {
          value = type.join(exports.SEPARATOR);
        }
        return [key, value];
      }
      function parseTransformedExtension(chunks) {
        var lang;
        try {
          lang = parseUnicodeLanguageId2(chunks);
        } catch (e) {
        }
        var fields = [];
        while (chunks.length && TKEY_REGEX.test(chunks[0])) {
          var key = chunks.shift();
          var value = [];
          while (chunks.length && ALPHANUM_3_8.test(chunks[0])) {
            value.push(chunks.shift());
          }
          if (!value.length) {
            throw new RangeError('Missing tvalue for tkey "' + key + '"');
          }
          fields.push([key, value.join(exports.SEPARATOR)]);
        }
        if (fields.length) {
          return {
            type: "t",
            fields: fields,
            lang: lang
          };
        }
        throw new RangeError("Malformed transformed_extension");
      }
      function parsePuExtension(chunks) {
        var exts = [];
        while (chunks.length && ALPHANUM_1_8.test(chunks[0])) {
          exts.push(chunks.shift());
        }
        if (exts.length) {
          return {
            type: "x",
            value: exts.join(exports.SEPARATOR)
          };
        }
        throw new RangeError("Malformed private_use_extension");
      }
      function parseOtherExtensionValue(chunks) {
        var exts = [];
        while (chunks.length && ALPHANUM_2_8.test(chunks[0])) {
          exts.push(chunks.shift());
        }
        if (exts.length) {
          return exts.join(exports.SEPARATOR);
        }
        return "";
      }
      function parseExtensions(chunks) {
        if (!chunks.length) {
          return {extensions: []};
        }
        var extensions = [];
        var unicodeExtension;
        var transformedExtension;
        var puExtension;
        var otherExtensionMap = {};
        do {
          var type = chunks.shift();
          switch (type) {
            case "u":
            case "U":
              if (unicodeExtension) {
                throw new RangeError("There can only be 1 -u- extension");
              }
              unicodeExtension = parseUnicodeExtension(chunks);
              extensions.push(unicodeExtension);
              break;
            case "t":
            case "T":
              if (transformedExtension) {
                throw new RangeError("There can only be 1 -t- extension");
              }
              transformedExtension = parseTransformedExtension(chunks);
              extensions.push(transformedExtension);
              break;
            case "x":
            case "X":
              if (puExtension) {
                throw new RangeError("There can only be 1 -x- extension");
              }
              puExtension = parsePuExtension(chunks);
              extensions.push(puExtension);
              break;
            default:
              if (!OTHER_EXTENSION_TYPE.test(type)) {
                throw new RangeError("Malformed extension type");
              }
              if (type in otherExtensionMap) {
                throw new RangeError("There can only be 1 -" + type + "- extension");
              }
              var extension = {
                type: type,
                value: parseOtherExtensionValue(chunks)
              };
              otherExtensionMap[extension.type] = extension;
              extensions.push(extension);
              break;
          }
        } while (chunks.length);
        return {extensions: extensions};
      }
      function parseUnicodeLocaleId2(locale) {
        var chunks = locale.split(exports.SEPARATOR);
        var lang = parseUnicodeLanguageId2(chunks);
        return tslib_1.__assign({lang: lang}, parseExtensions(chunks));
      }
      exports.parseUnicodeLocaleId = parseUnicodeLocaleId2;
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/emitter.js
  var require_emitter = __commonJS({
    "bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/emitter.js": function(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {value: true});
      exports.emitUnicodeLocaleId = exports.emitUnicodeLanguageId = void 0;
      var tslib_1 = require_tslib();
      function emitUnicodeLanguageId2(lang) {
        if (!lang) {
          return "";
        }
        return tslib_1.__spreadArray([lang.lang, lang.script, lang.region], lang.variants || []).filter(Boolean).join("-");
      }
      exports.emitUnicodeLanguageId = emitUnicodeLanguageId2;
      function emitUnicodeLocaleId2(_a) {
        var lang = _a.lang, extensions = _a.extensions;
        var chunks = [emitUnicodeLanguageId2(lang)];
        for (var _i = 0, extensions_1 = extensions; _i < extensions_1.length; _i++) {
          var ext = extensions_1[_i];
          chunks.push(ext.type);
          switch (ext.type) {
            case "u":
              chunks.push.apply(chunks, tslib_1.__spreadArray(tslib_1.__spreadArray([], ext.attributes), ext.keywords.reduce(function(all, kv) {
                return all.concat(kv);
              }, [])));
              break;
            case "t":
              chunks.push.apply(chunks, tslib_1.__spreadArray([emitUnicodeLanguageId2(ext.lang)], ext.fields.reduce(function(all, kv) {
                return all.concat(kv);
              }, [])));
              break;
            default:
              chunks.push(ext.value);
              break;
          }
        }
        return chunks.filter(Boolean).join("-");
      }
      exports.emitUnicodeLocaleId = emitUnicodeLocaleId2;
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/data/aliases.js
  var require_aliases = __commonJS({
    "bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/data/aliases.js": function(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {value: true});
      exports.variantAlias = exports.scriptAlias = exports.territoryAlias = exports.languageAlias = void 0;
      exports.languageAlias = {
        "aa-saaho": "ssy",
        "aam": "aas",
        "aar": "aa",
        "abk": "ab",
        "adp": "dz",
        "afr": "af",
        "agp": "apf",
        "ais": "ami",
        "aju": "jrb",
        "aka": "ak",
        "alb": "sq",
        "als": "sq",
        "amh": "am",
        "ara": "ar",
        "arb": "ar",
        "arg": "an",
        "arm": "hy",
        "art-lojban": "jbo",
        "asd": "snz",
        "asm": "as",
        "aue": "ktz",
        "ava": "av",
        "ave": "ae",
        "aym": "ay",
        "ayr": "ay",
        "ayx": "nun",
        "aze": "az",
        "azj": "az",
        "bak": "ba",
        "bam": "bm",
        "baq": "eu",
        "baz": "nvo",
        "bcc": "bal",
        "bcl": "bik",
        "bel": "be",
        "ben": "bn",
        "bgm": "bcg",
        "bh": "bho",
        "bhk": "fbl",
        "bih": "bho",
        "bis": "bi",
        "bjd": "drl",
        "bjq": "bzc",
        "bkb": "ebk",
        "bod": "bo",
        "bos": "bs",
        "bre": "br",
        "btb": "beb",
        "bul": "bg",
        "bur": "my",
        "bxk": "luy",
        "bxr": "bua",
        "cat": "ca",
        "ccq": "rki",
        "cel-gaulish": "xtg",
        "ces": "cs",
        "cha": "ch",
        "che": "ce",
        "chi": "zh",
        "chu": "cu",
        "chv": "cv",
        "cjr": "mom",
        "cka": "cmr",
        "cld": "syr",
        "cmk": "xch",
        "cmn": "zh",
        "cnr": "sr-ME",
        "cor": "kw",
        "cos": "co",
        "coy": "pij",
        "cqu": "quh",
        "cre": "cr",
        "cwd": "cr",
        "cym": "cy",
        "cze": "cs",
        "daf": "dnj",
        "dan": "da",
        "dap": "njz",
        "deu": "de",
        "dgo": "doi",
        "dhd": "mwr",
        "dik": "din",
        "diq": "zza",
        "dit": "dif",
        "div": "dv",
        "djl": "dze",
        "dkl": "aqd",
        "drh": "mn",
        "drr": "kzk",
        "drw": "fa-AF",
        "dud": "uth",
        "duj": "dwu",
        "dut": "nl",
        "dwl": "dbt",
        "dzo": "dz",
        "ekk": "et",
        "ell": "el",
        "elp": "amq",
        "emk": "man",
        "en-GB-oed": "en-GB-oxendict",
        "eng": "en",
        "epo": "eo",
        "esk": "ik",
        "est": "et",
        "eus": "eu",
        "ewe": "ee",
        "fao": "fo",
        "fas": "fa",
        "fat": "ak",
        "fij": "fj",
        "fin": "fi",
        "fra": "fr",
        "fre": "fr",
        "fry": "fy",
        "fuc": "ff",
        "ful": "ff",
        "gav": "dev",
        "gaz": "om",
        "gbc": "wny",
        "gbo": "grb",
        "geo": "ka",
        "ger": "de",
        "gfx": "vaj",
        "ggn": "gvr",
        "ggo": "esg",
        "ggr": "gtu",
        "gio": "aou",
        "gla": "gd",
        "gle": "ga",
        "glg": "gl",
        "gli": "kzk",
        "glv": "gv",
        "gno": "gon",
        "gre": "el",
        "grn": "gn",
        "gti": "nyc",
        "gug": "gn",
        "guj": "gu",
        "guv": "duz",
        "gya": "gba",
        "hat": "ht",
        "hau": "ha",
        "hbs": "sr-Latn",
        "hdn": "hai",
        "hea": "hmn",
        "heb": "he",
        "her": "hz",
        "him": "srx",
        "hin": "hi",
        "hmo": "ho",
        "hrr": "jal",
        "hrv": "hr",
        "hun": "hu",
        "hy-arevmda": "hyw",
        "hye": "hy",
        "i-ami": "ami",
        "i-bnn": "bnn",
        "i-default": "en-x-i-default",
        "i-enochian": "und-x-i-enochian",
        "i-hak": "hak",
        "i-klingon": "tlh",
        "i-lux": "lb",
        "i-mingo": "see-x-i-mingo",
        "i-navajo": "nv",
        "i-pwn": "pwn",
        "i-tao": "tao",
        "i-tay": "tay",
        "i-tsu": "tsu",
        "ibi": "opa",
        "ibo": "ig",
        "ice": "is",
        "ido": "io",
        "iii": "ii",
        "ike": "iu",
        "iku": "iu",
        "ile": "ie",
        "ill": "ilm",
        "ilw": "gal",
        "in": "id",
        "ina": "ia",
        "ind": "id",
        "ipk": "ik",
        "isl": "is",
        "ita": "it",
        "iw": "he",
        "izi": "eza",
        "jar": "jgk",
        "jav": "jv",
        "jeg": "oyb",
        "ji": "yi",
        "jpn": "ja",
        "jw": "jv",
        "kal": "kl",
        "kan": "kn",
        "kas": "ks",
        "kat": "ka",
        "kau": "kr",
        "kaz": "kk",
        "kdv": "zkd",
        "kgc": "tdf",
        "kgd": "ncq",
        "kgh": "kml",
        "khk": "mn",
        "khm": "km",
        "kik": "ki",
        "kin": "rw",
        "kir": "ky",
        "kmr": "ku",
        "knc": "kr",
        "kng": "kg",
        "knn": "kok",
        "koj": "kwv",
        "kom": "kv",
        "kon": "kg",
        "kor": "ko",
        "kpp": "jkm",
        "kpv": "kv",
        "krm": "bmf",
        "ktr": "dtp",
        "kua": "kj",
        "kur": "ku",
        "kvs": "gdj",
        "kwq": "yam",
        "kxe": "tvd",
        "kxl": "kru",
        "kzh": "dgl",
        "kzj": "dtp",
        "kzt": "dtp",
        "lao": "lo",
        "lat": "la",
        "lav": "lv",
        "lbk": "bnc",
        "leg": "enl",
        "lii": "raq",
        "lim": "li",
        "lin": "ln",
        "lit": "lt",
        "llo": "ngt",
        "lmm": "rmx",
        "ltz": "lb",
        "lub": "lu",
        "lug": "lg",
        "lvs": "lv",
        "mac": "mk",
        "mah": "mh",
        "mal": "ml",
        "mao": "mi",
        "mar": "mr",
        "may": "ms",
        "meg": "cir",
        "mgx": "jbk",
        "mhr": "chm",
        "mkd": "mk",
        "mlg": "mg",
        "mlt": "mt",
        "mnk": "man",
        "mnt": "wnn",
        "mo": "ro",
        "mof": "xnt",
        "mol": "ro",
        "mon": "mn",
        "mri": "mi",
        "msa": "ms",
        "mst": "mry",
        "mup": "raj",
        "mwd": "dmw",
        "mwj": "vaj",
        "mya": "my",
        "myd": "aog",
        "myt": "mry",
        "nad": "xny",
        "nau": "na",
        "nav": "nv",
        "nbf": "nru",
        "nbl": "nr",
        "nbx": "ekc",
        "ncp": "kdz",
        "nde": "nd",
        "ndo": "ng",
        "nep": "ne",
        "nld": "nl",
        "nln": "azd",
        "nlr": "nrk",
        "nno": "nn",
        "nns": "nbr",
        "nnx": "ngv",
        "no-bok": "nb",
        "no-bokmal": "nb",
        "no-nyn": "nn",
        "no-nynorsk": "nn",
        "nob": "nb",
        "noo": "dtd",
        "nor": "no",
        "npi": "ne",
        "nts": "pij",
        "nxu": "bpp",
        "nya": "ny",
        "oci": "oc",
        "ojg": "oj",
        "oji": "oj",
        "ori": "or",
        "orm": "om",
        "ory": "or",
        "oss": "os",
        "oun": "vaj",
        "pan": "pa",
        "pbu": "ps",
        "pcr": "adx",
        "per": "fa",
        "pes": "fa",
        "pli": "pi",
        "plt": "mg",
        "pmc": "huw",
        "pmu": "phr",
        "pnb": "lah",
        "pol": "pl",
        "por": "pt",
        "ppa": "bfy",
        "ppr": "lcq",
        "prs": "fa-AF",
        "pry": "prt",
        "pus": "ps",
        "puz": "pub",
        "que": "qu",
        "quz": "qu",
        "rmr": "emx",
        "rmy": "rom",
        "roh": "rm",
        "ron": "ro",
        "rum": "ro",
        "run": "rn",
        "rus": "ru",
        "sag": "sg",
        "san": "sa",
        "sap": "aqt",
        "sca": "hle",
        "scc": "sr",
        "scr": "hr",
        "sgl": "isk",
        "sgn-BE-FR": "sfb",
        "sgn-BE-NL": "vgt",
        "sgn-BR": "bzs",
        "sgn-CH-DE": "sgg",
        "sgn-CO": "csn",
        "sgn-DE": "gsg",
        "sgn-DK": "dsl",
        "sgn-ES": "ssp",
        "sgn-FR": "fsl",
        "sgn-GB": "bfi",
        "sgn-GR": "gss",
        "sgn-IE": "isg",
        "sgn-IT": "ise",
        "sgn-JP": "jsl",
        "sgn-MX": "mfs",
        "sgn-NI": "ncs",
        "sgn-NL": "dse",
        "sgn-NO": "nsi",
        "sgn-PT": "psr",
        "sgn-SE": "swl",
        "sgn-US": "ase",
        "sgn-ZA": "sfs",
        "sh": "sr-Latn",
        "sin": "si",
        "skk": "oyb",
        "slk": "sk",
        "slo": "sk",
        "slv": "sl",
        "sme": "se",
        "smo": "sm",
        "sna": "sn",
        "snd": "sd",
        "som": "so",
        "sot": "st",
        "spa": "es",
        "spy": "kln",
        "sqi": "sq",
        "src": "sc",
        "srd": "sc",
        "srp": "sr",
        "ssw": "ss",
        "sul": "sgd",
        "sum": "ulw",
        "sun": "su",
        "swa": "sw",
        "swc": "sw-CD",
        "swe": "sv",
        "swh": "sw",
        "tah": "ty",
        "tam": "ta",
        "tat": "tt",
        "tdu": "dtp",
        "tel": "te",
        "tgg": "bjp",
        "tgk": "tg",
        "tgl": "fil",
        "tha": "th",
        "thc": "tpo",
        "thw": "ola",
        "thx": "oyb",
        "tib": "bo",
        "tid": "itd",
        "tie": "ras",
        "tir": "ti",
        "tkk": "twm",
        "tl": "fil",
        "tlw": "weo",
        "tmp": "tyj",
        "tne": "kak",
        "tnf": "fa-AF",
        "ton": "to",
        "tsf": "taj",
        "tsn": "tn",
        "tso": "ts",
        "ttq": "tmh",
        "tuk": "tk",
        "tur": "tr",
        "tw": "ak",
        "twi": "ak",
        "uig": "ug",
        "ukr": "uk",
        "umu": "del",
        "und-aaland": "und-AX",
        "und-arevela": "und",
        "und-arevmda": "und",
        "und-bokmal": "und",
        "und-hakka": "und",
        "und-hepburn-heploc": "und-alalc97",
        "und-lojban": "und",
        "und-nynorsk": "und",
        "und-saaho": "und",
        "und-xiang": "und",
        "unp": "wro",
        "uok": "ema",
        "urd": "ur",
        "uzb": "uz",
        "uzn": "uz",
        "ven": "ve",
        "vie": "vi",
        "vol": "vo",
        "wel": "cy",
        "wgw": "wgb",
        "wit": "nol",
        "wiw": "nwo",
        "wln": "wa",
        "wol": "wo",
        "xba": "cax",
        "xho": "xh",
        "xia": "acn",
        "xkh": "waw",
        "xpe": "kpe",
        "xrq": "dmw",
        "xsj": "suj",
        "xsl": "den",
        "ybd": "rki",
        "ydd": "yi",
        "yen": "ynq",
        "yid": "yi",
        "yiy": "yrm",
        "yma": "lrr",
        "ymt": "mtm",
        "yor": "yo",
        "yos": "zom",
        "yuu": "yug",
        "zai": "zap",
        "zh-cmn": "zh",
        "zh-cmn-Hans": "zh-Hans",
        "zh-cmn-Hant": "zh-Hant",
        "zh-gan": "gan",
        "zh-guoyu": "zh",
        "zh-hakka": "hak",
        "zh-min": "nan-x-zh-min",
        "zh-min-nan": "nan",
        "zh-wuu": "wuu",
        "zh-xiang": "hsn",
        "zh-yue": "yue",
        "zha": "za",
        "zho": "zh",
        "zir": "scv",
        "zsm": "ms",
        "zul": "zu",
        "zyb": "za"
      };
      exports.territoryAlias = {
        "100": "BG",
        "104": "MM",
        "108": "BI",
        "112": "BY",
        "116": "KH",
        "120": "CM",
        "124": "CA",
        "132": "CV",
        "136": "KY",
        "140": "CF",
        "144": "LK",
        "148": "TD",
        "152": "CL",
        "156": "CN",
        "158": "TW",
        "162": "CX",
        "166": "CC",
        "170": "CO",
        "172": "RU AM AZ BY GE KG KZ MD TJ TM UA UZ",
        "174": "KM",
        "175": "YT",
        "178": "CG",
        "180": "CD",
        "184": "CK",
        "188": "CR",
        "191": "HR",
        "192": "CU",
        "196": "CY",
        "200": "CZ SK",
        "203": "CZ",
        "204": "BJ",
        "208": "DK",
        "212": "DM",
        "214": "DO",
        "218": "EC",
        "222": "SV",
        "226": "GQ",
        "230": "ET",
        "231": "ET",
        "232": "ER",
        "233": "EE",
        "234": "FO",
        "238": "FK",
        "239": "GS",
        "242": "FJ",
        "246": "FI",
        "248": "AX",
        "249": "FR",
        "250": "FR",
        "254": "GF",
        "258": "PF",
        "260": "TF",
        "262": "DJ",
        "266": "GA",
        "268": "GE",
        "270": "GM",
        "275": "PS",
        "276": "DE",
        "278": "DE",
        "280": "DE",
        "288": "GH",
        "292": "GI",
        "296": "KI",
        "300": "GR",
        "304": "GL",
        "308": "GD",
        "312": "GP",
        "316": "GU",
        "320": "GT",
        "324": "GN",
        "328": "GY",
        "332": "HT",
        "334": "HM",
        "336": "VA",
        "340": "HN",
        "344": "HK",
        "348": "HU",
        "352": "IS",
        "356": "IN",
        "360": "ID",
        "364": "IR",
        "368": "IQ",
        "372": "IE",
        "376": "IL",
        "380": "IT",
        "384": "CI",
        "388": "JM",
        "392": "JP",
        "398": "KZ",
        "400": "JO",
        "404": "KE",
        "408": "KP",
        "410": "KR",
        "414": "KW",
        "417": "KG",
        "418": "LA",
        "422": "LB",
        "426": "LS",
        "428": "LV",
        "430": "LR",
        "434": "LY",
        "438": "LI",
        "440": "LT",
        "442": "LU",
        "446": "MO",
        "450": "MG",
        "454": "MW",
        "458": "MY",
        "462": "MV",
        "466": "ML",
        "470": "MT",
        "474": "MQ",
        "478": "MR",
        "480": "MU",
        "484": "MX",
        "492": "MC",
        "496": "MN",
        "498": "MD",
        "499": "ME",
        "500": "MS",
        "504": "MA",
        "508": "MZ",
        "512": "OM",
        "516": "NA",
        "520": "NR",
        "524": "NP",
        "528": "NL",
        "530": "CW SX BQ",
        "531": "CW",
        "532": "CW SX BQ",
        "533": "AW",
        "534": "SX",
        "535": "BQ",
        "536": "SA IQ",
        "540": "NC",
        "548": "VU",
        "554": "NZ",
        "558": "NI",
        "562": "NE",
        "566": "NG",
        "570": "NU",
        "574": "NF",
        "578": "NO",
        "580": "MP",
        "581": "UM",
        "582": "FM MH MP PW",
        "583": "FM",
        "584": "MH",
        "585": "PW",
        "586": "PK",
        "591": "PA",
        "598": "PG",
        "600": "PY",
        "604": "PE",
        "608": "PH",
        "612": "PN",
        "616": "PL",
        "620": "PT",
        "624": "GW",
        "626": "TL",
        "630": "PR",
        "634": "QA",
        "638": "RE",
        "642": "RO",
        "643": "RU",
        "646": "RW",
        "652": "BL",
        "654": "SH",
        "659": "KN",
        "660": "AI",
        "662": "LC",
        "663": "MF",
        "666": "PM",
        "670": "VC",
        "674": "SM",
        "678": "ST",
        "682": "SA",
        "686": "SN",
        "688": "RS",
        "690": "SC",
        "694": "SL",
        "702": "SG",
        "703": "SK",
        "704": "VN",
        "705": "SI",
        "706": "SO",
        "710": "ZA",
        "716": "ZW",
        "720": "YE",
        "724": "ES",
        "728": "SS",
        "729": "SD",
        "732": "EH",
        "736": "SD",
        "740": "SR",
        "744": "SJ",
        "748": "SZ",
        "752": "SE",
        "756": "CH",
        "760": "SY",
        "762": "TJ",
        "764": "TH",
        "768": "TG",
        "772": "TK",
        "776": "TO",
        "780": "TT",
        "784": "AE",
        "788": "TN",
        "792": "TR",
        "795": "TM",
        "796": "TC",
        "798": "TV",
        "800": "UG",
        "804": "UA",
        "807": "MK",
        "810": "RU AM AZ BY EE GE KZ KG LV LT MD TJ TM UA UZ",
        "818": "EG",
        "826": "GB",
        "830": "JE GG",
        "831": "GG",
        "832": "JE",
        "833": "IM",
        "834": "TZ",
        "840": "US",
        "850": "VI",
        "854": "BF",
        "858": "UY",
        "860": "UZ",
        "862": "VE",
        "876": "WF",
        "882": "WS",
        "886": "YE",
        "887": "YE",
        "890": "RS ME SI HR MK BA",
        "891": "RS ME",
        "894": "ZM",
        "958": "AA",
        "959": "QM",
        "960": "QN",
        "962": "QP",
        "963": "QQ",
        "964": "QR",
        "965": "QS",
        "966": "QT",
        "967": "EU",
        "968": "QV",
        "969": "QW",
        "970": "QX",
        "971": "QY",
        "972": "QZ",
        "973": "XA",
        "974": "XB",
        "975": "XC",
        "976": "XD",
        "977": "XE",
        "978": "XF",
        "979": "XG",
        "980": "XH",
        "981": "XI",
        "982": "XJ",
        "983": "XK",
        "984": "XL",
        "985": "XM",
        "986": "XN",
        "987": "XO",
        "988": "XP",
        "989": "XQ",
        "990": "XR",
        "991": "XS",
        "992": "XT",
        "993": "XU",
        "994": "XV",
        "995": "XW",
        "996": "XX",
        "997": "XY",
        "998": "XZ",
        "999": "ZZ",
        "004": "AF",
        "008": "AL",
        "010": "AQ",
        "012": "DZ",
        "016": "AS",
        "020": "AD",
        "024": "AO",
        "028": "AG",
        "031": "AZ",
        "032": "AR",
        "036": "AU",
        "040": "AT",
        "044": "BS",
        "048": "BH",
        "050": "BD",
        "051": "AM",
        "052": "BB",
        "056": "BE",
        "060": "BM",
        "062": "034 143",
        "064": "BT",
        "068": "BO",
        "070": "BA",
        "072": "BW",
        "074": "BV",
        "076": "BR",
        "084": "BZ",
        "086": "IO",
        "090": "SB",
        "092": "VG",
        "096": "BN",
        "AAA": "AA",
        "ABW": "AW",
        "AFG": "AF",
        "AGO": "AO",
        "AIA": "AI",
        "ALA": "AX",
        "ALB": "AL",
        "AN": "CW SX BQ",
        "AND": "AD",
        "ANT": "CW SX BQ",
        "ARE": "AE",
        "ARG": "AR",
        "ARM": "AM",
        "ASC": "AC",
        "ASM": "AS",
        "ATA": "AQ",
        "ATF": "TF",
        "ATG": "AG",
        "AUS": "AU",
        "AUT": "AT",
        "AZE": "AZ",
        "BDI": "BI",
        "BEL": "BE",
        "BEN": "BJ",
        "BES": "BQ",
        "BFA": "BF",
        "BGD": "BD",
        "BGR": "BG",
        "BHR": "BH",
        "BHS": "BS",
        "BIH": "BA",
        "BLM": "BL",
        "BLR": "BY",
        "BLZ": "BZ",
        "BMU": "BM",
        "BOL": "BO",
        "BRA": "BR",
        "BRB": "BB",
        "BRN": "BN",
        "BTN": "BT",
        "BU": "MM",
        "BUR": "MM",
        "BVT": "BV",
        "BWA": "BW",
        "CAF": "CF",
        "CAN": "CA",
        "CCK": "CC",
        "CHE": "CH",
        "CHL": "CL",
        "CHN": "CN",
        "CIV": "CI",
        "CMR": "CM",
        "COD": "CD",
        "COG": "CG",
        "COK": "CK",
        "COL": "CO",
        "COM": "KM",
        "CPT": "CP",
        "CPV": "CV",
        "CRI": "CR",
        "CS": "RS ME",
        "CT": "KI",
        "CUB": "CU",
        "CUW": "CW",
        "CXR": "CX",
        "CYM": "KY",
        "CYP": "CY",
        "CZE": "CZ",
        "DD": "DE",
        "DDR": "DE",
        "DEU": "DE",
        "DGA": "DG",
        "DJI": "DJ",
        "DMA": "DM",
        "DNK": "DK",
        "DOM": "DO",
        "DY": "BJ",
        "DZA": "DZ",
        "ECU": "EC",
        "EGY": "EG",
        "ERI": "ER",
        "ESH": "EH",
        "ESP": "ES",
        "EST": "EE",
        "ETH": "ET",
        "FIN": "FI",
        "FJI": "FJ",
        "FLK": "FK",
        "FQ": "AQ TF",
        "FRA": "FR",
        "FRO": "FO",
        "FSM": "FM",
        "FX": "FR",
        "FXX": "FR",
        "GAB": "GA",
        "GBR": "GB",
        "GEO": "GE",
        "GGY": "GG",
        "GHA": "GH",
        "GIB": "GI",
        "GIN": "GN",
        "GLP": "GP",
        "GMB": "GM",
        "GNB": "GW",
        "GNQ": "GQ",
        "GRC": "GR",
        "GRD": "GD",
        "GRL": "GL",
        "GTM": "GT",
        "GUF": "GF",
        "GUM": "GU",
        "GUY": "GY",
        "HKG": "HK",
        "HMD": "HM",
        "HND": "HN",
        "HRV": "HR",
        "HTI": "HT",
        "HUN": "HU",
        "HV": "BF",
        "IDN": "ID",
        "IMN": "IM",
        "IND": "IN",
        "IOT": "IO",
        "IRL": "IE",
        "IRN": "IR",
        "IRQ": "IQ",
        "ISL": "IS",
        "ISR": "IL",
        "ITA": "IT",
        "JAM": "JM",
        "JEY": "JE",
        "JOR": "JO",
        "JPN": "JP",
        "JT": "UM",
        "KAZ": "KZ",
        "KEN": "KE",
        "KGZ": "KG",
        "KHM": "KH",
        "KIR": "KI",
        "KNA": "KN",
        "KOR": "KR",
        "KWT": "KW",
        "LAO": "LA",
        "LBN": "LB",
        "LBR": "LR",
        "LBY": "LY",
        "LCA": "LC",
        "LIE": "LI",
        "LKA": "LK",
        "LSO": "LS",
        "LTU": "LT",
        "LUX": "LU",
        "LVA": "LV",
        "MAC": "MO",
        "MAF": "MF",
        "MAR": "MA",
        "MCO": "MC",
        "MDA": "MD",
        "MDG": "MG",
        "MDV": "MV",
        "MEX": "MX",
        "MHL": "MH",
        "MI": "UM",
        "MKD": "MK",
        "MLI": "ML",
        "MLT": "MT",
        "MMR": "MM",
        "MNE": "ME",
        "MNG": "MN",
        "MNP": "MP",
        "MOZ": "MZ",
        "MRT": "MR",
        "MSR": "MS",
        "MTQ": "MQ",
        "MUS": "MU",
        "MWI": "MW",
        "MYS": "MY",
        "MYT": "YT",
        "NAM": "NA",
        "NCL": "NC",
        "NER": "NE",
        "NFK": "NF",
        "NGA": "NG",
        "NH": "VU",
        "NIC": "NI",
        "NIU": "NU",
        "NLD": "NL",
        "NOR": "NO",
        "NPL": "NP",
        "NQ": "AQ",
        "NRU": "NR",
        "NT": "SA IQ",
        "NTZ": "SA IQ",
        "NZL": "NZ",
        "OMN": "OM",
        "PAK": "PK",
        "PAN": "PA",
        "PC": "FM MH MP PW",
        "PCN": "PN",
        "PER": "PE",
        "PHL": "PH",
        "PLW": "PW",
        "PNG": "PG",
        "POL": "PL",
        "PRI": "PR",
        "PRK": "KP",
        "PRT": "PT",
        "PRY": "PY",
        "PSE": "PS",
        "PU": "UM",
        "PYF": "PF",
        "PZ": "PA",
        "QAT": "QA",
        "QMM": "QM",
        "QNN": "QN",
        "QPP": "QP",
        "QQQ": "QQ",
        "QRR": "QR",
        "QSS": "QS",
        "QTT": "QT",
        "QU": "EU",
        "QUU": "EU",
        "QVV": "QV",
        "QWW": "QW",
        "QXX": "QX",
        "QYY": "QY",
        "QZZ": "QZ",
        "REU": "RE",
        "RH": "ZW",
        "ROU": "RO",
        "RUS": "RU",
        "RWA": "RW",
        "SAU": "SA",
        "SCG": "RS ME",
        "SDN": "SD",
        "SEN": "SN",
        "SGP": "SG",
        "SGS": "GS",
        "SHN": "SH",
        "SJM": "SJ",
        "SLB": "SB",
        "SLE": "SL",
        "SLV": "SV",
        "SMR": "SM",
        "SOM": "SO",
        "SPM": "PM",
        "SRB": "RS",
        "SSD": "SS",
        "STP": "ST",
        "SU": "RU AM AZ BY EE GE KZ KG LV LT MD TJ TM UA UZ",
        "SUN": "RU AM AZ BY EE GE KZ KG LV LT MD TJ TM UA UZ",
        "SUR": "SR",
        "SVK": "SK",
        "SVN": "SI",
        "SWE": "SE",
        "SWZ": "SZ",
        "SXM": "SX",
        "SYC": "SC",
        "SYR": "SY",
        "TAA": "TA",
        "TCA": "TC",
        "TCD": "TD",
        "TGO": "TG",
        "THA": "TH",
        "TJK": "TJ",
        "TKL": "TK",
        "TKM": "TM",
        "TLS": "TL",
        "TMP": "TL",
        "TON": "TO",
        "TP": "TL",
        "TTO": "TT",
        "TUN": "TN",
        "TUR": "TR",
        "TUV": "TV",
        "TWN": "TW",
        "TZA": "TZ",
        "UGA": "UG",
        "UK": "GB",
        "UKR": "UA",
        "UMI": "UM",
        "URY": "UY",
        "USA": "US",
        "UZB": "UZ",
        "VAT": "VA",
        "VCT": "VC",
        "VD": "VN",
        "VEN": "VE",
        "VGB": "VG",
        "VIR": "VI",
        "VNM": "VN",
        "VUT": "VU",
        "WK": "UM",
        "WLF": "WF",
        "WSM": "WS",
        "XAA": "XA",
        "XBB": "XB",
        "XCC": "XC",
        "XDD": "XD",
        "XEE": "XE",
        "XFF": "XF",
        "XGG": "XG",
        "XHH": "XH",
        "XII": "XI",
        "XJJ": "XJ",
        "XKK": "XK",
        "XLL": "XL",
        "XMM": "XM",
        "XNN": "XN",
        "XOO": "XO",
        "XPP": "XP",
        "XQQ": "XQ",
        "XRR": "XR",
        "XSS": "XS",
        "XTT": "XT",
        "XUU": "XU",
        "XVV": "XV",
        "XWW": "XW",
        "XXX": "XX",
        "XYY": "XY",
        "XZZ": "XZ",
        "YD": "YE",
        "YEM": "YE",
        "YMD": "YE",
        "YU": "RS ME",
        "YUG": "RS ME",
        "ZAF": "ZA",
        "ZAR": "CD",
        "ZMB": "ZM",
        "ZR": "CD",
        "ZWE": "ZW",
        "ZZZ": "ZZ"
      };
      exports.scriptAlias = {
        "Qaai": "Zinh"
      };
      exports.variantAlias = {
        "heploc": "alalc97",
        "polytoni": "polyton"
      };
    }
  });

  // node_modules/cldr-core/supplemental/likelySubtags.json
  var require_likelySubtags = __commonJS({
    "node_modules/cldr-core/supplemental/likelySubtags.json": function(exports, module) {
      module.exports = {
        supplemental: {
          version: {
            _unicodeVersion: "13.0.0",
            _cldrVersion: "39"
          },
          likelySubtags: {
            aa: "aa-Latn-ET",
            aai: "aai-Latn-ZZ",
            aak: "aak-Latn-ZZ",
            aau: "aau-Latn-ZZ",
            ab: "ab-Cyrl-GE",
            abi: "abi-Latn-ZZ",
            abq: "abq-Cyrl-ZZ",
            abr: "abr-Latn-GH",
            abt: "abt-Latn-ZZ",
            aby: "aby-Latn-ZZ",
            acd: "acd-Latn-ZZ",
            ace: "ace-Latn-ID",
            ach: "ach-Latn-UG",
            ada: "ada-Latn-GH",
            ade: "ade-Latn-ZZ",
            adj: "adj-Latn-ZZ",
            adp: "adp-Tibt-BT",
            ady: "ady-Cyrl-RU",
            adz: "adz-Latn-ZZ",
            ae: "ae-Avst-IR",
            aeb: "aeb-Arab-TN",
            aey: "aey-Latn-ZZ",
            af: "af-Latn-ZA",
            agc: "agc-Latn-ZZ",
            agd: "agd-Latn-ZZ",
            agg: "agg-Latn-ZZ",
            agm: "agm-Latn-ZZ",
            ago: "ago-Latn-ZZ",
            agq: "agq-Latn-CM",
            aha: "aha-Latn-ZZ",
            ahl: "ahl-Latn-ZZ",
            aho: "aho-Ahom-IN",
            ajg: "ajg-Latn-ZZ",
            ak: "ak-Latn-GH",
            akk: "akk-Xsux-IQ",
            ala: "ala-Latn-ZZ",
            ali: "ali-Latn-ZZ",
            aln: "aln-Latn-XK",
            alt: "alt-Cyrl-RU",
            am: "am-Ethi-ET",
            amm: "amm-Latn-ZZ",
            amn: "amn-Latn-ZZ",
            amo: "amo-Latn-NG",
            amp: "amp-Latn-ZZ",
            an: "an-Latn-ES",
            anc: "anc-Latn-ZZ",
            ank: "ank-Latn-ZZ",
            ann: "ann-Latn-ZZ",
            any: "any-Latn-ZZ",
            aoj: "aoj-Latn-ZZ",
            aom: "aom-Latn-ZZ",
            aoz: "aoz-Latn-ID",
            apc: "apc-Arab-ZZ",
            apd: "apd-Arab-TG",
            ape: "ape-Latn-ZZ",
            apr: "apr-Latn-ZZ",
            aps: "aps-Latn-ZZ",
            apz: "apz-Latn-ZZ",
            ar: "ar-Arab-EG",
            arc: "arc-Armi-IR",
            "arc-Nbat": "arc-Nbat-JO",
            "arc-Palm": "arc-Palm-SY",
            arh: "arh-Latn-ZZ",
            arn: "arn-Latn-CL",
            aro: "aro-Latn-BO",
            arq: "arq-Arab-DZ",
            ars: "ars-Arab-SA",
            ary: "ary-Arab-MA",
            arz: "arz-Arab-EG",
            as: "as-Beng-IN",
            asa: "asa-Latn-TZ",
            ase: "ase-Sgnw-US",
            asg: "asg-Latn-ZZ",
            aso: "aso-Latn-ZZ",
            ast: "ast-Latn-ES",
            ata: "ata-Latn-ZZ",
            atg: "atg-Latn-ZZ",
            atj: "atj-Latn-CA",
            auy: "auy-Latn-ZZ",
            av: "av-Cyrl-RU",
            avl: "avl-Arab-ZZ",
            avn: "avn-Latn-ZZ",
            avt: "avt-Latn-ZZ",
            avu: "avu-Latn-ZZ",
            awa: "awa-Deva-IN",
            awb: "awb-Latn-ZZ",
            awo: "awo-Latn-ZZ",
            awx: "awx-Latn-ZZ",
            ay: "ay-Latn-BO",
            ayb: "ayb-Latn-ZZ",
            az: "az-Latn-AZ",
            "az-Arab": "az-Arab-IR",
            "az-IQ": "az-Arab-IQ",
            "az-IR": "az-Arab-IR",
            "az-RU": "az-Cyrl-RU",
            ba: "ba-Cyrl-RU",
            bal: "bal-Arab-PK",
            ban: "ban-Latn-ID",
            bap: "bap-Deva-NP",
            bar: "bar-Latn-AT",
            bas: "bas-Latn-CM",
            bav: "bav-Latn-ZZ",
            bax: "bax-Bamu-CM",
            bba: "bba-Latn-ZZ",
            bbb: "bbb-Latn-ZZ",
            bbc: "bbc-Latn-ID",
            bbd: "bbd-Latn-ZZ",
            bbj: "bbj-Latn-CM",
            bbp: "bbp-Latn-ZZ",
            bbr: "bbr-Latn-ZZ",
            bcf: "bcf-Latn-ZZ",
            bch: "bch-Latn-ZZ",
            bci: "bci-Latn-CI",
            bcm: "bcm-Latn-ZZ",
            bcn: "bcn-Latn-ZZ",
            bco: "bco-Latn-ZZ",
            bcq: "bcq-Ethi-ZZ",
            bcu: "bcu-Latn-ZZ",
            bdd: "bdd-Latn-ZZ",
            be: "be-Cyrl-BY",
            bef: "bef-Latn-ZZ",
            beh: "beh-Latn-ZZ",
            bej: "bej-Arab-SD",
            bem: "bem-Latn-ZM",
            bet: "bet-Latn-ZZ",
            bew: "bew-Latn-ID",
            bex: "bex-Latn-ZZ",
            bez: "bez-Latn-TZ",
            bfd: "bfd-Latn-CM",
            bfq: "bfq-Taml-IN",
            bft: "bft-Arab-PK",
            bfy: "bfy-Deva-IN",
            bg: "bg-Cyrl-BG",
            bgc: "bgc-Deva-IN",
            bgn: "bgn-Arab-PK",
            bgx: "bgx-Grek-TR",
            bhb: "bhb-Deva-IN",
            bhg: "bhg-Latn-ZZ",
            bhi: "bhi-Deva-IN",
            bhl: "bhl-Latn-ZZ",
            bho: "bho-Deva-IN",
            bhy: "bhy-Latn-ZZ",
            bi: "bi-Latn-VU",
            bib: "bib-Latn-ZZ",
            big: "big-Latn-ZZ",
            bik: "bik-Latn-PH",
            bim: "bim-Latn-ZZ",
            bin: "bin-Latn-NG",
            bio: "bio-Latn-ZZ",
            biq: "biq-Latn-ZZ",
            bjh: "bjh-Latn-ZZ",
            bji: "bji-Ethi-ZZ",
            bjj: "bjj-Deva-IN",
            bjn: "bjn-Latn-ID",
            bjo: "bjo-Latn-ZZ",
            bjr: "bjr-Latn-ZZ",
            bjt: "bjt-Latn-SN",
            bjz: "bjz-Latn-ZZ",
            bkc: "bkc-Latn-ZZ",
            bkm: "bkm-Latn-CM",
            bkq: "bkq-Latn-ZZ",
            bku: "bku-Latn-PH",
            bkv: "bkv-Latn-ZZ",
            blt: "blt-Tavt-VN",
            bm: "bm-Latn-ML",
            bmh: "bmh-Latn-ZZ",
            bmk: "bmk-Latn-ZZ",
            bmq: "bmq-Latn-ML",
            bmu: "bmu-Latn-ZZ",
            bn: "bn-Beng-BD",
            bng: "bng-Latn-ZZ",
            bnm: "bnm-Latn-ZZ",
            bnp: "bnp-Latn-ZZ",
            bo: "bo-Tibt-CN",
            boj: "boj-Latn-ZZ",
            bom: "bom-Latn-ZZ",
            bon: "bon-Latn-ZZ",
            bpy: "bpy-Beng-IN",
            bqc: "bqc-Latn-ZZ",
            bqi: "bqi-Arab-IR",
            bqp: "bqp-Latn-ZZ",
            bqv: "bqv-Latn-CI",
            br: "br-Latn-FR",
            bra: "bra-Deva-IN",
            brh: "brh-Arab-PK",
            brx: "brx-Deva-IN",
            brz: "brz-Latn-ZZ",
            bs: "bs-Latn-BA",
            bsj: "bsj-Latn-ZZ",
            bsq: "bsq-Bass-LR",
            bss: "bss-Latn-CM",
            bst: "bst-Ethi-ZZ",
            bto: "bto-Latn-PH",
            btt: "btt-Latn-ZZ",
            btv: "btv-Deva-PK",
            bua: "bua-Cyrl-RU",
            buc: "buc-Latn-YT",
            bud: "bud-Latn-ZZ",
            bug: "bug-Latn-ID",
            buk: "buk-Latn-ZZ",
            bum: "bum-Latn-CM",
            buo: "buo-Latn-ZZ",
            bus: "bus-Latn-ZZ",
            buu: "buu-Latn-ZZ",
            bvb: "bvb-Latn-GQ",
            bwd: "bwd-Latn-ZZ",
            bwr: "bwr-Latn-ZZ",
            bxh: "bxh-Latn-ZZ",
            bye: "bye-Latn-ZZ",
            byn: "byn-Ethi-ER",
            byr: "byr-Latn-ZZ",
            bys: "bys-Latn-ZZ",
            byv: "byv-Latn-CM",
            byx: "byx-Latn-ZZ",
            bza: "bza-Latn-ZZ",
            bze: "bze-Latn-ML",
            bzf: "bzf-Latn-ZZ",
            bzh: "bzh-Latn-ZZ",
            bzw: "bzw-Latn-ZZ",
            ca: "ca-Latn-ES",
            cad: "cad-Latn-US",
            can: "can-Latn-ZZ",
            cbj: "cbj-Latn-ZZ",
            cch: "cch-Latn-NG",
            ccp: "ccp-Cakm-BD",
            ce: "ce-Cyrl-RU",
            ceb: "ceb-Latn-PH",
            cfa: "cfa-Latn-ZZ",
            cgg: "cgg-Latn-UG",
            ch: "ch-Latn-GU",
            chk: "chk-Latn-FM",
            chm: "chm-Cyrl-RU",
            cho: "cho-Latn-US",
            chp: "chp-Latn-CA",
            chr: "chr-Cher-US",
            cic: "cic-Latn-US",
            cja: "cja-Arab-KH",
            cjm: "cjm-Cham-VN",
            cjv: "cjv-Latn-ZZ",
            ckb: "ckb-Arab-IQ",
            ckl: "ckl-Latn-ZZ",
            cko: "cko-Latn-ZZ",
            cky: "cky-Latn-ZZ",
            cla: "cla-Latn-ZZ",
            cme: "cme-Latn-ZZ",
            cmg: "cmg-Soyo-MN",
            co: "co-Latn-FR",
            cop: "cop-Copt-EG",
            cps: "cps-Latn-PH",
            cr: "cr-Cans-CA",
            crh: "crh-Cyrl-UA",
            crj: "crj-Cans-CA",
            crk: "crk-Cans-CA",
            crl: "crl-Cans-CA",
            crm: "crm-Cans-CA",
            crs: "crs-Latn-SC",
            cs: "cs-Latn-CZ",
            csb: "csb-Latn-PL",
            csw: "csw-Cans-CA",
            ctd: "ctd-Pauc-MM",
            cu: "cu-Cyrl-RU",
            "cu-Glag": "cu-Glag-BG",
            cv: "cv-Cyrl-RU",
            cy: "cy-Latn-GB",
            da: "da-Latn-DK",
            dad: "dad-Latn-ZZ",
            daf: "daf-Latn-CI",
            dag: "dag-Latn-ZZ",
            dah: "dah-Latn-ZZ",
            dak: "dak-Latn-US",
            dar: "dar-Cyrl-RU",
            dav: "dav-Latn-KE",
            dbd: "dbd-Latn-ZZ",
            dbq: "dbq-Latn-ZZ",
            dcc: "dcc-Arab-IN",
            ddn: "ddn-Latn-ZZ",
            de: "de-Latn-DE",
            ded: "ded-Latn-ZZ",
            den: "den-Latn-CA",
            dga: "dga-Latn-ZZ",
            dgh: "dgh-Latn-ZZ",
            dgi: "dgi-Latn-ZZ",
            dgl: "dgl-Arab-ZZ",
            dgr: "dgr-Latn-CA",
            dgz: "dgz-Latn-ZZ",
            dia: "dia-Latn-ZZ",
            dje: "dje-Latn-NE",
            dmf: "dmf-Medf-NG",
            dnj: "dnj-Latn-CI",
            dob: "dob-Latn-ZZ",
            doi: "doi-Deva-IN",
            dop: "dop-Latn-ZZ",
            dow: "dow-Latn-ZZ",
            drh: "drh-Mong-CN",
            dri: "dri-Latn-ZZ",
            drs: "drs-Ethi-ZZ",
            dsb: "dsb-Latn-DE",
            dtm: "dtm-Latn-ML",
            dtp: "dtp-Latn-MY",
            dts: "dts-Latn-ZZ",
            dty: "dty-Deva-NP",
            dua: "dua-Latn-CM",
            duc: "duc-Latn-ZZ",
            dud: "dud-Latn-ZZ",
            dug: "dug-Latn-ZZ",
            dv: "dv-Thaa-MV",
            dva: "dva-Latn-ZZ",
            dww: "dww-Latn-ZZ",
            dyo: "dyo-Latn-SN",
            dyu: "dyu-Latn-BF",
            dz: "dz-Tibt-BT",
            dzg: "dzg-Latn-ZZ",
            ebu: "ebu-Latn-KE",
            ee: "ee-Latn-GH",
            efi: "efi-Latn-NG",
            egl: "egl-Latn-IT",
            egy: "egy-Egyp-EG",
            eka: "eka-Latn-ZZ",
            eky: "eky-Kali-MM",
            el: "el-Grek-GR",
            ema: "ema-Latn-ZZ",
            emi: "emi-Latn-ZZ",
            en: "en-Latn-US",
            "en-Shaw": "en-Shaw-GB",
            enn: "enn-Latn-ZZ",
            enq: "enq-Latn-ZZ",
            eo: "eo-Latn-001",
            eri: "eri-Latn-ZZ",
            es: "es-Latn-ES",
            esg: "esg-Gonm-IN",
            esu: "esu-Latn-US",
            et: "et-Latn-EE",
            etr: "etr-Latn-ZZ",
            ett: "ett-Ital-IT",
            etu: "etu-Latn-ZZ",
            etx: "etx-Latn-ZZ",
            eu: "eu-Latn-ES",
            ewo: "ewo-Latn-CM",
            ext: "ext-Latn-ES",
            eza: "eza-Latn-ZZ",
            fa: "fa-Arab-IR",
            faa: "faa-Latn-ZZ",
            fab: "fab-Latn-ZZ",
            fag: "fag-Latn-ZZ",
            fai: "fai-Latn-ZZ",
            fan: "fan-Latn-GQ",
            ff: "ff-Latn-SN",
            "ff-Adlm": "ff-Adlm-GN",
            ffi: "ffi-Latn-ZZ",
            ffm: "ffm-Latn-ML",
            fi: "fi-Latn-FI",
            fia: "fia-Arab-SD",
            fil: "fil-Latn-PH",
            fit: "fit-Latn-SE",
            fj: "fj-Latn-FJ",
            flr: "flr-Latn-ZZ",
            fmp: "fmp-Latn-ZZ",
            fo: "fo-Latn-FO",
            fod: "fod-Latn-ZZ",
            fon: "fon-Latn-BJ",
            for: "for-Latn-ZZ",
            fpe: "fpe-Latn-ZZ",
            fqs: "fqs-Latn-ZZ",
            fr: "fr-Latn-FR",
            frc: "frc-Latn-US",
            frp: "frp-Latn-FR",
            frr: "frr-Latn-DE",
            frs: "frs-Latn-DE",
            fub: "fub-Arab-CM",
            fud: "fud-Latn-WF",
            fue: "fue-Latn-ZZ",
            fuf: "fuf-Latn-GN",
            fuh: "fuh-Latn-ZZ",
            fuq: "fuq-Latn-NE",
            fur: "fur-Latn-IT",
            fuv: "fuv-Latn-NG",
            fuy: "fuy-Latn-ZZ",
            fvr: "fvr-Latn-SD",
            fy: "fy-Latn-NL",
            ga: "ga-Latn-IE",
            gaa: "gaa-Latn-GH",
            gaf: "gaf-Latn-ZZ",
            gag: "gag-Latn-MD",
            gah: "gah-Latn-ZZ",
            gaj: "gaj-Latn-ZZ",
            gam: "gam-Latn-ZZ",
            gan: "gan-Hans-CN",
            gaw: "gaw-Latn-ZZ",
            gay: "gay-Latn-ID",
            gba: "gba-Latn-ZZ",
            gbf: "gbf-Latn-ZZ",
            gbm: "gbm-Deva-IN",
            gby: "gby-Latn-ZZ",
            gbz: "gbz-Arab-IR",
            gcr: "gcr-Latn-GF",
            gd: "gd-Latn-GB",
            gde: "gde-Latn-ZZ",
            gdn: "gdn-Latn-ZZ",
            gdr: "gdr-Latn-ZZ",
            geb: "geb-Latn-ZZ",
            gej: "gej-Latn-ZZ",
            gel: "gel-Latn-ZZ",
            gez: "gez-Ethi-ET",
            gfk: "gfk-Latn-ZZ",
            ggn: "ggn-Deva-NP",
            ghs: "ghs-Latn-ZZ",
            gil: "gil-Latn-KI",
            gim: "gim-Latn-ZZ",
            gjk: "gjk-Arab-PK",
            gjn: "gjn-Latn-ZZ",
            gju: "gju-Arab-PK",
            gkn: "gkn-Latn-ZZ",
            gkp: "gkp-Latn-ZZ",
            gl: "gl-Latn-ES",
            glk: "glk-Arab-IR",
            gmm: "gmm-Latn-ZZ",
            gmv: "gmv-Ethi-ZZ",
            gn: "gn-Latn-PY",
            gnd: "gnd-Latn-ZZ",
            gng: "gng-Latn-ZZ",
            god: "god-Latn-ZZ",
            gof: "gof-Ethi-ZZ",
            goi: "goi-Latn-ZZ",
            gom: "gom-Deva-IN",
            gon: "gon-Telu-IN",
            gor: "gor-Latn-ID",
            gos: "gos-Latn-NL",
            got: "got-Goth-UA",
            grb: "grb-Latn-ZZ",
            grc: "grc-Cprt-CY",
            "grc-Linb": "grc-Linb-GR",
            grt: "grt-Beng-IN",
            grw: "grw-Latn-ZZ",
            gsw: "gsw-Latn-CH",
            gu: "gu-Gujr-IN",
            gub: "gub-Latn-BR",
            guc: "guc-Latn-CO",
            gud: "gud-Latn-ZZ",
            gur: "gur-Latn-GH",
            guw: "guw-Latn-ZZ",
            gux: "gux-Latn-ZZ",
            guz: "guz-Latn-KE",
            gv: "gv-Latn-IM",
            gvf: "gvf-Latn-ZZ",
            gvr: "gvr-Deva-NP",
            gvs: "gvs-Latn-ZZ",
            gwc: "gwc-Arab-ZZ",
            gwi: "gwi-Latn-CA",
            gwt: "gwt-Arab-ZZ",
            gyi: "gyi-Latn-ZZ",
            ha: "ha-Latn-NG",
            "ha-CM": "ha-Arab-CM",
            "ha-SD": "ha-Arab-SD",
            hag: "hag-Latn-ZZ",
            hak: "hak-Hans-CN",
            ham: "ham-Latn-ZZ",
            haw: "haw-Latn-US",
            haz: "haz-Arab-AF",
            hbb: "hbb-Latn-ZZ",
            hdy: "hdy-Ethi-ZZ",
            he: "he-Hebr-IL",
            hhy: "hhy-Latn-ZZ",
            hi: "hi-Deva-IN",
            hia: "hia-Latn-ZZ",
            hif: "hif-Latn-FJ",
            hig: "hig-Latn-ZZ",
            hih: "hih-Latn-ZZ",
            hil: "hil-Latn-PH",
            hla: "hla-Latn-ZZ",
            hlu: "hlu-Hluw-TR",
            hmd: "hmd-Plrd-CN",
            hmt: "hmt-Latn-ZZ",
            hnd: "hnd-Arab-PK",
            hne: "hne-Deva-IN",
            hnj: "hnj-Hmng-LA",
            hnn: "hnn-Latn-PH",
            hno: "hno-Arab-PK",
            ho: "ho-Latn-PG",
            hoc: "hoc-Deva-IN",
            hoj: "hoj-Deva-IN",
            hot: "hot-Latn-ZZ",
            hr: "hr-Latn-HR",
            hsb: "hsb-Latn-DE",
            hsn: "hsn-Hans-CN",
            ht: "ht-Latn-HT",
            hu: "hu-Latn-HU",
            hui: "hui-Latn-ZZ",
            hy: "hy-Armn-AM",
            hz: "hz-Latn-NA",
            ia: "ia-Latn-001",
            ian: "ian-Latn-ZZ",
            iar: "iar-Latn-ZZ",
            iba: "iba-Latn-MY",
            ibb: "ibb-Latn-NG",
            iby: "iby-Latn-ZZ",
            ica: "ica-Latn-ZZ",
            ich: "ich-Latn-ZZ",
            id: "id-Latn-ID",
            idd: "idd-Latn-ZZ",
            idi: "idi-Latn-ZZ",
            idu: "idu-Latn-ZZ",
            ife: "ife-Latn-TG",
            ig: "ig-Latn-NG",
            igb: "igb-Latn-ZZ",
            ige: "ige-Latn-ZZ",
            ii: "ii-Yiii-CN",
            ijj: "ijj-Latn-ZZ",
            ik: "ik-Latn-US",
            ikk: "ikk-Latn-ZZ",
            ikt: "ikt-Latn-CA",
            ikw: "ikw-Latn-ZZ",
            ikx: "ikx-Latn-ZZ",
            ilo: "ilo-Latn-PH",
            imo: "imo-Latn-ZZ",
            in: "in-Latn-ID",
            inh: "inh-Cyrl-RU",
            io: "io-Latn-001",
            iou: "iou-Latn-ZZ",
            iri: "iri-Latn-ZZ",
            is: "is-Latn-IS",
            it: "it-Latn-IT",
            iu: "iu-Cans-CA",
            iw: "iw-Hebr-IL",
            iwm: "iwm-Latn-ZZ",
            iws: "iws-Latn-ZZ",
            izh: "izh-Latn-RU",
            izi: "izi-Latn-ZZ",
            ja: "ja-Jpan-JP",
            jab: "jab-Latn-ZZ",
            jam: "jam-Latn-JM",
            jar: "jar-Latn-ZZ",
            jbo: "jbo-Latn-001",
            jbu: "jbu-Latn-ZZ",
            jen: "jen-Latn-ZZ",
            jgk: "jgk-Latn-ZZ",
            jgo: "jgo-Latn-CM",
            ji: "ji-Hebr-UA",
            jib: "jib-Latn-ZZ",
            jmc: "jmc-Latn-TZ",
            jml: "jml-Deva-NP",
            jra: "jra-Latn-ZZ",
            jut: "jut-Latn-DK",
            jv: "jv-Latn-ID",
            jw: "jw-Latn-ID",
            ka: "ka-Geor-GE",
            kaa: "kaa-Cyrl-UZ",
            kab: "kab-Latn-DZ",
            kac: "kac-Latn-MM",
            kad: "kad-Latn-ZZ",
            kai: "kai-Latn-ZZ",
            kaj: "kaj-Latn-NG",
            kam: "kam-Latn-KE",
            kao: "kao-Latn-ML",
            kbd: "kbd-Cyrl-RU",
            kbm: "kbm-Latn-ZZ",
            kbp: "kbp-Latn-ZZ",
            kbq: "kbq-Latn-ZZ",
            kbx: "kbx-Latn-ZZ",
            kby: "kby-Arab-NE",
            kcg: "kcg-Latn-NG",
            kck: "kck-Latn-ZW",
            kcl: "kcl-Latn-ZZ",
            kct: "kct-Latn-ZZ",
            kde: "kde-Latn-TZ",
            kdh: "kdh-Arab-TG",
            kdl: "kdl-Latn-ZZ",
            kdt: "kdt-Thai-TH",
            kea: "kea-Latn-CV",
            ken: "ken-Latn-CM",
            kez: "kez-Latn-ZZ",
            kfo: "kfo-Latn-CI",
            kfr: "kfr-Deva-IN",
            kfy: "kfy-Deva-IN",
            kg: "kg-Latn-CD",
            kge: "kge-Latn-ID",
            kgf: "kgf-Latn-ZZ",
            kgp: "kgp-Latn-BR",
            kha: "kha-Latn-IN",
            khb: "khb-Talu-CN",
            khn: "khn-Deva-IN",
            khq: "khq-Latn-ML",
            khs: "khs-Latn-ZZ",
            kht: "kht-Mymr-IN",
            khw: "khw-Arab-PK",
            khz: "khz-Latn-ZZ",
            ki: "ki-Latn-KE",
            kij: "kij-Latn-ZZ",
            kiu: "kiu-Latn-TR",
            kiw: "kiw-Latn-ZZ",
            kj: "kj-Latn-NA",
            kjd: "kjd-Latn-ZZ",
            kjg: "kjg-Laoo-LA",
            kjs: "kjs-Latn-ZZ",
            kjy: "kjy-Latn-ZZ",
            kk: "kk-Cyrl-KZ",
            "kk-AF": "kk-Arab-AF",
            "kk-Arab": "kk-Arab-CN",
            "kk-CN": "kk-Arab-CN",
            "kk-IR": "kk-Arab-IR",
            "kk-MN": "kk-Arab-MN",
            kkc: "kkc-Latn-ZZ",
            kkj: "kkj-Latn-CM",
            kl: "kl-Latn-GL",
            kln: "kln-Latn-KE",
            klq: "klq-Latn-ZZ",
            klt: "klt-Latn-ZZ",
            klx: "klx-Latn-ZZ",
            km: "km-Khmr-KH",
            kmb: "kmb-Latn-AO",
            kmh: "kmh-Latn-ZZ",
            kmo: "kmo-Latn-ZZ",
            kms: "kms-Latn-ZZ",
            kmu: "kmu-Latn-ZZ",
            kmw: "kmw-Latn-ZZ",
            kn: "kn-Knda-IN",
            knf: "knf-Latn-GW",
            knp: "knp-Latn-ZZ",
            ko: "ko-Kore-KR",
            koi: "koi-Cyrl-RU",
            kok: "kok-Deva-IN",
            kol: "kol-Latn-ZZ",
            kos: "kos-Latn-FM",
            koz: "koz-Latn-ZZ",
            kpe: "kpe-Latn-LR",
            kpf: "kpf-Latn-ZZ",
            kpo: "kpo-Latn-ZZ",
            kpr: "kpr-Latn-ZZ",
            kpx: "kpx-Latn-ZZ",
            kqb: "kqb-Latn-ZZ",
            kqf: "kqf-Latn-ZZ",
            kqs: "kqs-Latn-ZZ",
            kqy: "kqy-Ethi-ZZ",
            kr: "kr-Latn-ZZ",
            krc: "krc-Cyrl-RU",
            kri: "kri-Latn-SL",
            krj: "krj-Latn-PH",
            krl: "krl-Latn-RU",
            krs: "krs-Latn-ZZ",
            kru: "kru-Deva-IN",
            ks: "ks-Arab-IN",
            ksb: "ksb-Latn-TZ",
            ksd: "ksd-Latn-ZZ",
            ksf: "ksf-Latn-CM",
            ksh: "ksh-Latn-DE",
            ksj: "ksj-Latn-ZZ",
            ksr: "ksr-Latn-ZZ",
            ktb: "ktb-Ethi-ZZ",
            ktm: "ktm-Latn-ZZ",
            kto: "kto-Latn-ZZ",
            ktr: "ktr-Latn-MY",
            ku: "ku-Latn-TR",
            "ku-Arab": "ku-Arab-IQ",
            "ku-LB": "ku-Arab-LB",
            "ku-Yezi": "ku-Yezi-GE",
            kub: "kub-Latn-ZZ",
            kud: "kud-Latn-ZZ",
            kue: "kue-Latn-ZZ",
            kuj: "kuj-Latn-ZZ",
            kum: "kum-Cyrl-RU",
            kun: "kun-Latn-ZZ",
            kup: "kup-Latn-ZZ",
            kus: "kus-Latn-ZZ",
            kv: "kv-Cyrl-RU",
            kvg: "kvg-Latn-ZZ",
            kvr: "kvr-Latn-ID",
            kvx: "kvx-Arab-PK",
            kw: "kw-Latn-GB",
            kwj: "kwj-Latn-ZZ",
            kwo: "kwo-Latn-ZZ",
            kwq: "kwq-Latn-ZZ",
            kxa: "kxa-Latn-ZZ",
            kxc: "kxc-Ethi-ZZ",
            kxe: "kxe-Latn-ZZ",
            kxl: "kxl-Deva-IN",
            kxm: "kxm-Thai-TH",
            kxp: "kxp-Arab-PK",
            kxw: "kxw-Latn-ZZ",
            kxz: "kxz-Latn-ZZ",
            ky: "ky-Cyrl-KG",
            "ky-Arab": "ky-Arab-CN",
            "ky-CN": "ky-Arab-CN",
            "ky-Latn": "ky-Latn-TR",
            "ky-TR": "ky-Latn-TR",
            kye: "kye-Latn-ZZ",
            kyx: "kyx-Latn-ZZ",
            kzh: "kzh-Arab-ZZ",
            kzj: "kzj-Latn-MY",
            kzr: "kzr-Latn-ZZ",
            kzt: "kzt-Latn-MY",
            la: "la-Latn-VA",
            lab: "lab-Lina-GR",
            lad: "lad-Hebr-IL",
            lag: "lag-Latn-TZ",
            lah: "lah-Arab-PK",
            laj: "laj-Latn-UG",
            las: "las-Latn-ZZ",
            lb: "lb-Latn-LU",
            lbe: "lbe-Cyrl-RU",
            lbu: "lbu-Latn-ZZ",
            lbw: "lbw-Latn-ID",
            lcm: "lcm-Latn-ZZ",
            lcp: "lcp-Thai-CN",
            ldb: "ldb-Latn-ZZ",
            led: "led-Latn-ZZ",
            lee: "lee-Latn-ZZ",
            lem: "lem-Latn-ZZ",
            lep: "lep-Lepc-IN",
            leq: "leq-Latn-ZZ",
            leu: "leu-Latn-ZZ",
            lez: "lez-Cyrl-RU",
            lg: "lg-Latn-UG",
            lgg: "lgg-Latn-ZZ",
            li: "li-Latn-NL",
            lia: "lia-Latn-ZZ",
            lid: "lid-Latn-ZZ",
            lif: "lif-Deva-NP",
            "lif-Limb": "lif-Limb-IN",
            lig: "lig-Latn-ZZ",
            lih: "lih-Latn-ZZ",
            lij: "lij-Latn-IT",
            lis: "lis-Lisu-CN",
            ljp: "ljp-Latn-ID",
            lki: "lki-Arab-IR",
            lkt: "lkt-Latn-US",
            lle: "lle-Latn-ZZ",
            lln: "lln-Latn-ZZ",
            lmn: "lmn-Telu-IN",
            lmo: "lmo-Latn-IT",
            lmp: "lmp-Latn-ZZ",
            ln: "ln-Latn-CD",
            lns: "lns-Latn-ZZ",
            lnu: "lnu-Latn-ZZ",
            lo: "lo-Laoo-LA",
            loj: "loj-Latn-ZZ",
            lok: "lok-Latn-ZZ",
            lol: "lol-Latn-CD",
            lor: "lor-Latn-ZZ",
            los: "los-Latn-ZZ",
            loz: "loz-Latn-ZM",
            lrc: "lrc-Arab-IR",
            lt: "lt-Latn-LT",
            ltg: "ltg-Latn-LV",
            lu: "lu-Latn-CD",
            lua: "lua-Latn-CD",
            luo: "luo-Latn-KE",
            luy: "luy-Latn-KE",
            luz: "luz-Arab-IR",
            lv: "lv-Latn-LV",
            lwl: "lwl-Thai-TH",
            lzh: "lzh-Hans-CN",
            lzz: "lzz-Latn-TR",
            mad: "mad-Latn-ID",
            maf: "maf-Latn-CM",
            mag: "mag-Deva-IN",
            mai: "mai-Deva-IN",
            mak: "mak-Latn-ID",
            man: "man-Latn-GM",
            "man-GN": "man-Nkoo-GN",
            "man-Nkoo": "man-Nkoo-GN",
            mas: "mas-Latn-KE",
            maw: "maw-Latn-ZZ",
            maz: "maz-Latn-MX",
            mbh: "mbh-Latn-ZZ",
            mbo: "mbo-Latn-ZZ",
            mbq: "mbq-Latn-ZZ",
            mbu: "mbu-Latn-ZZ",
            mbw: "mbw-Latn-ZZ",
            mci: "mci-Latn-ZZ",
            mcp: "mcp-Latn-ZZ",
            mcq: "mcq-Latn-ZZ",
            mcr: "mcr-Latn-ZZ",
            mcu: "mcu-Latn-ZZ",
            mda: "mda-Latn-ZZ",
            mde: "mde-Arab-ZZ",
            mdf: "mdf-Cyrl-RU",
            mdh: "mdh-Latn-PH",
            mdj: "mdj-Latn-ZZ",
            mdr: "mdr-Latn-ID",
            mdx: "mdx-Ethi-ZZ",
            med: "med-Latn-ZZ",
            mee: "mee-Latn-ZZ",
            mek: "mek-Latn-ZZ",
            men: "men-Latn-SL",
            mer: "mer-Latn-KE",
            met: "met-Latn-ZZ",
            meu: "meu-Latn-ZZ",
            mfa: "mfa-Arab-TH",
            mfe: "mfe-Latn-MU",
            mfn: "mfn-Latn-ZZ",
            mfo: "mfo-Latn-ZZ",
            mfq: "mfq-Latn-ZZ",
            mg: "mg-Latn-MG",
            mgh: "mgh-Latn-MZ",
            mgl: "mgl-Latn-ZZ",
            mgo: "mgo-Latn-CM",
            mgp: "mgp-Deva-NP",
            mgy: "mgy-Latn-TZ",
            mh: "mh-Latn-MH",
            mhi: "mhi-Latn-ZZ",
            mhl: "mhl-Latn-ZZ",
            mi: "mi-Latn-NZ",
            mif: "mif-Latn-ZZ",
            min: "min-Latn-ID",
            miw: "miw-Latn-ZZ",
            mk: "mk-Cyrl-MK",
            mki: "mki-Arab-ZZ",
            mkl: "mkl-Latn-ZZ",
            mkp: "mkp-Latn-ZZ",
            mkw: "mkw-Latn-ZZ",
            ml: "ml-Mlym-IN",
            mle: "mle-Latn-ZZ",
            mlp: "mlp-Latn-ZZ",
            mls: "mls-Latn-SD",
            mmo: "mmo-Latn-ZZ",
            mmu: "mmu-Latn-ZZ",
            mmx: "mmx-Latn-ZZ",
            mn: "mn-Cyrl-MN",
            "mn-CN": "mn-Mong-CN",
            "mn-Mong": "mn-Mong-CN",
            mna: "mna-Latn-ZZ",
            mnf: "mnf-Latn-ZZ",
            mni: "mni-Beng-IN",
            mnw: "mnw-Mymr-MM",
            mo: "mo-Latn-RO",
            moa: "moa-Latn-ZZ",
            moe: "moe-Latn-CA",
            moh: "moh-Latn-CA",
            mos: "mos-Latn-BF",
            mox: "mox-Latn-ZZ",
            mpp: "mpp-Latn-ZZ",
            mps: "mps-Latn-ZZ",
            mpt: "mpt-Latn-ZZ",
            mpx: "mpx-Latn-ZZ",
            mql: "mql-Latn-ZZ",
            mr: "mr-Deva-IN",
            mrd: "mrd-Deva-NP",
            mrj: "mrj-Cyrl-RU",
            mro: "mro-Mroo-BD",
            ms: "ms-Latn-MY",
            "ms-CC": "ms-Arab-CC",
            mt: "mt-Latn-MT",
            mtc: "mtc-Latn-ZZ",
            mtf: "mtf-Latn-ZZ",
            mti: "mti-Latn-ZZ",
            mtr: "mtr-Deva-IN",
            mua: "mua-Latn-CM",
            mur: "mur-Latn-ZZ",
            mus: "mus-Latn-US",
            mva: "mva-Latn-ZZ",
            mvn: "mvn-Latn-ZZ",
            mvy: "mvy-Arab-PK",
            mwk: "mwk-Latn-ML",
            mwr: "mwr-Deva-IN",
            mwv: "mwv-Latn-ID",
            mww: "mww-Hmnp-US",
            mxc: "mxc-Latn-ZW",
            mxm: "mxm-Latn-ZZ",
            my: "my-Mymr-MM",
            myk: "myk-Latn-ZZ",
            mym: "mym-Ethi-ZZ",
            myv: "myv-Cyrl-RU",
            myw: "myw-Latn-ZZ",
            myx: "myx-Latn-UG",
            myz: "myz-Mand-IR",
            mzk: "mzk-Latn-ZZ",
            mzm: "mzm-Latn-ZZ",
            mzn: "mzn-Arab-IR",
            mzp: "mzp-Latn-ZZ",
            mzw: "mzw-Latn-ZZ",
            mzz: "mzz-Latn-ZZ",
            na: "na-Latn-NR",
            nac: "nac-Latn-ZZ",
            naf: "naf-Latn-ZZ",
            nak: "nak-Latn-ZZ",
            nan: "nan-Hans-CN",
            nap: "nap-Latn-IT",
            naq: "naq-Latn-NA",
            nas: "nas-Latn-ZZ",
            nb: "nb-Latn-NO",
            nca: "nca-Latn-ZZ",
            nce: "nce-Latn-ZZ",
            ncf: "ncf-Latn-ZZ",
            nch: "nch-Latn-MX",
            nco: "nco-Latn-ZZ",
            ncu: "ncu-Latn-ZZ",
            nd: "nd-Latn-ZW",
            ndc: "ndc-Latn-MZ",
            nds: "nds-Latn-DE",
            ne: "ne-Deva-NP",
            neb: "neb-Latn-ZZ",
            new: "new-Deva-NP",
            nex: "nex-Latn-ZZ",
            nfr: "nfr-Latn-ZZ",
            ng: "ng-Latn-NA",
            nga: "nga-Latn-ZZ",
            ngb: "ngb-Latn-ZZ",
            ngl: "ngl-Latn-MZ",
            nhb: "nhb-Latn-ZZ",
            nhe: "nhe-Latn-MX",
            nhw: "nhw-Latn-MX",
            nif: "nif-Latn-ZZ",
            nii: "nii-Latn-ZZ",
            nij: "nij-Latn-ID",
            nin: "nin-Latn-ZZ",
            niu: "niu-Latn-NU",
            niy: "niy-Latn-ZZ",
            niz: "niz-Latn-ZZ",
            njo: "njo-Latn-IN",
            nkg: "nkg-Latn-ZZ",
            nko: "nko-Latn-ZZ",
            nl: "nl-Latn-NL",
            nmg: "nmg-Latn-CM",
            nmz: "nmz-Latn-ZZ",
            nn: "nn-Latn-NO",
            nnf: "nnf-Latn-ZZ",
            nnh: "nnh-Latn-CM",
            nnk: "nnk-Latn-ZZ",
            nnm: "nnm-Latn-ZZ",
            nnp: "nnp-Wcho-IN",
            no: "no-Latn-NO",
            nod: "nod-Lana-TH",
            noe: "noe-Deva-IN",
            non: "non-Runr-SE",
            nop: "nop-Latn-ZZ",
            nou: "nou-Latn-ZZ",
            nqo: "nqo-Nkoo-GN",
            nr: "nr-Latn-ZA",
            nrb: "nrb-Latn-ZZ",
            nsk: "nsk-Cans-CA",
            nsn: "nsn-Latn-ZZ",
            nso: "nso-Latn-ZA",
            nss: "nss-Latn-ZZ",
            ntm: "ntm-Latn-ZZ",
            ntr: "ntr-Latn-ZZ",
            nui: "nui-Latn-ZZ",
            nup: "nup-Latn-ZZ",
            nus: "nus-Latn-SS",
            nuv: "nuv-Latn-ZZ",
            nux: "nux-Latn-ZZ",
            nv: "nv-Latn-US",
            nwb: "nwb-Latn-ZZ",
            nxq: "nxq-Latn-CN",
            nxr: "nxr-Latn-ZZ",
            ny: "ny-Latn-MW",
            nym: "nym-Latn-TZ",
            nyn: "nyn-Latn-UG",
            nzi: "nzi-Latn-GH",
            oc: "oc-Latn-FR",
            ogc: "ogc-Latn-ZZ",
            okr: "okr-Latn-ZZ",
            okv: "okv-Latn-ZZ",
            om: "om-Latn-ET",
            ong: "ong-Latn-ZZ",
            onn: "onn-Latn-ZZ",
            ons: "ons-Latn-ZZ",
            opm: "opm-Latn-ZZ",
            or: "or-Orya-IN",
            oro: "oro-Latn-ZZ",
            oru: "oru-Arab-ZZ",
            os: "os-Cyrl-GE",
            osa: "osa-Osge-US",
            ota: "ota-Arab-ZZ",
            otk: "otk-Orkh-MN",
            ozm: "ozm-Latn-ZZ",
            pa: "pa-Guru-IN",
            "pa-Arab": "pa-Arab-PK",
            "pa-PK": "pa-Arab-PK",
            pag: "pag-Latn-PH",
            pal: "pal-Phli-IR",
            "pal-Phlp": "pal-Phlp-CN",
            pam: "pam-Latn-PH",
            pap: "pap-Latn-AW",
            pau: "pau-Latn-PW",
            pbi: "pbi-Latn-ZZ",
            pcd: "pcd-Latn-FR",
            pcm: "pcm-Latn-NG",
            pdc: "pdc-Latn-US",
            pdt: "pdt-Latn-CA",
            ped: "ped-Latn-ZZ",
            peo: "peo-Xpeo-IR",
            pex: "pex-Latn-ZZ",
            pfl: "pfl-Latn-DE",
            phl: "phl-Arab-ZZ",
            phn: "phn-Phnx-LB",
            pil: "pil-Latn-ZZ",
            pip: "pip-Latn-ZZ",
            pka: "pka-Brah-IN",
            pko: "pko-Latn-KE",
            pl: "pl-Latn-PL",
            pla: "pla-Latn-ZZ",
            pms: "pms-Latn-IT",
            png: "png-Latn-ZZ",
            pnn: "pnn-Latn-ZZ",
            pnt: "pnt-Grek-GR",
            pon: "pon-Latn-FM",
            ppa: "ppa-Deva-IN",
            ppo: "ppo-Latn-ZZ",
            pra: "pra-Khar-PK",
            prd: "prd-Arab-IR",
            prg: "prg-Latn-001",
            ps: "ps-Arab-AF",
            pss: "pss-Latn-ZZ",
            pt: "pt-Latn-BR",
            ptp: "ptp-Latn-ZZ",
            puu: "puu-Latn-GA",
            pwa: "pwa-Latn-ZZ",
            qu: "qu-Latn-PE",
            quc: "quc-Latn-GT",
            qug: "qug-Latn-EC",
            rai: "rai-Latn-ZZ",
            raj: "raj-Deva-IN",
            rao: "rao-Latn-ZZ",
            rcf: "rcf-Latn-RE",
            rej: "rej-Latn-ID",
            rel: "rel-Latn-ZZ",
            res: "res-Latn-ZZ",
            rgn: "rgn-Latn-IT",
            rhg: "rhg-Arab-MM",
            ria: "ria-Latn-IN",
            rif: "rif-Tfng-MA",
            "rif-NL": "rif-Latn-NL",
            rjs: "rjs-Deva-NP",
            rkt: "rkt-Beng-BD",
            rm: "rm-Latn-CH",
            rmf: "rmf-Latn-FI",
            rmo: "rmo-Latn-CH",
            rmt: "rmt-Arab-IR",
            rmu: "rmu-Latn-SE",
            rn: "rn-Latn-BI",
            rna: "rna-Latn-ZZ",
            rng: "rng-Latn-MZ",
            ro: "ro-Latn-RO",
            rob: "rob-Latn-ID",
            rof: "rof-Latn-TZ",
            roo: "roo-Latn-ZZ",
            rro: "rro-Latn-ZZ",
            rtm: "rtm-Latn-FJ",
            ru: "ru-Cyrl-RU",
            rue: "rue-Cyrl-UA",
            rug: "rug-Latn-SB",
            rw: "rw-Latn-RW",
            rwk: "rwk-Latn-TZ",
            rwo: "rwo-Latn-ZZ",
            ryu: "ryu-Kana-JP",
            sa: "sa-Deva-IN",
            saf: "saf-Latn-GH",
            sah: "sah-Cyrl-RU",
            saq: "saq-Latn-KE",
            sas: "sas-Latn-ID",
            sat: "sat-Olck-IN",
            sav: "sav-Latn-SN",
            saz: "saz-Saur-IN",
            sba: "sba-Latn-ZZ",
            sbe: "sbe-Latn-ZZ",
            sbp: "sbp-Latn-TZ",
            sc: "sc-Latn-IT",
            sck: "sck-Deva-IN",
            scl: "scl-Arab-ZZ",
            scn: "scn-Latn-IT",
            sco: "sco-Latn-GB",
            scs: "scs-Latn-CA",
            sd: "sd-Arab-PK",
            "sd-Deva": "sd-Deva-IN",
            "sd-Khoj": "sd-Khoj-IN",
            "sd-Sind": "sd-Sind-IN",
            sdc: "sdc-Latn-IT",
            sdh: "sdh-Arab-IR",
            se: "se-Latn-NO",
            sef: "sef-Latn-CI",
            seh: "seh-Latn-MZ",
            sei: "sei-Latn-MX",
            ses: "ses-Latn-ML",
            sg: "sg-Latn-CF",
            sga: "sga-Ogam-IE",
            sgs: "sgs-Latn-LT",
            sgw: "sgw-Ethi-ZZ",
            sgz: "sgz-Latn-ZZ",
            shi: "shi-Tfng-MA",
            shk: "shk-Latn-ZZ",
            shn: "shn-Mymr-MM",
            shu: "shu-Arab-ZZ",
            si: "si-Sinh-LK",
            sid: "sid-Latn-ET",
            sig: "sig-Latn-ZZ",
            sil: "sil-Latn-ZZ",
            sim: "sim-Latn-ZZ",
            sjr: "sjr-Latn-ZZ",
            sk: "sk-Latn-SK",
            skc: "skc-Latn-ZZ",
            skr: "skr-Arab-PK",
            sks: "sks-Latn-ZZ",
            sl: "sl-Latn-SI",
            sld: "sld-Latn-ZZ",
            sli: "sli-Latn-PL",
            sll: "sll-Latn-ZZ",
            sly: "sly-Latn-ID",
            sm: "sm-Latn-WS",
            sma: "sma-Latn-SE",
            smj: "smj-Latn-SE",
            smn: "smn-Latn-FI",
            smp: "smp-Samr-IL",
            smq: "smq-Latn-ZZ",
            sms: "sms-Latn-FI",
            sn: "sn-Latn-ZW",
            snc: "snc-Latn-ZZ",
            snk: "snk-Latn-ML",
            snp: "snp-Latn-ZZ",
            snx: "snx-Latn-ZZ",
            sny: "sny-Latn-ZZ",
            so: "so-Latn-SO",
            sog: "sog-Sogd-UZ",
            sok: "sok-Latn-ZZ",
            soq: "soq-Latn-ZZ",
            sou: "sou-Thai-TH",
            soy: "soy-Latn-ZZ",
            spd: "spd-Latn-ZZ",
            spl: "spl-Latn-ZZ",
            sps: "sps-Latn-ZZ",
            sq: "sq-Latn-AL",
            sr: "sr-Cyrl-RS",
            "sr-ME": "sr-Latn-ME",
            "sr-RO": "sr-Latn-RO",
            "sr-RU": "sr-Latn-RU",
            "sr-TR": "sr-Latn-TR",
            srb: "srb-Sora-IN",
            srn: "srn-Latn-SR",
            srr: "srr-Latn-SN",
            srx: "srx-Deva-IN",
            ss: "ss-Latn-ZA",
            ssd: "ssd-Latn-ZZ",
            ssg: "ssg-Latn-ZZ",
            ssy: "ssy-Latn-ER",
            st: "st-Latn-ZA",
            stk: "stk-Latn-ZZ",
            stq: "stq-Latn-DE",
            su: "su-Latn-ID",
            sua: "sua-Latn-ZZ",
            sue: "sue-Latn-ZZ",
            suk: "suk-Latn-TZ",
            sur: "sur-Latn-ZZ",
            sus: "sus-Latn-GN",
            sv: "sv-Latn-SE",
            sw: "sw-Latn-TZ",
            swb: "swb-Arab-YT",
            swc: "swc-Latn-CD",
            swg: "swg-Latn-DE",
            swp: "swp-Latn-ZZ",
            swv: "swv-Deva-IN",
            sxn: "sxn-Latn-ID",
            sxw: "sxw-Latn-ZZ",
            syl: "syl-Beng-BD",
            syr: "syr-Syrc-IQ",
            szl: "szl-Latn-PL",
            ta: "ta-Taml-IN",
            taj: "taj-Deva-NP",
            tal: "tal-Latn-ZZ",
            tan: "tan-Latn-ZZ",
            taq: "taq-Latn-ZZ",
            tbc: "tbc-Latn-ZZ",
            tbd: "tbd-Latn-ZZ",
            tbf: "tbf-Latn-ZZ",
            tbg: "tbg-Latn-ZZ",
            tbo: "tbo-Latn-ZZ",
            tbw: "tbw-Latn-PH",
            tbz: "tbz-Latn-ZZ",
            tci: "tci-Latn-ZZ",
            tcy: "tcy-Knda-IN",
            tdd: "tdd-Tale-CN",
            tdg: "tdg-Deva-NP",
            tdh: "tdh-Deva-NP",
            tdu: "tdu-Latn-MY",
            te: "te-Telu-IN",
            ted: "ted-Latn-ZZ",
            tem: "tem-Latn-SL",
            teo: "teo-Latn-UG",
            tet: "tet-Latn-TL",
            tfi: "tfi-Latn-ZZ",
            tg: "tg-Cyrl-TJ",
            "tg-Arab": "tg-Arab-PK",
            "tg-PK": "tg-Arab-PK",
            tgc: "tgc-Latn-ZZ",
            tgo: "tgo-Latn-ZZ",
            tgu: "tgu-Latn-ZZ",
            th: "th-Thai-TH",
            thl: "thl-Deva-NP",
            thq: "thq-Deva-NP",
            thr: "thr-Deva-NP",
            ti: "ti-Ethi-ET",
            tif: "tif-Latn-ZZ",
            tig: "tig-Ethi-ER",
            tik: "tik-Latn-ZZ",
            tim: "tim-Latn-ZZ",
            tio: "tio-Latn-ZZ",
            tiv: "tiv-Latn-NG",
            tk: "tk-Latn-TM",
            tkl: "tkl-Latn-TK",
            tkr: "tkr-Latn-AZ",
            tkt: "tkt-Deva-NP",
            tl: "tl-Latn-PH",
            tlf: "tlf-Latn-ZZ",
            tlx: "tlx-Latn-ZZ",
            tly: "tly-Latn-AZ",
            tmh: "tmh-Latn-NE",
            tmy: "tmy-Latn-ZZ",
            tn: "tn-Latn-ZA",
            tnh: "tnh-Latn-ZZ",
            to: "to-Latn-TO",
            tof: "tof-Latn-ZZ",
            tog: "tog-Latn-MW",
            toq: "toq-Latn-ZZ",
            tpi: "tpi-Latn-PG",
            tpm: "tpm-Latn-ZZ",
            tpz: "tpz-Latn-ZZ",
            tqo: "tqo-Latn-ZZ",
            tr: "tr-Latn-TR",
            tru: "tru-Latn-TR",
            trv: "trv-Latn-TW",
            trw: "trw-Arab-PK",
            ts: "ts-Latn-ZA",
            tsd: "tsd-Grek-GR",
            tsf: "tsf-Deva-NP",
            tsg: "tsg-Latn-PH",
            tsj: "tsj-Tibt-BT",
            tsw: "tsw-Latn-ZZ",
            tt: "tt-Cyrl-RU",
            ttd: "ttd-Latn-ZZ",
            tte: "tte-Latn-ZZ",
            ttj: "ttj-Latn-UG",
            ttr: "ttr-Latn-ZZ",
            tts: "tts-Thai-TH",
            ttt: "ttt-Latn-AZ",
            tuh: "tuh-Latn-ZZ",
            tul: "tul-Latn-ZZ",
            tum: "tum-Latn-MW",
            tuq: "tuq-Latn-ZZ",
            tvd: "tvd-Latn-ZZ",
            tvl: "tvl-Latn-TV",
            tvu: "tvu-Latn-ZZ",
            twh: "twh-Latn-ZZ",
            twq: "twq-Latn-NE",
            txg: "txg-Tang-CN",
            ty: "ty-Latn-PF",
            tya: "tya-Latn-ZZ",
            tyv: "tyv-Cyrl-RU",
            tzm: "tzm-Latn-MA",
            ubu: "ubu-Latn-ZZ",
            udi: "udi-Aghb-RU",
            udm: "udm-Cyrl-RU",
            ug: "ug-Arab-CN",
            "ug-Cyrl": "ug-Cyrl-KZ",
            "ug-KZ": "ug-Cyrl-KZ",
            "ug-MN": "ug-Cyrl-MN",
            uga: "uga-Ugar-SY",
            uk: "uk-Cyrl-UA",
            uli: "uli-Latn-FM",
            umb: "umb-Latn-AO",
            und: "en-Latn-US",
            "und-002": "en-Latn-NG",
            "und-003": "en-Latn-US",
            "und-005": "pt-Latn-BR",
            "und-009": "en-Latn-AU",
            "und-011": "en-Latn-NG",
            "und-013": "es-Latn-MX",
            "und-014": "sw-Latn-TZ",
            "und-015": "ar-Arab-EG",
            "und-017": "sw-Latn-CD",
            "und-018": "en-Latn-ZA",
            "und-019": "en-Latn-US",
            "und-021": "en-Latn-US",
            "und-029": "es-Latn-CU",
            "und-030": "zh-Hans-CN",
            "und-034": "hi-Deva-IN",
            "und-035": "id-Latn-ID",
            "und-039": "it-Latn-IT",
            "und-053": "en-Latn-AU",
            "und-054": "en-Latn-PG",
            "und-057": "en-Latn-GU",
            "und-061": "sm-Latn-WS",
            "und-142": "zh-Hans-CN",
            "und-143": "uz-Latn-UZ",
            "und-145": "ar-Arab-SA",
            "und-150": "ru-Cyrl-RU",
            "und-151": "ru-Cyrl-RU",
            "und-154": "en-Latn-GB",
            "und-155": "de-Latn-DE",
            "und-202": "en-Latn-NG",
            "und-419": "es-Latn-419",
            "und-AD": "ca-Latn-AD",
            "und-Adlm": "ff-Adlm-GN",
            "und-AE": "ar-Arab-AE",
            "und-AF": "fa-Arab-AF",
            "und-Aghb": "udi-Aghb-RU",
            "und-Ahom": "aho-Ahom-IN",
            "und-AL": "sq-Latn-AL",
            "und-AM": "hy-Armn-AM",
            "und-AO": "pt-Latn-AO",
            "und-AQ": "und-Latn-AQ",
            "und-AR": "es-Latn-AR",
            "und-Arab": "ar-Arab-EG",
            "und-Arab-CC": "ms-Arab-CC",
            "und-Arab-CN": "ug-Arab-CN",
            "und-Arab-GB": "ks-Arab-GB",
            "und-Arab-ID": "ms-Arab-ID",
            "und-Arab-IN": "ur-Arab-IN",
            "und-Arab-KH": "cja-Arab-KH",
            "und-Arab-MM": "rhg-Arab-MM",
            "und-Arab-MN": "kk-Arab-MN",
            "und-Arab-MU": "ur-Arab-MU",
            "und-Arab-NG": "ha-Arab-NG",
            "und-Arab-PK": "ur-Arab-PK",
            "und-Arab-TG": "apd-Arab-TG",
            "und-Arab-TH": "mfa-Arab-TH",
            "und-Arab-TJ": "fa-Arab-TJ",
            "und-Arab-TR": "az-Arab-TR",
            "und-Arab-YT": "swb-Arab-YT",
            "und-Armi": "arc-Armi-IR",
            "und-Armn": "hy-Armn-AM",
            "und-AS": "sm-Latn-AS",
            "und-AT": "de-Latn-AT",
            "und-Avst": "ae-Avst-IR",
            "und-AW": "nl-Latn-AW",
            "und-AX": "sv-Latn-AX",
            "und-AZ": "az-Latn-AZ",
            "und-BA": "bs-Latn-BA",
            "und-Bali": "ban-Bali-ID",
            "und-Bamu": "bax-Bamu-CM",
            "und-Bass": "bsq-Bass-LR",
            "und-Batk": "bbc-Batk-ID",
            "und-BD": "bn-Beng-BD",
            "und-BE": "nl-Latn-BE",
            "und-Beng": "bn-Beng-BD",
            "und-BF": "fr-Latn-BF",
            "und-BG": "bg-Cyrl-BG",
            "und-BH": "ar-Arab-BH",
            "und-Bhks": "sa-Bhks-IN",
            "und-BI": "rn-Latn-BI",
            "und-BJ": "fr-Latn-BJ",
            "und-BL": "fr-Latn-BL",
            "und-BN": "ms-Latn-BN",
            "und-BO": "es-Latn-BO",
            "und-Bopo": "zh-Bopo-TW",
            "und-BQ": "pap-Latn-BQ",
            "und-BR": "pt-Latn-BR",
            "und-Brah": "pka-Brah-IN",
            "und-Brai": "fr-Brai-FR",
            "und-BT": "dz-Tibt-BT",
            "und-Bugi": "bug-Bugi-ID",
            "und-Buhd": "bku-Buhd-PH",
            "und-BV": "und-Latn-BV",
            "und-BY": "be-Cyrl-BY",
            "und-Cakm": "ccp-Cakm-BD",
            "und-Cans": "cr-Cans-CA",
            "und-Cari": "xcr-Cari-TR",
            "und-CD": "sw-Latn-CD",
            "und-CF": "fr-Latn-CF",
            "und-CG": "fr-Latn-CG",
            "und-CH": "de-Latn-CH",
            "und-Cham": "cjm-Cham-VN",
            "und-Cher": "chr-Cher-US",
            "und-Chrs": "xco-Chrs-UZ",
            "und-CI": "fr-Latn-CI",
            "und-CL": "es-Latn-CL",
            "und-CM": "fr-Latn-CM",
            "und-CN": "zh-Hans-CN",
            "und-CO": "es-Latn-CO",
            "und-Copt": "cop-Copt-EG",
            "und-CP": "und-Latn-CP",
            "und-Cprt": "grc-Cprt-CY",
            "und-CR": "es-Latn-CR",
            "und-CU": "es-Latn-CU",
            "und-CV": "pt-Latn-CV",
            "und-CW": "pap-Latn-CW",
            "und-CY": "el-Grek-CY",
            "und-Cyrl": "ru-Cyrl-RU",
            "und-Cyrl-AL": "mk-Cyrl-AL",
            "und-Cyrl-BA": "sr-Cyrl-BA",
            "und-Cyrl-GE": "os-Cyrl-GE",
            "und-Cyrl-GR": "mk-Cyrl-GR",
            "und-Cyrl-MD": "uk-Cyrl-MD",
            "und-Cyrl-RO": "bg-Cyrl-RO",
            "und-Cyrl-SK": "uk-Cyrl-SK",
            "und-Cyrl-TR": "kbd-Cyrl-TR",
            "und-Cyrl-XK": "sr-Cyrl-XK",
            "und-CZ": "cs-Latn-CZ",
            "und-DE": "de-Latn-DE",
            "und-Deva": "hi-Deva-IN",
            "und-Deva-BT": "ne-Deva-BT",
            "und-Deva-FJ": "hif-Deva-FJ",
            "und-Deva-MU": "bho-Deva-MU",
            "und-Deva-PK": "btv-Deva-PK",
            "und-Diak": "dv-Diak-MV",
            "und-DJ": "aa-Latn-DJ",
            "und-DK": "da-Latn-DK",
            "und-DO": "es-Latn-DO",
            "und-Dogr": "doi-Dogr-IN",
            "und-Dupl": "fr-Dupl-FR",
            "und-DZ": "ar-Arab-DZ",
            "und-EA": "es-Latn-EA",
            "und-EC": "es-Latn-EC",
            "und-EE": "et-Latn-EE",
            "und-EG": "ar-Arab-EG",
            "und-Egyp": "egy-Egyp-EG",
            "und-EH": "ar-Arab-EH",
            "und-Elba": "sq-Elba-AL",
            "und-Elym": "arc-Elym-IR",
            "und-ER": "ti-Ethi-ER",
            "und-ES": "es-Latn-ES",
            "und-ET": "am-Ethi-ET",
            "und-Ethi": "am-Ethi-ET",
            "und-EU": "en-Latn-IE",
            "und-EZ": "de-Latn-EZ",
            "und-FI": "fi-Latn-FI",
            "und-FO": "fo-Latn-FO",
            "und-FR": "fr-Latn-FR",
            "und-GA": "fr-Latn-GA",
            "und-GE": "ka-Geor-GE",
            "und-Geor": "ka-Geor-GE",
            "und-GF": "fr-Latn-GF",
            "und-GH": "ak-Latn-GH",
            "und-GL": "kl-Latn-GL",
            "und-Glag": "cu-Glag-BG",
            "und-GN": "fr-Latn-GN",
            "und-Gong": "wsg-Gong-IN",
            "und-Gonm": "esg-Gonm-IN",
            "und-Goth": "got-Goth-UA",
            "und-GP": "fr-Latn-GP",
            "und-GQ": "es-Latn-GQ",
            "und-GR": "el-Grek-GR",
            "und-Gran": "sa-Gran-IN",
            "und-Grek": "el-Grek-GR",
            "und-Grek-TR": "bgx-Grek-TR",
            "und-GS": "und-Latn-GS",
            "und-GT": "es-Latn-GT",
            "und-Gujr": "gu-Gujr-IN",
            "und-Guru": "pa-Guru-IN",
            "und-GW": "pt-Latn-GW",
            "und-Hanb": "zh-Hanb-TW",
            "und-Hang": "ko-Hang-KR",
            "und-Hani": "zh-Hani-CN",
            "und-Hano": "hnn-Hano-PH",
            "und-Hans": "zh-Hans-CN",
            "und-Hant": "zh-Hant-TW",
            "und-Hebr": "he-Hebr-IL",
            "und-Hebr-CA": "yi-Hebr-CA",
            "und-Hebr-GB": "yi-Hebr-GB",
            "und-Hebr-SE": "yi-Hebr-SE",
            "und-Hebr-UA": "yi-Hebr-UA",
            "und-Hebr-US": "yi-Hebr-US",
            "und-Hira": "ja-Hira-JP",
            "und-HK": "zh-Hant-HK",
            "und-Hluw": "hlu-Hluw-TR",
            "und-HM": "und-Latn-HM",
            "und-Hmng": "hnj-Hmng-LA",
            "und-Hmnp": "mww-Hmnp-US",
            "und-HN": "es-Latn-HN",
            "und-HR": "hr-Latn-HR",
            "und-HT": "ht-Latn-HT",
            "und-HU": "hu-Latn-HU",
            "und-Hung": "hu-Hung-HU",
            "und-IC": "es-Latn-IC",
            "und-ID": "id-Latn-ID",
            "und-IL": "he-Hebr-IL",
            "und-IN": "hi-Deva-IN",
            "und-IQ": "ar-Arab-IQ",
            "und-IR": "fa-Arab-IR",
            "und-IS": "is-Latn-IS",
            "und-IT": "it-Latn-IT",
            "und-Ital": "ett-Ital-IT",
            "und-Jamo": "ko-Jamo-KR",
            "und-Java": "jv-Java-ID",
            "und-JO": "ar-Arab-JO",
            "und-JP": "ja-Jpan-JP",
            "und-Jpan": "ja-Jpan-JP",
            "und-Kali": "eky-Kali-MM",
            "und-Kana": "ja-Kana-JP",
            "und-KE": "sw-Latn-KE",
            "und-KG": "ky-Cyrl-KG",
            "und-KH": "km-Khmr-KH",
            "und-Khar": "pra-Khar-PK",
            "und-Khmr": "km-Khmr-KH",
            "und-Khoj": "sd-Khoj-IN",
            "und-Kits": "zkt-Kits-CN",
            "und-KM": "ar-Arab-KM",
            "und-Knda": "kn-Knda-IN",
            "und-Kore": "ko-Kore-KR",
            "und-KP": "ko-Kore-KP",
            "und-KR": "ko-Kore-KR",
            "und-Kthi": "bho-Kthi-IN",
            "und-KW": "ar-Arab-KW",
            "und-KZ": "ru-Cyrl-KZ",
            "und-LA": "lo-Laoo-LA",
            "und-Lana": "nod-Lana-TH",
            "und-Laoo": "lo-Laoo-LA",
            "und-Latn-AF": "tk-Latn-AF",
            "und-Latn-AM": "ku-Latn-AM",
            "und-Latn-CN": "za-Latn-CN",
            "und-Latn-CY": "tr-Latn-CY",
            "und-Latn-DZ": "fr-Latn-DZ",
            "und-Latn-ET": "en-Latn-ET",
            "und-Latn-GE": "ku-Latn-GE",
            "und-Latn-IR": "tk-Latn-IR",
            "und-Latn-KM": "fr-Latn-KM",
            "und-Latn-MA": "fr-Latn-MA",
            "und-Latn-MK": "sq-Latn-MK",
            "und-Latn-MM": "kac-Latn-MM",
            "und-Latn-MO": "pt-Latn-MO",
            "und-Latn-MR": "fr-Latn-MR",
            "und-Latn-RU": "krl-Latn-RU",
            "und-Latn-SY": "fr-Latn-SY",
            "und-Latn-TN": "fr-Latn-TN",
            "und-Latn-TW": "trv-Latn-TW",
            "und-Latn-UA": "pl-Latn-UA",
            "und-LB": "ar-Arab-LB",
            "und-Lepc": "lep-Lepc-IN",
            "und-LI": "de-Latn-LI",
            "und-Limb": "lif-Limb-IN",
            "und-Lina": "lab-Lina-GR",
            "und-Linb": "grc-Linb-GR",
            "und-Lisu": "lis-Lisu-CN",
            "und-LK": "si-Sinh-LK",
            "und-LS": "st-Latn-LS",
            "und-LT": "lt-Latn-LT",
            "und-LU": "fr-Latn-LU",
            "und-LV": "lv-Latn-LV",
            "und-LY": "ar-Arab-LY",
            "und-Lyci": "xlc-Lyci-TR",
            "und-Lydi": "xld-Lydi-TR",
            "und-MA": "ar-Arab-MA",
            "und-Mahj": "hi-Mahj-IN",
            "und-Maka": "mak-Maka-ID",
            "und-Mand": "myz-Mand-IR",
            "und-Mani": "xmn-Mani-CN",
            "und-Marc": "bo-Marc-CN",
            "und-MC": "fr-Latn-MC",
            "und-MD": "ro-Latn-MD",
            "und-ME": "sr-Latn-ME",
            "und-Medf": "dmf-Medf-NG",
            "und-Mend": "men-Mend-SL",
            "und-Merc": "xmr-Merc-SD",
            "und-Mero": "xmr-Mero-SD",
            "und-MF": "fr-Latn-MF",
            "und-MG": "mg-Latn-MG",
            "und-MK": "mk-Cyrl-MK",
            "und-ML": "bm-Latn-ML",
            "und-Mlym": "ml-Mlym-IN",
            "und-MM": "my-Mymr-MM",
            "und-MN": "mn-Cyrl-MN",
            "und-MO": "zh-Hant-MO",
            "und-Modi": "mr-Modi-IN",
            "und-Mong": "mn-Mong-CN",
            "und-MQ": "fr-Latn-MQ",
            "und-MR": "ar-Arab-MR",
            "und-Mroo": "mro-Mroo-BD",
            "und-MT": "mt-Latn-MT",
            "und-Mtei": "mni-Mtei-IN",
            "und-MU": "mfe-Latn-MU",
            "und-Mult": "skr-Mult-PK",
            "und-MV": "dv-Thaa-MV",
            "und-MX": "es-Latn-MX",
            "und-MY": "ms-Latn-MY",
            "und-Mymr": "my-Mymr-MM",
            "und-Mymr-IN": "kht-Mymr-IN",
            "und-Mymr-TH": "mnw-Mymr-TH",
            "und-MZ": "pt-Latn-MZ",
            "und-NA": "af-Latn-NA",
            "und-Nand": "sa-Nand-IN",
            "und-Narb": "xna-Narb-SA",
            "und-Nbat": "arc-Nbat-JO",
            "und-NC": "fr-Latn-NC",
            "und-NE": "ha-Latn-NE",
            "und-Newa": "new-Newa-NP",
            "und-NI": "es-Latn-NI",
            "und-Nkoo": "man-Nkoo-GN",
            "und-NL": "nl-Latn-NL",
            "und-NO": "nb-Latn-NO",
            "und-NP": "ne-Deva-NP",
            "und-Nshu": "zhx-Nshu-CN",
            "und-Ogam": "sga-Ogam-IE",
            "und-Olck": "sat-Olck-IN",
            "und-OM": "ar-Arab-OM",
            "und-Orkh": "otk-Orkh-MN",
            "und-Orya": "or-Orya-IN",
            "und-Osge": "osa-Osge-US",
            "und-Osma": "so-Osma-SO",
            "und-PA": "es-Latn-PA",
            "und-Palm": "arc-Palm-SY",
            "und-Pauc": "ctd-Pauc-MM",
            "und-PE": "es-Latn-PE",
            "und-Perm": "kv-Perm-RU",
            "und-PF": "fr-Latn-PF",
            "und-PG": "tpi-Latn-PG",
            "und-PH": "fil-Latn-PH",
            "und-Phag": "lzh-Phag-CN",
            "und-Phli": "pal-Phli-IR",
            "und-Phlp": "pal-Phlp-CN",
            "und-Phnx": "phn-Phnx-LB",
            "und-PK": "ur-Arab-PK",
            "und-PL": "pl-Latn-PL",
            "und-Plrd": "hmd-Plrd-CN",
            "und-PM": "fr-Latn-PM",
            "und-PR": "es-Latn-PR",
            "und-Prti": "xpr-Prti-IR",
            "und-PS": "ar-Arab-PS",
            "und-PT": "pt-Latn-PT",
            "und-PW": "pau-Latn-PW",
            "und-PY": "gn-Latn-PY",
            "und-QA": "ar-Arab-QA",
            "und-QO": "en-Latn-DG",
            "und-RE": "fr-Latn-RE",
            "und-Rjng": "rej-Rjng-ID",
            "und-RO": "ro-Latn-RO",
            "und-Rohg": "rhg-Rohg-MM",
            "und-RS": "sr-Cyrl-RS",
            "und-RU": "ru-Cyrl-RU",
            "und-Runr": "non-Runr-SE",
            "und-RW": "rw-Latn-RW",
            "und-SA": "ar-Arab-SA",
            "und-Samr": "smp-Samr-IL",
            "und-Sarb": "xsa-Sarb-YE",
            "und-Saur": "saz-Saur-IN",
            "und-SC": "fr-Latn-SC",
            "und-SD": "ar-Arab-SD",
            "und-SE": "sv-Latn-SE",
            "und-Sgnw": "ase-Sgnw-US",
            "und-Shaw": "en-Shaw-GB",
            "und-Shrd": "sa-Shrd-IN",
            "und-SI": "sl-Latn-SI",
            "und-Sidd": "sa-Sidd-IN",
            "und-Sind": "sd-Sind-IN",
            "und-Sinh": "si-Sinh-LK",
            "und-SJ": "nb-Latn-SJ",
            "und-SK": "sk-Latn-SK",
            "und-SM": "it-Latn-SM",
            "und-SN": "fr-Latn-SN",
            "und-SO": "so-Latn-SO",
            "und-Sogd": "sog-Sogd-UZ",
            "und-Sogo": "sog-Sogo-UZ",
            "und-Sora": "srb-Sora-IN",
            "und-Soyo": "cmg-Soyo-MN",
            "und-SR": "nl-Latn-SR",
            "und-ST": "pt-Latn-ST",
            "und-Sund": "su-Sund-ID",
            "und-SV": "es-Latn-SV",
            "und-SY": "ar-Arab-SY",
            "und-Sylo": "syl-Sylo-BD",
            "und-Syrc": "syr-Syrc-IQ",
            "und-Tagb": "tbw-Tagb-PH",
            "und-Takr": "doi-Takr-IN",
            "und-Tale": "tdd-Tale-CN",
            "und-Talu": "khb-Talu-CN",
            "und-Taml": "ta-Taml-IN",
            "und-Tang": "txg-Tang-CN",
            "und-Tavt": "blt-Tavt-VN",
            "und-TD": "fr-Latn-TD",
            "und-Telu": "te-Telu-IN",
            "und-TF": "fr-Latn-TF",
            "und-Tfng": "zgh-Tfng-MA",
            "und-TG": "fr-Latn-TG",
            "und-Tglg": "fil-Tglg-PH",
            "und-TH": "th-Thai-TH",
            "und-Thaa": "dv-Thaa-MV",
            "und-Thai": "th-Thai-TH",
            "und-Thai-CN": "lcp-Thai-CN",
            "und-Thai-KH": "kdt-Thai-KH",
            "und-Thai-LA": "kdt-Thai-LA",
            "und-Tibt": "bo-Tibt-CN",
            "und-Tirh": "mai-Tirh-IN",
            "und-TJ": "tg-Cyrl-TJ",
            "und-TK": "tkl-Latn-TK",
            "und-TL": "pt-Latn-TL",
            "und-TM": "tk-Latn-TM",
            "und-TN": "ar-Arab-TN",
            "und-TO": "to-Latn-TO",
            "und-TR": "tr-Latn-TR",
            "und-TV": "tvl-Latn-TV",
            "und-TW": "zh-Hant-TW",
            "und-TZ": "sw-Latn-TZ",
            "und-UA": "uk-Cyrl-UA",
            "und-UG": "sw-Latn-UG",
            "und-Ugar": "uga-Ugar-SY",
            "und-UY": "es-Latn-UY",
            "und-UZ": "uz-Latn-UZ",
            "und-VA": "it-Latn-VA",
            "und-Vaii": "vai-Vaii-LR",
            "und-VE": "es-Latn-VE",
            "und-VN": "vi-Latn-VN",
            "und-VU": "bi-Latn-VU",
            "und-Wara": "hoc-Wara-IN",
            "und-Wcho": "nnp-Wcho-IN",
            "und-WF": "fr-Latn-WF",
            "und-WS": "sm-Latn-WS",
            "und-XK": "sq-Latn-XK",
            "und-Xpeo": "peo-Xpeo-IR",
            "und-Xsux": "akk-Xsux-IQ",
            "und-YE": "ar-Arab-YE",
            "und-Yezi": "ku-Yezi-GE",
            "und-Yiii": "ii-Yiii-CN",
            "und-YT": "fr-Latn-YT",
            "und-Zanb": "cmg-Zanb-MN",
            "und-ZW": "sn-Latn-ZW",
            unr: "unr-Beng-IN",
            "unr-Deva": "unr-Deva-NP",
            "unr-NP": "unr-Deva-NP",
            unx: "unx-Beng-IN",
            uok: "uok-Latn-ZZ",
            ur: "ur-Arab-PK",
            uri: "uri-Latn-ZZ",
            urt: "urt-Latn-ZZ",
            urw: "urw-Latn-ZZ",
            usa: "usa-Latn-ZZ",
            uth: "uth-Latn-ZZ",
            utr: "utr-Latn-ZZ",
            uvh: "uvh-Latn-ZZ",
            uvl: "uvl-Latn-ZZ",
            uz: "uz-Latn-UZ",
            "uz-AF": "uz-Arab-AF",
            "uz-Arab": "uz-Arab-AF",
            "uz-CN": "uz-Cyrl-CN",
            vag: "vag-Latn-ZZ",
            vai: "vai-Vaii-LR",
            van: "van-Latn-ZZ",
            ve: "ve-Latn-ZA",
            vec: "vec-Latn-IT",
            vep: "vep-Latn-RU",
            vi: "vi-Latn-VN",
            vic: "vic-Latn-SX",
            viv: "viv-Latn-ZZ",
            vls: "vls-Latn-BE",
            vmf: "vmf-Latn-DE",
            vmw: "vmw-Latn-MZ",
            vo: "vo-Latn-001",
            vot: "vot-Latn-RU",
            vro: "vro-Latn-EE",
            vun: "vun-Latn-TZ",
            vut: "vut-Latn-ZZ",
            wa: "wa-Latn-BE",
            wae: "wae-Latn-CH",
            waj: "waj-Latn-ZZ",
            wal: "wal-Ethi-ET",
            wan: "wan-Latn-ZZ",
            war: "war-Latn-PH",
            wbp: "wbp-Latn-AU",
            wbq: "wbq-Telu-IN",
            wbr: "wbr-Deva-IN",
            wci: "wci-Latn-ZZ",
            wer: "wer-Latn-ZZ",
            wgi: "wgi-Latn-ZZ",
            whg: "whg-Latn-ZZ",
            wib: "wib-Latn-ZZ",
            wiu: "wiu-Latn-ZZ",
            wiv: "wiv-Latn-ZZ",
            wja: "wja-Latn-ZZ",
            wji: "wji-Latn-ZZ",
            wls: "wls-Latn-WF",
            wmo: "wmo-Latn-ZZ",
            wnc: "wnc-Latn-ZZ",
            wni: "wni-Arab-KM",
            wnu: "wnu-Latn-ZZ",
            wo: "wo-Latn-SN",
            wob: "wob-Latn-ZZ",
            wos: "wos-Latn-ZZ",
            wrs: "wrs-Latn-ZZ",
            wsg: "wsg-Gong-IN",
            wsk: "wsk-Latn-ZZ",
            wtm: "wtm-Deva-IN",
            wuu: "wuu-Hans-CN",
            wuv: "wuv-Latn-ZZ",
            wwa: "wwa-Latn-ZZ",
            xav: "xav-Latn-BR",
            xbi: "xbi-Latn-ZZ",
            xco: "xco-Chrs-UZ",
            xcr: "xcr-Cari-TR",
            xes: "xes-Latn-ZZ",
            xh: "xh-Latn-ZA",
            xla: "xla-Latn-ZZ",
            xlc: "xlc-Lyci-TR",
            xld: "xld-Lydi-TR",
            xmf: "xmf-Geor-GE",
            xmn: "xmn-Mani-CN",
            xmr: "xmr-Merc-SD",
            xna: "xna-Narb-SA",
            xnr: "xnr-Deva-IN",
            xog: "xog-Latn-UG",
            xon: "xon-Latn-ZZ",
            xpr: "xpr-Prti-IR",
            xrb: "xrb-Latn-ZZ",
            xsa: "xsa-Sarb-YE",
            xsi: "xsi-Latn-ZZ",
            xsm: "xsm-Latn-ZZ",
            xsr: "xsr-Deva-NP",
            xwe: "xwe-Latn-ZZ",
            yam: "yam-Latn-ZZ",
            yao: "yao-Latn-MZ",
            yap: "yap-Latn-FM",
            yas: "yas-Latn-ZZ",
            yat: "yat-Latn-ZZ",
            yav: "yav-Latn-CM",
            yay: "yay-Latn-ZZ",
            yaz: "yaz-Latn-ZZ",
            yba: "yba-Latn-ZZ",
            ybb: "ybb-Latn-CM",
            yby: "yby-Latn-ZZ",
            yer: "yer-Latn-ZZ",
            ygr: "ygr-Latn-ZZ",
            ygw: "ygw-Latn-ZZ",
            yi: "yi-Hebr-001",
            yko: "yko-Latn-ZZ",
            yle: "yle-Latn-ZZ",
            ylg: "ylg-Latn-ZZ",
            yll: "yll-Latn-ZZ",
            yml: "yml-Latn-ZZ",
            yo: "yo-Latn-NG",
            yon: "yon-Latn-ZZ",
            yrb: "yrb-Latn-ZZ",
            yre: "yre-Latn-ZZ",
            yrl: "yrl-Latn-BR",
            yss: "yss-Latn-ZZ",
            yua: "yua-Latn-MX",
            yue: "yue-Hant-HK",
            "yue-CN": "yue-Hans-CN",
            "yue-Hans": "yue-Hans-CN",
            yuj: "yuj-Latn-ZZ",
            yut: "yut-Latn-ZZ",
            yuw: "yuw-Latn-ZZ",
            za: "za-Latn-CN",
            zag: "zag-Latn-SD",
            zdj: "zdj-Arab-KM",
            zea: "zea-Latn-NL",
            zgh: "zgh-Tfng-MA",
            zh: "zh-Hans-CN",
            "zh-AU": "zh-Hant-AU",
            "zh-BN": "zh-Hant-BN",
            "zh-Bopo": "zh-Bopo-TW",
            "zh-GB": "zh-Hant-GB",
            "zh-GF": "zh-Hant-GF",
            "zh-Hanb": "zh-Hanb-TW",
            "zh-Hant": "zh-Hant-TW",
            "zh-HK": "zh-Hant-HK",
            "zh-ID": "zh-Hant-ID",
            "zh-MO": "zh-Hant-MO",
            "zh-PA": "zh-Hant-PA",
            "zh-PF": "zh-Hant-PF",
            "zh-PH": "zh-Hant-PH",
            "zh-SR": "zh-Hant-SR",
            "zh-TH": "zh-Hant-TH",
            "zh-TW": "zh-Hant-TW",
            "zh-US": "zh-Hant-US",
            "zh-VN": "zh-Hant-VN",
            zhx: "zhx-Nshu-CN",
            zia: "zia-Latn-ZZ",
            zkt: "zkt-Kits-CN",
            zlm: "zlm-Latn-TG",
            zmi: "zmi-Latn-MY",
            zne: "zne-Latn-ZZ",
            zu: "zu-Latn-ZA",
            zza: "zza-Latn-TR"
          }
        }
      };
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/canonicalizer.js
  var require_canonicalizer = __commonJS({
    "bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/canonicalizer.js": function(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {value: true});
      exports.canonicalizeUnicodeLocaleId = exports.canonicalizeUnicodeLanguageId = void 0;
      var tslib_1 = require_tslib();
      var aliases_1 = require_aliases();
      var parser_1 = require_parser();
      var likelySubtags2 = tslib_1.__importStar(require_likelySubtags());
      var emitter_1 = require_emitter();
      function canonicalizeAttrs(strs) {
        return Object.keys(strs.reduce(function(all, str) {
          all[str.toLowerCase()] = 1;
          return all;
        }, {})).sort();
      }
      function canonicalizeKVs(arr) {
        var all = {};
        var result = [];
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
          var kv = arr_1[_i];
          if (kv[0] in all) {
            continue;
          }
          all[kv[0]] = 1;
          if (!kv[1] || kv[1] === "true") {
            result.push([kv[0].toLowerCase()]);
          } else {
            result.push([kv[0].toLowerCase(), kv[1].toLowerCase()]);
          }
        }
        return result.sort(compareKV);
      }
      function compareKV(t1, t2) {
        return t1[0] < t2[0] ? -1 : t1[0] > t2[0] ? 1 : 0;
      }
      function compareExtension(e1, e2) {
        return e1.type < e2.type ? -1 : e1.type > e2.type ? 1 : 0;
      }
      function mergeVariants(v1, v2) {
        var result = tslib_1.__spreadArray([], v1);
        for (var _i = 0, v2_1 = v2; _i < v2_1.length; _i++) {
          var v = v2_1[_i];
          if (v1.indexOf(v) < 0) {
            result.push(v);
          }
        }
        return result;
      }
      function canonicalizeUnicodeLanguageId(unicodeLanguageId) {
        var finalLangAst = unicodeLanguageId;
        if (unicodeLanguageId.variants.length) {
          var replacedLang_1 = "";
          for (var _i = 0, _a = unicodeLanguageId.variants; _i < _a.length; _i++) {
            var variant = _a[_i];
            if (replacedLang_1 = aliases_1.languageAlias[emitter_1.emitUnicodeLanguageId({
              lang: unicodeLanguageId.lang,
              variants: [variant]
            })]) {
              var replacedLangAst = parser_1.parseUnicodeLanguageId(replacedLang_1.split(parser_1.SEPARATOR));
              finalLangAst = {
                lang: replacedLangAst.lang,
                script: finalLangAst.script || replacedLangAst.script,
                region: finalLangAst.region || replacedLangAst.region,
                variants: mergeVariants(finalLangAst.variants, replacedLangAst.variants)
              };
              break;
            }
          }
        }
        if (finalLangAst.script && finalLangAst.region) {
          var replacedLang_2 = aliases_1.languageAlias[emitter_1.emitUnicodeLanguageId({
            lang: finalLangAst.lang,
            script: finalLangAst.script,
            region: finalLangAst.region,
            variants: []
          })];
          if (replacedLang_2) {
            var replacedLangAst = parser_1.parseUnicodeLanguageId(replacedLang_2.split(parser_1.SEPARATOR));
            finalLangAst = {
              lang: replacedLangAst.lang,
              script: replacedLangAst.script,
              region: replacedLangAst.region,
              variants: finalLangAst.variants
            };
          }
        }
        if (finalLangAst.region) {
          var replacedLang_3 = aliases_1.languageAlias[emitter_1.emitUnicodeLanguageId({
            lang: finalLangAst.lang,
            region: finalLangAst.region,
            variants: []
          })];
          if (replacedLang_3) {
            var replacedLangAst = parser_1.parseUnicodeLanguageId(replacedLang_3.split(parser_1.SEPARATOR));
            finalLangAst = {
              lang: replacedLangAst.lang,
              script: finalLangAst.script || replacedLangAst.script,
              region: replacedLangAst.region,
              variants: finalLangAst.variants
            };
          }
        }
        var replacedLang = aliases_1.languageAlias[emitter_1.emitUnicodeLanguageId({
          lang: finalLangAst.lang,
          variants: []
        })];
        if (replacedLang) {
          var replacedLangAst = parser_1.parseUnicodeLanguageId(replacedLang.split(parser_1.SEPARATOR));
          finalLangAst = {
            lang: replacedLangAst.lang,
            script: finalLangAst.script || replacedLangAst.script,
            region: finalLangAst.region || replacedLangAst.region,
            variants: finalLangAst.variants
          };
        }
        if (finalLangAst.region) {
          var region = finalLangAst.region.toUpperCase();
          var regionAlias = aliases_1.territoryAlias[region];
          var replacedRegion = void 0;
          if (regionAlias) {
            var regions = regionAlias.split(" ");
            replacedRegion = regions[0];
            var likelySubtag = likelySubtags2.supplemental.likelySubtags[emitter_1.emitUnicodeLanguageId({
              lang: finalLangAst.lang,
              script: finalLangAst.script,
              variants: []
            })];
            if (likelySubtag) {
              var likelyRegion = parser_1.parseUnicodeLanguageId(likelySubtag.split(parser_1.SEPARATOR)).region;
              if (likelyRegion && regions.indexOf(likelyRegion) > -1) {
                replacedRegion = likelyRegion;
              }
            }
          }
          if (replacedRegion) {
            finalLangAst.region = replacedRegion;
          }
          finalLangAst.region = finalLangAst.region.toUpperCase();
        }
        if (finalLangAst.script) {
          finalLangAst.script = finalLangAst.script[0].toUpperCase() + finalLangAst.script.slice(1).toLowerCase();
          if (aliases_1.scriptAlias[finalLangAst.script]) {
            finalLangAst.script = aliases_1.scriptAlias[finalLangAst.script];
          }
        }
        if (finalLangAst.variants.length) {
          for (var i = 0; i < finalLangAst.variants.length; i++) {
            var variant = finalLangAst.variants[i].toLowerCase();
            if (aliases_1.variantAlias[variant]) {
              var alias = aliases_1.variantAlias[variant];
              if (parser_1.isUnicodeVariantSubtag(alias)) {
                finalLangAst.variants[i] = alias;
              } else if (parser_1.isUnicodeLanguageSubtag(alias)) {
                finalLangAst.lang = alias;
              }
            }
          }
          finalLangAst.variants.sort();
        }
        return finalLangAst;
      }
      exports.canonicalizeUnicodeLanguageId = canonicalizeUnicodeLanguageId;
      function canonicalizeUnicodeLocaleId(locale) {
        locale.lang = canonicalizeUnicodeLanguageId(locale.lang);
        if (locale.extensions) {
          for (var _i = 0, _a = locale.extensions; _i < _a.length; _i++) {
            var extension = _a[_i];
            switch (extension.type) {
              case "u":
                extension.keywords = canonicalizeKVs(extension.keywords);
                if (extension.attributes) {
                  extension.attributes = canonicalizeAttrs(extension.attributes);
                }
                break;
              case "t":
                if (extension.lang) {
                  extension.lang = canonicalizeUnicodeLanguageId(extension.lang);
                }
                extension.fields = canonicalizeKVs(extension.fields);
                break;
              default:
                extension.value = extension.value.toLowerCase();
                break;
            }
          }
          locale.extensions.sort(compareExtension);
        }
        return locale;
      }
      exports.canonicalizeUnicodeLocaleId = canonicalizeUnicodeLocaleId;
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/types.js
  var require_types = __commonJS({
    "bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/types.js": function(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {value: true});
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/index.js
  var require_intl_getcanonicallocales = __commonJS({
    "bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/index.js": function(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {value: true});
      exports.isUnicodeLanguageSubtag = exports.isUnicodeScriptSubtag = exports.isUnicodeRegionSubtag = exports.isStructurallyValidLanguageTag = exports.parseUnicodeLanguageId = exports.parseUnicodeLocaleId = exports.getCanonicalLocales = void 0;
      var tslib_1 = require_tslib();
      var parser_1 = require_parser();
      var emitter_1 = require_emitter();
      var canonicalizer_1 = require_canonicalizer();
      function CanonicalizeLocaleList2(locales) {
        if (locales === void 0) {
          return [];
        }
        var seen = [];
        if (typeof locales === "string") {
          locales = [locales];
        }
        for (var _i = 0, locales_1 = locales; _i < locales_1.length; _i++) {
          var locale = locales_1[_i];
          var canonicalizedTag = emitter_1.emitUnicodeLocaleId(canonicalizer_1.canonicalizeUnicodeLocaleId(parser_1.parseUnicodeLocaleId(locale)));
          if (seen.indexOf(canonicalizedTag) < 0) {
            seen.push(canonicalizedTag);
          }
        }
        return seen;
      }
      function getCanonicalLocales(locales) {
        return CanonicalizeLocaleList2(locales);
      }
      exports.getCanonicalLocales = getCanonicalLocales;
      var parser_2 = require_parser();
      Object.defineProperty(exports, "parseUnicodeLocaleId", {enumerable: true, get: function() {
        return parser_2.parseUnicodeLocaleId;
      }});
      Object.defineProperty(exports, "parseUnicodeLanguageId", {enumerable: true, get: function() {
        return parser_2.parseUnicodeLanguageId;
      }});
      Object.defineProperty(exports, "isStructurallyValidLanguageTag", {enumerable: true, get: function() {
        return parser_2.isStructurallyValidLanguageTag;
      }});
      Object.defineProperty(exports, "isUnicodeRegionSubtag", {enumerable: true, get: function() {
        return parser_2.isUnicodeRegionSubtag;
      }});
      Object.defineProperty(exports, "isUnicodeScriptSubtag", {enumerable: true, get: function() {
        return parser_2.isUnicodeScriptSubtag;
      }});
      Object.defineProperty(exports, "isUnicodeLanguageSubtag", {enumerable: true, get: function() {
        return parser_2.isUnicodeLanguageSubtag;
      }});
      tslib_1.__exportStar(require_types(), exports);
      tslib_1.__exportStar(require_emitter(), exports);
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/intl-locale/lib/index.js
  var import_tslib5 = __toModule(require_tslib());

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/BestFitFormatMatcher.js
  var import_tslib2 = __toModule(require_tslib());

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/utils.js
  function invariant(condition, message, Err) {
    if (Err === void 0) {
      Err = Error;
    }
    if (!condition) {
      throw new Err(message);
    }
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/skeleton.js
  var import_tslib = __toModule(require_tslib());

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/types/date-time.js
  var RangePatternType;
  (function(RangePatternType2) {
    RangePatternType2["startRange"] = "startRange";
    RangePatternType2["shared"] = "shared";
    RangePatternType2["endRange"] = "endRange";
  })(RangePatternType || (RangePatternType = {}));

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/262.js
  function ToString(o) {
    if (typeof o === "symbol") {
      throw TypeError("Cannot convert a Symbol value to a string");
    }
    return String(o);
  }
  function ToObject(arg) {
    if (arg == null) {
      throw new TypeError("undefined/null cannot be converted to object");
    }
    return Object(arg);
  }
  function SameValue(x, y) {
    if (Object.is) {
      return Object.is(x, y);
    }
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    }
    return x !== x && y !== y;
  }
  var MINUTES_PER_HOUR = 60;
  var SECONDS_PER_MINUTE = 60;
  var MS_PER_SECOND = 1e3;
  var MS_PER_MINUTE = MS_PER_SECOND * SECONDS_PER_MINUTE;
  var MS_PER_HOUR = MS_PER_MINUTE * MINUTES_PER_HOUR;

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/CoerceOptionsToObject.js
  function CoerceOptionsToObject(options) {
    if (typeof options === "undefined") {
      return Object.create(null);
    }
    return ToObject(options);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DateTimeFormat/BasicFormatMatcher.js
  var import_tslib3 = __toModule(require_tslib());

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/GetOption.js
  function GetOption(opts, prop, type, values, fallback) {
    if (typeof opts !== "object") {
      throw new TypeError("Options must be an object");
    }
    var value = opts[prop];
    if (value !== void 0) {
      if (type !== "boolean" && type !== "string") {
        throw new TypeError("invalid type");
      }
      if (type === "boolean") {
        value = Boolean(value);
      }
      if (type === "string") {
        value = ToString(value);
      }
      if (values !== void 0 && !values.filter(function(val) {
        return val == value;
      }).length) {
        throw new RangeError(value + " is not within " + values.join(", "));
      }
      return value;
    }
    return fallback;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/IsSanctionedSimpleUnitIdentifier.js
  var SANCTIONED_UNITS = [
    "angle-degree",
    "area-acre",
    "area-hectare",
    "concentr-percent",
    "digital-bit",
    "digital-byte",
    "digital-gigabit",
    "digital-gigabyte",
    "digital-kilobit",
    "digital-kilobyte",
    "digital-megabit",
    "digital-megabyte",
    "digital-petabyte",
    "digital-terabit",
    "digital-terabyte",
    "duration-day",
    "duration-hour",
    "duration-millisecond",
    "duration-minute",
    "duration-month",
    "duration-second",
    "duration-week",
    "duration-year",
    "length-centimeter",
    "length-foot",
    "length-inch",
    "length-kilometer",
    "length-meter",
    "length-mile-scandinavian",
    "length-mile",
    "length-millimeter",
    "length-yard",
    "mass-gram",
    "mass-kilogram",
    "mass-ounce",
    "mass-pound",
    "mass-stone",
    "temperature-celsius",
    "temperature-fahrenheit",
    "volume-fluid-ounce",
    "volume-gallon",
    "volume-liter",
    "volume-milliliter"
  ];
  function removeUnitNamespace(unit) {
    return unit.slice(unit.indexOf("-") + 1);
  }
  var SIMPLE_UNITS = SANCTIONED_UNITS.map(removeUnitNamespace);

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/regex.generated.js
  var S_UNICODE_REGEX = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BF\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEE0-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDD78\uDD7A-\uDDCB\uDDCD-\uDE53\uDE60-\uDE6D\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6\uDF00-\uDF92\uDF94-\uDFCA]/;

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/format_to_parts.js
  var CARET_S_UNICODE_REGEX = new RegExp("^" + S_UNICODE_REGEX.source);
  var S_DOLLAR_UNICODE_REGEX = new RegExp(S_UNICODE_REGEX.source + "$");

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/data.js
  var import_tslib4 = __toModule(require_tslib());
  var MissingLocaleDataError = function(_super) {
    (0, import_tslib4.__extends)(MissingLocaleDataError2, _super);
    function MissingLocaleDataError2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = "MISSING_LOCALE_DATA";
      return _this;
    }
    return MissingLocaleDataError2;
  }(Error);

  // bazel-out/darwin-fastbuild/bin/packages/intl-locale/lib/index.js
  var import_intl_getcanonicallocales = __toModule(require_intl_getcanonicallocales());
  var likelySubtagsData = __toModule(require_likelySubtags());

  // bazel-out/darwin-fastbuild/bin/packages/intl-locale/lib/get_internal_slots.js
  var internalSlotMap = new WeakMap();
  function getInternalSlots(x) {
    var internalSlots = internalSlotMap.get(x);
    if (!internalSlots) {
      internalSlots = Object.create(null);
      internalSlotMap.set(x, internalSlots);
    }
    return internalSlots;
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-locale/lib/index.js
  var likelySubtags = likelySubtagsData.supplemental.likelySubtags;
  var RELEVANT_EXTENSION_KEYS = ["ca", "co", "hc", "kf", "kn", "nu"];
  var UNICODE_TYPE_REGEX = /^[a-z0-9]{3,8}(-[a-z0-9]{3,8})*$/i;
  function applyOptionsToTag(tag, options) {
    invariant(typeof tag === "string", "language tag must be a string");
    invariant((0, import_intl_getcanonicallocales.isStructurallyValidLanguageTag)(tag), "malformed language tag", RangeError);
    var language = GetOption(options, "language", "string", void 0, void 0);
    if (language !== void 0) {
      invariant((0, import_intl_getcanonicallocales.isUnicodeLanguageSubtag)(language), "Malformed unicode_language_subtag", RangeError);
    }
    var script = GetOption(options, "script", "string", void 0, void 0);
    if (script !== void 0) {
      invariant((0, import_intl_getcanonicallocales.isUnicodeScriptSubtag)(script), "Malformed unicode_script_subtag", RangeError);
    }
    var region = GetOption(options, "region", "string", void 0, void 0);
    if (region !== void 0) {
      invariant((0, import_intl_getcanonicallocales.isUnicodeRegionSubtag)(region), "Malformed unicode_region_subtag", RangeError);
    }
    var languageId = (0, import_intl_getcanonicallocales.parseUnicodeLanguageId)(tag);
    if (language !== void 0) {
      languageId.lang = language;
    }
    if (script !== void 0) {
      languageId.script = script;
    }
    if (region !== void 0) {
      languageId.region = region;
    }
    return Intl.getCanonicalLocales((0, import_intl_getcanonicallocales.emitUnicodeLocaleId)((0, import_tslib5.__assign)((0, import_tslib5.__assign)({}, (0, import_intl_getcanonicallocales.parseUnicodeLocaleId)(tag)), {lang: languageId})))[0];
  }
  function applyUnicodeExtensionToTag(tag, options, relevantExtensionKeys) {
    var unicodeExtension;
    var keywords = [];
    var ast = (0, import_intl_getcanonicallocales.parseUnicodeLocaleId)(tag);
    for (var _i = 0, _a = ast.extensions; _i < _a.length; _i++) {
      var ext = _a[_i];
      if (ext.type === "u") {
        unicodeExtension = ext;
        if (Array.isArray(ext.keywords))
          keywords = ext.keywords;
      }
    }
    var result = Object.create(null);
    for (var _b = 0, relevantExtensionKeys_1 = relevantExtensionKeys; _b < relevantExtensionKeys_1.length; _b++) {
      var key = relevantExtensionKeys_1[_b];
      var value = void 0, entry = void 0;
      for (var _c = 0, keywords_1 = keywords; _c < keywords_1.length; _c++) {
        var keyword = keywords_1[_c];
        if (keyword[0] === key) {
          entry = keyword;
          value = entry[1];
        }
      }
      invariant(key in options, key + " must be in options");
      var optionsValue = options[key];
      if (optionsValue !== void 0) {
        invariant(typeof optionsValue === "string", "Value for " + key + " must be a string");
        value = optionsValue;
        if (entry) {
          entry[1] = value;
        } else {
          keywords.push([key, value]);
        }
      }
      result[key] = value;
    }
    if (!unicodeExtension) {
      if (keywords.length) {
        ast.extensions.push({
          type: "u",
          keywords: keywords,
          attributes: []
        });
      }
    } else {
      unicodeExtension.keywords = keywords;
    }
    result.locale = Intl.getCanonicalLocales((0, import_intl_getcanonicallocales.emitUnicodeLocaleId)(ast))[0];
    return result;
  }
  function mergeUnicodeLanguageId(lang, script, region, variants, replacement) {
    if (variants === void 0) {
      variants = [];
    }
    if (!replacement) {
      return {
        lang: lang || "und",
        script: script,
        region: region,
        variants: variants
      };
    }
    return {
      lang: !lang || lang === "und" ? replacement.lang : lang,
      script: script || replacement.script,
      region: region || replacement.region,
      variants: (0, import_tslib5.__spreadArray)((0, import_tslib5.__spreadArray)([], variants), replacement.variants)
    };
  }
  function addLikelySubtags(tag) {
    var ast = (0, import_intl_getcanonicallocales.parseUnicodeLocaleId)(tag);
    var unicodeLangId = ast.lang;
    var lang = unicodeLangId.lang, script = unicodeLangId.script, region = unicodeLangId.region, variants = unicodeLangId.variants;
    if (script && region) {
      var match_1 = likelySubtags[(0, import_intl_getcanonicallocales.emitUnicodeLanguageId)({lang: lang, script: script, region: region, variants: []})];
      if (match_1) {
        var parts_1 = (0, import_intl_getcanonicallocales.parseUnicodeLanguageId)(match_1);
        ast.lang = mergeUnicodeLanguageId(void 0, void 0, void 0, variants, parts_1);
        return (0, import_intl_getcanonicallocales.emitUnicodeLocaleId)(ast);
      }
    }
    if (script) {
      var match_2 = likelySubtags[(0, import_intl_getcanonicallocales.emitUnicodeLanguageId)({lang: lang, script: script, variants: []})];
      if (match_2) {
        var parts_2 = (0, import_intl_getcanonicallocales.parseUnicodeLanguageId)(match_2);
        ast.lang = mergeUnicodeLanguageId(void 0, void 0, region, variants, parts_2);
        return (0, import_intl_getcanonicallocales.emitUnicodeLocaleId)(ast);
      }
    }
    if (region) {
      var match_3 = likelySubtags[(0, import_intl_getcanonicallocales.emitUnicodeLanguageId)({lang: lang, region: region, variants: []})];
      if (match_3) {
        var parts_3 = (0, import_intl_getcanonicallocales.parseUnicodeLanguageId)(match_3);
        ast.lang = mergeUnicodeLanguageId(void 0, script, void 0, variants, parts_3);
        return (0, import_intl_getcanonicallocales.emitUnicodeLocaleId)(ast);
      }
    }
    var match = likelySubtags[lang] || likelySubtags[(0, import_intl_getcanonicallocales.emitUnicodeLanguageId)({lang: "und", script: script, variants: []})];
    if (!match) {
      throw new Error("No match for addLikelySubtags");
    }
    var parts = (0, import_intl_getcanonicallocales.parseUnicodeLanguageId)(match);
    ast.lang = mergeUnicodeLanguageId(void 0, script, region, variants, parts);
    return (0, import_intl_getcanonicallocales.emitUnicodeLocaleId)(ast);
  }
  function removeLikelySubtags(tag) {
    var maxLocale = addLikelySubtags(tag);
    if (!maxLocale) {
      return tag;
    }
    maxLocale = (0, import_intl_getcanonicallocales.emitUnicodeLanguageId)((0, import_tslib5.__assign)((0, import_tslib5.__assign)({}, (0, import_intl_getcanonicallocales.parseUnicodeLanguageId)(maxLocale)), {variants: []}));
    var ast = (0, import_intl_getcanonicallocales.parseUnicodeLocaleId)(tag);
    var _a = ast.lang, lang = _a.lang, script = _a.script, region = _a.region, variants = _a.variants;
    var trial = addLikelySubtags((0, import_intl_getcanonicallocales.emitUnicodeLanguageId)({lang: lang, variants: []}));
    if (trial === maxLocale) {
      return (0, import_intl_getcanonicallocales.emitUnicodeLocaleId)((0, import_tslib5.__assign)((0, import_tslib5.__assign)({}, ast), {lang: mergeUnicodeLanguageId(lang, void 0, void 0, variants)}));
    }
    if (region) {
      var trial_1 = addLikelySubtags((0, import_intl_getcanonicallocales.emitUnicodeLanguageId)({lang: lang, region: region, variants: []}));
      if (trial_1 === maxLocale) {
        return (0, import_intl_getcanonicallocales.emitUnicodeLocaleId)((0, import_tslib5.__assign)((0, import_tslib5.__assign)({}, ast), {lang: mergeUnicodeLanguageId(lang, void 0, region, variants)}));
      }
    }
    if (script) {
      var trial_2 = addLikelySubtags((0, import_intl_getcanonicallocales.emitUnicodeLanguageId)({lang: lang, script: script, variants: []}));
      if (trial_2 === maxLocale) {
        return (0, import_intl_getcanonicallocales.emitUnicodeLocaleId)((0, import_tslib5.__assign)((0, import_tslib5.__assign)({}, ast), {lang: mergeUnicodeLanguageId(lang, script, void 0, variants)}));
      }
    }
    return tag;
  }
  var Locale = function() {
    function Locale2(tag, opts) {
      var newTarget = this && this instanceof Locale2 ? this.constructor : void 0;
      if (!newTarget) {
        throw new TypeError("Intl.Locale must be called with 'new'");
      }
      var relevantExtensionKeys = Locale2.relevantExtensionKeys;
      var internalSlotsList = [
        "initializedLocale",
        "locale",
        "calendar",
        "collation",
        "hourCycle",
        "numberingSystem"
      ];
      if (relevantExtensionKeys.indexOf("kf") > -1) {
        internalSlotsList.push("caseFirst");
      }
      if (relevantExtensionKeys.indexOf("kn") > -1) {
        internalSlotsList.push("numeric");
      }
      if (tag === void 0) {
        throw new TypeError("First argument to Intl.Locale constructor can't be empty or missing");
      }
      if (typeof tag !== "string" && typeof tag !== "object") {
        throw new TypeError("tag must be a string or object");
      }
      var internalSlots;
      if (typeof tag === "object" && (internalSlots = getInternalSlots(tag)) && internalSlots.initializedLocale) {
        tag = internalSlots.locale;
      } else {
        tag = tag.toString();
      }
      internalSlots = getInternalSlots(this);
      var options = CoerceOptionsToObject(opts);
      tag = applyOptionsToTag(tag, options);
      var opt = Object.create(null);
      var calendar = GetOption(options, "calendar", "string", void 0, void 0);
      if (calendar !== void 0) {
        if (!UNICODE_TYPE_REGEX.test(calendar)) {
          throw new RangeError("invalid calendar");
        }
      }
      opt.ca = calendar;
      var collation = GetOption(options, "collation", "string", void 0, void 0);
      if (collation !== void 0) {
        if (!UNICODE_TYPE_REGEX.test(collation)) {
          throw new RangeError("invalid collation");
        }
      }
      opt.co = collation;
      var hc = GetOption(options, "hourCycle", "string", ["h11", "h12", "h23", "h24"], void 0);
      opt.hc = hc;
      var kf = GetOption(options, "caseFirst", "string", ["upper", "lower", "false"], void 0);
      opt.kf = kf;
      var _kn = GetOption(options, "numeric", "boolean", void 0, void 0);
      var kn;
      if (_kn !== void 0) {
        kn = String(_kn);
      }
      opt.kn = kn;
      var numberingSystem = GetOption(options, "numberingSystem", "string", void 0, void 0);
      if (numberingSystem !== void 0) {
        if (!UNICODE_TYPE_REGEX.test(numberingSystem)) {
          throw new RangeError("Invalid numberingSystem");
        }
      }
      opt.nu = numberingSystem;
      var r = applyUnicodeExtensionToTag(tag, opt, relevantExtensionKeys);
      internalSlots.locale = r.locale;
      internalSlots.calendar = r.ca;
      internalSlots.collation = r.co;
      internalSlots.hourCycle = r.hc;
      if (relevantExtensionKeys.indexOf("kf") > -1) {
        internalSlots.caseFirst = r.kf;
      }
      if (relevantExtensionKeys.indexOf("kn") > -1) {
        internalSlots.numeric = SameValue(r.kn, "true");
      }
      internalSlots.numberingSystem = r.nu;
    }
    Locale2.prototype.maximize = function() {
      var locale = getInternalSlots(this).locale;
      try {
        var maximizedLocale = addLikelySubtags(locale);
        return new Locale2(maximizedLocale);
      } catch (e) {
        return new Locale2(locale);
      }
    };
    Locale2.prototype.minimize = function() {
      var locale = getInternalSlots(this).locale;
      try {
        var minimizedLocale = removeLikelySubtags(locale);
        return new Locale2(minimizedLocale);
      } catch (e) {
        return new Locale2(locale);
      }
    };
    Locale2.prototype.toString = function() {
      return getInternalSlots(this).locale;
    };
    Object.defineProperty(Locale2.prototype, "baseName", {
      get: function() {
        var locale = getInternalSlots(this).locale;
        return (0, import_intl_getcanonicallocales.emitUnicodeLanguageId)((0, import_intl_getcanonicallocales.parseUnicodeLanguageId)(locale));
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Locale2.prototype, "calendar", {
      get: function() {
        return getInternalSlots(this).calendar;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Locale2.prototype, "collation", {
      get: function() {
        return getInternalSlots(this).collation;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Locale2.prototype, "hourCycle", {
      get: function() {
        return getInternalSlots(this).hourCycle;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Locale2.prototype, "caseFirst", {
      get: function() {
        return getInternalSlots(this).caseFirst;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Locale2.prototype, "numeric", {
      get: function() {
        return getInternalSlots(this).numeric;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Locale2.prototype, "numberingSystem", {
      get: function() {
        return getInternalSlots(this).numberingSystem;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Locale2.prototype, "language", {
      get: function() {
        var locale = getInternalSlots(this).locale;
        return (0, import_intl_getcanonicallocales.parseUnicodeLanguageId)(locale).lang;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Locale2.prototype, "script", {
      get: function() {
        var locale = getInternalSlots(this).locale;
        return (0, import_intl_getcanonicallocales.parseUnicodeLanguageId)(locale).script;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Locale2.prototype, "region", {
      get: function() {
        var locale = getInternalSlots(this).locale;
        return (0, import_intl_getcanonicallocales.parseUnicodeLanguageId)(locale).region;
      },
      enumerable: false,
      configurable: true
    });
    Locale2.relevantExtensionKeys = RELEVANT_EXTENSION_KEYS;
    return Locale2;
  }();
  try {
    if (typeof Symbol !== "undefined") {
      Object.defineProperty(Locale.prototype, Symbol.toStringTag, {
        value: "Intl.Locale",
        writable: false,
        enumerable: false,
        configurable: true
      });
    }
    Object.defineProperty(Locale.prototype.constructor, "length", {
      value: 1,
      writable: false,
      enumerable: false,
      configurable: true
    });
  } catch (e) {
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-locale/lib/should-polyfill.js
  function hasIntlGetCanonicalLocalesBug() {
    try {
      return new Intl.Locale("und-x-private").toString() === "x-private";
    } catch (e) {
      return true;
    }
  }
  function shouldPolyfill() {
    return typeof Intl === "undefined" || !("Locale" in Intl) || hasIntlGetCanonicalLocalesBug();
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-locale/lib/polyfill.js
  if (shouldPolyfill()) {
    Object.defineProperty(Intl, "Locale", {
      value: Locale,
      writable: true,
      enumerable: false,
      configurable: true
    });
  }
})();
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

