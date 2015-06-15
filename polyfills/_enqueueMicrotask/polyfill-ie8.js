var _enqueueMicrotask = function () {
/**
 * IE8 setImmediate polyfill v1.0.1
 * © 2014–2015 Dmitry Korobkin
 * Released under the MIT license
 * github.com/Octane/setImmediate
 */

    var uid = 0;
    var storage = {};
    var slice = Array.prototype.slice;

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

    return function() {
        var id = uid++;
        var i = arguments.length;
        var args = new Array(i);
        while (i--) {
            args[i] = arguments[i];
        }
        function onReadyStateChange() {
            this.onreadystatechange = null;
            document.body.removeChild(this);
            if (storage[id]) {
                delete storage[id];
                fastApply(args);
            }
        }
        storage[id] = true;
        (function () {//avoid closure
            var script = document.createElement('script');
            script.onreadystatechange = onReadyStateChange;
            document.body.appendChild(script);
        }());
        return id;
    }

}();
