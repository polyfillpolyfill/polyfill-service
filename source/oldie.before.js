// polyfill old ie
Window = function Window() {}
Window.toString = new Function('return "[object Window]"');

Document = function Document() {}
Document.toString = new Function('return "[object Document]"');

Element = function Element() {}
Element.toString = new Function('return "[object Element]"');

NodeList = function NodeList() {}
NodeList.toString = new Function('return "[object NodeList]"');
NodeList.prototype.length = Array.prototype.length;
