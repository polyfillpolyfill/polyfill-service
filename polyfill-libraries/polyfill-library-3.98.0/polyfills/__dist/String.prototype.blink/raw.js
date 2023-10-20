
// String.prototype.blink
/* globals CreateHTML, CreateMethodProperty */
// B.2.3.4String.prototype.blink ( )
// When the blink method is called with no arguments, the following steps are taken:
CreateMethodProperty(String.prototype, 'blink', function blink() {
    // 1. Let S be the this value.
    var S = this;
    // 2. Return ? CreateHTML(S, "blink", "", "").
    return CreateHTML(S, "blink", "", "");
});