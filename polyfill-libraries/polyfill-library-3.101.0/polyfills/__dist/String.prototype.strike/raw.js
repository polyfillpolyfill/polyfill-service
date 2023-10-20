
// String.prototype.strike
/* globals CreateHTML, CreateMethodProperty */
// B.2.3.12String.prototype.strike ( )
// When the strike method is called with no arguments, the following steps are taken:
CreateMethodProperty(String.prototype, 'strike', function strike() {
    // 1. Let S be the this value.
    var S = this;
    // 2. Return ? CreateHTML(S, "strike", "", "").
    return CreateHTML(S, "strike", "", "");
});