
// String.prototype.small
/* globals CreateHTML, CreateMethodProperty */
// B.2.3.11String.prototype.small ( )
// When the small method is called with no arguments, the following steps are taken:
CreateMethodProperty(String.prototype, 'small', function small() {
	// 1. Let S be the this value.
	var S = this;
	// 2. Return ? CreateHTML(S, "small", "", "").
	return CreateHTML(S, "small", "", "");
});
