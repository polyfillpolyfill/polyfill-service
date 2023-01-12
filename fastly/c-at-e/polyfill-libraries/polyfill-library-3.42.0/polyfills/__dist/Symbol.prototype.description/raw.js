
// Symbol.prototype.description
/* global Symbol */
var NativeSymbol = Symbol;

var symbolDescriptionStore = {};
Object.defineProperty(Symbol.prototype, 'description', {
    configurable: true,
    enumerable: false,
    get: function () {
        if (!(this instanceof Symbol)) {
            throw TypeError();
        }
        if (!(this instanceof NativeSymbol)) {
            throw TypeError();
        }
        var string = this.toString();
        var isUndefinedSymbol = symbolDescriptionStore[this];
        if (isUndefinedSymbol === true) {
            return undefined;
        } else {
            var check = NativeSymbol.toString().slice(20, NativeSymbol.toString().length - 2);
            var native = "[native code]";
            if (check !== native) {
                return string.slice('__\u0001symbol:'.length, 19);
            } else {
                return string.slice(7, string.length - 1);
            }
        }
    }
});

(function () {
    function Symbol(description) {
        var desc = String(description);
        var sym = NativeSymbol(desc);
        if (description === undefined) {
            symbolDescriptionStore[sym] = true;
        }
        return sym;
    }
    this.Symbol = Symbol;
    Symbol.prototype = NativeSymbol.prototype;
}());
