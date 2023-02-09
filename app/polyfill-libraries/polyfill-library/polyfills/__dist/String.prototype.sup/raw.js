
// String.prototype.sup
/* globals CreateHTML, CreateMethodProperty */
// B.2.3.14String.prototype.sup ( )
// When the sup method is called with no arguments, the following steps are taken:
CreateMethodProperty(String.prototype, 'sup', function sup() {
	// 1. Let S be the this value.
	var S = this;
	// 2. Return ? CreateHTML(S, "sup", "", "").
	return CreateHTML(S, "sup", "", "");
});
