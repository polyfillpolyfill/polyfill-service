
// String.prototype.italics
/* globals CreateHTML, CreateMethodProperty */
// B.2.3.9 String.prototype.italics ( )
// When the italics method is called with no arguments, the following steps are taken:
CreateMethodProperty(String.prototype, 'italics', function italics() {
	// 1. Let S be the this value.
	var S = this;
	// 2. Return ? CreateHTML(S, "i", "", "").
	return CreateHTML(S, "i", "", "");
});
