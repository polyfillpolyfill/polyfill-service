if(!("lastElementChild" in document.documentElement)){
  Object.defineProperty(Element.prototype, "lastElementChild", {
    get: function(){
      var els = this.children;
      for(i = els.length; i--;) {
        if (els[i].nodeType === 1) { return els[i]; }
      }
      return null;
    }
  });
}