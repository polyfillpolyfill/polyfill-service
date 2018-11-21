Object.defineProperty(Element.prototype, "firstElementChild", {
  get: function(){
    var els = this.children, l = els.length, i = 0, child;
    do {
      if (els[i].nodeType === 1) { child = els[i]; }
      i++;
    } while (i < l && !child);

    return child || null;
  }
});
