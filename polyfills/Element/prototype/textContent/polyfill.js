// Source: https://github.com/Alhadis/Fix-IE/blob/master/src/text-content.js
(function(){
  "use strict";
  
  if(!("textContent" in Element.prototype)){
    var interfaces = "Element Text HTMLDocument HTMLCommentElement".split(" ");
    var haveText   = {3:1, 8:1, 4:1, 7:1};
    var haveNull   = {9:1, 10:1, 12:1};
    var srcTags    = {SCRIPT:1, STYLE:1};
    for(var I, i = 0; i < 4; ++i){
      I = window[interfaces[i]];
      I && Object.defineProperty(I.prototype, "textContent", {
        get: function(){ return getText(this); },
        set: function(input){
          var type = this.nodeType;
          
          /** Text nodes: set nodeValue */
          if(haveText[type])
            this.nodeValue = input;
          
          /** For everything that isn't a document, DOCTYPE or notation */
          else if(!haveNull[type]){
            var name = this.nodeName;
            
            /** IE8 throws a runtime error trying to set the innerHTML of a <style> element */
            if("STYLE" === name)
              this.styleSheet.cssText = input;
            
            /** Scripts have a similar issue */
            else if(srcTags[name])
              this.text = input;
            
            else this.innerText = input;
          }
        },
      });
    }
    
    
    function getText(node){
      var type = node.nodeType;
      
      /** Return `nodeValue` if input is a text node, comment, CDATA section, or processing instruction */
      if(haveText[type])
        return node.nodeValue;
      
      /** Return null for documents, DOCTYPE declarations, and notations */
      if(haveNull[type])
        return null;
      
      /** Use the innerHTML property of <script> and <style> tags */
      var name = node.nodeName;
      if(name && srcTags[name])
        return node.innerHTML;
      
      
      /** Everything else: Concatenate the textContent of each child node, except comments and processing instructions */
      var result   = "";
      var children = node.childNodes;
      for(var i = 0, l = children.length; i < l; ++i){
        var child = children[i];
        if(child.nodeType !== 7 && child.nodeType !== 8)
          result += child.textContent;
      }
      
      return result;
    }
  } 
}());