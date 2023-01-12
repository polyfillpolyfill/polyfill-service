
// String.prototype.fontsize
/* globals CreateHTML, CreateMethodProperty */
// B.2.3.8String.prototype.fontsize ( size )
// When the fontsize method is called with argument size, the following steps are taken:
CreateMethodProperty(String.prototype, 'fontsize', function fontsize(size) {
	// 1. Let S be the this value.
	var S = this;
	// 2. Return ? CreateHTML(S, "font", "size", size).
	return CreateHTML(S, "font", "size", size);
});
