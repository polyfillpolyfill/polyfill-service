Object.defineProperty(Element.prototype, "previousElementSibling", {
  get: function(){
    var el = this.previousSibling;
    while (el && el.nodeType !== 1) { el = el.previousSibling; }
    return (el.nodeType === 1) ? el : null;
  }
});