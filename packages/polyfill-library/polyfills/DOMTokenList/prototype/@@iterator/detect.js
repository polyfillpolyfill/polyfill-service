'Symbol' in this && 'iterator' in this.Symbol && (function(){
    try {
        var div = document.createElement('div');
        return div.classList && div.classList[Symbol.iterator];
    } catch (err) {
        return false;
    }
}())
