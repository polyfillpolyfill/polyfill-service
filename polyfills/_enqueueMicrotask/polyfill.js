
var _enqueueMicrotask = (function () {

/**
 * setImmediate polyfill v1.0.1, supports IE9+
 * © 2014–2015 Dmitry Korobkin
 * Released under the MIT license
 * github.com/Octane/setImmediate
 */

    var uid = 0;
    var storage = {};
    var firstCall = true;
    var slice = Array.prototype.slice;
    var message = 'setImmediatePolyfillMessage';

    function fastApply(args) {
        var func = args[0];
        switch (args.length) {
            case 1:
                return func();
            case 2:
                return func(args[1]);
            case 3:
                return func(args[1], args[2]);
        }
        return func.apply(window, slice.call(args, 1));
    }

    function callback(event) {
        var key = event.data;
        var data;
        if (typeof key == 'string' && key.indexOf(message) == 0) {
            data = storage[key];
            if (data) {
                delete storage[key];
                fastApply(data);
            }
        }
    }

    return function() {
        var id = uid++;
        var key = message + id;
        var i = arguments.length;
        var args = new Array(i);
        while (i--) {
            args[i] = arguments[i];
        }
        storage[key] = args;
        if (firstCall) {
            firstCall = false;
            window.addEventListener('message', callback);
        }
        window.postMessage(key, '*');
        return id;
    };

    window.clearImmediate = function clearImmediate(id) {
        delete storage[message + id];
    };

})();
