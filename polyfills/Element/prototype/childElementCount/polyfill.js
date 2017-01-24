Object.defineProperty(Element.prototype, "childElementCount", {
  get: function () {
    var c = 0, els = this.children; 
    for (var l = els.length; l--;) {
      if (els[l].nodeType === 1) { c++; }
    }
    return c;
  }
});