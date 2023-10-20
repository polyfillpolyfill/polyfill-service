
// String.prototype.link
/* globals CreateHTML, CreateMethodProperty */
// B.2.3.10String.prototype.link ( url )
// When the link method is called with argument url, the following steps are taken:
CreateMethodProperty(String.prototype, 'link', function link(url) {
	// 1. Let S be the this value.
	var S = this;
	// 2. Return ? CreateHTML(S, "a", "href", url).
	return CreateHTML(S, "a", "href", url);
});
