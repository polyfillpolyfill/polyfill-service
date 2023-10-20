
// String.prototype.big
/* globals CreateHTML, CreateMethodProperty */
// B.2.3.3String.prototype.big ( )
// When the big method is called with no arguments, the following steps are taken:
CreateMethodProperty(String.prototype, 'big', function big() {
	// 1. Let S be the this value.
	var S = this;
	// 2. Return ? CreateHTML(S, "big", "", "").
	return CreateHTML(S, "big", "", "");
});
