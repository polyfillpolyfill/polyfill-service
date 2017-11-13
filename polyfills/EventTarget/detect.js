(function(global) {
    var Event = global.CustomEvent,
        dE = global.dispatchEvent,
        aEL = global.addEventListener,
        rEL = global.removeEventListener,
        counter = 0,
        increment = function () { counter++; }
    ;

    try {
        aEL('_', increment, {once: true});
        dE(new Event('_'));
        dE(new Event('_'));
        rEL('_', increment, {once: true});
        return counter === 1;
    } catch(o_O) {
        return false;
    }
}(this))
