// Create an empty function to act as the missing constructor for the document object, attach the document object as its prototype
this.Document = this.HTMLDocument = document.constructor = function Document() {};
this.Document.prototype = document;
