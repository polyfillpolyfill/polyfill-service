// Source: https://github.com/Alhadis/Snippets/blob/master/js/polyfills/IE8-child-elements.js
if(!("childElementCount" in document.documentElement)){
    Object.defineProperty(Element.prototype, "childElementCount", {
        get: function(){
            for(var c = 0, nodes = this.children, n, i = 0, l = nodes.length; i < l; ++i)
                (n = nodes[i], 1 === n.nodeType) && ++c;
            return c;
        }
    });
}