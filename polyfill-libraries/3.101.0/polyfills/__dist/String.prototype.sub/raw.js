
// String.prototype.sub
/* globals CreateHTML, CreateMethodProperty */
// B.2.3.13String.prototype.sub ( )
// When the sub method is called with no arguments, the following steps are taken:
CreateMethodProperty(String.prototype, 'sub', function sub() {
    // 1. Let S be the this value.
    var S = this;
    // 2. Return ? CreateHTML(S, "sub", "", "").
    return CreateHTML(S, "sub", "", "");
});