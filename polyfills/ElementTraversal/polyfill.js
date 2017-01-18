(function(){
  "use strict";
  
  
  var patches = {
    
    firstElementChild: function(){
      for(var nodes = this.children, n, i = 0, l = nodes.length; i < l; ++i)
        if(n = nodes[i], 1 === n.nodeType) return n;
      return null;
    },
    
    lastElementChild: function(){
      for(var nodes = this.children, n, i = nodes.length - 1; i >= 0; --i)
        if(n = nodes[i], 1 === n.nodeType) return n;
      return null;
    },
    
    nextElementSibling: function(){
      var e = this.nextSibling;
      while(e && 1 !== e.nodeType)
        e = e.nextSibling;
      return e;
    },
    
    previousElementSibling: function(){
      var e = this.previousSibling;
      while(e && 1 !== e.nodeType)
        e = e.previousSibling;
      return e;
    },
    
    childElementCount: function(){
      for(var c = 0, nodes = this.children, n, i = 0, l = nodes.length; i < l; ++i)
        (n = nodes[i], 1 === n.nodeType) && ++c;
      return c;
    }
  };
  
  for(var i in patches)
    i in document.documentElement ||
    Object.defineProperty(Element.prototype, i, {get: patches[i]});
}());